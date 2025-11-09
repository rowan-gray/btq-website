'use client'

import { Link } from '@/components/core/link'
import { Bars3Icon } from '@heroicons/react/16/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLinks } from '@/data/nav-links'

export function MobileNavbar({
  filled,
  onClick,
}: {
  filled: true | undefined
  onClick: () => void
}) {
  return (
    <motion.button
      className="flex size-12 items-center justify-center self-center rounded-lg data-[hover]:bg-black/5 lg:hidden"
      aria-label="Toggle main menu"
      onClick={onClick}
      whileTap={{ scale: 0.9 }} // Bounce effect: grows larger
      animate={{ scale: 1 }} // Returns to normal size
      transition={{
        type: 'spring', // Natural bounce effect
        stiffness: 500,
        damping: 20,
      }}
    >
      {/* Hamburger icon */}
      <Bars3Icon className={`size-8 ${!filled ? 'text-black' : ''}`} />
    </motion.button>
  )
}

export function MobileNavbarMenu({
  filled,
  isOpen,
}: {
  filled: true | undefined
  isOpen: boolean
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }} // Close animation
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`overflow-hidden lg:hidden ${
            !filled ? 'text-black' : 'text-gray-200'
          }`}
        >
          <div className="relative flex flex-col py-4 text-center">
            {/* Adjusted line above the first item */}

            {NavLinks.map(({ href, label }, linkIndex) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{
                  duration: 0.2,
                  ease: 'easeInOut',
                  delay: linkIndex * (0.3 / NavLinks.length),
                }}
                key={href}
                className="relative"
              >
                {linkIndex == 0 && (
                  <div className="absolute inset-x-0 top-0 translate-y-1/2">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  </div>
                )}
                <Link href={href} className="text-base font-medium">
                  <p className="py-3 text-xl">{label}</p> {/* Text padding */}
                </Link>
                {/* Add the fading horizontal line */}
                <div
                  className={`absolute inset-x-0 bottom-0 translate-y-1/2 ${
                    linkIndex === NavLinks.length - 1 ? 'mt-4' : ''
                  }`}
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
