'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const servicesData = [
  {
    name: 'Website Development',
    items: [
      'Responsive Web Design',
      'Next.js & React Development',
      'Progressive Web Apps',
      'E-commerce Solutions',
      'CMS Integration',
      'SEO Optimization',
    ],
  },
  {
    name: 'Mobile Applications',
    items: [
      'iOS Development',
      'Android Development',
      'Cross-platform (Flutter)',
      'React Native Apps',
      'App Store Optimization',
      'Push Notifications',
    ],
  },
  {
    name: 'AI Automation',
    items: [
      'Machine Learning Models',
      'Natural Language Processing',
      'Computer Vision',
      'Chatbot Development',
      'Predictive Analytics',
      'Process Automation',
    ],
  },
  {
    name: 'CRM Solutions',
    items: [
      'Custom CRM Development',
      'Salesforce Integration',
      'Customer Analytics',
      'Sales Pipeline Management',
      'Lead Management',
      'Customer Support Ticketing',
    ],
  },
  {
    name: 'ERP Systems',
    items: [
      'Enterprise Resource Planning',
      'Inventory Management',
      'Supply Chain Optimization',
      'Financial Management',
      'Human Resources Module',
      'Business Intelligence',
    ],
  },
  {
    name: 'Cloud Solutions',
    items: [
      'AWS Architecture',
      'Azure Cloud Services',
      'Kubernetes Orchestration',
      'Docker Containerization',
      'Cloud Migration',
      'DevOps & CI/CD',
    ],
  },
  {
    name: 'UI/UX Design',
    items: [
      'User Research & Strategy',
      'Wireframing & Prototyping',
      'Visual Design',
      'Interaction Design',
      'Usability Testing',
      'Design Systems',
    ],
  },
  {
    name: 'API Development',
    items: [
      'RESTful APIs',
      'GraphQL APIs',
      'WebSocket Integration',
      'Third-party Integrations',
      'API Documentation',
      'API Security & Auth',
    ],
  },
]

export default function ServicesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {servicesData.map((service, index) => (
        <motion.div
          key={index}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Service Name Card */}
          <motion.div
            className="glass rounded-xl p-6 cursor-pointer h-full"
            whileHover={{
              boxShadow: '0 0 30px rgba(255, 107, 53, 0.4)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-light group-hover:text-orange-primary transition-colors">
                {service.name}
              </h3>
              <motion.svg
                className="w-5 h-5 text-orange-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: hoveredIndex === index ? 180 : 0 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </div>
          </motion.div>

          {/* Dropdown Menu */}
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 glass rounded-xl p-4 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: hoveredIndex === index ? 1 : 0,
              y: hoveredIndex === index ? 0 : -10,
              pointerEvents: hoveredIndex === index ? 'auto' : 'none',
            }}
            transition={{ duration: 0.2 }}
          >
            <ul className="space-y-2">
              {service.items.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  className="text-sm text-gray-light/80 hover:text-orange-primary transition-colors pl-4 border-l-2 border-orange-primary/30 hover:border-orange-primary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: itemIndex * 0.05 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
