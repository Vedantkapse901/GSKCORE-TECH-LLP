'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import HeroContent from '@/components/HeroContent'
import Navigation from '@/components/Navigation'
import WhyChooseUs from '@/components/WhyChooseUs'
import Footer from '@/components/Footer'
import Interactive3D from '@/components/Interactive3D'

// Dynamic import of Three.js component to avoid SSR issues
const HeroBackground = dynamic(() => import('@/components/HeroBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-dark-surface to-dark-bg" />
  ),
})

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-dark-bg">
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

      {/* Interactive 3D Section */}
      <section className="relative w-full py-24 bg-dark-bg border-t border-orange-primary/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience Our <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Interactive Technology</span>
            </h2>
            <p className="text-gray-light/70 max-w-2xl mx-auto text-lg">
              Move your mouse over the cube to see our cutting-edge 3D technology in action
            </p>
          </motion.div>

          <Interactive3D />

          <motion.p
            className="text-center mt-8 text-gray-light/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            This is a glimpse of the immersive experiences we build for our clients
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
