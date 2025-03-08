import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import logo_dark from '@/public/logo_dark.svg'

export function Logo({ className, filled }: { className?: string, filled: true | undefined}) {
  console.log(filled)
  return (
    <motion.div
      variants={{ idle: {}, active: {} }}
      initial="idle"
      whileHover="active"
      className={clsx(className, 'overflow-visible flex items-center')}
    >
      {
        filled ? (
          <Image
            src={logo_dark}
            alt="Logo"
            width={150}
            height={50}
          />
        ) : (
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={50}
          />
        )
      }

    </motion.div>
  )
}
