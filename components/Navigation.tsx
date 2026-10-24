'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b ${
        scrolled
          ? 'bg-dark-bg/90 backdrop-blur-lg border-white/10'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link
          href="/"
          className="w-12 h-12 sm:w-14 sm:h-14 relative flex-shrink-0"
          aria-label="GSKCORE TECH LLP home"
        >
          <Image src="/logo1.png" alt="GSKCORE TECH LLP" fill className="object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium tracking-wide text-gray-light/80 hover:text-orange-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-orange-primary text-black hover:shadow-[0_0_24px_rgba(255,106,0,0.45)] transition-shadow"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            className="w-6 h-0.5 bg-orange-primary block rounded-full"
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-orange-primary block rounded-full"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-orange-primary block rounded-full"
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-dark-bg border-b border-white/10"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 py-8 space-y-2 max-h-[calc(100vh-72px)] overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.div key={item.label} variants={itemVariants} initial="closed" animate="open" transition={{ delay: index * 0.06 }}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    className="block text-lg font-semibold py-3 px-4 rounded-lg text-gray-light/80 hover:text-orange-primary hover:bg-white/5 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <Link href="/contact" onClick={() => setIsOpen(false)} className="block w-full">
                <button className="w-full mt-4 px-6 py-3 rounded-full bg-orange-primary text-black font-semibold">
                  Start a Project
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
