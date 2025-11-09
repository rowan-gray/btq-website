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
          className={`lg:text-md flex items-center justify-between gap-1 rounded-2xl py-0.5 pr-3 pl-4 text-sm/6 font-medium transition duration-200 ease-out ${filled ? 'bg-indigo-500 text-white data-[hover]:bg-indigo-600' : 'bg-indigo-300/35 text-black data-[hover]:bg-indigo-500/35'}`}
        >
          {text}
          <ChevronRightIcon className="size-4" />
        </Link>
      )}
    </>
  )
}
