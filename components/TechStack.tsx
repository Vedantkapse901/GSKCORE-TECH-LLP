'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const TechNetwork3D = dynamic(() => import('@/components/TechNetwork3D'), { ssr: false })

const stack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
  'PHP', 'MySQL', 'REST APIs', 'Node.js',
  'GSAP', 'Three.js', 'Framer Motion', 'Vercel',
]

export default function TechStack() {
  const row = [...stack, ...stack]

  return (
    <section className="relative w-full py-16 bg-dark-surface border-t border-white/10 overflow-hidden">
      <motion.p
        className="text-center text-xs font-semibold tracking-[0.3em] text-orange-primary mb-6 uppercase"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Built with
      </motion.p>

      <motion.div
        className="relative w-full h-[320px] md:h-[420px] mb-6 motion-reduce:h-[200px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <TechNetwork3D />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-surface" />
      </motion.div>

      <div className="relative flex overflow-hidden motion-reduce:overflow-x-auto">
        <div className="flex gap-16 pr-16 tech-marquee motion-reduce:animate-none shrink-0">
          {row.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="text-3xl md:text-4xl font-bold text-gray-light/70 whitespace-nowrap shrink-0"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-16 pr-16 tech-marquee motion-reduce:hidden shrink-0" aria-hidden="true">
          {row.map((tech, i) => (
            <span
              key={`${tech}-dup-${i}`}
              className="text-3xl md:text-4xl font-bold text-gray-light/70 whitespace-nowrap shrink-0"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
