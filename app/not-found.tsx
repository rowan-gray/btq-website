import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: {
        template: '%s - Better Transport Queensland',
        default: 'Better Transport Queensland',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
            </head>
            <body className="font-sans text-gray-950 antialiased">
                <div className="overflow-hidden">
                    <Container>
                        <Navbar />
                    </Container>
                    <main>
                        <div className="py-32">
                            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                                <div className="text-center">
                                    <p className="text-base font-semibold text-indigo-800">404</p>
                                    <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                                        Page not found
                                    </h1>
                                    <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                                        Sorry, we couldn’t find the page you’re looking for.
                                    </p>
                                    <div className="mt-10 flex items-center justify-center gap-x-6">
                                        <Button href="#" variant="outline">
                                            Go back home
                                        </Button>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </main>

                    <Footer />
                </div>
            </body>
        </html>
    )
}
