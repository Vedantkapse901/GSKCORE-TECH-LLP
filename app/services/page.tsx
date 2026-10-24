'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { getServices, type Service } from '@/lib/api'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const data = await getServices()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full bg-dark-bg">
      <Navigation />

      {/* Page header */}
      <section className="relative w-full pt-40 pb-20 px-6 sm:px-10 lg:px-16 border-b border-white/10">
        <motion.p
          className="text-xs font-semibold tracking-[0.3em] text-orange-primary mb-6 uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What we do
        </motion.p>
        <motion.h1
          className="display-type text-5xl md:text-7xl text-gray-light mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Services built for <span className="text-orange-primary">real problems.</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-secondary max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hover — or tap — any service below to see what it actually involves and the kind of
          problem it solves.
        </motion.p>
      </section>

      {/* Services list */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="py-12 text-gray-secondary">Loading services…</div>
          ) : services.length > 0 ? (
            <ul>
              {services.map((service, index) => (
                <motion.li
                  key={service.id}
                  className="border-b border-white/10 first:border-t"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <button
                    className="w-full text-left py-8 flex items-center gap-6 group"
                    onClick={() => setActiveId((id) => (id === service.id ? null : service.id))}
                    aria-expanded={activeId === service.id}
                  >
                    <span className="section-index text-sm text-gray-secondary w-10 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {service.icon && <span className="text-3xl shrink-0 hidden sm:block">{service.icon}</span>}
                    <span className="flex-1 min-w-0 text-2xl md:text-3xl font-bold text-gray-light group-hover:text-orange-primary transition-colors">
                      {service.name}
                    </span>
                    <span
                      className="text-orange-primary text-2xl transition-transform duration-300 shrink-0"
                      style={{ transform: activeId === service.id ? 'rotate(45deg)' : 'rotate(0deg)' }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 overflow-hidden"
                    style={{ gridTemplateRows: activeId === service.id ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-8 pl-16 pr-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        <p className="text-gray-secondary leading-relaxed max-w-2xl flex-1 min-w-0">
                          {service.title && (
                            <span className="text-orange-primary font-medium">{service.title}. </span>
                          )}
                          {service.description}
                        </p>
                        <a
                          href="/contact"
                          className="inline-flex items-center gap-2 text-gray-light hover:text-orange-primary transition-colors font-medium whitespace-nowrap shrink-0"
                        >
                          Start a conversation →
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-gray-secondary">
              Services are managed from the admin panel — none published yet.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-24 border-t border-white/10 text-center">
        <motion.h2
          className="display-type text-4xl md:text-5xl text-gray-light mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to get started?
        </motion.h2>
        <motion.a
          href="/contact"
          className="inline-block px-10 py-4 rounded-full bg-orange-primary text-black font-semibold text-lg hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Schedule a Consultation
        </motion.a>
      </section>

      <Footer />
    </main>
  )
}
