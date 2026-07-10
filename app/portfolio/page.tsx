'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce solution with real-time inventory management',
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Secure banking application with biometric authentication',
    technologies: ['Flutter', 'Firebase', 'REST API', 'Encryption'],
  },
  {
    id: 3,
    title: 'AI Chat Assistant',
    category: 'AI Automation',
    description: 'Intelligent chatbot powered by advanced NLP algorithms',
    technologies: ['Python', 'OpenAI API', 'Machine Learning', 'Node.js'],
  },
  {
    id: 4,
    title: 'Enterprise CRM',
    category: 'CRM Solutions',
    description: 'Custom CRM system for managing 50,000+ customer records',
    technologies: ['React', 'PostgreSQL', 'AWS', 'Python'],
  },
  {
    id: 5,
    title: 'Cloud Migration',
    category: 'Cloud Solutions',
    description: 'Seamless migration of legacy systems to AWS infrastructure',
    technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
  },
  {
    id: 6,
    title: 'Design System',
    category: 'UI/UX Design',
    description: 'Comprehensive design system for enterprise applications',
    technologies: ['Figma', 'React', 'Tailwind CSS', 'Storybook'],
  },
]

const categories = ['All', ...new Set(projects.map((p) => p.category))]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <main className="w-full bg-dark-bg">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-b from-dark-surface to-dark-bg pt-32 pb-20">
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass rounded-2xl p-8 cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 0 40px rgba(255, 107, 53, 0.3)',
                }}
              >
                {/* Category Tag */}
                <div className="inline-block px-3 py-1 bg-orange-primary/20 text-orange-primary text-sm font-semibold rounded-full mb-4">
                  {project.category}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-light/70 mb-6">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-dark-bg border border-orange-primary/30 rounded-full text-gray-light/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 mt-6 text-orange-primary font-semibold group-hover:gap-4 transition-all"
                >
                  View Project
                  <span>→</span>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
