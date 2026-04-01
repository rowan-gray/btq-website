'use client'

import { MultiSelect } from '@/components/core/multiSelect'
import { LocalTime } from '@/components/localised/local-time'
import {
  AlertSeverityLevel,
  filterForAlertsActiveWithinDays,
  type TranslinkAlert,
} from '@/helpers/translinkAlertsHelper'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const MODES = [
  { id: 'all', label: 'All modes' },
  { id: 'train', label: 'Train' },
  { id: 'bus', label: 'Bus' },
  { id: 'ferry', label: 'Ferry' },
  { id: 'tram', label: 'Tram' },
] as const

type ModeId = (typeof MODES)[number]['id']

const TIME_RANGES = [
  { id: '1', label: 'Today' },
  { id: '3', label: 'Next 3 days' },
  { id: '7', label: 'Next 7 days' },
  { id: 'all', label: 'All time' },
] as const

type TimeRangeId = (typeof TIME_RANGES)[number]['id']

const SEVERITY_BADGE: Record<string, string> = {
  major: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  minor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
}
export const SEVERITY_LABEL: Record<AlertSeverityLevel, string> = {
  [AlertSeverityLevel.Major]: 'Major',
  [AlertSeverityLevel.Minor]: 'Minor',
  [AlertSeverityLevel.Info]: 'Info',
}
const MODE_BADGE: Record<string, string> = {
  train:
    'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  bus: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  ferry: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  tram: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
}
const MODE_ICONS: Record<string, string> = {
  train: '🚆',
  bus: '🚌',
  ferry: '⛴️',
  tram: '🚊',
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-full bg-indigo-700 px-4 py-1.5 text-sm font-medium text-white shadow-sm'
          : 'rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      }
    >
      {children}
    </button>
  )
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
    >
      {children}
    </select>
  )
}

function AlertCard({ alert }: { alert: TranslinkAlert }) {
  return (
    <Link
      href={alert.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${SEVERITY_BADGE[alert.severity]}`}
        >
          {SEVERITY_LABEL[alert.severity]}
        </span>
        {alert.mode && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${MODE_BADGE[alert.mode] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {MODE_ICONS[alert.mode]} {alert.mode}
          </span>
        )}
        {alert.area && alert.area !== 'SEQ' && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {alert.area}
          </span>
        )}
      </div>

      <p className="text-sm leading-snug font-semibold text-gray-900 group-hover:underline dark:text-white">
        {alert.title}
      </p>

      {/* Services */}
      {alert.services && (
        <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
          {alert.services}
        </p>
      )}

      <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-gray-400 dark:text-gray-500">
        {alert.startDate && (
          <span>
            From{' '}
            <LocalTime date={alert.startDate} displayTz="Australia/Brisbane" />
          </span>
        )}
        {alert.endDate && (
          <span>
            Until{' '}
            <LocalTime date={alert.endDate} displayTz="Australia/Brisbane" />
          </span> // TODO client hydration
        )}
      </div>
    </Link>
  )
}

export function AlertsClient({
  alerts,
  areas,
}: {
  alerts: TranslinkAlert[]
  areas: string[]
}) {
  const [mode, setMode] = useState<ModeId>('all')
  const [severities, setSeverities] = useState<AlertSeverityLevel[]>([
    AlertSeverityLevel.Major,
    AlertSeverityLevel.Minor,
    AlertSeverityLevel.Info,
  ])
  const [area, setArea] = useState('all')
  const [timeRange, setTimeRange] = useState<TimeRangeId>('3')

  // Do the expensive filtering first and store as memo so we can reuse
  // it if other less expensive filters change
  const partialFilterByTimeRange = useMemo(() => {
    if (timeRange === 'all') return alerts

    const cutoffDays = parseInt(timeRange, 10)

    return filterForAlertsActiveWithinDays(alerts, cutoffDays)
  }, [alerts, timeRange])

  const filtered = useMemo(() => {
    return partialFilterByTimeRange.filter((a) => {
      if (mode !== 'all' && a.mode !== mode) return false
      if (area !== 'all' && a.area !== area) return false
      if (severities.length !== 0 && !severities.includes(a.severity))
        return false
      return true
    })
  }, [partialFilterByTimeRange, mode, area, severities])

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {MODES.map(({ id, label }) => (
            <Pill key={id} active={mode === id} onClick={() => setMode(id)}>
              {label}
            </Pill>
          ))}
        </div>

        <div className="hidden h-6 w-px bg-gray-200 sm:block dark:bg-gray-700" />

        <div className="flex flex-wrap gap-2">
          <MultiSelect
            values={severities}
            options={SEVERITY_LABEL}
            onChange={setSeverities}
            allSelectedText={'All severities'}
            noneSelectedText={'All severities'}
          />

          <Select value={area} onChange={setArea}>
            <option value="all">All locations</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>

          <Select
            value={timeRange}
            onChange={(v) => setTimeRange(v as TimeRangeId)}
          >
            {TIME_RANGES.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {filtered.length > 0 ? (
          <>
            <span className="font-semibold text-gray-900 dark:text-white">
              {filtered.length}
            </span>{' '}
            alert{filtered.length !== 1 ? 's' : ''}
          </>
        ) : (
          'No alerts match the current filters.'
        )}
      </p>

      {filtered.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </>
  )
}
