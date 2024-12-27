import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from './link'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
    'rounded-full border border-transparent shadow-md',
    'whitespace-nowrap text-base font-medium text-white',
    'bg-indigo-300/35 data-[hover]:bg-indigo-500/35',
  ),
  secondary: clsx(
    'inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
    'rounded-full border border-transparent shadow-md',
    'whitespace-nowrap text-base font-medium text-white',
    'bg-pink-400 data-[hover]:bg-pink-600',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-2 py-[calc(theme(spacing.[1.5])-1px)]',
    'rounded-lg border border-transparent shadow ring-1 ring-black/10',
    'whitespace-nowrap text-sm font-medium text-gray-950',
    'data-[disabled]:bg-transparent data-[hover]:bg-gray-50 data-[disabled]:opacity-40',
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant])

  if (typeof props.href === 'undefined') {
    return <Headless.Button {...props} className={className} />
  }

  return <Link {...props} className={className} />
}
