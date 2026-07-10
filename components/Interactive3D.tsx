'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Interactive3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    let mouseX = canvas.offsetWidth / 2
    let mouseY = canvas.offsetHeight / 2
    let rotationX = 0
    let rotationY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      rotationY = (mouseX / rect.width) * Math.PI
      rotationX = (mouseY / rect.height) * Math.PI
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 3D Cube vertices
    const vertices = [
      [-100, -100, -100],
      [100, -100, -100],
      [100, 100, -100],
      [-100, 100, -100],
      [-100, -100, 100],
      [100, -100, 100],
      [100, 100, 100],
      [-100, 100, 100],
    ]

    // Cube edges
    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ]

    const rotateX = (point: number[], angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [
        point[0],
        point[1] * cos - point[2] * sin,
        point[1] * sin + point[2] * cos,
      ]
    }

    const rotateY = (point: number[], angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [
        point[0] * cos + point[2] * sin,
        point[1],
        -point[0] * sin + point[2] * cos,
      ]
    }

    const project = (point: number[], scale: number) => {
      const z = 300 + point[2]
      const x = (point[0] * scale) / z + canvas.offsetWidth / 2
      const y = (point[1] * scale) / z + canvas.offsetHeight / 2
      return [x, y, z]
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 1)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Transform vertices
      const projectedPoints = vertices.map((vertex) => {
        let point = [...vertex]
        point = rotateX(point, rotationX * 0.5)
        point = rotateY(point, rotationY * 0.5)
        return project(point, 200)
      })

      // Draw edges
      edges.forEach(([start, end]) => {
        const p1 = projectedPoints[start]
        const p2 = projectedPoints[end]

        // Color based on depth
        const avgZ = (p1[2] + p2[2]) / 2
        const intensity = Math.max(0, Math.min(1, (avgZ - 100) / 400))
        const hue = 20 + intensity * 40 // Orange to red-orange
        const saturation = 100 - intensity * 30

        ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${40 + intensity * 20}%)`
        ctx.lineWidth = 2 + intensity
        ctx.shadowBlur = 15
        ctx.shadowColor = `hsl(${hue}, ${saturation}%, 60%)`

        ctx.beginPath()
        ctx.moveTo(p1[0], p1[1])
        ctx.lineTo(p2[0], p2[1])
        ctx.stroke()
      })

      // Draw vertices
      projectedPoints.forEach((point) => {
        const intensity = Math.max(0, Math.min(1, (point[2] - 100) / 400))
        ctx.fillStyle = `rgba(255, ${107 + intensity * 50}, 53, ${0.6 + intensity * 0.4})`
        ctx.shadowBlur = 20
        ctx.shadowColor = 'rgba(255, 107, 53, 0.8)'
        ctx.beginPath()
        ctx.arc(point[0], point[1], 4 + intensity * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-96 relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl bg-gradient-to-br from-dark-surface to-dark-bg cursor-pointer"
        style={{ display: 'block' }}
      />
      <div className="absolute inset-0 pointer-events-none rounded-2xl border border-orange-primary/20" />
    </motion.div>
  )
}
