import { createPageMetadata } from '@/app/layout'
import { Card } from '@/components/card'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'
import RSSParser from 'rss-parser'

export const metadata: Metadata = createPageMetadata({
  title: 'Blog',
  description:
    'Explore the Better Transport Queensland blog, where engaged community members share their opinions and insights on public, active, and sustainable transport (not official policy). Stay informed and join the conversation!',
  slug: 'blog',
})

async function fetchPosts() {
  const parser = new RSSParser()
  const feed = await parser.parseURL(
    'https://forum.bettertransportqueensland.org/c/media/blog/57.rss',
  )
  return feed.items || []
}

async function Snippets() {
  const posts = await fetchPosts()
  return (
    <Container className="mb-16 mt-16">
      <Heading as="h1">Blog</Heading>
      <Lead className="mt-6 max-w-3xl">
        See thoughts from the BTQ Community.
      </Lead>
      <ul className="mt-3">
        {posts.map((post, i) => (
          <Card key={i} link={'/blog/' + (i + 1)}>
            <Lead>{post.title}</Lead>
            <div className="mb-2">
              @{post.creator} {new Date(post.pubDate || '').toLocaleString()}
            </div>
            <div>{post.contentSnippet?.split('\n').slice(0, -2).join(' ')}</div>
          </Card>
        ))}
      </ul>
    </Container>
  )
}

export default async function Page() {
  return (
    <main className="overflow-hidden">
      <Container>
        <Navbar />
      </Container>
      <Snippets />
      <Footer />
    </main>
  )
}
