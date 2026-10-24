'use client'

import { useEffect, useRef } from 'react'

export default function CountUpStat({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  useEffect(() => {
    const el = ref.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || target === null || reduceMotion) return

    let cleanup = () => {}

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const counter = { n: 0 }
        gsap.to(counter, {
          n: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(counter.n) + suffix
          },
        })
      }, el)

      cleanup = () => ctx.revert()
    })

    return () => cleanup()
  }, [target, suffix])

  return (
    <div ref={ref} className={className}>
      {value}
    </div>
  )
}
