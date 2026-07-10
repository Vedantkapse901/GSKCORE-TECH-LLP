'use client'

import { motion } from 'framer-motion'

const reasons = [
  {
    icon: '⚡',
    title: 'Modern Tech Stack',
    description: 'Latest technologies and frameworks for optimal performance and scalability.',
  },
  {
    icon: '🚀',
    title: 'Fast Delivery',
    description: 'Quick turnaround times without compromising on quality and excellence.',
  },
  {
    icon: '🏗️',
    title: 'Scalable Architecture',
    description: 'Built to grow with your business, handling millions of users seamlessly.',
  },
  {
    icon: '✨',
    title: 'Premium UI/UX',
    description: 'Beautiful, intuitive interfaces that delight users and drive engagement.',
  },
  {
    icon: '💡',
    title: 'Business First',
    description: 'We understand your goals and create solutions that deliver measurable results.',
  },
  {
    icon: '🔒',
    title: 'Security First',
    description: 'Enterprise-grade security with compliance to international standards.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-24 bg-dark-bg border-t border-orange-primary/10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Choose Us</span>
          </h2>
          <p className="text-gray-light/70 max-w-2xl mx-auto text-lg">
            We combine technical excellence with business acumen to deliver solutions that matter.
          </p>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="group glass rounded-2xl p-8 hover:border-orange-primary/50 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: '0 0 40px rgba(255, 107, 53, 0.2)',
              }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-orange-primary transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-light/70 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
