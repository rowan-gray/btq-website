import type { Metadata } from 'next'

export const createPageMetadata = (params: {
  title: string | undefined
  description: string
  slug: string | undefined
}): Metadata => {
  return {
    title: params.title ?? 'Better Transport Queensland',
    description: params.description,
    alternates: {
      canonical: `https://www.bettertransportqueensland.org${params.slug ? `/${params.slug}` : ''}`,
    },
    openGraph: {
      title: params.title ?? 'Better Transport Queensland',
      description: params.description,
      siteName: 'Better Transport Queensland',
      url: `https://www.bettertransportqueensland.org${params.slug ? `/${params.slug}` : ''}`,
      images: [
        {
          url: 'https://www.bettertransportqueensland.org/banner.png',
          width: 1200,
          height: 630,
          alt: 'Better Transport Queensland Banner',
        },
      ],
      locale: 'en_AU',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: params.title ?? 'Better Transport Queensland',
      description: params.description,
      images: ['https://www.bettertransportqueensland.org/banner.png'],
    },
  }
}
