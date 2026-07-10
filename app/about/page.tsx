'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'

const values = [
  {
    icon: '🎯',
    title: 'Innovation First',
    description: 'We constantly push boundaries and embrace cutting-edge technologies to deliver next-generation solutions.',
  },
  {
    icon: '👥',
    title: 'Client Focused',
    description: 'Your success is our success. We partner with you to understand and achieve your business objectives.',
  },
  {
    icon: '⚡',
    title: 'Excellence',
    description: 'We maintain the highest standards of quality, performance, and security in everything we build.',
  },
  {
    icon: '🤝',
    title: 'Transparency',
    description: 'Open communication and clear expectations are the foundation of our client relationships.',
  },
]

const team = [
  { name: 'Founders', count: '2', role: 'Visionary Leaders' },
  { name: 'Developers', count: '25', role: 'Full-stack Experts' },
  { name: 'Designers', count: '10', role: 'UI/UX Specialists' },
  { name: 'DevOps', count: '8', role: 'Infrastructure Experts' },
  { name: 'QA Engineers', count: '5', role: 'Quality Assurance' },
]

export default function AboutPage() {
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
              About <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">GSKCORE</span>
            </h1>
            <p className="text-gray-light/70 max-w-3xl mx-auto text-xl">
              A digital transformation partner trusted by startups, enterprises, and everything in between.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-4 text-orange-primary">Our Mission</h2>
              <p className="text-gray-light/70 text-lg leading-relaxed">
                To transform ambitious ideas into scalable digital products that drive real business value. We believe in
                combining technical excellence with deep business understanding to create solutions that matter.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-4 text-orange-primary">Our Vision</h2>
              <p className="text-gray-light/70 text-lg leading-relaxed">
                To be the most trusted digital transformation partner globally, known for building innovative,
                scalable, and future-proof solutions that empower businesses to compete in the digital age.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              Our <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Core Values</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-2xl p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-light/70">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              Our <span className="bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Team</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-2xl p-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent mb-2">
                    {member.count}+
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-light/60 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { label: 'Projects Delivered', value: '200+' },
              { label: 'Happy Clients', value: '150+' },
              { label: 'Years in Business', value: '10+' },
              { label: 'Industries Served', value: '20+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass rounded-2xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-light/60">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
