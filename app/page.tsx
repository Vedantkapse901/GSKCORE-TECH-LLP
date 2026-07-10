'use client'

import dynamic from 'next/dynamic'
import HeroContent from '@/components/HeroContent'
import Navigation from '@/components/Navigation'
import ServicesSection from '@/components/ServicesSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import Footer from '@/components/Footer'
import { Suspense } from 'react'

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
      <section id="home" className="relative w-full h-screen overflow-hidden">
        <Suspense
          fallback={<div className="absolute inset-0 bg-gradient-to-b from-dark-surface to-dark-bg" />}
        >
          <HeroBackground />
        </Suspense>

        <HeroContent />
      </section>

      {/* Services Section */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* Why Choose Us */}
      <section id="about">
        <WhyChooseUs />
      </section>

      {/* Portfolio Placeholder */}
      <section id="portfolio" className="relative w-full min-h-screen bg-dark-bg border-t border-orange-primary/10 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Portfolio</span>
            </h2>
            <p className="text-gray-light/70 max-w-2xl mx-auto text-lg">
              Showcase of our latest and greatest projects.
            </p>
          </div>
          <div className="h-96 bg-gradient-to-br from-dark-surface to-dark-bg rounded-2xl border border-orange-primary/20 flex items-center justify-center">
            <p className="text-gray-light/50 text-xl">Portfolio Projects (Coming Soon)</p>
          </div>
        </div>
      </section>

      {/* Contact Placeholder */}
      <section id="contact" className="relative w-full min-h-screen bg-dark-bg border-t border-orange-primary/10 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Build Together?</span>
            </h2>
            <p className="text-gray-light/70 max-w-2xl mx-auto text-lg">
              Let's discuss your project and turn your vision into reality.
            </p>
          </div>
          <div className="h-96 bg-gradient-to-br from-dark-surface to-dark-bg rounded-2xl border border-orange-primary/20 flex items-center justify-center">
            <p className="text-gray-light/50 text-xl">Contact Form (Coming Soon)</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
