import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Committee } from '@/components/committee'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'
import { Card } from '@/components/card'

export const metadata: Metadata = {
    title: 'Contact',
    description:
        "Want to reach out to us? Here's how you can get in touch with Better Transport Queensland.",
}

function Header() {
    return (
      <Container className="mt-16 mb-16">
        <Heading as="h1">Contact us</Heading>
        <Lead className="mt-6 max-w-3xl">
          Get in touch with us to learn more about our mission and how you can help us improve transport throughout Queensland.
        </Lead>
        <section className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <Card>
            <h3 className="text-lg font-semibold">General Enquiries</h3>
            <p className="mt-4 text-sm text-gray-600">
              For any general enquiries or questions, please contact us at <a href="mailto:enquries@bettertransportqueensland.org" className="text-pink-500 hover:underline">enquiries@bettertransportqueensland.org</a>
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">Media Enquiries</h3>
            <p className="mt-4 text-sm text-gray-600">
              For any media enquiries or questions, please contact us at <a href="mailto:media@bettertransportqueensland.org" className="text-pink-500 hover:underline">media@bettertransportqueensland.org</a>
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
