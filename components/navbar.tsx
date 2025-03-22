'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars2Icon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { Link } from './link'
import { Logo } from './logo'

const links = [
  { href: 'https://forum.bettertransportqueensland.org', label: 'Forum' },
  { href: '/member', label: 'Membership' },
  { href: '/releases', label: 'Media Releases' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

function DesktopNav({ filled }: { filled: true | undefined }) {
  return (
    <nav className="relative my-auto hidden lg:flex">
      {links.map(({ href, label }) => (
        <Link
          href={href}
          className={`flex h-[2rem] items-center px-4 text-base font-medium transition duration-200 ease-in-out ${filled ? 'bg-indigo-500 text-white data-[hover]:bg-indigo-600' : 'bg-indigo-300/35 text-black data-[hover]:bg-indigo-500/35'} mr-1 rounded-xl`}
          key={href}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

function MobileNavButton({ filled }: { filled: true | undefined }) {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg data-[hover]:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className={`size-6 ${!filled ? 'text-black' : ''}`} />
    </DisclosureButton>
  )
}

function MobileNav({ filled }: { filled: true | undefined }) {
  return (
    <DisclosurePanel
      className={`lg:hidden ${!filled ? 'text-black' : 'text-gray-200'}`}
    >
      <div className="flex flex-col gap-6 py-4">
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
            key={href}
          >
            <Link href={href} className="text-base font-medium">
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div
          className={`absolute inset-x-0 top-0 border-t ${!filled ? 'border-black/5' : 'border-gray-200/5'} `}
        />
        <div
          className={`absolute inset-x-0 top-2 border-t ${!filled ? 'border-black/5' : 'border-gray-200/5'}`}
        />
      </div>
    </DisclosurePanel>
  )
}

export function Navbar({
  banner,
  filled,
}: {
  banner?: React.ReactNode
  filled?: true
}) {
  return (
    <Disclosure as="header" className="mt-2 pt-12 sm:pt-16 dark:text-white">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center py-3">
            <Link href="/" title="Home">
              <Logo className="h-9 text-white" filled={filled} />
            </Link>
          </div>
          {banner && (
            <div className="relative hidden items-center py-3 lg:flex">
              {banner}
            </div>
          )}
        </div>
        <DesktopNav filled={filled} />
        <MobileNavButton filled={filled} />
      </header>
      <MobileNav filled={filled} />
    </Disclosure>
  )
}
