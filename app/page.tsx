import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Better Transport Queensland advocates for public and active transport as well as regional transport and freight rail.',
}

function Hero() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-indigo-800 selection:bg-pink-400 selection:text-indigo-800">
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="https://forum.bettertransportqueensland.org"
              className="flex items-center gap-1 rounded-full bg-indigo-300/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-indigo-500/35 transition duration-300 ease-out"
            >
              Our new forum is now available!
              <ChevronRightIcon className="size-4" />
            </Link>
          } 
          filled
        />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-4xl/[0.9] font-medium tracking-tight text-gray-200 sm:text-6xl/[0.8] md:text-7xl/[0.8]">
            Better Transport Queensland
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-200 sm:text-2xl/8">
            Advocates for public and active transport as well as regional transport and freight rail.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button variant='secondary' href="https://forum.bettertransportqueensland.org">Browse our Forum</Button>
            <Button variant='primary' href="/member">
              Become a member
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h1">Providing the public a voice on everything transportation!</Heading>
        <Lead className="mt-6 max-w-3xl">
          We’re on a mission to improve transport throughout Queensland. We advocate for public and active transport as well as regional transport and freight rail.
        </Lead>
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-lg">
            <h2 className="text-2xl font-medium tracking-tight">Who are we?</h2>
            <p className="mb-3 text-md/6 text-gray-600">
              Better Transport Queensland is a not-for-profit advocacy group consisting of
              like-minded members who want to make a positive difference for our future.
            </p>
            <h2 className="text-2xl font-medium tracking-tight">Our goals</h2>
            <p className="mb-3 text-md/6 text-gray-600">
              At Better Transport Queensland, we believe that a better future for Queenslanders
              relies on improved public, active, and freight transport.
            </p>
            <h2 className="text-2xl font-medium tracking-tight">Our mission</h2>
            <p className="mb-3 text-md/6 text-gray-600">
              To achieve our goal, we advocate for better transport in Queensland through the prioritisation
              of transport investment in active/public transport and regional/freight rail.

              Improved public and active transport are essential for moving high volumes of
              people in our quickly expanding state. It is also needed to ensure that everyone has
              equal opportunities for employment and socialising, regardless of whether one can afford
              a personal vehicle or not. We believe that no one should be forced to buy a car to get to where they need to go!

              Reducing heavy vehicle traffic on our major roads is desperately needed to improve our environmental impact.
              Moving freight by heavy rail is drastically more efficient than moving freight by single b-hauls.
              That is why we believe that the Queensland Government should be investing in and prioritising important
              heavy-rail corridors for freight, such as the North Coast Line.
            </p>
          </div>
          <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                <Image
                  alt=""
                  src="/group/1.jpg"
                  width={500}
                  height={500}
                  className="block size-full object-cover"
                />
              </div>
              <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
                <Image
                  alt=""
                  src="/group/2.jpg"
                  width={500}
                  height={500}
                  className="block size-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                <Image
                  alt=""
                  src="/group/3.jpg"
                  width={500}
                  height={500}
                  className="block size-full object-cover"
                />
              </div>
              <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
                <Image
                  alt=""
                  src="/group/4.jpg"
                  width={500}
                  height={500}
                  className="block size-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <div className="py-32">
          <FeatureSection />
        </div>
      </main>
      
      <Footer filled/>
    </div>
  )
}
