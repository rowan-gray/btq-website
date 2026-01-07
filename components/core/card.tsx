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
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg">
          <div className="overflow-visible">{children}</div>
        </div>
      </Link>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="overflow-visible">{children}</div>
    </div>
  )
}
