'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { getProjects, type Project } from '@/lib/api'
import WebsitePreview from '@/components/WebsitePreview'

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', ...new Set(projects.map((p) => p.category))]

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <main className="w-full bg-dark-bg">
      <Navigation />

      {/* Page header */}
      <section className="relative w-full pt-40 pb-16 px-6 sm:px-10 lg:px-16 border-b border-white/10">
        <motion.p
          className="text-xs font-semibold tracking-[0.3em] text-orange-primary mb-6 uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Selected work
        </motion.p>
        <motion.h1
          className="display-type text-5xl md:text-7xl text-gray-light mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Real projects, <span className="text-orange-primary">real outcomes.</span>
        </motion.h1>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap gap-6 mt-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm font-medium tracking-wide pb-2 border-b-2 transition-colors ${
                selectedCategory === category
                  ? 'text-orange-primary border-orange-primary'
                  : 'text-gray-secondary border-transparent hover:text-gray-light'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Projects grid — browser-mockup cards */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="py-12 text-gray-secondary font-mono text-sm">$ loading projects...</div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.a
                  key={project.id}
                  href={project.website_url || undefined}
                  target={project.website_url ? '_blank' : undefined}
                  rel={project.website_url ? 'noopener noreferrer' : undefined}
                  className="group block"
                  style={{ perspective: 1000 }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <motion.div
                    className="rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden group-hover:border-orange-primary/40 transition-colors"
                    whileHover={{ rotateX: 2, rotateY: -2, scale: 1.015 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                      <div className="flex gap-1.5" aria-hidden="true">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      </div>
                      <div className="flex-1 min-w-0 px-3 py-1 rounded-md bg-dark-bg border border-white/5 text-[11px] text-gray-secondary truncate font-mono">
                        {project.website_url
                          ? project.website_url.replace(/^https?:\/\//, '')
                          : project.screenshot_url
                          ? project.name
                          : 'no link available'}
                      </div>
                    </div>

                    {/* Live preview of the actual site, or a screenshot for apps */}
                    <WebsitePreview
                      url={project.website_url}
                      screenshotUrl={project.screenshot_url}
                      title={project.name}
                      fallbackLabel={project.company_name}
                    />
                  </motion.div>

                  {/* Details below the mockup */}
                  <div className="pt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-xl font-bold text-gray-light group-hover:text-orange-primary transition-colors">
                          {project.name}
                        </h3>
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            project.status === 'Completed'
                              ? 'bg-green-500/15 text-green-400'
                              : project.status === 'Pending'
                              ? 'bg-yellow-500/15 text-yellow-400'
                              : 'bg-orange-primary/15 text-orange-primary'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-orange-primary font-medium mb-2">{project.company_name}</p>
                      <p className="text-gray-secondary text-sm">{project.description}</p>
                    </div>
                    {project.website_url && (
                      <span
                        className="shrink-0 mt-1 text-orange-primary text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <div className="py-12 text-gray-secondary font-mono text-sm">
              // no projects in this category yet.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
