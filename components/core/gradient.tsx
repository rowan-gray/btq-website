import { clsx } from 'clsx'

export function Gradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'bg-radial-[at_0%_0%] from-[#f472b6] to-[#3730a3] sm:bg-linear-[145deg]',
      )}
    />
  )
}
