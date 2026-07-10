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
    </>
  )
}
