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

export default function AdvancedParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [stats, setStats] = useState({ fps: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0

    // Create digital network nodes
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

    // Atom electron positions (orbiting around nucleus)
    const electron1 = { angle: 0, radius: 120, speed: 0.01 }
    const electron2 = { angle: Math.PI, radius: 120, speed: 0.01 }

    let frameCount = 0
    let lastTime = Date.now()

    const animate = () => {
      // Clear with fade
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      time += 0.016

      // Draw digital network background
      nodes.forEach((node, idx) => {
        // Update node position
        node.x += node.vx
        node.y += node.vy

        // Wrap around edges
        if (node.x < 0) node.x = canvas.offsetWidth
        if (node.x > canvas.offsetWidth) node.x = 0
        if (node.y < 0) node.y = canvas.offsetHeight
        if (node.y > canvas.offsetHeight) node.y = 0

        // Opacity pulse
        node.opacity = 0.2 + Math.sin(time * 0.5 + idx) * 0.15

        // Draw node
        ctx.fillStyle = `rgba(255, 107, 53, ${node.opacity})`
        ctx.shadowBlur = 6
        ctx.shadowColor = 'rgba(255, 107, 53, 0.4)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections between nearby nodes
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

      // Draw atom nucleus (center glow)
      const nucleusSize = Math.sin(time * 1.5) * 4 + 20
      ctx.fillStyle = 'rgba(255, 107, 53, 0.6)'
      ctx.shadowBlur = 40
      ctx.shadowColor = 'rgba(255, 107, 53, 1)'
      ctx.beginPath()
      ctx.arc(centerX, centerY, nucleusSize, 0, Math.PI * 2)
      ctx.fill()

      // Draw orbital rings
      ctx.strokeStyle = 'rgba(255, 107, 53, 0.2)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2)
      ctx.stroke()

      // Draw electrons (orbiting buttons)
      electron1.angle += electron1.speed
      electron2.angle += electron2.speed

      const e1X = centerX + Math.cos(electron1.angle) * electron1.radius
      const e1Y = centerY + Math.sin(electron1.angle) * electron1.radius
      const e2X = centerX + Math.cos(electron2.angle) * electron2.radius
      const e2Y = centerY + Math.sin(electron2.angle) * electron2.radius

      // Draw electron 1 glow
      ctx.fillStyle = 'rgba(255, 107, 53, 0.4)'
      ctx.shadowBlur = 20
      ctx.shadowColor = 'rgba(255, 107, 53, 0.8)'
      ctx.beginPath()
      ctx.arc(e1X, e1Y, 12, 0, Math.PI * 2)
      ctx.fill()

      // Draw electron 2 glow
      ctx.fillStyle = 'rgba(255, 107, 53, 0.4)'
      ctx.beginPath()
      ctx.arc(e2X, e2Y, 12, 0, Math.PI * 2)
      ctx.fill()

      // Store positions for button overlay
      ;(window as any).electronPos = { e1: { x: e1X, y: e1Y }, e2: { x: e2X, y: e2Y }, center: { x: centerX, y: centerY } }

      // FPS counter
      frameCount++
      const now = Date.now()
      if (now - lastTime >= 1000) {
        setStats({ fps: frameCount })
        frameCount = 0
        lastTime = now
      }

      ctx.shadowBlur = 0
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl bg-gradient-to-br from-dark-surface to-dark-bg cursor-default"
        style={{ display: 'block' }}
      />
      <div className="absolute inset-0 pointer-events-none rounded-2xl border border-orange-primary/20" />

      {/* Nucleus - Logo in center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-20 h-20 relative"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img src="/logo1.png" alt="GSK Core" className="w-full h-full object-contain" />
          <div className="absolute inset-0 rounded-full border-2 border-orange-primary/30 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.div>
      </div>

      {/* Electron 1 - Portfolio Button */}
      <motion.div
        className="absolute w-20 h-20 pointer-events-auto"
        style={{
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          x: [0, 120, 0],
          y: [0, 0, 120],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Link
          href="/portfolio"
          className="w-full h-full glass rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300 border-2 border-orange-primary/40 hover:border-orange-primary/80 hover:bg-orange-primary/20"
          title="View Portfolio"
        >
          📁
        </Link>
      </motion.div>

      {/* Electron 2 - Contact Button */}
      <motion.div
        className="absolute w-20 h-20 pointer-events-auto"
        style={{
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          x: [-120, 0, -120],
          y: [0, -120, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Link
          href="/contact"
          className="w-full h-full glass rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300 border-2 border-orange-primary/40 hover:border-orange-primary/80 hover:bg-orange-primary/20"
          title="Get in Touch"
        >
          📱
        </Link>
      </motion.div>

      {/* Stats overlay */}
      <motion.div
        className="absolute top-4 right-4 glass rounded-lg px-4 py-2 text-sm text-orange-primary border border-orange-primary/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div>FPS: {stats.fps}</div>
      </motion.div>
    </motion.div>
  )
}
