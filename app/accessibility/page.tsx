import { createPageMetadata } from '@/app/layout'
import { Container } from '@/components/core/container'
import { Heading, Lead, Subheading } from '@/components/core/text'
import { Footer } from '@/components/footer/footer'
import { HeroBanner } from '@/components/hero-banner'
import type { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Accessibility',
  description:
    'Tracking accessibility upgrades across Queensland\'s public transport network — station lifts, platform improvements, and inclusive design progress.',
  slug: 'accessibility',
})

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
type Station = {
  name: string
  line: string
  lifts: 'yes' | 'partial' | 'no'
  tactile: boolean
  levelBoarding: boolean
  hearingLoop: boolean
  notes?: string
}

const stations: Station[] = [
  { name: 'Central', line: 'All Lines', lifts: 'yes', tactile: true, levelBoarding: true, hearingLoop: true },
  { name: 'Roma Street', line: 'All Lines', lifts: 'yes', tactile: true, levelBoarding: true, hearingLoop: true },
  { name: 'Fortitude Valley', line: 'All Lines', lifts: 'yes', tactile: true, levelBoarding: true, hearingLoop: true },
  { name: 'South Brisbane', line: 'All Lines', lifts: 'yes', tactile: true, levelBoarding: true, hearingLoop: true },
  { name: 'South Bank', line: 'All Lines', lifts: 'yes', tactile: true, levelBoarding: true, hearingLoop: true },
  { name: 'Bowen Hills', line: 'Multiple', lifts: 'yes', tactile: true, levelBoarding: true, hearingLoop: false },
  { name: 'Park Road', line: 'Beenleigh/Gold Coast', lifts: 'yes', tactile: true, levelBoarding: true, hearingLoop: false },
  { name: 'Toowong', line: 'Ipswich/Springfield', lifts: 'yes', tactile: true, levelBoarding: false, hearingLoop: false, notes: 'Platform gap wider than standard' },
  { name: 'Indooroopilly', line: 'Ipswich/Springfield', lifts: 'yes', tactile: true, levelBoarding: false, hearingLoop: false },
  { name: 'Milton', line: 'Ipswich/Springfield', lifts: 'partial', tactile: true, levelBoarding: false, hearingLoop: false, notes: 'Lift to one platform only' },
  { name: 'Auchenflower', line: 'Ipswich/Springfield', lifts: 'no', tactile: true, levelBoarding: false, hearingLoop: false, notes: 'Stairs only — no accessible path' },
  { name: 'Chelmer', line: 'Ipswich/Rosewood', lifts: 'no', tactile: false, levelBoarding: false, hearingLoop: false, notes: 'Unstaffed, no lifts, heritage platform' },
  { name: 'Graceville', line: 'Ipswich/Rosewood', lifts: 'no', tactile: false, levelBoarding: false, hearingLoop: false, notes: 'Steep ramp access only' },
  { name: 'Yeronga', line: 'Beenleigh/Gold Coast', lifts: 'no', tactile: true, levelBoarding: false, hearingLoop: false, notes: 'Under review for upgrade' },
  { name: 'Fairfield', line: 'Beenleigh/Gold Coast', lifts: 'no', tactile: true, levelBoarding: false, hearingLoop: false },
  { name: 'East Ipswich', line: 'Ipswich/Rosewood', lifts: 'no', tactile: false, levelBoarding: false, hearingLoop: false, notes: 'Heritage station, limited access' },
  { name: 'Wooloowin', line: 'Caboolture/Sunshine Coast', lifts: 'no', tactile: true, levelBoarding: false, hearingLoop: false },
  { name: 'Albion', line: 'Airport/Doomben', lifts: 'yes', tactile: true, levelBoarding: true, hearingLoop: false },
  { name: 'Petrie', line: 'Caboolture/Redcliffe', lifts: 'yes', tactile: true, levelBoarding: true, hearingLoop: true, notes: 'Recently upgraded for Redcliffe Peninsula line' },
  { name: 'Springfield Central', line: 'Springfield', lifts: 'yes', tactile: true, levelBoarding: true, hearingLoop: true, notes: 'Modern station — fully accessible' },
]

type AccessibilityIssue = {
  title: string
  description: string
  severity: 'critical' | 'moderate' | 'improving'
}

const knownIssues: AccessibilityIssue[] = [
  {
    title: 'NGR Train Platform Gap',
    description:
      'The New Generation Rollingstock (NGR) trains were delivered with a platform gap and step that makes independent wheelchair boarding difficult at many stations. Retrofit boarding ramps and platform modifications are ongoing.',
    severity: 'critical',
  },
  {
    title: 'Older Stations Without Lifts',
    description:
      'Many suburban stations built before modern accessibility standards still lack lifts, forcing wheelchair users and people with prams to travel to alternative stations or use replacement transport.',
    severity: 'critical',
  },
  {
    title: 'Audio Announcements Inconsistency',
    description:
      'Real-time audio announcements are unreliable at some stations and on older rolling stock, creating challenges for vision-impaired passengers.',
    severity: 'moderate',
  },
  {
    title: 'Bus Stop Accessibility',
    description:
      'Many bus stops across SEQ lack concrete pads, shelters, or tactile indicators. Council and state funding is progressively upgrading priority stops.',
    severity: 'moderate',
  },
  {
    title: 'Cross River Rail Stations',
    description:
      'All four new underground CRR stations (Boggo Road, Woolloongabba, Albert Street, Roma Street) are being built to full modern accessibility standards with platform screen doors.',
    severity: 'improving',
  },
  {
    title: 'Station Upgrade Program',
    description:
      'The Queensland Government\'s Station Accessibility Upgrade Program is progressively adding lifts, tactile paths, and hearing loops to priority stations across the network.',
    severity: 'improving',
  },
]

type HighPriorityAction = {
  title: string
  summary: string
  whyItMatters: string
  policyActions: string[]
}

const highPriorityActions: HighPriorityAction[] = [
  {
    title: 'Accelerate Station Accessibility Upgrades',
    summary:
      'Bring stations to consistent full-access standards faster, rather than relying on incremental partial works.',
    whyItMatters:
      'Full-height, full-length accessible platforms reduce boarding risk and are central to timely DDA-aligned outcomes for passengers with disability, seniors, and pram users.',
    policyActions: [
      'Prioritise full-platform accessibility projects across the network as a staged program with published timelines.',
      'Reduce vertical and horizontal train-platform gaps to improve independent boarding.',
      'Avoid partial platform raising as a long-term default where full compliance remains unresolved.',
    ],
  },
  {
    title: 'Improve Bus Stop Infrastructure',
    summary:
      'Upgrade stops on high-frequency and high-demand routes to deliver shelter, comfort, and inclusive access in Queensland conditions.',
    whyItMatters:
      'Heat, humidity, heavy rain, and strong sun make poor stop design a safety and accessibility problem, not just an amenity issue.',
    policyActions: [
      'Deliver weather-protective shelter and shade at priority stops, especially where dwell times are high.',
      'Require DDA-compliant stop design or relocate non-compliant stops to nearby feasible sites.',
      'Pair stop upgrades with accessible footpaths and surrounding approaches so users can actually reach the stop safely.',
    ],
  },
  {
    title: 'Improve Bus Stop Crossing Facilities',
    summary:
      'Treat pedestrian access to and from bus stops as core transport infrastructure, not an afterthought.',
    whyItMatters:
      'Stops on high-speed roads without safe crossings force dangerous behaviour and can make access impossible for people with disability.',
    policyActions: [
      'Set annual assessment targets for stop access safety, including outbound and return walking trips.',
      'Install safe crossing facilities near priority stops where current access requires detours or unsafe crossing behaviour.',
      'Use pedestrian safety criteria in stop placement and upgrade sequencing.',
    ],
  },
  {
    title: 'Increase Density in Local Activity Centres',
    summary:
      'Align transport and land-use by prioritising denser, mixed-use local centres with high-frequency public transport.',
    whyItMatters:
      'Higher local density in amenity-rich centres supports shorter trips, better service viability, and 15-minute neighbourhood outcomes.',
    policyActions: [
      'Identify local centres suitable for uplift based on existing service, amenities, and walkability potential.',
      'Prioritise frequent bus corridors linking these centres to major destinations.',
      'Coordinate planning and transport investment so accessibility outcomes are built into growth decisions.',
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */
function StatusBadge({ value, label }: { value: boolean | string; label: string }) {
  if (typeof value === 'string') {
    // lifts: yes/partial/no
    const colour =
      value === 'yes'
        ? 'badge-success'
        : value === 'partial'
          ? 'badge-warning'
          : 'badge-danger'
    return (
      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${colour}`}>
        {value === 'yes' ? '✓' : value === 'partial' ? '~' : '✗'} {label}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
        value
          ? 'badge-success'
          : 'badge-danger'
      }`}
    >
      {value ? '✓' : '✗'} {label}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */
function Overview() {
  const total = stations.length
  const withLifts = stations.filter((s) => s.lifts === 'yes').length
  const withTactile = stations.filter((s) => s.tactile).length
  const withLevelBoarding = stations.filter((s) => s.levelBoarding).length

  const overviewStats = [
    { value: `${withLifts}/${total}`, label: 'Stations with full lift access' },
    { value: `${withTactile}/${total}`, label: 'Stations with tactile indicators' },
    { value: `${withLevelBoarding}/${total}`, label: 'Stations with level boarding' },
    { value: `${Math.round((withLifts / total) * 100)}%`, label: 'Lift coverage (sampled)' },
  ]

  return (
    <Container>
      <div className="text-center">
        <p className="section-label">
          At a Glance
        </p>
        <Heading as="h2" className="mx-auto mt-2 max-w-3xl">
          Network Accessibility Snapshot
        </Heading>
        <Lead className="mx-auto mt-4 max-w-2xl">
          A sample of station accessibility across the SEQ rail network. This
          is not exhaustive. We use this tracker to connect on-the-ground
          conditions with the policy priorities in BTQ&apos;s platform.
        </Lead>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-lg bg-gray-200 shadow-sm sm:grid-cols-4 dark:bg-gray-700">
        {overviewStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center bg-white px-4 py-8 text-center dark:bg-gray-800"
          >
            <span className="text-3xl font-bold tracking-tight text-accent">
              {stat.value}
            </span>
            <span className="mt-2 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </Container>
  )
}

function StationTracker() {
  return (
    <div className="bg-gray-50 py-20 dark:bg-gray-900">
      <Container>
        <div>
          <p className="section-label">
            Station by Station
          </p>
          <Subheading className="mt-2">Accessibility Tracker</Subheading>
          <Lead className="mt-4 max-w-2xl">
            Lift access, tactile paths, level boarding, and hearing loops across
            sampled SEQ stations.
          </Lead>
        </div>

        <div className="mt-10 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-300">
                  Station
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-300 sm:table-cell">
                  Line
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-300">
                  Accessibility
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-300 md:table-cell">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-gray-900">
              {stations.map((s) => (
                <tr key={s.name}>
                  <td className="px-4 py-3 text-sm font-medium text-heading">
                    {s.name}
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-muted sm:table-cell">
                    {s.line}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <StatusBadge value={s.lifts} label="Lifts" />
                      <StatusBadge value={s.tactile} label="Tactile" />
                      <StatusBadge value={s.levelBoarding} label="Level" />
                      <StatusBadge value={s.hearingLoop} label="Hearing" />
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-gray-400 dark:text-gray-500 md:table-cell">
                    {s.notes ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          Data is indicative and based on publicly available information. Stations are a representative sample, not the full network.
          Please contact TransLink for the latest accessibility information before travel.
        </p>
      </Container>
    </div>
  )
}

function KnownIssues() {
  return (
    <Container>
      <div>
        <p className="section-label">
          Progress &amp; Challenges
        </p>
        <Subheading className="mt-2">Known Accessibility Issues</Subheading>
        <Lead className="mt-4 max-w-2xl">
          What&apos;s being fixed, what still needs work, and where progress is
          being made.
        </Lead>
      </div>

      <figure className="mt-8 overflow-hidden rounded-lg">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/NGR_719_Disability_Upgrade.jpg/960px-NGR_719_Disability_Upgrade.jpg"
          alt="Interior of NGR train 719 after disability accessibility upgrade, showing new priority seats"
          loading="lazy"
          className="w-full object-cover"
        />
        <figcaption className="mt-2 text-center text-xs text-muted">
          Inside an NGR train after the disability accessibility retrofit — new
          priority seating and improved signage.{' '}
          <a
            href="https://commons.wikimedia.org/wiki/File:NGR_719_Disability_Upgrade.jpg"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikimedia Commons
          </a>{' '}
          · CC BY-SA 4.0
        </figcaption>
      </figure>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {knownIssues.map((issue) => (
          <div
            key={issue.title}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase ${
                  issue.severity === 'critical'
                    ? 'badge-danger'
                    : issue.severity === 'moderate'
                      ? 'badge-warning'
                      : 'badge-success'
                }`}
              >
                {issue.severity}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-heading">
              {issue.title}
            </h3>
            <p className="mt-2 text-sm/6 text-body">
              {issue.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  )
}

function WhatWeCampaignFor() {
  const demands = [
    'Time-bound delivery plans for full station accessibility upgrades',
    'Bus stop standards that include shade, shelter, and DDA-compliant design',
    'Safe pedestrian crossings included in stop access planning and upgrades',
    'Relocation of stops that cannot achieve practical DDA compliance in place',
    'Transport and land-use coordination in local activity centres',
    'Public reporting against annual accessibility upgrade and access targets',
  ]

  return (
    <div className="bg-gray-50 py-20 dark:bg-gray-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">
            Our Position
          </p>
          <Subheading className="mt-2">
            Accessibility Delivery Priorities
          </Subheading>
          <Lead className="mt-4">
            We assess progress by whether policy commitments are converted into
            measurable delivery on the ground.
          </Lead>
        </div>

        <ul className="mx-auto mt-12 max-w-2xl space-y-4">
          {demands.map((d, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-gray-800"
            >
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {d}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

function HighPriorityActions() {
  return (
    <Container>
      <div>
        <p className="section-label">From The Policy Platform</p>
        <Subheading className="mt-2">High Priority Accessibility Agenda</Subheading>
        <Lead className="mt-4 max-w-3xl">
          BTQ&apos;s accessibility priorities focus on closing the gap between
          policy intent and everyday passenger experience.
        </Lead>
      </div>

      <div className="mt-10 space-y-6">
        {highPriorityActions.map((action) => (
          <article
            key={action.title}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center gap-2">
              <span className="badge-danger inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase">
                High Priority
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-heading">{action.title}</h3>
            <p className="mt-2 text-sm/6 text-body">{action.summary}</p>
            <p className="mt-3 rounded-md bg-gray-50 px-3 py-2 text-sm text-body dark:bg-gray-800">
              <span className="font-semibold text-heading">Why it matters:</span>{' '}
              {action.whyItMatters}
            </p>
            <ul className="mt-4 space-y-2">
              {action.policyActions.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm/6 text-body">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Container>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AccessibilityPage() {
  return (
    <main className="overflow-hidden">
      <HeroBanner
        title="Accessibility"
        lead="A policy-led view of accessibility across Queensland's transport network: where barriers remain, what BTQ is prioritising, and how delivery should accelerate."
      />

      <div className="space-y-20 py-20 sm:space-y-28 sm:py-28">
        <Overview />
        <StationTracker />
        <KnownIssues />
        <HighPriorityActions />
        <WhatWeCampaignFor />
      </div>

      <Footer />
    </main>
  )
}
