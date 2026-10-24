'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProjects, type Project } from '@/lib/api'
import WebsitePreview from '@/components/WebsitePreview'

export default function WorkPreview() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data.slice(0, 3))
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
          <div className="py-12 text-gray-secondary font-mono text-sm">$ loading work...</div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.website_url || '/portfolio'}
                target={project.website_url ? '_blank' : undefined}
                rel={project.website_url ? 'noopener noreferrer' : undefined}
                className="group block rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden hover:border-orange-primary/40 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="w-2 h-2 rounded-full bg-white/15" />
                    <span className="w-2 h-2 rounded-full bg-white/15" />
                    <span className="w-2 h-2 rounded-full bg-white/15" />
                  </div>
                  <div className="flex-1 min-w-0 px-2 py-0.5 rounded bg-dark-bg border border-white/5 text-[10px] text-gray-secondary truncate font-mono">
                    {project.website_url ? project.website_url.replace(/^https?:\/\//, '') : project.name}
                  </div>
                </div>
                <WebsitePreview
                  url={project.website_url}
                  screenshotUrl={project.screenshot_url}
                  title={project.name}
                  fallbackLabel={project.company_name}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-light group-hover:text-orange-primary transition-colors mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-secondary line-clamp-2">{project.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="py-12 text-gray-secondary font-mono text-sm">
            // projects are managed from the admin panel — none published yet.
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
