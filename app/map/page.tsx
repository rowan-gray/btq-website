import { createPageMetadata } from '@/app/layout'
import { Container } from '@/components/core/container'
import { Heading, Lead } from '@/components/core/text'
import { Footer } from '@/components/footer/footer'
import { Navbar } from '@/components/navbar/navbar'
import { TransportMap } from '@/components/transport-map'
import type { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Transport Map',
  description:
    "Explore current Queensland public transport routes — rail, bus, ferry, regional passenger rail, and freight corridors — alongside Better Transport Queensland's proposed improvements.",
  slug: 'map',
})

export default function MapPage() {
  return (
    <div className="overflow-hidden">
      <Container>
        <Navbar />
      </Container>
      <Container className="mt-16 mb-10">
        <Heading as="h1">Queensland Transport Map</Heading>
        <Lead className="mt-6 max-w-3xl">
          Explore South East Queensland&apos;s public transport network
          alongside our proposed improvements. Toggle layers to compare suburban
          rail, bus routes, ferries, regional passenger rail, and freight
          corridors with what we believe would create a better connected,
          more&nbsp;sustainable transport future.
        </Lead>
        <p className="mt-4 text-sm text-gray-500">
          Click on any route for more details. Dashed lines indicate proposed
          improvements.
        </p>
      </Container>
      <div className="mx-2 mb-16 h-[70vh] overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
        <TransportMap />
      </div>
      <Footer />
    </div>
  )
}
