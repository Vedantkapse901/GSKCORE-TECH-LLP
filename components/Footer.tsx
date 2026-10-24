'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getServices } from '@/lib/api'

const fallbackServiceLinks = [
  'Website Design & Development',
  'Mobile App Development',
  'Custom Web Applications',
  'AI-Powered Automation',
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gskcore-tech-llp' },
  { label: 'Instagram', href: 'https://instagram.com/gskcoretech' },
]

export default function Footer() {
  const beamRef = useRef<HTMLDivElement>(null)
  const [serviceLinks, setServiceLinks] = useState<string[]>(fallbackServiceLinks)

  useEffect(() => {
    getServices()
      .then((data) => {
        if (data.length > 0) setServiceLinks(data.slice(0, 5).map((s) => s.name))
      })
      .catch(() => {
        // keep the fallback list if the API is unreachable
      })
  }, [])

  useEffect(() => {
    const beam = beamRef.current
    if (!beam) return

    let frame: number
    const animate = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = max > 0 ? window.scrollY / max : 0
      beam.style.transform = `translateX(${scrollProgress * 100}%)`
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <footer className="relative w-full bg-dark-bg border-t border-white/10 py-16 overflow-hidden">
      <div
        ref={beamRef}
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-orange-primary to-transparent w-full"
        style={{ boxShadow: '0 0 20px rgba(255, 106, 0, 0.5)' }}
      />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 mb-4 relative">
              <Image src="/logo1.png" alt="GSKCORE TECH LLP" fill className="object-contain" />
            </div>
            <p className="text-gray-secondary text-sm leading-relaxed">
              Software development and digital product engineering — from the first idea to a
              production-ready website, app, or system.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mt-5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-secondary hover:text-orange-primary transition-colors text-sm font-medium"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="font-semibold mb-4 text-gray-light">Services</h4>
            <ul className="space-y-2 text-sm text-gray-secondary">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <Link href="/services" className="hover:text-orange-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="font-semibold mb-4 text-gray-light">Company</h4>
            <ul className="space-y-2 text-sm text-gray-secondary">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-orange-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h4 className="font-semibold mb-4 text-gray-light">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-gray-secondary">
              <li>
                <a href="mailto:gskcoretech@gmail.com" className="hover:text-orange-primary transition-colors">
                  gskcoretech@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918369813323" className="hover:text-orange-primary transition-colors">
                  +91 83698 13323
                </a>
              </li>
              <li className="text-gray-secondary/80">India</li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/10 py-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-secondary">
          <p>&copy; {new Date().getFullYear()} GSKCORE TECH LLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
