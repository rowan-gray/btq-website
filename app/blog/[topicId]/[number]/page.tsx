import { Container } from '@/components/container'
import EmbeddedTopic, {
  generateMetadataFromTopic,
} from '@/components/embedded-topic'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import type { Metadata } from 'next'

type Params = Promise<{ topicId: string; number: string }>
const description =
  'Explore diverse perspectives from passionate community members on the Better Transport Queensland blog. Dive into personal opinions, creative ideas, and vibrant discussions about public, active, and sustainable transport—directly from the voices that care the most!'

export const generateMetadata = async ({
  params: Params,
}: {
  params: Params
}): Promise<Metadata> => {
  const { topicId, number } = await Params

  return generateMetadataFromTopic(topicId, number, 'blog', description)
}

export default async function Page({ params: Params }: { params: Params }) {
  const { topicId, number } = await Params

  return (
    <main className="overflow-hidden">
      <Container>
        <Navbar />
      </Container>
      <Container className="mb-16 mt-16">
        <EmbeddedTopic
          topicId={topicId}
          number={number}
          linkToTopic
          showAuthor
        />
      </Container>
      <Footer />
    </main>
  )
}
