'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function IconCard({
  index,
  icon,
  title,
  description,
  href,
  hrefLabel,
  delay = 0,
}: {
  index: number
  icon: string
  title: string
  description: string
  href?: string
  hrefLabel?: string
  delay?: number
}) {
  const words = title.split(' ')
  const firstWord = words[0]
  const rest = words.slice(1).join(' ')

  return (
    <motion.div
      className="group relative rounded-2xl border border-orange-primary/15 bg-gradient-to-b from-white/[0.03] to-transparent p-6 overflow-hidden hover:border-orange-primary/40 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.25), transparent 70%)' }}
      />

      <span className="relative block text-xs font-mono text-orange-primary/70 mb-5">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div
        className="relative w-12 h-12 rounded-xl border border-orange-primary/30 bg-dark-bg flex items-center justify-center text-2xl mb-5"
        style={{ boxShadow: '0 0 20px rgba(255,106,0,0.15)' }}
      >
        {icon}
      </div>

      <h3 className="relative text-xl font-bold text-gray-light mb-2 leading-snug">
        {firstWord} {rest && <span className="text-orange-primary">{rest}</span>}
      </h3>
      <p className="relative text-sm text-gray-secondary leading-relaxed mb-6">{description}</p>

      {href && (
        <Link
          href={href}
          aria-label={hrefLabel || `Learn more about ${title}`}
          className="relative inline-flex w-9 h-9 rounded-full border border-orange-primary/40 items-center justify-center text-orange-primary group-hover:bg-orange-primary group-hover:text-black transition-colors"
        >
          →
        </Link>
      )}
    </motion.div>
  )
}
