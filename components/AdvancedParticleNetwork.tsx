'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface NetworkNode {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
}

interface ResponsiveValues {
  buttonSize: string
  innerOrbitRadius: number
  outerOrbitRadius: number
  logoSize: string
  fontSize: string
  ringRadius: number
}

export default function AdvancedParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [responsiveValues, setResponsiveValues] = useState<ResponsiveValues>({
    buttonSize: 'w-12 h-12',
    innerOrbitRadius: 80,
    outerOrbitRadius: 120,
    logoSize: 'w-16 h-16',
    fontSize: 'text-lg',
    ringRadius: 90,
  })

  const calculateResponsiveValues = () => {
    const container = containerRef.current
    if (!container) return

    const width = container.offsetWidth
    const height = container.offsetHeight

    let buttonSize: string
    let innerOrbitRadius: number
    let outerOrbitRadius: number
    let logoSize: string
    let fontSize: string
    let ringRadius: number

    // Mobile (< 640px)
    if (width < 640) {
      buttonSize = 'w-10 h-10'
      innerOrbitRadius = 60
      outerOrbitRadius = 100
      logoSize = 'w-12 h-12'
      fontSize = 'text-base'
      ringRadius = 80
    }
    // Tablet (640px - 1024px)
    else if (width < 1024) {
      buttonSize = 'w-12 h-12'
      innerOrbitRadius = 90
      outerOrbitRadius = 150
      logoSize = 'w-16 h-16'
      fontSize = 'text-lg'
      ringRadius = 120
    }
    // Desktop (> 1024px)
    else {
      buttonSize = 'w-14 h-14'
      innerOrbitRadius = 120
      outerOrbitRadius = 200
      logoSize = 'w-20 h-20'
      fontSize = 'text-2xl'
      ringRadius = 160
    }

    setResponsiveValues({ buttonSize, innerOrbitRadius, outerOrbitRadius, logoSize, fontSize, ringRadius })
  }

  useEffect(() => {
    calculateResponsiveValues()
    window.addEventListener('resize', calculateResponsiveValues)
    return () => window.removeEventListener('resize', calculateResponsiveValues)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0

    const nodes: NetworkNode[] = []
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.2,
      })
    }

    const centerX = canvas.offsetWidth / 2
    const centerY = canvas.offsetHeight / 2

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      time += 0.016

      nodes.forEach((node, idx) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0) node.x = canvas.offsetWidth
        if (node.x > canvas.offsetWidth) node.x = 0
        if (node.y < 0) node.y = canvas.offsetHeight
        if (node.y > canvas.offsetHeight) node.y = 0

        node.opacity = 0.2 + Math.sin(time * 0.5 + idx) * 0.15

        ctx.fillStyle = `rgba(255, 107, 53, ${node.opacity})`
        ctx.shadowBlur = 6
        ctx.shadowColor = 'rgba(255, 107, 53, 0.4)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.strokeStyle = 'rgba(255, 107, 53, 0.08)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 200) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      const nucleusSize = Math.sin(time * 1.5) * 4 + 15
      ctx.fillStyle = 'rgba(255, 107, 53, 0.6)'
      ctx.shadowBlur = 40
      ctx.shadowColor = 'rgba(255, 107, 53, 1)'
      ctx.beginPath()
      ctx.arc(centerX, centerY, nucleusSize, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'rgba(255, 107, 53, 0.15)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, responsiveValues.innerOrbitRadius, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = 'rgba(255, 107, 53, 0.1)'
      ctx.beginPath()
      ctx.arc(centerX, centerY, responsiveValues.outerOrbitRadius, 0, Math.PI * 2)
      ctx.stroke()

      ctx.shadowBlur = 0
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [responsiveValues.ringRadius])

  const getOrbitKeyframes = () => {
    const innerR = responsiveValues.innerOrbitRadius
    const outerR = responsiveValues.outerOrbitRadius
    return {
      portfolio: {
        x: [0, innerR * 0.707, innerR, innerR * 0.707, 0, -innerR * 0.707, -innerR, -innerR * 0.707, 0],
        y: [-innerR, -innerR * 0.707, 0, innerR * 0.707, innerR, innerR * 0.707, 0, -innerR * 0.707, -innerR],
      },
      contact: {
        x: [0, -outerR * 0.707, -outerR, -outerR * 0.707, 0, outerR * 0.707, outerR, outerR * 0.707, 0],
        y: [outerR, outerR * 0.707, 0, -outerR * 0.707, -outerR, -outerR * 0.707, 0, outerR * 0.707, outerR],
      },
    }
  }

  const orbitFrames = getOrbitKeyframes()

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl bg-gradient-to-br from-dark-surface to-dark-bg cursor-default"
        style={{ display: 'block' }}
      />
      <div className="absolute inset-0 pointer-events-none rounded-2xl border border-orange-primary/20" />

      {/* Nucleus - Logo in center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className={`${responsiveValues.logoSize} relative`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img src="/logo1.png" alt="GSK Core" className="w-full h-full object-contain" />
          <div className="absolute inset-0 rounded-full border-2 border-orange-primary/30 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.div>
      </div>

      {/* Electron 1 - Portfolio Button (Orbiting) */}
      <motion.div
        className={`absolute ${responsiveValues.buttonSize} pointer-events-auto`}
        style={{
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          x: orbitFrames.portfolio.x,
          y: orbitFrames.portfolio.y,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Link
          href="/portfolio"
          data-electron="1"
          className={`w-full h-full glass rounded-full flex items-center justify-center ${responsiveValues.fontSize} hover:scale-110 transition-transform duration-300 border-2 border-orange-primary/40 hover:border-orange-primary/80 hover:bg-orange-primary/20 shadow-lg`}
          title="View Portfolio"
        >
          📁
        </Link>
      </motion.div>

      {/* Electron 2 - Contact Button (Orbiting - opposite direction) */}
      <motion.div
        className={`absolute ${responsiveValues.buttonSize} pointer-events-auto`}
        style={{
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          x: orbitFrames.contact.x,
          y: orbitFrames.contact.y,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Link
          href="/contact"
          data-electron="2"
          className={`w-full h-full glass rounded-full flex items-center justify-center ${responsiveValues.fontSize} hover:scale-110 transition-transform duration-300 border-2 border-orange-primary/40 hover:border-orange-primary/80 hover:bg-orange-primary/20 shadow-lg`}
          title="Get in Touch"
        >
          📱
        </Link>
      </motion.div>
    </motion.div>
  )
}
