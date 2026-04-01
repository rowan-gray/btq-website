import { MAX_DATE } from '@/constants/dateConstants'
import NodeCache from 'node-cache'
import Parser from 'rss-parser'
import { doDateRangesIntersect, type DateRange } from './dateHelper'

const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 }) // 5 minute cache

export enum AlertSeverityLevel {
  Major = 'major',
  Minor = 'minor',
  Info = 'info',
}

export type AlertSeverity =
  | AlertSeverityLevel.Major
  | AlertSeverityLevel.Minor
  | AlertSeverityLevel.Info

export enum TransportMode {
  Train = 'train',
  Bus = 'bus',
  Ferry = 'ferry',
  Tram = 'tram',
}

export type AlertTransportMode = 'train' | 'bus' | 'ferry' | 'tram' | null

export type TranslinkAlert = {
  id: string
  title: string
  href: string
  severity: AlertSeverityLevel
  services: string
  startDate: Date | null
  endDate: Date | null
  mode: AlertTransportMode
  area: string | null
}

export type AlertMode = 'all' | 'bus' | 'train' | 'ferry' | 'tram'

const RSS_URLS: Record<AlertMode, string> = {
  all: 'https://translink.com.au/service-updates/rss',
  bus: 'https://translink.com.au/service-updates/rss/bus',
  train: 'https://translink.com.au/service-updates/rss/train',
  ferry: 'https://translink.com.au/service-updates/rss/ferry',
  tram: 'https://translink.com.au/service-updates/rss/tram',
}

/* ------------------------------------------------------------------ */
/*  Parsing                                                            */
/* ------------------------------------------------------------------ */

function parseSeverity(rawTitle: string): AlertSeverityLevel {
  if (rawTitle.startsWith('☒')) return AlertSeverityLevel.Major
  if (rawTitle.startsWith('⚠')) return AlertSeverityLevel.Minor
  return AlertSeverityLevel.Info
}

function stripEmoji(title: string): string {
  return title.replace(/^[☒⚠ⓘ]\s*/, '').trim()
}

function parseDescription(description: string): {
  startDate: Date | null
  endDate: Date | null
  services: string
} {
  const startMatch = description.match(/Start date:\s*([^,]+)/)
  const endMatch = description.match(/End date:\s*([^,]+)/)
  const servicesMatch = description.match(/Services:\s*(.+)$/)

  const rawStart = startMatch?.[1]?.trim() ?? null
  let rawEnd = endMatch?.[1]?.trim() ?? null

  // If end date is time-only, attach the start date's date
  if (rawStart && rawEnd && !rawEnd.includes('/')) {
    // Extract the date portion from the start date (DD/MM/YYYY)
    const datePart = rawStart.split(/\s+/)[0] // "01/04/2026"
    rawEnd = `${datePart} ${rawEnd}` // "01/04/2026 11:30 PM"
  }

  return {
    startDate: rawStart ? parseTranslinkDate(rawStart) : null,
    endDate: rawEnd ? parseTranslinkDate(rawEnd) : null,
    services:
      servicesMatch?.[1]?.trim().replace(', ...', '').replace('...', '') ?? '',
  }
}

function parseTranslinkDate(raw: string): Date | null {
  const m = raw.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)$/i,
  )
  if (!m) return null

  const [, day, month, year, hour, minute, ampm] = m

  let h = parseInt(hour, 10)
  if (ampm.toUpperCase() === 'PM' && h !== 12) h += 12
  if (ampm.toUpperCase() === 'AM' && h === 12) h = 0

  const y = parseInt(year, 10)
  const mo = parseInt(month, 10) - 1
  const d = parseInt(day, 10)
  const min = parseInt(minute, 10)

  // Translink is located in AEST.
  const AEST_OFFSET = 10

  // Convert AEST wall-clock time to UTC timestamp
  const utcTimestamp = Date.UTC(y, mo, d, h - AEST_OFFSET, min)

  return new Date(utcTimestamp)
}

export function isTimeSpecificAlert(title: string): boolean {
  return (
    /\b\d{1,2}:\d{2}\s*(am|pm)\b/i.test(title) ||
    /\b\d{1,2}\s*(am|pm)\b/i.test(title)
  )
}

export function detectMode(
  title: string,
  services: string,
  feedMode?: AlertMode,
): AlertTransportMode {
  if (feedMode && feedMode !== 'all') return feedMode as AlertTransportMode

  const text = `${title} ${services}`.toLowerCase()
  if (/\btrain\b|\brail\b|\bline\b|\bstation\b/.test(text)) return 'train'
  if (/\bferry\b|\bcitycat\b|\bcross river\b/.test(text)) return 'ferry'
  if (/\btram\b|\blight rail\b|\bg:link\b|\bgoldlinq\b/.test(text))
    return 'tram'
  // Bus: 3-digit route numbers, "Route", or explicit keyword
  if (/\bbus\b|\broute \d|\b\d{3}\b/.test(text)) return 'bus'
  return null
}

export function detectArea(categories: string[], title: string): string | null {
  const catStr = categories.join(' ').toUpperCase()
  if (catStr.includes('SEQ')) return 'SEQ'
  if (catStr.includes('CNS') || /cairns/i.test(title)) return 'Cairns'
  if (catStr.includes('MHB') || /maryborough|hervey bay/i.test(title))
    return 'Maryborough/Hervey Bay'
  if (catStr.includes('NSI') || /stradbroke/i.test(title)) return 'Stradbroke'
  if (catStr.includes('BOW') || /bowen/i.test(title)) return 'Bowen'
  if (catStr.includes('INN') || /innisfail/i.test(title)) return 'Innisfail'
  // Default to SEQ for anything without explicit region
  return 'SEQ'
}

export function filterForAlertsActiveWithinDays(
  alerts: TranslinkAlert[],
  days: number,
): TranslinkAlert[] {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const window = {
    StartDate: startOfDay,
    EndDate: new Date(startOfDay.getTime() + days * 24 * 60 * 60 * 1000),
  } as DateRange

  return filterForAlertsActiveWithinDateRange(alerts, window)
}

export function filterForAlertsActiveWithinDateRange(
  alerts: TranslinkAlert[],
  range: DateRange,
): TranslinkAlert[] {
  return alerts.filter((alert) => {
    if (!isStillRelevant(alert)) return false

    if (!alert.startDate) return false

    const alertRange = {
      StartDate: alert.startDate,
      // If alert has an endDate, parse it; otherwise treat as open‑ended
      EndDate: alert.endDate ?? MAX_DATE,
    } as DateRange

    return doDateRangesIntersect(range, alertRange)
  })
}

function isStillRelevant(alert: TranslinkAlert): boolean {
  if (!isTimeSpecificAlert(alert.title)) return true
  if (alert.endDate) return true // has an explicit end, let end-date logic handle it

  if (!alert.startDate) return true
  const hoursElapsed =
    (Date.now() - alert.startDate.getTime()) / (1000 * 60 * 60)
  return hoursElapsed <= 2
}

function scoreAlert(alert: TranslinkAlert): number {
  const severityScore =
    alert.severity === 'major' ? 100 : alert.severity === 'minor' ? 60 : 20

  const modeScore = (() => {
    switch (alert.mode) {
      case 'train':
      case 'tram':
        return 30
      case undefined:
      case null:
        return 0
      default:
        return 15
    }
  })()

  // Determine if the alert is expired
  const now = Date.now()
  const isExpired = alert.endDate !== null && alert.endDate.getTime() < now

  let recencyScore = 0

  if (!isExpired && alert.startDate) {
    const hoursAgo = (now - alert.startDate.getTime()) / (1000 * 60 * 60)
    // Decay: full score at 0h, drops to 0 at 1 week
    recencyScore = Math.max(0, 50 * (1 - hoursAgo / (24 * 7)))
  }

  return severityScore + modeScore + recencyScore
}

export function sortAlerts(alerts: TranslinkAlert[]) {
  return alerts.sort((a, b) => {
    // 1. Score
    const scoreDiff = scoreAlert(b) - scoreAlert(a)
    if (scoreDiff !== 0) return scoreDiff

    // 2. Start date (newest first)
    const aStart = a.startDate?.getTime() ?? 0
    const bStart = b.startDate?.getTime() ?? 0
    const startDiff = bStart - aStart
    if (startDiff !== 0) return startDiff

    // 3. End date (earliest first)
    const aEnd = a.endDate?.getTime() ?? Infinity
    const bEnd = b.endDate?.getTime() ?? Infinity
    return aEnd - bEnd
  })
}

export async function fetchTranslinkAlerts(
  mode: AlertMode = 'all',
): Promise<TranslinkAlert[]> {
  const cacheKey = `translink-alerts-v2-${mode}`
  const cached = cache.get<TranslinkAlert[]>(cacheKey)
  if (cached) return cached

  const parser = new Parser({ timeout: 8000 })
  try {
    const feed = await parser.parseURL(RSS_URLS[mode])
    const alerts = sortAlerts(
      (feed.items ?? [])
        .map((item, index) => {
          const rawTitle = (item.title ?? '').trim()
          const desc = parseDescription(
            item.contentSnippet ?? item.content ?? '',
          )
          const categories = (item.categories ?? []).map((c) =>
            c.replace(/\s+/g, ' ').trim(),
          )
          const title = stripEmoji(rawTitle)
          return {
            id: item.link ?? String(index),
            title,
            href: item.link ?? '#',
            severity: parseSeverity(rawTitle),
            ...desc,
            mode: detectMode(title, desc.services, mode),
            area: detectArea(categories, title),
          } as TranslinkAlert
        })
        .filter((alert) => {
          if (!alert.startDate) return false

          const twoYearsAgo = (() => {
            const d = new Date()
            d.setFullYear(d.getFullYear() - 2)
            return d
          })()

          return alert.startDate >= twoYearsAgo
        }),
    )
    cache.set(cacheKey, alerts)
    return alerts
  } catch {
    return []
  }
}
