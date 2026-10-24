'use client'

import { motion } from 'framer-motion'
import IconCard from '@/components/IconCard'

const steps = [
  {
    icon: '🔍',
    title: 'Discover',
    description: 'We understand the business, objectives, target audience, and constraints before writing a line of code.',
  },
  {
    icon: '🎨',
    title: 'Design',
    description: 'User experience, visual system, and technical architecture are mapped out as a concrete implementation plan.',
  },
  {
    icon: '🛠️',
    title: 'Build',
    description: 'The product gets built, integrated with the systems it needs, and validated against real requirements.',
  },
  {
    icon: '🚀',
    title: 'Launch',
    description: 'We test thoroughly, prepare deployment, and release the approved product to production.',
  },
  {
    icon: '📈',
    title: 'Improve',
    description: 'Ongoing maintenance, refinements, and technical support keep the product reliable as it grows.',
  },
]

export default function Capabilities() {
  return (
    <section className="relative w-full py-20 md:py-28 bg-dark-bg border-t border-white/10 overflow-hidden">
      <div
        className="absolute right-0 top-0 w-[28rem] h-[28rem] rounded-full pointer-events-none"
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
              How we work
            </p>
            <span className="h-px w-16 bg-orange-primary/40" />
          </div>
          <h2 className="display-type text-4xl md:text-6xl text-gray-light">
            From idea to <span className="text-orange-primary">impact.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <IconCard
              key={step.title}
              index={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              delay={index * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
