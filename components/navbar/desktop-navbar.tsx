'use client'

import { NavItems, isNavGroup } from '@/data/nav-links'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function DropdownMenu({
  label,
  links,
  filled,
}: {
  label: string
  links: { href: string; label: string }[]
  filled: true | undefined
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex h-[2rem] items-center gap-1 rounded-lg px-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 ease-in-out ${filled ? 'text-indigo-100 hover:bg-white/15 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'}`}
      >
        {label}
        <ChevronDownIcon
          className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          className="absolute right-0 z-50 mt-2 min-w-[12rem] overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
        >
          {links.map(({ href, label: linkLabel }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {linkLabel}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function DesktopNavbar({ filled }: { filled: true | undefined }) {
  return (
    <nav className="relative my-auto hidden items-center gap-1 lg:flex">
      {NavItems.map((item) =>
        isNavGroup(item) ? (
          <DropdownMenu
            key={item.label}
            label={item.label}
            links={item.links}
            filled={filled}
          />
        ) : (
          <Link
            href={item.href}
            className={`flex h-[2rem] items-center rounded-lg px-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 ease-in-out ${filled ? 'text-indigo-100 hover:bg-white/15 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'}`}
            key={item.href}
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  )
}
