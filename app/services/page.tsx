'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServiceCodeCard from '@/components/ServiceCodeCard'
import { useEffect, useRef, useState } from 'react'
import { getServices, type Service } from '@/lib/api'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [typingIndex, setTypingIndex] = useState(-1)
  const sequenceStarted = useRef(false)

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
          Tap &quot;solves&quot; on any service below to see the kind of problem it actually
          addresses.
        </motion.p>
      </section>

      {/* Services grid — code-editor styled cards */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="py-12 text-gray-secondary font-mono text-sm">$ loading services...</div>
          ) : services.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onViewportEnter={() => {
                if (!sequenceStarted.current) {
                  sequenceStarted.current = true
                  setTypingIndex(0)
                }
              }}
              viewport={{ once: true, amount: 0.1 }}
            >
              {services.map((service, index) => (
                <ServiceCodeCard
                  key={service.id}
                  service={service}
                  index={index}
                  active={typingIndex === index}
                  onHeaderDone={() => setTypingIndex((i) => (i === index ? index + 1 : i))}
                />
              ))}
            </motion.div>
          ) : (
            <div className="py-12 text-gray-secondary font-mono text-sm">
              // services are managed from the admin panel — none published yet.
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
