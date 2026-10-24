'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import HeroContent from '@/components/HeroContent'
import Navigation from '@/components/Navigation'
import Capabilities from '@/components/Capabilities'
import ServicesPreview from '@/components/ServicesPreview'
import WorkPreview from '@/components/WorkPreview'
import WhyChooseUs from '@/components/WhyChooseUs'
import TechStack from '@/components/TechStack'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

// Dynamic import of hero background to avoid SSR issues
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
      <section id="hero-section" className="relative w-full h-screen overflow-hidden">
        <Suspense
          fallback={<div className="absolute inset-0 bg-gradient-to-b from-dark-surface to-dark-bg" />}
        >
          <HeroBackground />
        </Suspense>

        <HeroContent />
      </section>

      <Capabilities />
      <ServicesPreview />
      <WorkPreview />
      <WhyChooseUs />
      <TechStack />
      <CTASection />

      <Footer />
    </main>
  )
}
