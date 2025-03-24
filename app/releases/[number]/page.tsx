import { createPageMetadata } from '@/app/layout'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import { ArrowLongLeftIcon } from '@heroicons/react/16/solid'
import DOMPurify from 'isomorphic-dompurify'
import type { Metadata } from 'next'
import RSSParser from 'rss-parser'
import parse, * as parser from 'html-react-parser'

export const generateMetadata = ({
  params,
}: {
  params: { number: number }
}): Metadata => {
  return createPageMetadata({
    title: `Media Release ${params.number}`,
    description:
      'Stay informed with the latest official media releases from Better Transport Queensland—covering public, active, and sustainable transport updates fresh from the source!',
    slug: `releases/${params.number.toString()}`,
  })
}

export async function generateStaticParams() {
  const parser = new RSSParser()
  const feed = await parser.parseURL(
    'https://forum.bettertransportqueensland.org/c/media/media-releases/11.rss',
  )
  const items = feed.items || []
  return items.map((_, i) => ({ number: (i + 1).toString() }))
}

function renderWithTailwind(html: string) {
  return parse(html, {
    replace: (node: parser.DOMNode) => {
      if (node instanceof parser.Element) {
        switch (node.name) {
          case 'h1':
            node.attribs.class ||= ''
            node.attribs.class += ' mb-2 text-3xl font-bold'
            break
          case 'h2':
            node.attribs.class ||= ''
            node.attribs.class += ' mb-2 text-2xl font-bold'
            break
          case 'h3':
            node.attribs.class ||= ''
            node.attribs.class += ' mb-2 text-xl font-bold'
            break
          case 'p':
            node.attribs.class ||= ''
            node.attribs.class += ' mb-4'
            break
          case 'img':
            node.attribs.class ||= ''
            node.attribs.class += ' my-4 rounded-md shadow-md'
            break
          case 'hr':
            node.attribs.class ||= ''
            node.attribs.class += ' my-6 border-t border-gray-300'
            break
          case 'a':
            node.attribs.class ||= ''
            node.attribs.class +=
              ' text-blue-500 underline hover:text-blue-600'
            break
        }
      }
      return node
    },
  })
}

export default async function Page({
  params: { number },
}: {
  params: { number: string }
}) {
  const parser = new RSSParser()
  const feed = await parser.parseURL(
    'https://forum.bettertransportqueensland.org/c/media/media-releases/11.rss',
  )
  const items = feed.items || []
  const post = items[Number(number) - 1]
  const cleanHtml = DOMPurify.sanitize(post.content || '')
  return (
    <main className="overflow-hidden">
      <Container>
        <Navbar />
      </Container>
      <Container className="mb-16 mt-16">
        <Heading as="h1">{post.title}</Heading>
        <Lead>
          {post.creator && (
            <span className="mb-2">
              @{post.creator} {new Date(post.pubDate || '').toLocaleString()}
            </span>
          )}
        </Lead>
        <a className="my-4 flex" href="/releases">
          <ArrowLongLeftIcon className="size-5 text-pink-400" /> Go back to
          Media Releases
        </a>
        <div>{renderWithTailwind(cleanHtml)}</div>
      </Container>
      <Footer />
    </main>
  )
}
