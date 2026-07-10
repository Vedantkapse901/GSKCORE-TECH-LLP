'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Footer() {
  const beamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const beam = beamRef.current
    if (!beam) return

    const animate = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (beam) {
        beam.style.transform = `translateX(${scrollProgress * 100}%)`
      }
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [])

  return (
    <footer className="relative w-full bg-dark-bg border-t border-orange-primary/10 py-16 overflow-hidden">
      {/* Animated light beam */}
      <div
        ref={beamRef}
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-orange-primary to-transparent w-full"
        style={{ boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)' }}
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="w-20 h-20 mb-4 relative">
              <Image
                src="/logo1.png"
                alt="GSKCORE Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-light/60 text-sm leading-relaxed">
              Building tomorrow's digital infrastructure through cutting-edge technology and creative
              excellence.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h4 className="font-semibold mb-4 text-gray-light">Services</h4>
            <ul className="space-y-2 text-sm text-gray-light/60">
              {['Website Development', 'Mobile Apps', 'AI Automation', 'CRM Solutions'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h4 className="font-semibold mb-4 text-gray-light">Company</h4>
            <ul className="space-y-2 text-sm text-gray-light/60">
              {['About Us', 'Portfolio', 'Careers', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h4 className="font-semibold mb-4 text-gray-light">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-gray-light/60">
              <li>
                <a href="mailto:hello@gskcore.com" className="hover:text-orange-primary transition-colors">
                  hello@gskcore.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-orange-primary transition-colors">
                  +91 9876 543 210
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-orange-primary/10 py-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-light/60">
          <p>&copy; 2026 GSKCORE TECH LLP. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" className="hover:text-orange-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
