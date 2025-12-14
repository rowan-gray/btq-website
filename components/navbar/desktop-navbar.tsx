import Link from 'next/link'
import { NavLinks } from '@/data/nav-links'

export function DesktopNavbar({ filled }: { filled: true | undefined }) {
  return (
    <nav className="relative my-auto hidden lg:flex">
      {NavLinks.map(({ href, label }) => (
        <Link
          href={href}
          className={`flex h-[2rem] items-center px-4 text-base font-medium whitespace-nowrap transition duration-200 ease-in-out ${filled ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-indigo-300/35 text-black hover:bg-indigo-500/35'} mr-1 rounded-xl`}
          key={href}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
