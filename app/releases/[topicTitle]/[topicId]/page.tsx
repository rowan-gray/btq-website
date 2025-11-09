import { Container } from '@/components/core/container'
import { Footer } from '@/components/footer/footer'
import { Navbar } from '@/components/navbar/navbar'
import EmbeddedTopic, {
  generateMetadataFromTopic,
} from '@/components/topics/embedded-topic'
import type { Metadata } from 'next'

type Params = Promise<{ topicTitle: string; topicId: string }>
const description =
  'Stay informed with the latest official media releases from Better Transport Queensland—covering public, active, and sustainable transport updates fresh from the source!'
const categoryTitle = 'Media Releases'

export const generateMetadata = async ({
  params: Params,
}: {
  params: Params
}): Promise<Metadata> => {
  const { topicTitle, topicId } = await Params

  return generateMetadataFromTopic(
    categoryTitle,
    topicTitle,
    topicId,
    'releases',
    description,
  )
}

export default async function Page({ params: Params }: { params: Params }) {
  const { topicTitle, topicId } = await Params

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
