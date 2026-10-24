'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const bar = barRef.current
    if (!bar || reduceMotion) return

    let frame: number
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      bar.style.transform = `scaleX(${progress})`
      frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-orange-primary origin-left"
        style={{ transform: 'scaleX(0)', boxShadow: '0 0 8px rgba(255,106,0,0.6)' }}
      />
    </div>
  )
}
