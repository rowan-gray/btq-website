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
    'Radiant helps you sell more by revealing sensitive information about your customers.',
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
            <h2 className="text-2xl font-medium tracking-tight">Our mission</h2>
            <p className="mt-6 text-sm/6 text-gray-600">
              Better Transport Queensland Inc. is a non-for-profit organisation 
              focused on advocating for public and active transport. We are a very 
              active and diverse community of people who are passionate about improving 
              transport throughout Queensland.
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
