'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CountUpStat from '@/components/CountUpStat'

const values = [
  {
    title: 'Innovation First',
    description: 'We constantly push boundaries and embrace cutting-edge technologies to deliver next-generation solutions.',
  },
  {
    title: 'Client Focused',
    description: 'Your success is our success. We partner with you to understand and achieve your business objectives.',
  },
  {
    title: 'Excellence',
    description: 'We maintain the highest standards of quality, performance, and security in everything we build.',
  },
  {
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

const stats = [
  { label: 'Projects Delivered', value: '200+' },
  { label: 'Happy Clients', value: '150+' },
  { label: 'Years in Business', value: '10+' },
  { label: 'Industries Served', value: '20+' },
]

export default function AboutPage() {
  return (
    <main className="w-full bg-dark-bg">
      <Navigation />

      {/* Page header */}
      <section className="relative w-full pt-40 pb-20 px-6 sm:px-10 lg:px-16 border-b border-white/10">
        <motion.p
          className="text-xs font-semibold tracking-[0.3em] text-orange-primary mb-6 uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About us
        </motion.p>
        <motion.h1
          className="display-type text-5xl md:text-7xl text-gray-light mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          About <span className="text-orange-primary">GSKCORE TECH.</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-secondary max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          A digital transformation partner trusted by startups, enterprises, and everything in between.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4 text-orange-primary">Our Mission</h2>
            <p className="text-gray-secondary text-lg leading-relaxed">
              To transform ambitious ideas into scalable digital products that drive real business
              value. We believe in combining technical excellence with deep business understanding
              to create solutions that matter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-orange-primary">Our Vision</h2>
            <p className="text-gray-secondary text-lg leading-relaxed">
              To be the most trusted digital transformation partner globally, known for building
              innovative, scalable, and future-proof solutions that empower businesses to compete
              in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="display-type text-4xl md:text-5xl text-gray-light mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our <span className="text-orange-primary">core values.</span>
          </motion.h2>

          <ul>
            {values.map((value, index) => (
              <motion.li
                key={value.title}
                className="py-8 border-t border-white/10 last:border-b flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <span className="section-index text-sm text-gray-secondary w-10 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-bold text-gray-light w-full sm:w-64 shrink-0">{value.title}</h3>
                <p className="text-gray-secondary leading-relaxed max-w-xl flex-1 min-w-0">{value.description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="display-type text-4xl md:text-5xl text-gray-light mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our <span className="text-orange-primary">team.</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-12">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <CountUpStat value={`${member.count}+`} className="display-type text-5xl text-orange-primary mb-2" />
                <h3 className="text-lg font-bold text-gray-light">{member.name}</h3>
                <p className="text-gray-secondary text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`py-6 md:py-0 text-center md:border-l border-white/10 ${index === 0 ? 'md:border-l-0' : ''}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <CountUpStat value={stat.value} className="display-type text-4xl md:text-5xl text-gray-light mb-2" />
              <p className="text-gray-secondary text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
