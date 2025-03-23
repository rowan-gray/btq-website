import { createPageMetadata, fetchRSSFeedWithCache } from '@/app/layout'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { NotFound } from '@/components/not-found-message'
import { Heading, Lead } from '@/components/text'
import { ArrowLongLeftIcon } from '@heroicons/react/16/solid'
import parse from 'html-react-parser'
import DOMPurify from 'isomorphic-dompurify'
import type { Metadata } from 'next'

const getPost = async (
  topicId: string,
  number: string,
): Promise<any | undefined> => {
  const url = `${topicId}/${number}`
  const feed = await fetchRSSFeedWithCache(
    url,
    `https://forum.bettertransportqueensland.org/t/${url}.rss`,
  )
  return (feed?.items ?? [])[0]
}

export const generateMetadata = async ({
  params: { topicId, number },
}: {
  params: { topicId: string; number: string }
}): Promise<Metadata> => {
  const post = await getPost(topicId, number)

  return createPageMetadata({
    title: post?.title ?? 'Media Release Not Found',
    description:
      'Stay informed with the latest official media releases from Better Transport Queensland—covering public, active, and sustainable transport updates fresh from the source!',
    slug: `releases/${topicId}/${number}`,
  })
}

export default async function Page({
  params: { topicId, number },
}: {
  params: { topicId: string; number: string }
}) {
  const post = await getPost(topicId, number)

  return (
    <main className="overflow-hidden">
      <Container>
        <Navbar />
      </Container>
      {post === undefined ? (
        <NotFound />
      ) : (
        <>
          <Container className="mb-16 mt-16">
            <Heading as="h1">{post.title}</Heading>
            <Lead>
              {post.creator && (
                <span className="mb-2">
                  @{post.creator}{' '}
                  {new Date(post.pubDate || '').toLocaleString()}
                </span>
              )}
            </Lead>
            <a className="my-4 flex" href="/releases">
              <ArrowLongLeftIcon className="size-5 text-pink-400" /> Go back to
              Media Releases
            </a>
            <div>{parse(DOMPurify.sanitize(post.content || ''))}</div>
          </Container>
        </>
      )}
      <Footer />
    </main>
  )
}
