'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

interface Category {
  id: string
  name: string
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [formData, setFormData] = useState({
    company_name: '',
    name: '',
    category: '',
    description: '',
    website_url: '',
    logo_url: '',
    status: 'Completed',
  })

  useEffect(() => {
    fetchProjects()
    fetchCategories()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        const { error } = await supabase
          .from('projects')
          .update({
            company_name: formData.company_name,
            name: formData.name,
            category: formData.category,
            description: formData.description,
            website_url: formData.website_url,
            logo_url: formData.logo_url,
            status: formData.status,
          })
          .eq('id', editingId)

        if (error) throw error
        alert('Project updated successfully!')
      } else {
        const { error } = await supabase.from('projects').insert([
          {
            company_name: formData.company_name,
            name: formData.name,
            category: formData.category,
            description: formData.description,
            website_url: formData.website_url,
            logo_url: formData.logo_url,
            status: formData.status,
          },
        ])

        if (error) throw error
        alert('Project added successfully!')
      }

      setFormData({
        company_name: '',
        name: '',
        category: '',
        description: '',
        website_url: '',
        logo_url: '',
        status: 'Completed',
      })
      setShowForm(false)
      setEditingId(null)
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      const errorMsg = error instanceof Error ? error.message : 'Please try again'
      alert(`Failed to save project: ${errorMsg}`)
    }
  }

  const handleEditProject = (project: Project) => {
    setFormData({
      company_name: project.company_name,
      name: project.name,
      category: project.category,
      description: project.description,
      website_url: project.website_url,
      logo_url: project.logo_url,
      status: project.status,
    })
    setEditingId(project.id)
    setShowForm(true)
  }

  const handleCancelEdit = () => {
    setFormData({
      company_name: '',
      name: '',
      category: '',
      description: '',
      website_url: '',
      logo_url: '',
      status: 'Completed',
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id)

        if (error) throw error
        fetchProjects()
        alert('Project deleted successfully!')
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project.')
      }
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        className="fixed left-0 top-20 h-[calc(100vh-80px)] bg-dark-surface border-r border-orange-primary/20 overflow-y-auto z-40"
        animate={{ width: sidebarOpen ? 256 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {sidebarOpen && (
          <div className="p-6 space-y-4">
            <a href="/admin" className="block px-4 py-2 rounded-lg hover:bg-orange-primary/10 text-gray-light">Dashboard</a>
            <a href="/admin/projects" className="block px-4 py-2 rounded-lg bg-orange-primary/10 text-orange-primary">Projects</a>
            <a href="/admin/services" className="block px-4 py-2 rounded-lg hover:bg-orange-primary/10 text-gray-light">Services</a>
            <hr className="border-orange-primary/20" />
            <a href="/" className="block px-4 py-2 rounded-lg hover:bg-orange-primary/10 text-gray-light">Back to Site</a>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Hamburger Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-6 right-4 z-50 p-2 rounded-lg hover:bg-orange-primary/20"
        >
          <motion.div animate={sidebarOpen ? { rotate: 90 } : { rotate: 0 }}>
            <svg className="w-6 h-6 text-orange-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.div>
        </button>

        <div className="px-4 py-8 pt-4">
          <motion.div
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">Projects</h1>
              <p className="text-gray-light/60">Manage all your projects</p>
            </div>

        <motion.button
          onClick={() => handleCancelEdit()}
          className="px-6 py-3 bg-gradient-to-r from-orange-primary to-red-orange text-white rounded-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showForm ? 'Cancel' : '+ Add Project'}
        </motion.button>
      </motion.div>

      {showForm && (
        <motion.div
          className="glass rounded-2xl p-8 border border-orange-primary/20 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={handleSubmitProject} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
                  placeholder="e.g., TechStart Inc"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
                  placeholder="e.g., E-Commerce Platform"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary resize-none"
                placeholder="Brief description of the project..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={formData.website_url}
                onChange={(e) =>
                  setFormData({ ...formData, website_url: e.target.value })
                }
                className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
                placeholder="https://example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Company Logo URL
              </label>
              <input
                type="url"
                value={formData.logo_url}
                onChange={(e) =>
                  setFormData({ ...formData, logo_url: e.target.value })
                }
                className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
                placeholder="https://example.com/logo.png"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-primary to-red-orange text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-primary/50 transition-all"
            >
              {editingId ? 'Update Project' : 'Add Project'}
            </button>
          </form>
        </motion.div>
      )}

      <motion.div
        className="glass rounded-2xl p-8 border border-orange-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-6">All Projects</h2>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-light/60">Loading projects...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-7 gap-4 mb-4 pb-4 border-b border-orange-primary/20 font-semibold text-gray-light/70">
                <div>Company</div>
                <div>Project</div>
                <div>Category</div>
                <div>Status</div>
                <div>Website</div>
                <div className="col-span-2">Actions</div>
              </div>

              <div className="space-y-2">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="grid grid-cols-7 gap-4 p-4 bg-dark-bg/50 rounded-lg hover:bg-orange-primary/10 transition-colors items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="font-semibold text-orange-primary break-words">
                      {project.company_name}
                    </div>
                    <div className="font-semibold break-words">{project.name}</div>
                    <div className="text-gray-light/70 break-words">
                      {project.category}
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                          project.status === 'Completed'
                            ? 'bg-green-500/20 text-green-400'
                            : project.status === 'In Progress'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="text-sm">
                      <a
                        href={project.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-primary hover:text-orange-bright transition-colors truncate max-w-xs block"
                        title={project.website_url}
                      >
                        🔗 Visit
                      </a>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEditProject(project)}
                        className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteProject(project.id)}
                        className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-light/60 mb-4">No projects yet</p>
            <motion.button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-orange-primary text-white rounded-lg hover:bg-orange-bright transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your First Project
            </motion.button>
          </div>
        )}
      </motion.div>
        </div>
      </div>
    </div>
  )
}
