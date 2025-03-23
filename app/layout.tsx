import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import NodeCache from 'node-cache'
import RSSParser from 'rss-parser'

export const cache = new NodeCache({ stdTTL: 900, checkperiod: 120 }) // 900 seconds = 15 minutes

export const fetchRSSFeedWithCache = async (
  cacheKey: string,
  url: string,
): Promise<any | null> => {
  if (cache.has(cacheKey)) {
    console.log('Cache hit') // Debug: Cache was used
    return cache.get(cacheKey)
  } else {
    console.log('Cache miss') // Debug: Cache wasn't used

    const parser = new RSSParser()

    try {
      const response = await parser.parseURL(url)
      cache.set(cacheKey, response) // Cache the feed for 15 minutes
      return response
    } catch (error) {
      console.error('Failed to fetch RSS feed:', error) // Log the error for debugging
      return null // Gracefully return null in case of an error
    }
  }
}

export const metadata: Metadata = {
  title: {
    template: '%s - Better Transport Queensland',
    default: 'Better Transport Queensland',
  },
  openGraph: {
    title: {
      template: '%s - Better Transport Queensland',
      default: 'Better Transport Queensland',
    },
  },
  twitter: {
    title: {
      template: '%s - Better Transport Queensland',
      default: 'Better Transport Queensland',
    },
  },
  // Robots metadata
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
}

export const createPageMetadata = (params: {
  title: string | undefined
  description: string
  slug: string | undefined
}): Metadata => {
  return {
    title: params.title ?? 'Better Transport Queensland',
    description: params.description,
    alternates: {
      canonical: `https://bettertransportqueensland.org/${params.slug}`,
    },
    openGraph: {
      title: params.title ?? 'Better Transport Queensland',
      description: params.description,
      siteName: 'Better Transport Queensland',
      url: `https://bettertransportqueensland.org${params.slug ? `/${params.slug}` : ''}`,
      images: [
        {
          url: 'https://bettertransportqueensland.org/banner.png',
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
      images: ['https://bettertransportqueensland.org/banner.png'],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#f1f1f1] font-sans text-gray-950 antialiased">
        {children}
      </body>
    </html>
  )
}
