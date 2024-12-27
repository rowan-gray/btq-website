import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '@/public/logo.svg'

export function Logo({ className }: { className?: string }) {
  return (
    <motion.div
      variants={{ idle: {}, active: {} }}
      initial="idle"
      whileHover="active"
      className={clsx(className, 'overflow-visible flex items-center')}
    >
      <Image
        src={logo}
        alt="Logo"
        width={75}
        height={34}
      />
    </motion.div>
  )
}
