'use client'

import { motion } from 'framer-motion'
import IconCard from '@/components/IconCard'

const reasons = [
  {
    icon: '🧭',
    title: 'End-to-End Development',
    description: 'From first requirements through design, build, and launch — one team, one accountable process.',
  },
  {
    icon: '👥',
    title: 'Business-First Thinking',
    description: 'We start with your goals and constraints, then choose the technology that actually fits them.',
  },
  {
    icon: '💬',
    title: 'Direct Communication',
    description: 'Clear timelines, honest scoping, and no middlemen between you and the people building your product.',
  },
  {
    icon: '🏗️',
    title: 'Maintainable Architecture',
    description: 'Code built to be extended, not just shipped — so your product can grow without a rewrite.',
  },
  {
    icon: '✨',
    title: 'Thoughtful Interfaces',
    description: 'Interfaces designed around how people actually use the product, not just how it looks in a screenshot.',
  },
  {
    icon: '🔧',
    title: 'Ongoing Support',
    description: 'Launch is a milestone, not an end point — we stay involved for maintenance and iteration.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-20 md:py-28 bg-dark-bg border-t border-white/10 overflow-hidden">
      <div
        className="absolute -left-40 bottom-0 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.1), transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-5">
            <p className="text-xs font-semibold tracking-[0.3em] text-orange-primary uppercase">
              Why GSKCORE TECH
            </p>
            <span className="h-px w-16 bg-orange-primary/40" />
          </div>
          <h2 className="display-type text-4xl md:text-6xl text-gray-light">
            Execution that matches <span className="text-orange-primary">the ambition.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reasons.map((reason, index) => (
            <IconCard
              key={reason.title}
              index={index}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              href="/contact"
              hrefLabel={`Start a project — ${reason.title}`}
              delay={index * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
