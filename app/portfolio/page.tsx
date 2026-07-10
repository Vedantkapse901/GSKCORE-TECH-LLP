'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  company_name: string
  name: string
  category: string
  description: string
  status: string
  website_url: string
  logo_url: string
  created_at: string
}

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
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
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

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-b from-dark-surface to-dark-bg pt-56 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Our <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-gray-light/70 max-w-3xl mx-auto text-xl">
              Showcasing 200+ successful projects across diverse industries and technologies
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-primary to-red-orange text-white'
                    : 'glass text-gray-light hover:text-orange-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-light/60">Loading projects...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.a
                  key={project.id}
                  href={project.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-8 cursor-pointer group block h-full flex flex-col"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: '0 0 40px rgba(255, 107, 53, 0.3)',
                  }}
                >
                  {/* Company Logo */}
                  {project.logo_url && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={project.logo_url}
                        alt={project.company_name}
                        className="h-16 object-contain"
                      />
                    </div>
                  )}

                  {/* Status Tag */}
                  <div className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
                    project.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400'
                      : project.status === 'Pending'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-orange-primary/20 text-orange-primary'
                  }`}>
                    {project.status}
                  </div>

                  {/* Category Tag */}
                  <div className="inline-block px-3 py-1 bg-orange-primary/20 text-orange-primary text-sm font-semibold rounded-full mb-4 ml-2">
                    {project.category}
                  </div>

                  {/* Company Name */}
                  <p className="text-sm text-orange-primary font-semibold mb-2">
                    {project.company_name}
                  </p>

                  {/* Project Title */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-primary transition-colors">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-light/70 mb-6">{project.description}</p>

                  {/* Date */}
                  <p className="text-sm text-gray-light/50 mb-4">
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>

                  {/* Visit Website Link */}
                  <motion.div
                    className="inline-flex items-center gap-2 mt-auto text-orange-primary font-semibold group-hover:gap-4 transition-all"
                  >
                    Visit Website
                    <span>↗</span>
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-light/60">No projects yet</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
