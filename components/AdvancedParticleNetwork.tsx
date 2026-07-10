'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

interface Cluster {
  x: number
  y: number
  particles: Particle[]
  label: string
  value: number
  coreSize: number
}

export default function AdvancedParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stats, setStats] = useState({ fps: 0, particles: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

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

    // Create data clusters with FIXED positions (no mouse interaction)
    const clusters: Cluster[] = [
      { x: canvas.offsetWidth * 0.15, y: canvas.offsetHeight * 0.3, particles: [], label: 'Web Dev', value: 95, coreSize: 0 },
      { x: canvas.offsetWidth * 0.85, y: canvas.offsetHeight * 0.3, particles: [], label: 'Mobile', value: 87, coreSize: 0 },
      { x: canvas.offsetWidth * 0.5, y: canvas.offsetHeight * 0.75, particles: [], label: 'AI/ML', value: 92, coreSize: 0 },
      { x: canvas.offsetWidth * 0.25, y: canvas.offsetHeight * 0.6, particles: [], label: 'Cloud', value: 89, coreSize: 0 },
      { x: canvas.offsetWidth * 0.75, y: canvas.offsetHeight * 0.6, particles: [], label: 'DevOps', value: 91, coreSize: 0 },
    ]

    // Initialize particles for each cluster
    clusters.forEach((cluster, clusterIdx) => {
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 50 + 5
        cluster.particles.push({
          x: cluster.x + Math.cos(angle) * distance,
          y: cluster.y + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.4,
          hue: 20 + clusterIdx * 8,
        })
      }
    })

    let frameCount = 0
    let lastTime = Date.now()

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(10, 10, 10, 0.2)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      time += 0.016

      // Update and draw each cluster independently
      clusters.forEach((cluster, clusterIdx) => {
        // Update particles within this cluster
        cluster.particles.forEach((particle, pIdx) => {
          particle.x += particle.vx
          particle.y += particle.vy

          // Damping
          particle.vx *= 0.96
          particle.vy *= 0.96

          // Attract to cluster center with STRONG force
          const toCenterX = cluster.x - particle.x
          const toCenterY = cluster.y - particle.y
          const toCenterDist = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY)

          if (toCenterDist > 0) {
            const force = toCenterDist > 70 ? 0.2 : 0.08
            particle.vx += (toCenterX / toCenterDist) * force
            particle.vy += (toCenterY / toCenterDist) * force
          }

          // Keep particle from escaping cluster (hard boundary)
          if (toCenterDist > 100) {
            particle.x = cluster.x + (toCenterX / toCenterDist) * 95
            particle.y = cluster.y + (toCenterY / toCenterDist) * 95
          }

          // Opacity oscillation
          particle.opacity = 0.4 + Math.sin(time * 0.8 + pIdx) * 0.3

          // Draw particle
          const hue = particle.hue + Math.sin(time * 0.5 + pIdx * 0.1) * 15
          ctx.fillStyle = `hsla(${hue}, 100%, 55%, ${particle.opacity})`
          ctx.shadowBlur = 8
          ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.6)`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        })

        // Draw cluster core with pulsing effect
        cluster.coreSize = Math.sin(time * 1.2 + clusterIdx) * 6 + 18
        const coreHue = 20 + clusterIdx * 8
        ctx.fillStyle = `hsla(${coreHue}, 100%, 50%, 0.9)`
        ctx.shadowBlur = 30
        ctx.shadowColor = `hsla(${coreHue}, 100%, 55%, 1)`
        ctx.beginPath()
        ctx.arc(cluster.x, cluster.y, cluster.coreSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw outer glow ring
        ctx.strokeStyle = `hsla(${coreHue}, 100%, 60%, 0.5)`
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.arc(cluster.x, cluster.y, cluster.coreSize + 12, 0, Math.PI * 2)
        ctx.stroke()

        // Draw cluster label
        ctx.shadowBlur = 0
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.font = 'bold 12px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(cluster.label, cluster.x, cluster.y + cluster.coreSize + 45)

        ctx.fillStyle = `hsla(${coreHue}, 100%, 65%, 1)`
        ctx.font = 'bold 15px Arial'
        ctx.fillText(`${cluster.value}%`, cluster.x, cluster.y + cluster.coreSize + 63)
      })

      // Draw connecting lines between nearby clusters
      ctx.shadowBlur = 8
      for (let i = 0; i < clusters.length; i++) {
        for (let j = i + 1; j < clusters.length; j++) {
          const c1 = clusters[i]
          const c2 = clusters[j]
          const dx = c2.x - c1.x
          const dy = c2.y - c1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 450) {
            const opacity = (1 - distance / 450) * 0.15
            ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(c1.x, c1.y)
            ctx.lineTo(c2.x, c2.y)
            ctx.stroke()
          }
        }
      }

      // FPS counter
      frameCount++
      const now = Date.now()
      if (now - lastTime >= 1000) {
        setStats({ fps: frameCount, particles: clusters.reduce((sum, c) => sum + c.particles.length, 0) })
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

      {/* Stats overlay */}
      <motion.div
        className="absolute top-4 right-4 glass rounded-lg px-4 py-2 text-sm text-orange-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div>FPS: {stats.fps}</div>
        <div>Particles: {stats.particles}</div>
      </motion.div>
    </motion.div>
  )
}
