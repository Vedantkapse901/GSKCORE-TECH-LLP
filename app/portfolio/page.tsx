'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { getProjects, type Project } from '@/lib/api'

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

      {/* Projects list */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="py-12 text-gray-secondary">Loading projects…</div>
          ) : filteredProjects.length > 0 ? (
            <ul>
              {filteredProjects.map((project, index) => (
                <motion.li
                  key={project.id}
                  className="border-b border-white/10 first:border-t"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={project.website_url || undefined}
                    target={project.website_url ? '_blank' : undefined}
                    rel={project.website_url ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-10"
                  >
                    <span className="section-index text-sm text-gray-secondary w-10 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {project.logo_url ? (
                      <img
                        src={project.logo_url}
                        alt={project.company_name}
                        className="h-12 w-12 object-contain shrink-0 rounded-lg bg-white/5 p-2"
                      />
                    ) : (
                      <div className="h-12 w-12 shrink-0" />
                    )}

                    <span className="flex-1 min-w-0 block">
                      <span className="flex items-center gap-3 flex-wrap mb-1">
                        <span className="text-2xl md:text-4xl font-bold text-gray-light group-hover:text-orange-primary transition-colors">
                          {project.name}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            project.status === 'Completed'
                              ? 'bg-green-500/15 text-green-400'
                              : project.status === 'Pending'
                              ? 'bg-yellow-500/15 text-yellow-400'
                              : 'bg-orange-primary/15 text-orange-primary'
                          }`}
                        >
                          {project.status}
                        </span>
                      </span>
                      <span className="block text-sm text-orange-primary font-medium mb-2">
                        {project.company_name}
                      </span>
                      <span className="block text-gray-secondary max-w-xl">{project.description}</span>
                    </span>

                    <span className="shrink-0 flex items-center gap-4">
                      <span className="text-sm text-gray-secondary font-medium whitespace-nowrap">
                        {project.category}
                      </span>
                      {project.website_url && (
                        <span
                          className="text-orange-primary text-xl group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      )}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-gray-secondary">No projects in this category yet.</div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
