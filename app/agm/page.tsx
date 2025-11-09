import { createPageMetadata } from '@/app/layout'
import { Container } from '@/components/container'
import EmbeddedTopic from '@/components/embedded-topic'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import type { Metadata } from 'next'

type Params = Promise<{ topicTitle: string; topicId: string }>
const description =
  "Learn about Better Transport Queensland's 2025 Annual general Meeting."
const topicTitle = 'annual-general-meeting-2025'
const categoryTitle = 'announcements'
const topicId = '1300'

export const metadata: Metadata = createPageMetadata({
  title: topicTitle,
  description: description,
  slug: 'blog',
})

export default async function Page() {
  return (
    <main className="overflow-hidden">
      <Container>
        <Navbar />
      </Container>
      <Container className="mb-16">
        <EmbeddedTopic
          topicTitle={topicTitle}
          topicId={topicId}
          categoryTitle={categoryTitle}
        />
      </Container>
      <Footer />
    </main>
  )
}
