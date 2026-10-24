'use client'

import { useEffect, useRef, useState } from 'react'

const FRAME_W = 1280
const FRAME_H = 800

export default function WebsitePreview({
  url,
  screenshotUrl,
  title,
  fallbackLabel,
}: {
  url?: string | null
  screenshotUrl?: string | null
  title: string
  fallbackLabel: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)
  const [frameFailed, setFrameFailed] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / FRAME_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // A real screenshot (needed for apps — there's no live page to embed) always wins.
  if (screenshotUrl) {
    return (
      <div className="relative w-full overflow-hidden bg-dark-bg" style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}>
        <img src={screenshotUrl} alt={title} className="w-full h-full object-cover" />
      </div>
    )
  }

  if (!url || frameFailed) {
    return (
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          aspectRatio: `${FRAME_W} / ${FRAME_H}`,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,106,0,0.14), transparent 65%)' }}
        />
        <span className="relative text-lg sm:text-2xl font-bold text-white/15 px-4 text-center">
          {fallbackLabel}
        </span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-dark-bg"
      style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
    >
      <div
        style={{
          width: FRAME_W,
          height: FRAME_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      >
        <iframe
          src={url}
          width={FRAME_W}
          height={FRAME_H}
          loading="lazy"
          title={title}
          style={{ border: 0, display: 'block' }}
          onError={() => setFrameFailed(true)}
        />
      </div>
    </div>
  )
}
