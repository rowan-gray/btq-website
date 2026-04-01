import { AlertStripServer } from '@/components/alert-strip-server'
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'

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

// Configure the Fira Sans font
const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Include desired font weights
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="scrollbar-gutter-stable"
      suppressHydrationWarning
    >
      <body
        className={`${firaSans.className} min-h-screen bg-white text-gray-950 antialiased transition-colors duration-200 dark:bg-gray-950 dark:text-gray-100`}
      >
        <ThemeProvider>
          <AlertStripServer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
