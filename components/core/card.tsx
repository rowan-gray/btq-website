'use client'
import Link from 'next/link'

export function Card({
  children,
  link,
}: {
  children: React.ReactNode
  link?: string
}) {
  if (link) {
    return (
      <Link href={link} passHref>
        <div
          className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:cursor-pointer hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          rel="noopener noreferrer"
        >
          {children}
        </div>
      </Link>
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {children}
    </div>
  )
}
