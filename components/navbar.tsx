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
import { Button } from './button'

const links = [
  { href: 'https://forum.bettertransportqueensland.org', label: 'Forum' },
  { href: '/member', label: 'Membership' },
  { href: '/contact', label: 'Contact' },
]

function DesktopNav({filled}: {filled: true | undefined}) {
  return (
    <nav className="relative hidden lg:flex my-auto ">
      {links.map(({ href, label }) => (
        <Link
          href={href}
          className={`flex items-center h-[2rem] px-4 text-base font-medium ${filled ? "text-gray-200 bg-indigo-300/35 data-[hover]:bg-indigo-500/35" : "text-black bg-indigo-300/35 data-[hover]:bg-indigo-500/35 "} rounded-xl mr-1`}
          key={href}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg data-[hover]:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  )
}

function MobileNav() {
  return (
    <DisclosurePanel className="lg:hidden">
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
            <Link href={href} className="text-base font-medium text-gray-200">
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-black/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5" />
      </div>
    </DisclosurePanel>
  )
}

export function Navbar({ banner, filled }: { banner?: React.ReactNode, filled?: true }) {
  return (
    <Disclosure as="header" className="pt-12 sm:pt-16 dark:text-white">
      <header className="flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <div className="flex items-center py-3">
            <Link href="/" title="Home">
              <Logo className="h-9 text-white" />
            </Link>
          </div>
          {banner && (
            <div className="relative hidden items-center py-3 lg:flex">
              {banner}
            </div>
          )}
        </div>
        <DesktopNav filled={filled}/>
        <MobileNavButton />
      </header>
      <MobileNav />
    </Disclosure>
  )
}
