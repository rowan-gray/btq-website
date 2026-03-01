import { Link } from '@/components/core/link'
import { ChevronRightIcon } from '@heroicons/react/16/solid'

export type BannerProps = {
  filled?: boolean
  text?: string
  expiry?: Date
  href: string
}

export function Banner({ filled, text, href, expiry }: BannerProps) {
  return (
    <>
      {text && (expiry ? Date.now() < expiry.getTime() : true) && (
        <Link
          href={href}
          className={`lg:text-md flex items-center justify-between gap-1 rounded-lg py-0.5 pr-3 pl-4 text-sm/6 font-medium transition duration-200 ease-out ${filled ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'}`}
        >
          {text}
          <ChevronRightIcon className="size-4" />
        </Link>
      )}
    </>
  )
}
