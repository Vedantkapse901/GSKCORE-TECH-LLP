'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const adminMenuItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Projects', href: '/admin/projects', icon: '📁' },
  { label: 'Services', href: '/admin/services', icon: '⚙️' },
  { label: 'Clients', href: '/admin/clients', icon: '👥' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
  { label: 'Back to Site', href: '/', icon: '←' },
]

export default function AdminNavigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-dark-bg/90 border-b border-orange-primary/20">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-orange-primary/10 rounded-lg"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>

            <Link href="/admin" className="w-12 h-12 relative">
              <Image
                src="/logo1.png"
                alt="GSKCORE"
                fill
                className="object-contain"
              />
            </Link>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-gray-light/60 text-sm">Welcome Admin</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-primary to-orange-bright" />
          </motion.div>
        </div>
      </nav>

      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-20 bottom-0 w-64 bg-dark-surface border-r border-orange-primary/10 overflow-y-auto hidden lg:block"
        initial={{ x: -256 }}
        animate={{ x: isSidebarOpen ? 0 : -256 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 space-y-2">
          {adminMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-light/70 hover:text-orange-primary hover:bg-orange-primary/10 transition-all group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 lg:hidden z-30 top-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        className="fixed left-0 top-20 bottom-0 w-64 bg-dark-surface border-r border-orange-primary/10 lg:hidden z-40"
        initial={{ x: -256 }}
        animate={{ x: isSidebarOpen ? 0 : -256 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 space-y-2">
          {adminMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-light/70 hover:text-orange-primary hover:bg-orange-primary/10 transition-all group"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </motion.aside>
    </>
  )
}
