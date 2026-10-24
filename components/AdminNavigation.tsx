'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogout } from '@/lib/api'

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
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await adminLogout()
    } finally {
      router.push('/admin/login')
    }
  }

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-dark-bg/95 border-b border-white/10">
        <div className="px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="w-12 h-12 relative">
            <Image
              src="/logo1.png"
              alt="GSKCORE"
              fill
              className="object-contain"
            />
          </Link>

          <h1 className="text-xs font-semibold tracking-[0.3em] text-gray-secondary uppercase">
            Admin <span className="text-orange-primary">Panel</span>
          </h1>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-gray-secondary text-sm hidden sm:inline">Welcome Admin</span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-secondary hover:text-orange-primary transition-colors"
            >
              Log Out
            </button>
          </motion.div>
        </div>
      </nav>
    </>
  )
}
