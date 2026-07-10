'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  color: string
}

interface Cluster {
  x: number
  y: number
  particles: Particle[]
  label: string
  value: number
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

    let mouseX = canvas.offsetWidth / 2
    let mouseY = canvas.offsetHeight / 2
    let time = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Create data clusters
    const clusters: Cluster[] = [
      { x: canvas.offsetWidth * 0.2, y: canvas.offsetHeight * 0.3, particles: [], label: 'Web Dev', value: 95 },
      { x: canvas.offsetWidth * 0.8, y: canvas.offsetHeight * 0.3, particles: [], label: 'Mobile', value: 87 },
      { x: canvas.offsetWidth * 0.5, y: canvas.offsetHeight * 0.7, particles: [], label: 'AI/ML', value: 92 },
      { x: canvas.offsetWidth * 0.3, y: canvas.offsetHeight * 0.8, particles: [], label: 'Cloud', value: 89 },
      { x: canvas.offsetWidth * 0.7, y: canvas.offsetHeight * 0.8, particles: [], label: 'DevOps', value: 91 },
    ]

    // Initialize particles for each cluster
    clusters.forEach((cluster) => {
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 80 + 20
        cluster.particles.push({
          x: cluster.x + Math.cos(angle) * distance,
          y: cluster.y + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
          life: 1,
          maxLife: Math.random() * 2 + 1,
          color: `hsl(${20 + Math.random() * 40}, 100%, 50%)`,
        })
      }
    })

    let frameCount = 0
    let lastTime = Date.now()

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      time += 0.01

      // Update and draw clusters
      clusters.forEach((cluster) => {
        // Attract cluster towards mouse
        const dx = mouseX - cluster.x
        const dy = mouseY - cluster.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const attraction = Math.max(0, 1 - distance / 300)

        cluster.x += dx * attraction * 0.02
        cluster.y += dy * attraction * 0.02

        // Keep clusters in bounds
        cluster.x = Math.max(50, Math.min(canvas.offsetWidth - 50, cluster.x))
        cluster.y = Math.max(50, Math.min(canvas.offsetHeight - 50, cluster.y))

        // Update particles
        cluster.particles.forEach((particle, index) => {
          particle.life -= 0.01
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vy += 0.05 // Gravity

          // Attract to cluster center
          const toCenterX = cluster.x - particle.x
          const toCenterY = cluster.y - particle.y
          const toCenterDist = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY)

          if (toCenterDist > 150) {
            particle.vx += (toCenterX / toCenterDist) * 0.1
            particle.vy += (toCenterY / toCenterDist) * 0.1
          }

          // Respawn dead particles
          if (particle.life <= 0) {
            const angle = Math.random() * Math.PI * 2
            const distance = Math.random() * 80 + 20
            cluster.particles[index] = {
              x: cluster.x + Math.cos(angle) * distance,
              y: cluster.y + Math.sin(angle) * distance,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              size: Math.random() * 2 + 1,
              life: 1,
              maxLife: Math.random() * 2 + 1,
              color: particle.color,
            }
          }

          // Draw particle
          const opacity = Math.max(0, particle.life)
          const hue = 20 + (Math.sin(time + index) * 20)
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${opacity * 0.8})`
          ctx.shadowBlur = 10
          ctx.shadowColor = `hsla(${hue}, 100%, 60%, ${opacity})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        })

        // Draw cluster core
        const coreSize = Math.sin(time) * 5 + 15
        ctx.fillStyle = `hsla(20, 100%, 60%, 0.6)`
        ctx.shadowBlur = 20
        ctx.shadowColor = `hsla(20, 100%, 60%, 1)`
        ctx.beginPath()
        ctx.arc(cluster.x, cluster.y, coreSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw cluster label with value
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.font = 'bold 14px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(cluster.label, cluster.x, cluster.y + 50)
        ctx.fillStyle = 'rgba(255, 107, 53, 0.9)'
        ctx.font = 'bold 16px Arial'
        ctx.fillText(`${cluster.value}%`, cluster.x, cluster.y + 68)
      })

      // Draw connecting lines between clusters
      for (let i = 0; i < clusters.length; i++) {
        for (let j = i + 1; j < clusters.length; j++) {
          const c1 = clusters[i]
          const c2 = clusters[j]
          const dx = c2.x - c1.x
          const dy = c2.y - c1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 400) {
            const opacity = Math.max(0, 1 - distance / 400)
            ctx.strokeStyle = `rgba(255, 107, 53, ${opacity * 0.3})`
            ctx.lineWidth = 1 + opacity
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
      window.removeEventListener('mousemove', handleMouseMove)
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
        className="w-full h-full rounded-2xl bg-gradient-to-br from-dark-surface to-dark-bg cursor-crosshair"
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
