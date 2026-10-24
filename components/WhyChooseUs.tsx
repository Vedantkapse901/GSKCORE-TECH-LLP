'use client'

import { motion } from 'framer-motion'

const reasons = [
  {
    title: 'End-to-End Development',
    description: 'From first requirements through design, build, and launch — one team, one accountable process.',
  },
  {
    title: 'Business-First Thinking',
    description: 'We start with your goals and constraints, then choose the technology that actually fits them.',
  },
  {
    title: 'Direct Communication',
    description: 'Clear timelines, honest scoping, and no middlemen between you and the people building your product.',
  },
  {
    title: 'Maintainable Architecture',
    description: 'Code built to be extended, not just shipped — so your product can grow without a rewrite.',
  },
  {
    title: 'Thoughtful Interfaces',
    description: 'Interfaces designed around how people actually use the product, not just how it looks in a screenshot.',
  },
  {
    title: 'Ongoing Support',
    description: 'Launch is a milestone, not an end point — we stay involved for maintenance and iteration.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-20 md:py-28 bg-dark-bg border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-orange-primary mb-5 uppercase">
              Why GSKCORE TECH
            </p>
            <h2 className="display-type text-4xl md:text-5xl text-gray-light sticky top-32">
              Execution that matches <span className="text-orange-primary">the ambition.</span>
            </h2>
          </motion.div>

          <div className="md:col-span-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                className="py-8 border-b border-white/10 first:border-t md:first:border-t-0 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="section-index text-sm text-gray-secondary w-10 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-1 text-gray-light">{reason.title}</h3>
                  <p className="text-gray-secondary leading-relaxed max-w-lg">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
