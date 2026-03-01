import { Link } from '@/components/core/link'
import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center border border-transparent',
    'text-base font-semibold whitespace-nowrap text-white',
    'bg-indigo-600 hover:bg-indigo-700',
    'dark:bg-indigo-500 dark:hover:bg-indigo-400',
    'transition duration-200 ease-in-out',
  ),
  secondary: clsx(
    'inline-flex items-center justify-center border border-transparent',
    'text-base font-semibold whitespace-nowrap text-white',
    'bg-gray-800 hover:bg-gray-900',
    'dark:bg-gray-700 dark:hover:bg-gray-600',
    'transition duration-200 ease-in-out',
  ),
  outline: clsx(
    'inline-flex items-center justify-center border border-gray-300',
    'font-medium whitespace-nowrap text-gray-950',
    'dark:border-gray-600 dark:text-gray-100',
    'disabled:bg-transparent disabled:opacity-40 hover:bg-gray-50',
    'dark:hover:bg-gray-800',
    'transition duration-200 ease-in-out',
  ),
}

const sizes = {
  large: clsx('rounded-lg px-5 py-2.5 text-lg'),
  medium: clsx('text-md rounded-lg px-5 py-2'),
  small: clsx('rounded-lg px-4 py-1.5 text-sm'),
}

type ButtonProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
} & (
  | ({ href: string } & React.ComponentPropsWithoutRef<typeof Link>)
  | ({ href?: undefined } & Headless.ButtonProps)
)

export function Button({
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant], sizes[size])

  if (props.href !== undefined) {
    return <Link {...props} className={className} />
  } else {
    return <Headless.Button {...props} className={className} />
  }
}
