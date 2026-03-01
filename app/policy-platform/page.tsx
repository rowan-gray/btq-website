import { createPageMetadata } from '@/app/layout'
import { Button } from '@/components/core/button'
import { Container } from '@/components/core/container'
import { Footer } from '@/components/footer/footer'
import { HeroBanner } from '@/components/hero-banner'
import type { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Policy Platform',
  description:
    "The Policy Platform sets out Better Transport Queensland's (BTQ's) strategic vision for a safer, more accessible, and better-integrated transport system across the state. It outlines key priorities for public, active, and freight transport in Queensland.",
  slug: 'policy-platform',
})

const policyDocumentPdf =
  'https://forum.bettertransportqueensland.org/uploads/short-url/gq4IxO4BzgDkkXwibIuwLt6Y8aU.pdf'

const pillars = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: 'Public Transport',
    description:
      'Frequent, reliable, and affordable public transport connecting all Queenslanders — from suburban rail to regional bus networks.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: 'Active Transport',
    description:
      'Safe, connected cycling and walking infrastructure that makes car-free travel a genuine choice for everyday journeys.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: 'Freight & Logistics',
    description:
      'Shifting freight onto rail and improving supply chain efficiency to reduce road congestion and emissions.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: 'Accessibility',
    description:
      'A transport system designed for everyone — meeting the needs of people with disabilities, seniors, and those without access to a car.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    title: 'Sustainability',
    description:
      'Decarbonising transport through electrification, mode shift, and land-use integration to meet Queensland\'s climate goals.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    title: 'Urban Planning',
    description:
      'Transit-oriented development and smarter land-use that reduces sprawl and puts homes, jobs, and services within reach of public transport.',
  },
]

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <HeroBanner
        title="Policy Platform"
        lead="Our strategic vision for a safer, more accessible, and better-integrated transport system across Queensland — grounded in evidence and shaped by community input."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            href={policyDocumentPdf}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download the 2025 Policy Platform
          </Button>
          <span className="text-sm text-indigo-200/70">PDF · 2.4 MB</span>
        </div>
      </HeroBanner>

      <div className="flex-grow">
        {/* Key pillars */}
        <Container className="mt-16 mb-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Key Policy Pillars
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-body">
              The platform is built around six interconnected priorities that
              together deliver a world-class transport system for Queensland.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group rounded-lg border border-gray-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-800"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-400 dark:group-hover:bg-indigo-900/70">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-semibold text-heading">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Container>

        {/* PDF embed section */}
        <div className="border-t border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
          <Container className="py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-heading">
                Read the Full Document
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-body">
                Browse the complete policy platform below, or download the PDF
                to read offline.
              </p>
            </div>

            <div className="mt-10 hidden justify-center lg:flex">
              <div className="relative aspect-[1/1.414] w-full max-w-[840px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800">
                <iframe
                  src={policyDocumentPdf}
                  className="absolute inset-0 h-full w-full border-none"
                  title="BTQ Policy Platform PDF"
                />
              </div>
            </div>

            {/* Mobile fallback */}
            <div className="mt-8 text-center lg:hidden">
              <p className="text-sm text-muted">
                The embedded PDF viewer is available on larger screens.
              </p>
              <Button
                href={policyDocumentPdf}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                Open PDF in New Tab
              </Button>
            </div>
          </Container>
        </div>

        {/* CTA band + footer in one gradient */}
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900">
        <Container className="py-16 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Help shape the next edition
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-indigo-200">
            Our policy platform is a living document. Join BTQ to contribute
            your expertise, local knowledge, and ideas to the next revision.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/member" variant="primary">
              Become a Member
            </Button>
            <Button href="/contact" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </Container>
        <Footer bare />
      </div>
    </main>
  )
}
