'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Admin', href: '/admin' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-dark-bg/80 border-b border-orange-primary/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          className="w-14 h-14 relative flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/logo1.png"
            alt="GSKCORE Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.a>

        {/* Desktop menu */}
        <div className="hidden lg:flex gap-8 flex-1 justify-center">
          {navItems.slice(0, -1).map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-gray-light/70 hover:text-orange-primary transition-colors relative group font-medium"
              whileHover={{ y: -2 }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-primary to-orange-bright group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Admin Button */}
        <motion.a
          href="/admin"
          className="hidden lg:block px-6 py-2 bg-gradient-to-r from-orange-primary to-red-orange text-white rounded-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Admin
        </motion.a>

        {/* Mobile Hamburger Menu Button */}
        <motion.button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </div>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-dark-bg to-dark-surface border-b border-orange-primary/20 backdrop-blur-xl"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-8 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`block text-lg font-semibold py-3 px-4 rounded-lg transition-all ${
                      item.label === 'Admin'
                        ? 'bg-gradient-to-r from-orange-primary to-red-orange text-white'
                        : 'text-gray-light/70 hover:text-orange-primary hover:bg-orange-primary/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.button
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-orange-primary to-red-orange text-white rounded-lg font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
