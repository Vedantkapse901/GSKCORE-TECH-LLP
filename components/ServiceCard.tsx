'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  delay?: number
}

export default function ServiceCard({ title, description, icon, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      className="group glass rounded-2xl p-8 cursor-pointer"
      whileHover={{
        y: -10,
        boxShadow: '0 0 40px rgba(255, 107, 53, 0.3)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {/* Icon container */}
      <motion.div
        className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-primary/20 to-orange-golden/20 flex items-center justify-center mb-6 group-hover:scale-110"
        whileHover={{ rotate: 10 }}
      >
        <div className="text-3xl">{icon}</div>
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 group-hover:text-orange-primary transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-light/70 mb-6 leading-relaxed">{description}</p>

      {/* Learn more link */}
      <motion.a
        href="#"
        className="inline-flex items-center gap-2 text-orange-primary font-semibold"
        whileHover={{ x: 5 }}
      >
        Learn more
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.a>
    </motion.div>
  )
}
