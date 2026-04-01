'use client'

import { useHydration } from '@/hooks/useHydration'
import { Suspense } from 'react'

export function LocalTime({
  date,
  displayTz = 'UTC',
}: {
  date: Date | string | number
  displayTz?: string
}) {
  const hydrated = useHydration()
  const d = new Date(date)

  // Format the date in the requested timezone (default UTC)
  const formatter = new Intl.DateTimeFormat(undefined, {
    timeZone: displayTz,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  const formatted = formatter.format(d)

  // Extract the timezone abbreviation for the *display* timezone
  const tzAbbrev = new Intl.DateTimeFormat(undefined, {
    timeZone: displayTz,
    timeZoneName: 'short',
  })
    .formatToParts(d)
    .find((p) => p.type === 'timeZoneName')?.value

  // Determine the environment's current timezone (server or client)
  const envTz = Intl.DateTimeFormat().resolvedOptions().timeZone

  const showTz = displayTz && tzAbbrev && displayTz !== envTz

  return (
    <Suspense key={hydrated ? 'local' : 'server'}>
      <time dateTime={d.toISOString()}>
        {formatted} {showTz ? `(${tzAbbrev})` : ''}
      </time>
    </Suspense>
  )
}
