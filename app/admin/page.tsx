'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface DashboardStats {
  totalProjects: number
  totalClients: number
  totalServices: number
  recentProjects: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalClients: 0,
    totalServices: 0,
    recentProjects: [],
  })
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)

        // Fetch from Supabase tables
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .limit(10)

        const { data: clientsData, error: clientsError } = await supabase
          .from('clients')
          .select('count', { count: 'exact' })

        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('count', { count: 'exact' })

        setStats({
          totalProjects: projectsData?.length || 0,
          totalClients: clientsData?.[0]?.count || 0,
          totalServices: servicesData?.[0]?.count || 0,
          recentProjects: projectsData || [],
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    { label: 'Total Projects', value: stats.totalProjects, icon: '📁', color: 'from-orange-primary' },
    { label: 'Total Clients', value: stats.totalClients, icon: '👥', color: 'from-orange-bright' },
    { label: 'Total Services', value: stats.totalServices, icon: '⚙️', color: 'from-red-orange' },
  ]

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        className="fixed left-0 top-20 h-[calc(100vh-80px)] bg-dark-surface border-r border-orange-primary/20 overflow-y-auto z-40"
        animate={{ width: sidebarOpen ? 256 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {sidebarOpen && (
          <div className="p-6 space-y-4">
            <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-orange-primary/10 text-gray-light">Dashboard</Link>
            <Link href="/admin/projects" className="block px-4 py-2 rounded-lg hover:bg-orange-primary/10 text-gray-light">Projects</Link>
            <Link href="/admin/services" className="block px-4 py-2 rounded-lg hover:bg-orange-primary/10 text-gray-light">Services</Link>
            <hr className="border-orange-primary/20" />
            <a href="/" className="block px-4 py-2 rounded-lg hover:bg-orange-primary/10 text-gray-light">Back to Site</a>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Hamburger Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-6 right-4 z-50 p-2 rounded-lg hover:bg-orange-primary/20"
        >
          <motion.div animate={sidebarOpen ? { rotate: 90 } : { rotate: 0 }}>
            <svg className="w-6 h-6 text-orange-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.div>
        </button>

        {/* Page Content */}
        <div className="px-4 py-8 pt-4">
          {/* Page Header */}
          <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-light/60">Manage your projects, clients, and services</p>
          </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            className={`glass rounded-2xl p-8 border border-orange-primary/20`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 0 30px rgba(255, 107, 53, 0.2)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-light/60 text-sm mb-2">{stat.label}</p>
                <p className="text-4xl font-bold">{loading ? '-' : stat.value}</p>
              </div>
              <div className="text-5xl opacity-50">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Projects */}
      <motion.div
        className="glass rounded-2xl p-8 border border-orange-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6">Recent Projects</h2>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-light/60">Loading...</p>
          </div>
        ) : stats.recentProjects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-orange-primary/10">
                  <th className="text-left py-4 px-4 text-gray-light/70 font-semibold">Name</th>
                  <th className="text-left py-4 px-4 text-gray-light/70 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 text-gray-light/70 font-semibold">Date</th>
                  <th className="text-left py-4 px-4 text-gray-light/70 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentProjects.slice(0, 5).map((project, index) => (
                  <motion.tr
                    key={project.id}
                    className="border-b border-orange-primary/5 hover:bg-orange-primary/5 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="py-4 px-4">{project.name || project.title}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-orange-primary/20 text-orange-primary rounded-full text-sm">
                        {project.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-light/60">
                      {project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-orange-primary hover:text-orange-bright transition-colors">
                        View →
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-light/60">No projects found. Start by creating a new project!</p>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { title: 'Add Project', href: '/admin/projects', icon: '➕' },
          { title: 'Manage Services', href: '/admin/services', icon: '⚙️' },
        ].map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="glass rounded-2xl p-8 border border-orange-primary/20 hover:border-orange-primary/50 hover:bg-orange-primary/5 transition-all group"
          >
            <div className="flex items-center gap-4">
              <span className="text-5xl opacity-50 group-hover:opacity-100 transition-opacity">{action.icon}</span>
              <div>
                <h3 className="text-lg font-bold group-hover:text-orange-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-light/60 text-sm">Manage your {action.title.toLowerCase()}</p>
              </div>
            </div>
          </a>
        ))}
      </motion.div>
        </div>
      </div>
    </div>
  )
}
