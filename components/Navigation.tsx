'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          GSKCORE
        </motion.div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-gray-light/70 hover:text-orange-primary transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-primary to-orange-bright group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          className="hidden md:block px-6 py-2 border-2 border-orange-primary text-orange-primary rounded-lg hover:bg-orange-primary/10 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`md:hidden glass border-t border-orange-primary/10 ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
      >
        <div className="px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="block text-gray-light/70 hover:text-orange-primary">
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}
