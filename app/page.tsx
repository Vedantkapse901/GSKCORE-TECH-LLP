'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import HeroContent from '@/components/HeroContent'
import Navigation from '@/components/Navigation'
import WhyChooseUs from '@/components/WhyChooseUs'
import Footer from '@/components/Footer'
import AdvancedParticleNetwork from '@/components/AdvancedParticleNetwork'

// Dynamic import of hero background to avoid SSR issues
const HeroBackground = dynamic(() => import('@/components/HeroBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-dark-surface to-dark-bg" />
  ),
})

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-dark-bg pt-20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <Suspense
          fallback={<div className="absolute inset-0 bg-gradient-to-b from-dark-surface to-dark-bg" />}
        >
          <HeroBackground />
        </Suspense>

        <HeroContent />
      </section>

      {/* Advanced Particle Network Section */}
      <section className="relative w-full py-24 bg-dark-bg border-t border-orange-primary/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Advanced <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Real-Time Visualization</span>
            </h2>
            <p className="text-gray-light/70 max-w-2xl mx-auto text-lg">
              Watch as dynamic particle clusters visualize our expertise across key domains. Move your mouse to interact with the network.
            </p>
          </motion.div>

          <motion.div
            className="h-96 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AdvancedParticleNetwork />
          </motion.div>

          <motion.p
            className="text-center mt-12 text-gray-light/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            This real-time particle network demonstrates our capability to build sophisticated, performance-optimized interactive experiences. Built with advanced Canvas rendering, physics simulation, and data visualization techniques.
          </motion.p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section>
        <WhyChooseUs />
      </section>

      <Footer />
    </main>
  )
}
