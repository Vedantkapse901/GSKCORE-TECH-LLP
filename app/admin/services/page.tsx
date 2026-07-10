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
    }
  }

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id)

      if (error) throw error
      fetchServices()
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
  )
}
