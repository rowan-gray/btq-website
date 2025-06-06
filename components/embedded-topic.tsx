import { createPageMetadata } from '@/app/layout'
import { Button } from '@/components/button'
import { LocalTime } from '@/components/local-time'
import { Heading, Lead } from '@/components/text'
import { fetchPostFromCategory } from '@/helpers/discourseTopicHelper'
import { ArrowLongLeftIcon } from '@heroicons/react/16/solid'
import parse, * as parser from 'html-react-parser'
import DOMPurify from 'isomorphic-dompurify'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadataFromTopic(
  categoryTitle: string,
  topicTitle: string,
  topicId: string,
  slug: string,
  description: string,
): Promise<Metadata> {
  const post = await fetchPostFromCategory(topicId, categoryTitle)

  return createPageMetadata({
    title: post?.title ?? 'Post Not Found',
    description: description,
    slug: `${slug}/${topicTitle}/${topicId}`,
  })
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
            node.attribs.class += 'w-full object-contain'

            if (node.attribs?.alt) {
              const aspectRatio =
                parseFloat(node.attribs.width) / parseFloat(node.attribs.height)
              const maxWidthClass = aspectRatio < 3 / 2 ? 'w-fit' : 'w-full'

              return (
                <div className="mx-auto mt-4 w-full">
                  <div
                    className={`${maxWidthClass} overflow-hidden rounded-md shadow-md`}
                  >
                    {parser.domToReact([node])}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {node.attribs.alt}
                  </p>
                </div>
              )
            }

            break
          case 'hr':
            node.attribs.class ||= ''
            node.attribs.class += ' my-6 border-t border-gray-300'
            break
          case 'a':
            if (
              node.children &&
              node.children.some(
                (child) =>
                  child instanceof parser.Element && child.name === 'img',
              )
            ) {
              delete node.attribs.href
            } else {
              node.attribs.class ||= ''
              node.attribs.class +=
                ' text-blue-500 underline hover:text-blue-600'
            }
            break
          case 'ul':
            node.attribs.class ||= ''
            node.attribs.class += ' mb-4 list-disc pl-8'
            break
          case 'ol':
            node.attribs.class ||= ''
            node.attribs.class += ' mb-4 list-decimal pl-8'
            break
          case 'li':
            node.attribs.class ||= ''
            node.attribs.class += ' mb-2'
            break
        }
      }
      return node
    },
  })
}

export default async function EmbeddedTopic(params: {
  topicTitle: string
  topicId: string
  categoryTitle: string
  showAuthor?: boolean
  linkToTopic?: boolean
}) {
  const post = await fetchPostFromCategory(params.topicId, params.categoryTitle)

  // Ensure proper conditional rendering
  if (!post) {
    notFound()
  }

  const cleanHtml = DOMPurify.sanitize(post.content || '').replaceAll(
    /<p.*?><a.*?>Read full topic<\/a><\/p>/g,
    '', // Strip the read full topic link so we can add our own CTA
  )

  return (
    <section className="mx-auto max-w-256">
      <Heading as="h1">{post.title}</Heading>
      <Lead>
        {post.creator && (
          <span className="mb-2">
            {params.showAuthor ? <>@{post.creator} </> : null}
            {<LocalTime date={new Date(post.pubDate || '')} />}
          </span>
        )}
      </Lead>
      <Link className="my-4 flex" href="/releases">
        <ArrowLongLeftIcon className="size-5 text-pink-400" /> Go back to Media
        Releases
      </Link>
      <div className="sm:px-8 lg:px-12">{renderWithTailwind(cleanHtml)}</div>
      <div className="mt-8 rounded-4xl bg-indigo-800 p-12 text-white selection:bg-pink-400 selection:text-indigo-800">
        <Heading as="h2" dark>
          {params.linkToTopic
            ? 'See what others are saying about this post!'
            : 'Join the conversation on the BTQ Forum!'}
        </Heading>
        <Lead className="mt-6 max-w-3xl" data-dark="true">
          Stay up-to-date with the latest insights directly from the Better
          Transport Queensland (BTQ) Forum. Connect with engaged community
          members, share your thoughts, and be part of the conversation—everyone
          is welcome!
        </Lead>
        <Button
          className="mt-6 w-full sm:w-auto"
          variant="primary"
          href={
            params.linkToTopic
              ? post.link
              : 'https://forum.bettertransportqueensland.org'
          }
        >
          {params.linkToTopic ? 'Read the comments' : 'Join the conversation'}
        </Button>
      </div>
    </section>
  )
}
