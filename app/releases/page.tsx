import { createPageMetadata } from '@/app/layout'
import { Card } from '@/components/card'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'
import RSSParser from 'rss-parser'
import parse, * as parser from 'html-react-parser'
import DOMPurify from 'isomorphic-dompurify'

export const metadata: Metadata = createPageMetadata({
  title: 'Media Releases',
  description:
    'Stay informed with the latest official media releases from Better Transport Queensland—covering public, active, and sustainable transport updates fresh from the source!',
  slug: 'releases',
})

async function fetchPosts() {
  const parser = new RSSParser()
  const feed = await parser.parseURL(
    'https://forum.bettertransportqueensland.org/c/media/media-releases/11.rss',
  )
  return feed.items || []
}

async function Snippets() {
  const posts = await fetchPosts()
  posts.pop()
  return (
    <Container className="mb-16 mt-16">
      <Heading as="h1">Media Releases</Heading>
      <Lead className="mt-6 max-w-3xl">
        Stay up to date with our latest media releases.
      </Lead>
      <ul className="mt-3">
        {posts.map((post, i) => (
          <Card key={i} link={'/releases/' + (i + 1)}>
            <Lead>{post.title}</Lead>
            <div className="mb-2">
              @{post.creator} {new Date(post.pubDate || '').toLocaleString()}
            </div>
            <div>
                {parse(
                  DOMPurify.sanitize(
                  (post.content || '')
                    .replace(/<h1>[\s\S]*?<\/h1>/gi, '')
                    .replace(/<em>[\s\S]*?<\/em>/gi, '')
                    .replace(/alt=".*?"/gi, '')
                  ).match(/<div[^>]*data-wrap="summary"[^>]*>([\s\S]*?)<\/div>/i)?.[0] || '')}
            </div>
          </Card>
        ))}
      </ul>
    </Container>
  )
}

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <Container>
      <Navbar />
      </Container>
      <div className="flex-grow">
        <Snippets />
      </div>
      <Footer />
    </main>
  )
}
