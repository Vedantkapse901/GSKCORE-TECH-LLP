'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProjects, type Project } from '@/lib/api'

export default function WorkPreview() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data.slice(0, 4))
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section className="relative w-full py-20 md:py-28 bg-dark-bg border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-orange-primary mb-5 uppercase">
            Selected work
          </p>
          <h2 className="display-type text-4xl md:text-6xl text-gray-light">
            Real projects, <span className="text-orange-primary">real outcomes.</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="py-12 text-gray-secondary">Loading work…</div>
        ) : projects.length > 0 ? (
          <ul>
            {projects.map((project, index) => (
              <motion.li
                key={project.id}
                className="border-b border-white/10 first:border-t"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <a
                  href={project.website_url || '/portfolio'}
                  target={project.website_url ? '_blank' : undefined}
                  rel={project.website_url ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-10 py-10"
                >
                  <span className="section-index text-sm text-gray-secondary w-10 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0 block">
                    <span className="block text-2xl md:text-4xl font-bold text-gray-light group-hover:text-orange-primary transition-colors">
                      {project.name}
                    </span>
                    <span className="block text-gray-secondary mt-2 max-w-xl">{project.description}</span>
                  </span>
                  <span className="shrink-0 flex items-center gap-4">
                    <span className="text-sm text-orange-primary font-medium whitespace-nowrap">{project.category}</span>
                    <span className="text-orange-primary text-xl group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-gray-secondary">
            Projects are managed from the admin panel — none published yet.
          </div>
        )}

        <div className="mt-16">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-gray-light hover:text-orange-primary transition-colors font-medium"
          >
            View full portfolio →
          </Link>
        </div>
      </div>
    </section>
  )
}
