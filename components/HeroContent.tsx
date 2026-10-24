'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroContent() {
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !rootRef.current) return

    let cleanup = () => {}

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        // Entrance reveal, plays once on mount
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('[data-reveal="eyebrow"]', { opacity: 0, y: 12, duration: 0.5 })
          .from('[data-reveal="line"]', { scaleX: 0, duration: 0.6 }, '<0.1')
          .from('[data-reveal="logo"]', { opacity: 0, scale: 0.8, rotate: -8, duration: 1.2 }, '<')
          .from('[data-reveal="word"]', { opacity: 0, y: '100%', duration: 0.8, stagger: 0.08 }, '<0.1')
          .from('[data-reveal="sub"]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.3')
          .from('[data-reveal="cta"]', { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 }, '-=0.3')

        // Slow continuous drift so the big mark doesn't feel static
        if (logoRef.current) {
          gsap.to(logoRef.current, {
            y: -20,
            duration: 5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        }

        // Cinematic exit: as you scroll past the hero, the headline scales
        // down and fades while the section pins briefly, then releases into
        // the Capabilities section below.
        const isDesktop = window.matchMedia('(min-width: 768px)').matches

        if (contentRef.current) {
          const exitTl = gsap.timeline({
            scrollTrigger: {
              trigger: '#hero-section',
              start: 'top top',
              end: isDesktop ? '+=70%' : '+=35%',
              scrub: 0.6,
              pin: isDesktop,
              pinSpacing: isDesktop,
            },
          }).to(contentRef.current, { scale: 0.92, opacity: 0, y: -30, ease: 'none' }, 0)

          if (logoRef.current) {
            exitTl.to(logoRef.current, { scale: 1.08, opacity: 0, x: 40, ease: 'none' }, 0)
          }

          // The "scroll" hint should disappear almost immediately once the
          // user actually starts scrolling, not linger for the whole pin.
          if (scrollHintRef.current) {
            exitTl.to(scrollHintRef.current, { opacity: 0, y: -8, duration: 0.15, ease: 'none' }, 0)
          }
        }
      }, rootRef)

      cleanup = () => {
        ctx.revert()
      }
    })

    return () => cleanup()
  }, [])

  return (
    <div
      ref={rootRef}
      className="relative z-20 min-h-screen flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-16 pt-32"
    >
      {/* Large brand mark, bleeding off the right edge beside the headline */}
      <div
        ref={logoRef}
        data-reveal="logo"
        className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[-4%] xl:right-[1%] pointer-events-none z-10"
        style={{ width: 'clamp(320px, 32vw, 560px)' }}
        aria-hidden="true"
      >
        <div className="relative w-full aspect-square">
          <Image
            src="/logo1.png"
            alt=""
            fill
            className="object-contain mix-blend-screen opacity-90"
            priority
          />
        </div>
      </div>

      <div ref={contentRef} className="max-w-6xl relative z-20">
        <p
          data-reveal="eyebrow"
          className="text-xs font-semibold tracking-[0.3em] text-orange-primary mb-6 uppercase"
        >
          GSKCORE TECH LLP — Software &amp; Product Engineering
        </p>

        <div data-reveal="line" className="h-px w-24 bg-orange-primary/60 origin-left mb-8" />

        <h1 className="display-type text-[14vw] sm:text-[11vw] lg:text-[8rem] text-gray-light mb-8 overflow-hidden">
          <span className="block overflow-hidden">
            <span data-reveal="word" className="inline-block">WE BUILD</span>
          </span>
          <span className="block overflow-hidden text-orange-primary">
            <span data-reveal="word" className="inline-block">WHAT&apos;S NEXT.</span>
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <p data-reveal="sub" className="text-lg md:text-xl max-w-xl text-gray-secondary leading-relaxed">
            Websites. Applications. Intelligent software. From the first idea to a
            production-ready digital product, built around real business needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/contact" data-reveal="cta">
              <button className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide bg-orange-primary text-black hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] transition-shadow whitespace-nowrap">
                START A PROJECT
              </button>
            </Link>
            <Link href="/portfolio" data-reveal="cta">
              <button className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide border border-white/20 text-gray-light hover:border-orange-primary hover:text-orange-primary transition-colors whitespace-nowrap">
                EXPLORE OUR WORK
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute top-32 right-6 sm:right-10 lg:right-16 text-right hidden sm:block"
      >
        <p className="text-xs text-gray-secondary tracking-[0.2em]">SCROLL</p>
      </div>
    </div>
  )
}
