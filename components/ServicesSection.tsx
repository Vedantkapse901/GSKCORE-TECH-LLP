'use client'

import { motion } from 'framer-motion'
import ServiceCard from './ServiceCard'

const services = [
  {
    title: 'Website Development',
    description: 'Modern, responsive websites built with cutting-edge technologies. SEO optimized and performance-focused.',
    icon: '🌐',
  },
  {
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile apps for iOS and Android with stunning UI and seamless UX.',
    icon: '📱',
  },
  {
    title: 'AI Automation',
    description: 'Intelligent automation solutions powered by AI and machine learning to streamline your operations.',
    icon: '🤖',
  },
  {
    title: 'CRM Solutions',
    description: 'Tailored CRM systems to manage customer relationships and drive business growth effectively.',
    icon: '💼',
  },
  {
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and DevOps solutions with AWS, Azure, and Kubernetes expertise.',
    icon: '☁️',
  },
  {
    title: 'Enterprise Software',
    description: 'Complex enterprise applications built with scalability, security, and performance in mind.',
    icon: '⚙️',
  },
]

export default function ServicesSection() {
  return (
    <section className="relative w-full py-24 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-gray-light/70 max-w-2xl mx-auto text-lg">
            Comprehensive solutions tailored to your business needs. From concept to deployment and beyond.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-orange-primary to-red-orange rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-orange-primary/50 transition-all">
            Explore All Services
          </button>
        </motion.div>
      </div>
    </section>
  )
}
