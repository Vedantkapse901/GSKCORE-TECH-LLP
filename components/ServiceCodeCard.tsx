'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Service } from '@/lib/api'

function useTypewriter(text: string, start: boolean, speed = 16) {
  const [out, setOut] = useState('')

  useEffect(() => {
    if (!start) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setOut(text)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, text])

  return { out, done: out.length === text.length }
}

export default function ServiceCodeCard({
  service,
  index,
  active,
  onHeaderDone,
}: {
  service: Service
  index: number
  active: boolean
  onHeaderDone: () => void
}) {
  const [revealed, setRevealed] = useState(false)
  const firedDoneRef = useRef(false)

  const header = `const service = {\n  name: "${service.name}",${
    service.title ? `\n  tagline: "${service.title}",` : ''
  }\n}`
  const { out: typedHeader, done: headerDone } = useTypewriter(header, active)
  const { out: typedSolves } = useTypewriter(service.description, revealed)

  useEffect(() => {
    if (headerDone && !firedDoneRef.current) {
      firedDoneRef.current = true
      onHeaderDone()
    }
  }, [headerDone, onHeaderDone])

  // Render the typed header with syntax colors once it's fully typed;
  // while typing, show it as plain text so we don't need per-char coloring.
  const renderHeader = () => {
    if (!headerDone) {
      return <span className="text-gray-light whitespace-pre-wrap">{typedHeader}</span>
    }
    return (
      <>
        <div className="text-gray-secondary/70">const service = {'{'}</div>
        <div className="pl-4">
          <div>
            <span className="text-orange-primary">name</span>
            <span className="text-gray-secondary/70">:</span>{' '}
            <span className="text-gray-light">&quot;{service.name}&quot;</span>
            <span className="text-gray-secondary/70">,</span>
          </div>
          {service.title && (
            <div>
              <span className="text-orange-primary">tagline</span>
              <span className="text-gray-secondary/70">:</span>{' '}
              <span className="text-gray-light">&quot;{service.title}&quot;</span>
              <span className="text-gray-secondary/70">,</span>
            </div>
          )}
        </div>
        <div className="text-gray-secondary/70">{'}'}</div>
      </>
    )
  }

  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden hover:border-orange-primary/40 transition-colors"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-orange-primary/60" />
        </div>
        <span className="ml-2 text-xs font-mono text-gray-secondary">
          service-{String(index + 1).padStart(2, '0')}.ts
        </span>
      </div>

      {/* Code body */}
      <div className="px-5 py-6 font-mono text-[13px] sm:text-sm leading-relaxed min-h-[150px]">
        {renderHeader()}

        {headerDone && (
          <motion.div
            className="pl-4 pt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <span className="text-orange-primary">solves</span>
            <span className="text-gray-secondary/70">:</span>{' '}
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                aria-expanded={revealed}
                className="text-orange-primary/80 underline decoration-dotted underline-offset-4 hover:text-orange-primary transition-colors"
              >
                tap to reveal →
              </button>
            ) : (
              <span className="text-gray-light">
                &quot;{typedSolves}&quot;
                <span
                  className="inline-block w-[6px] h-[13px] ml-0.5 bg-orange-primary/70 align-middle motion-reduce:hidden"
                  style={{ animation: 'blink 1s steps(1) infinite' }}
                  aria-hidden="true"
                />
              </span>
            )}
          </motion.div>
        )}
      </div>

      <div className="px-5 pb-5">
        <a
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-mono text-gray-secondary hover:text-orange-primary transition-colors"
        >
          <span className="text-orange-primary">&gt;</span> start a conversation
        </a>
      </div>
    </motion.div>
  )
}
