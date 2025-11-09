import { useMemo } from 'react'
import { Button } from '@/components/core/button'
import { Container } from '@/components/core/container'
import { Heading, Lead } from '@/components/core/text'

function formatWithOrdinal(date: Date) {
  const day = date.getDate()

  // Determine ordinal suffix
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th'

  const month = date.toLocaleDateString('en-AU', { month: 'long' })

  return `${day}${suffix} of ${month}`
}

export type EventPromoProps = {
  /** When the event expires (hidden after this date) */
  date: Date
  /** Title of the event */
  title: string
  /** Optional description text */
  description?: string
  /** Optional location */
  location?: string
  /** Link to learn more */
  href: string
}

export function EventPromo({
  date,
  title,
  description,
  location,
  href,
}: EventPromoProps) {
  const expired = useMemo(() => Date.now() > date.getTime(), [date])

  if (expired) {
    return null
  }

  const formattedDate = formatWithOrdinal(date)

  return (
    <div>
      <Container>
        <Heading as="h1">
          {title} – {formattedDate}
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          {description
            ? description
            : `Join us for ${title} on the ${formattedDate}${
                location ? ` at ${location}` : ''
              }!`}
        </Lead>
        <Button className="mt-6" variant="primary" href={href}>
          Learn more here
        </Button>
      </Container>
    </div>
  )
}
