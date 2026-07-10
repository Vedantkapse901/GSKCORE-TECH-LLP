'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServicesGrid from '@/components/ServicesGrid'

export default function ServicesPage() {
  return (
    <main className="w-full bg-dark-bg">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-b from-dark-surface to-dark-bg pt-32 pb-20">
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ServicesGrid />
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              {
                title: 'Custom Solutions',
                description: 'We tailor every solution to your specific business needs and goals.',
              },
              {
                title: 'Expert Team',
                description: 'Our team of 50+ specialists brings years of experience across industries.',
              },
              {
                title: 'Proven Track Record',
                description: '200+ successful projects delivered to satisfied clients worldwide.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-8"
                whileHover={{ y: -10, boxShadow: '0 0 30px rgba(255, 107, 53, 0.2)' }}
              >
                <h3 className="text-2xl font-bold mb-4 text-orange-primary">{item.title}</h3>
                <p className="text-gray-light/70">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

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
