'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getServices, type Service } from '@/lib/api'

export default function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices()
        setServices(data.slice(0, 8))
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <section className="relative w-full py-20 md:py-28 bg-dark-surface border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-orange-primary mb-5 uppercase">
            What we do
          </p>
          <h2 className="display-type text-4xl md:text-6xl text-gray-light">
            Built for <span className="text-orange-primary">real problems.</span>
          </h2>
        </motion.div>

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
                  className="w-full text-left py-7 flex items-center gap-6 group"
                  onClick={() => setActiveId((id) => (id === service.id ? null : service.id))}
                  aria-expanded={activeId === service.id}
                >
                  <span className="section-index text-sm text-gray-secondary w-10 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0 text-xl md:text-2xl font-bold text-gray-light group-hover:text-orange-primary transition-colors">
                    {service.name}
                  </span>
                  <span
                    className="text-orange-primary text-xl transition-transform duration-300 shrink-0"
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
                    <p className="pb-7 pl-16 pr-8 text-gray-secondary leading-relaxed max-w-2xl">
                      {service.title && <span className="text-orange-primary font-medium">{service.title}. </span>}
                      {service.description}
                    </p>
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

        <div className="mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gray-light hover:text-orange-primary transition-colors font-medium"
          >
            Explore all services →
          </Link>
        </div>
      </div>
    </section>
  )
}
