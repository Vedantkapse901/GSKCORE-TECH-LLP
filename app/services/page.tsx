'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Service {
  id: string
  name: string
  title: string
  description: string
  icon: string
  created_at: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full bg-dark-bg">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-b from-dark-surface to-dark-bg pt-56 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Our <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-gray-light/70 max-w-3xl mx-auto text-xl">
              Comprehensive solutions tailored to transform your business. Hover over any service to explore what we offer.
            </p>
          </motion.div>

          {/* Services Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-light/60">Loading services...</p>
            </div>
          ) : services.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="glass rounded-2xl p-8 text-center group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: '0 0 30px rgba(255, 107, 53, 0.2)',
                  }}
                >
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-light/70 text-sm mb-3">{service.title}</p>
                  <p className="text-gray-light/60">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-light/60">No services available yet</p>
            </div>
          )}


          {/* CTA */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
            <motion.a
              href="/contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-orange-primary to-red-orange rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-orange-primary/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Consultation
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
