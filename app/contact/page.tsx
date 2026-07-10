'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

const contactMethods = [
  {
    icon: '📧',
    title: 'Email',
    value: 'hello@gskcore.com',
    description: 'Send us an email and we\'ll respond within 24 hours',
  },
  {
    icon: '📱',
    title: 'Phone',
    value: '+91 9876 543 210',
    description: 'Call us for immediate assistance',
  },
  {
    icon: '📍',
    title: 'Location',
    value: 'India',
    description: 'Serving clients worldwide',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date().toISOString(),
          },
        ])

      if (error) throw error

      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
              Get in <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-gray-light/70 max-w-3xl mx-auto text-xl">
              Have a project in mind? Let's discuss how we can help transform your ideas into reality.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className="glass rounded-2xl p-8 text-center"
                whileHover={{ y: -10, boxShadow: '0 0 30px rgba(255, 107, 53, 0.2)' }}
              >
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{method.title}</h3>
                <p className="text-orange-primary font-semibold mb-2">{method.value}</p>
                <p className="text-gray-light/60 text-sm">{method.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

              {submitted && (
                <motion.div
                  className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ✓ Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-3 bg-dark-bg border border-orange-primary/30 rounded-lg text-gray-light placeholder-gray-light/50 focus:outline-none focus:border-orange-primary transition-colors"
                    placeholder="Your name"
                    whileFocus={{ boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-3 bg-dark-bg border border-orange-primary/30 rounded-lg text-gray-light placeholder-gray-light/50 focus:outline-none focus:border-orange-primary transition-colors"
                    placeholder="your.email@example.com"
                    whileFocus={{ boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-3 bg-dark-bg border border-orange-primary/30 rounded-lg text-gray-light placeholder-gray-light/50 focus:outline-none focus:border-orange-primary transition-colors"
                    placeholder="What is this about?"
                    whileFocus={{ boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-6 py-3 bg-dark-bg border border-orange-primary/30 rounded-lg text-gray-light placeholder-gray-light/50 focus:outline-none focus:border-orange-primary transition-colors resize-none"
                    placeholder="Tell us about your project..."
                    whileFocus={{ boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-primary to-red-orange rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-orange-primary/50 transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Response Time */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-light/60">
              We typically respond to inquiries within 24 hours. For urgent matters, please call us directly.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
