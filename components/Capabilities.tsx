'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const steps = [
  {
    num: '01',
    title: 'Discover',
    description: 'We understand the business, objectives, target audience, and constraints before writing a line of code.',
  },
  {
    num: '02',
    title: 'Design',
    description: 'User experience, visual system, and technical architecture are mapped out as a concrete implementation plan.',
  },
  {
    num: '03',
    title: 'Build',
    description: 'The product gets built, integrated with the systems it needs, and validated against real requirements.',
  },
  {
    num: '04',
    title: 'Launch',
    description: 'We test thoroughly, prepare deployment, and release the approved product to production.',
  },
  {
    num: '05',
    title: 'Improve',
    description: 'Ongoing maintenance, refinements, and technical support keep the product reliable as it grows.',
  },
]

export default function Capabilities() {
  const fillRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fill = fillRef.current
    const section = sectionRef.current
    if (!fill || !section || reduceMotion) return

    let cleanup = () => {}

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        // Progress line fills as the whole step list scrolls through view
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 0.4,
            },
          }
        )

        // Each ghost numeral lights up orange as its row crosses center
        gsap.utils.toArray<HTMLElement>('[data-cap-num]').forEach((num) => {
          gsap.to(num, {
            color: '#FF6A00',
            ease: 'none',
            scrollTrigger: {
              trigger: num.closest('li'),
              start: 'top 70%',
              end: 'top 35%',
              scrub: 0.4,
            },
          })
        })
      }, section)

      cleanup = () => ctx.revert()
    })

    return () => cleanup()
  }, [])

  return (
    <section className="relative w-full py-20 md:py-28 bg-dark-bg border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-orange-primary mb-5 uppercase">
            How we work
          </p>
          <h2 className="display-type text-4xl md:text-6xl text-gray-light">
            FROM IDEA TO <span className="text-orange-primary">IMPACT.</span>
          </h2>
        </motion.div>

        <div ref={sectionRef} className="relative pl-10 md:pl-16">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />
          <div
            ref={fillRef}
            className="absolute left-0 top-0 bottom-0 w-px bg-orange-primary origin-top"
            style={{ transform: 'scaleY(0)' }}
            aria-hidden="true"
          />

          <ol>
            {steps.map((step, index) => (
              <motion.li
                key={step.num}
                className="relative py-10 border-b border-white/10 last:border-b-0 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <span data-cap-num className="display-type text-5xl md:text-6xl text-white/10 w-full md:w-28 shrink-0">
                  {step.num}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-light">{step.title}</h3>
                  <p className="text-gray-secondary leading-relaxed max-w-xl">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
