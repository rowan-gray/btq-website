import logo_dark from '@/public/btq_wordmark_dark.svg'
import logo from '@/public/btq_wordmark_light.svg'
import { clsx } from 'clsx'
import Image from 'next/image'

export function Logo({
  className,
  filled,
}: {
  className?: string
  filled: true | undefined
}) {
  return (
    <div className={clsx(className, 'flex items-center overflow-visible')}>
      {filled ? (
        <Image
          src={logo_dark}
          alt="Logo"
          priority
          className="h-auto w-40 sm:w-52 lg:w-56"
        />
      ) : (
        <Image
          src={logo}
          alt="Logo"
          priority
          className="h-auto w-40 sm:w-52 lg:w-56"
        />
      )}
    </div>
  )
}
