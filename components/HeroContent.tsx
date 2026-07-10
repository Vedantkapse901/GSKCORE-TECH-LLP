'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export default function HeroContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Parallax effect for elements
      const parallaxElements = document.querySelectorAll('[data-parallax]')
      parallaxElements.forEach((el) => {
        const depth = parseFloat((el as HTMLElement).dataset.parallax || '1')
        const x = (e.clientX * depth) / 100
        const y = (e.clientY * depth) / 100

        gsap.to(el, {
          x,
          y,
          duration: 0.5,
          overwrite: 'auto',
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating particles around text */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-primary rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 5}%`,
            }}
            animate={{
              y: [0, 40, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main headline */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          <span className="inline-block">Building</span>
          <br />
          <motion.span
            className="inline-block bg-gradient-to-r from-orange-primary via-orange-bright to-orange-golden bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Tomorrow's Digital
          </motion.span>
          <br />
          <span className="inline-block">Infrastructure</span>
        </h1>
      </motion.div>

      {/* Subheading */}
      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl max-w-3xl mb-12 text-gray-light/80 leading-relaxed"
      >
        From intelligent websites to enterprise software and AI-powered applications, we transform
        ambitious ideas into scalable digital products that drive real business value.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-24">
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-orange-primary to-red-orange rounded-lg font-semibold text-lg group relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Your Project
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-orange to-orange-golden opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.button
          className="px-8 py-4 border-2 border-orange-primary text-orange-primary rounded-lg font-semibold text-lg hover:bg-orange-primary/10 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center gap-2">
            View Portfolio
            <motion.span
              className="group-hover:translate-x-1"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↗
            </motion.span>
          </span>
        </motion.button>
      </motion.div>


      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-light/50">Scroll to explore</p>
          <svg
            className="w-6 h-6 text-orange-primary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}
