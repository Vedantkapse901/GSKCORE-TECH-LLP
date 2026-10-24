'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function TechNetwork3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.z = 11

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // --- Build a sphere of nodes, connected if close enough ---
    const NODE_COUNT = 70
    const RADIUS = 6
    const positions: THREE.Vector3[] = []

    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT)
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi
      const r = RADIUS * (0.75 + Math.random() * 0.25)
      positions.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        )
      )
    }

    const group = new THREE.Group()
    scene.add(group)

    // Points
    const pointGeo = new THREE.BufferGeometry().setFromPoints(positions)
    const pointMat = new THREE.PointsMaterial({
      color: 0xff9a24,
      size: 0.12,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    group.add(new THREE.Points(pointGeo, pointMat))

    // Connective lines between nearby nodes
    const linePositions: number[] = []
    const LINK_DIST = 3.4
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < LINK_DIST) {
          linePositions.push(positions[i].x, positions[i].y, positions[i].z)
          linePositions.push(positions[j].x, positions[j].y, positions[j].z)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xff6a00,
      transparent: true,
      opacity: 0.12,
    })
    group.add(new THREE.LineSegments(lineGeo, lineMat))

    // --- Resize handling ---
    const resize = () => {
      const { clientWidth, clientHeight } = container
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    // --- Mouse parallax ---
    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    let frameId: number
    const animate = () => {
      group.rotation.y += 0.0012
      group.rotation.x += (mouseY * 0.3 - group.rotation.x) * 0.02
      group.rotation.y += (mouseX * 0.3) * 0.0005
      renderer.render(scene, camera)
      if (!reduceMotion) frameId = requestAnimationFrame(animate)
    }

    if (reduceMotion) {
      renderer.render(scene, camera)
    } else {
      frameId = requestAnimationFrame(animate)
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      resizeObserver.disconnect()
      pointGeo.dispose()
      pointMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
