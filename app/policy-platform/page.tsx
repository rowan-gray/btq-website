import { createPageMetadata } from '@/app/layout'
import { Button } from '@/components/core/button'
import { Container } from '@/components/core/container'
import { Heading, Lead } from '@/components/core/text'
import { Footer } from '@/components/footer/footer'
import { Navbar } from '@/components/navbar/navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Policy Platform',
  description:
    "The Policy Platform sets out Better Transport Queensland's (BTQ's) strategic vision for a safer, more accessible, and better-integrated transport system across the state. It outlines key priorities for public, active, and freight transport in Queensland.",
  slug: 'policy-platform',
})

const policyDocumentPdf =
  'https://forum.bettertransportqueensland.org/uploads/short-url/gq4IxO4BzgDkkXwibIuwLt6Y8aU.pdf'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <Container>
        <Navbar />
      </Container>

      <div className="flex-grow">
        <Container className="mb-24">
          <Heading as="h1">Policy Platform</Heading>

          <Lead className="mt-6 max-w-3xl">
            The Policy Platform sets out Better Transport Queensland&apos;s
            strategic vision for a safer, more accessible, and better-integrated
            transport system across the state. It outlines key priorities for
            public, active, and freight transport in Queensland. The document is
            grounded in evidence and shaped by community input. It is designed
            to guide BTQ&apos;s advocacy, inform decision-makers, and empower
            members to champion change in their local areas.
          </Lead>

          <div className="mt-8 flex flex-col items-start gap-4">
            <Button
              href={policyDocumentPdf}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download the 2025 Policy Platform
            </Button>
          </div>

          <hr className="my-12 hidden border-t border-gray-300 lg:block" />

          <div className="mt-12 hidden justify-center lg:flex">
            <div className="relative aspect-[1/1.414] w-full max-w-[840px] overflow-hidden rounded-lg border border-gray-300 shadow-md">
              <iframe
                src={policyDocumentPdf}
                className="absolute inset-0 h-full w-full border-none"
                title="BTQ Policy Platform PDF"
              />
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </main>
  )
}
