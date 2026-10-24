'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-dark-bg border-t border-white/10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,106,0,0.12), transparent 60%)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          className="display-type text-5xl md:text-7xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          HAVE SOMETHING
          <br />
          <span className="text-orange-primary">IN MIND?</span>
        </motion.h2>
        <motion.p
          className="text-lg text-gray-secondary mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Let&apos;s turn your next idea into a working digital product.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-full font-semibold text-lg bg-orange-primary text-black hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] transition-shadow"
          >
            START A PROJECT
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
