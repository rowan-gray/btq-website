import { createPageMetadata } from '@/app/layout'
import { Card } from '@/components/card'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Looking to connect with Better Transport Queensland? Discover easy ways to reach out and share your ideas for public, active, and sustainable transport solutions in Queensland!',
  slug: 'contact',
})

function Header() {
  return (
    <Container className="mb-16 mt-16">
      <Heading as="h1">Contact us</Heading>
      <Lead className="mt-6 max-w-3xl">
        Get in touch with us to learn more about our mission and how you can
        help us improve transport throughout Queensland.
      </Lead>
      <section className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <Card>
          <h3 className="text-lg font-semibold">General Enquiries</h3>
          <p className="mt-4 text-sm text-gray-600">
            For any general enquiries or questions, please contact us at{' '}
            <a
              href="mailto:enquries@btq.org.au"
              className="text-pink-500 hover:underline"
            >
              enquiries@btq.org.au
            </a>
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Media Enquiries</h3>
          <p className="mt-4 text-sm text-gray-600">
            For any media enquiries or questions, please contact us at{' '}
            <a
              href="mailto:media@btq.org.au"
              className="text-pink-500 hover:underline"
            >
              media@btq.org.au
            </a>
          </p>
        </Card>
      </section>
    </Container>
  )
}

export default function Company() {
  return (
    <main className="overflow-hidden">
      <Container>
        <Navbar />
      </Container>
      <Header />
      <Footer />
    </main>
  )
}
