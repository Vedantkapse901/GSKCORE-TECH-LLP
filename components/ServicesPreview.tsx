'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getServices, type Service } from '@/lib/api'
import IconCard from '@/components/IconCard'

const sideLabel = ['IDEA', 'DESIGN', 'DEVELOP', 'DELIVER']

export default function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices()
        setServices(data.slice(0, 6))
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <section className="relative w-full py-20 md:py-28 bg-dark-surface border-t border-white/10 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute -left-40 top-1/4 w-[32rem] h-[32rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.12), transparent 70%)' }}
      />
      <div
        className="absolute right-0 bottom-0 w-[24rem] h-[24rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.08), transparent 70%)' }}
      />

      {/* Vertical process label, right edge */}
      <div className="hidden lg:flex flex-col items-center gap-6 absolute right-10 top-1/2 -translate-y-1/2">
        {sideLabel.map((word, i) => (
          <span
            key={word}
            className="text-[11px] tracking-[0.3em] text-gray-secondary/60"
            style={{ writingMode: 'vertical-rl' }}
          >
            {word}
            {i < sideLabel.length - 1 && <span className="text-orange-primary/50"> · </span>}
          </span>
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          className="mb-16 flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <p className="text-xs font-semibold tracking-[0.3em] text-orange-primary uppercase">
                What we do
              </p>
              <span className="h-px w-16 bg-orange-primary/40" />
            </div>
            <h2 className="display-type text-4xl md:text-6xl text-gray-light mb-4">
              Built for <span className="text-orange-primary">real problems.</span>
            </h2>
            <p className="text-gray-secondary max-w-xl">
              We turn ideas into working digital products — from websites to mobile apps, built to
              be fast, scalable, and genuinely useful.
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="py-12 text-gray-secondary">Loading services…</div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <IconCard
                key={service.id}
                index={index}
                icon={service.icon || '✦'}
                title={service.name}
                description={service.description}
                href="/services"
                hrefLabel={`Learn more about ${service.name}`}
                delay={index * 0.06}
              />
            ))}
          </div>
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
