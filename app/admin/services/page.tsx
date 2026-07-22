'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface Service {
  id: string
  name: string
  description: string
  icon: string
  created_at: string
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '⚙️',
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase.from('services').insert([
        {
          name: formData.name,
          description: formData.description,
          icon: formData.icon,
        },
      ])

      if (error) throw error

      setFormData({ name: '', description: '', icon: '⚙️' })
      setShowForm(false)
      fetchServices()
    } catch (error) {
      console.error('Error adding service:', error)
      alert(`Failed to add service: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id)

      if (error) throw error
      fetchServices()
    } catch (error) {
      console.error('Error deleting service:', error)
      alert(`Failed to delete service: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

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
            <a href="/admin" className="block px-4 py-2 rounded-lg hover:bg-orange-primary/10 text-gray-light">Dashboard</a>
            <a href="/admin/projects" className="block px-4 py-2 rounded-lg hover:bg-orange-primary/10 text-gray-light">Projects</a>
            <a href="/admin/services" className="block px-4 py-2 rounded-lg bg-orange-primary/10 text-orange-primary">Services</a>
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

        <div className="px-4 py-8 pt-4">
          {/* Header */}
          <motion.div className="flex justify-between items-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div>
              <h1 className="text-4xl font-bold mb-2">Services</h1>
              <p className="text-gray-light/60">Manage your service offerings</p>
            </div>

        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-orange-primary to-red-orange text-white rounded-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showForm ? 'Cancel' : '+ Add Service'}
        </motion.button>
      </motion.div>

      {/* Add Service Form */}
      {showForm && (
        <motion.div
          className="glass rounded-2xl p-8 border border-orange-primary/20 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Add New Service</h2>
          <form onSubmit={handleAddService} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Service Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Icon (Emoji)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary text-3xl"
                maxLength={2}
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-primary to-red-orange text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-primary/50 transition-all"
            >
              Add Service
            </button>
          </form>
        </motion.div>
      )}

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {loading ? (
          <div className="text-center py-12 col-span-full">
            <p className="text-gray-light/60">Loading services...</p>
          </div>
        ) : services.length > 0 ? (
          services.map((service, index) => (
            <motion.div
              key={service.id}
              className="glass rounded-2xl p-6 border border-orange-primary/20 group hover:border-orange-primary/50 transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-primary transition-colors">{service.name}</h3>
              <p className="text-gray-light/70 text-sm mb-4 line-clamp-2">{service.description}</p>
              <motion.button
                onClick={() => handleDeleteService(service.id)}
                className="text-red-400 hover:text-red-300 text-sm transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Delete Service
              </motion.button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-light/60 mb-4">No services yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-orange-primary text-white rounded-lg hover:bg-orange-bright transition-colors"
            >
              Create Your First Service
            </button>
          </div>
        )}
      </motion.div>
        </div>
      </div>
    </div>
  )
}
