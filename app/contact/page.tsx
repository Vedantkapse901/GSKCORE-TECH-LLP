'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { submitContact } from '@/lib/api'

const PHONE_DISPLAY = '+91 83698 13323'
const PHONE_TEL = '+918369813323' // tel: link — spaces stripped, + kept
const PHONE_WHATSAPP = '918369813323' // wa.me — digits only, no +
const EMAIL = 'gskcoretech@gmail.com'

const ENQUIRY_SUBJECT = 'Project Inquiry — GSKCORE TECH'
const ENQUIRY_MESSAGE =
  "Hi GSKCORE TECH team,\n\nI'd like to discuss a project. Here's a bit about what I need:\n\n"

const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(ENQUIRY_SUBJECT)}&body=${encodeURIComponent(ENQUIRY_MESSAGE)}`
const telHref = `tel:${PHONE_TEL}`
const whatsappHref = `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(ENQUIRY_MESSAGE)}`

const contactMethods = [
  {
    icon: '📧',
    title: 'Email',
    value: EMAIL,
    description: "Opens your email app with a message ready to send — we'll reply within 24 hours.",
    href: mailtoHref,
  },
  {
    icon: '📱',
    title: 'Call',
    value: PHONE_DISPLAY,
    description: 'Opens your dialer for immediate assistance.',
    href: telHref,
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    value: PHONE_DISPLAY,
    description: 'Opens WhatsApp with a message ready to send.',
    href: whatsappHref,
  },
  {
    icon: '📍',
    title: 'Location',
    value: 'India',
    description: 'Serving clients worldwide.',
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
      await submitContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      })

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

      {/* Page header */}
      <section className="relative w-full pt-40 pb-16 px-6 sm:px-10 lg:px-16 border-b border-white/10">
        <motion.p
          className="text-xs font-semibold tracking-[0.3em] text-orange-primary mb-6 uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Get in touch
        </motion.p>
        <motion.h1
          className="display-type text-5xl md:text-7xl text-gray-light mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Have a project <span className="text-orange-primary">in mind?</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-secondary max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Let&apos;s discuss how we can help turn your idea into a working product.
        </motion.p>
      </section>

      {/* Contact methods */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactMethods.map((method, index) => {
            const Wrapper = method.href ? motion.a : motion.div
            return (
              <Wrapper
                key={method.title}
                {...(method.href
                  ? {
                      href: method.href,
                      target: method.href.startsWith('http') ? '_blank' : undefined,
                      rel: method.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                    }
                  : {})}
                className={`group relative rounded-2xl border border-orange-primary/15 bg-gradient-to-b from-white/[0.03] to-transparent p-6 overflow-hidden transition-colors ${
                  method.href ? 'hover:border-orange-primary/40 cursor-pointer' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.25), transparent 70%)' }}
                />
                <div
                  className="relative w-12 h-12 rounded-xl border border-orange-primary/30 bg-dark-bg flex items-center justify-center text-2xl mb-5"
                  style={{ boxShadow: '0 0 20px rgba(255,106,0,0.15)' }}
                >
                  {method.icon}
                </div>
                <h3 className="relative text-lg font-bold text-gray-light mb-1">{method.title}</h3>
                <p className="relative text-orange-primary font-medium text-sm mb-2 break-words">
                  {method.value}
                </p>
                <p className="relative text-gray-secondary text-sm leading-relaxed">{method.description}</p>
              </Wrapper>
            )
          })}
        </div>
      </section>

      {/* Contact form */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-16 border-t border-white/10">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-surface border border-white/10 rounded-2xl p-8 sm:p-12">
            <h2 className="display-type text-3xl text-gray-light mb-8">Send us a message</h2>

            {submitted && (
              <motion.div
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✓ Message sent successfully! We&apos;ll get back to you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-dark-bg border border-white/10 rounded-lg text-gray-light placeholder-gray-secondary/60 focus:outline-none focus:border-orange-primary transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-dark-bg border border-white/10 rounded-lg text-gray-light placeholder-gray-secondary/60 focus:outline-none focus:border-orange-primary transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-dark-bg border border-white/10 rounded-lg text-gray-light placeholder-gray-secondary/60 focus:outline-none focus:border-orange-primary transition-colors"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-3 bg-dark-bg border border-white/10 rounded-lg text-gray-light placeholder-gray-secondary/60 focus:outline-none focus:border-orange-primary transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-orange-primary text-black rounded-full font-semibold text-lg hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] transition-shadow disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <p className="text-center text-gray-secondary text-sm mt-8">
            We typically respond within 24 hours. For urgent matters, call or WhatsApp us directly.
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
