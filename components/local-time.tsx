'use client'

import { useHydration } from '@/hooks/useHydration'
import { Suspense } from 'react'

export function LocalTime({ date }: { date: Date | string | number }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={new Date(date).toISOString()}>
        {new Date(date).toLocaleTimeString()}
        {hydrated ? '' : ' (UTC)'}
      </time>
    </Suspense>
  )
}
