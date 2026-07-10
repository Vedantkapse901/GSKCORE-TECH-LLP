'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  name: string
  title: string
  category: string
  description: string
  status: string
  created_at: string
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    status: 'Active',
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase.from('projects').insert([
        {
          name: formData.name,
          category: formData.category,
          description: formData.description,
          status: formData.status,
        },
      ])

      if (error) throw error

      setFormData({ name: '', category: '', description: '', status: 'Active' })
      setShowForm(false)
      fetchProjects()
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id)

      if (error) throw error
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div className="flex justify-between items-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-gray-light/60">Manage all your projects</p>
        </div>

        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-orange-primary to-red-orange text-white rounded-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showForm ? 'Cancel' : '+ Add Project'}
        </motion.button>
      </motion.div>

      {/* Add Project Form */}
      {showForm && (
        <motion.div
          className="glass rounded-2xl p-8 border border-orange-primary/20 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
          <form onSubmit={handleAddProject} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Project Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="CRM Solutions">CRM Solutions</option>
                  <option value="Cloud Solutions">Cloud Solutions</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 bg-dark-bg border border-orange-primary/20 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-primary to-red-orange text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-primary/50 transition-all"
            >
              Add Project
            </button>
          </form>
        </motion.div>
      )}

      {/* Projects Table */}
      <motion.div
        className="glass rounded-2xl p-8 border border-orange-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-light/60">Loading projects...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-orange-primary/10">
                  <th className="text-left py-4 px-4 text-gray-light/70 font-semibold">Name</th>
                  <th className="text-left py-4 px-4 text-gray-light/70 font-semibold">Category</th>
                  <th className="text-left py-4 px-4 text-gray-light/70 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 text-gray-light/70 font-semibold">Date</th>
                  <th className="text-left py-4 px-4 text-gray-light/70 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <motion.tr
                    key={project.id}
                    className="border-b border-orange-primary/5 hover:bg-orange-primary/5 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-4 px-4 font-semibold">{project.name}</td>
                    <td className="py-4 px-4 text-gray-light/70">{project.category}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === 'Completed'
                          ? 'bg-green-500/20 text-green-400'
                          : project.status === 'Pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-orange-primary/20 text-orange-primary'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-light/60">
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <motion.button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-light/60 mb-4">No projects yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-orange-primary text-white rounded-lg hover:bg-orange-bright transition-colors"
            >
              Create Your First Project
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
