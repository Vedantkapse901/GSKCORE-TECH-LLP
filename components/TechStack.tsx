'use client'

const stack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'Supabase', 'PostgreSQL', 'REST APIs',
  'GSAP', 'Three.js', 'Framer Motion', 'Vercel',
]

export default function TechStack() {
  const row = [...stack, ...stack]

  return (
    <section className="relative w-full py-16 bg-dark-surface border-t border-white/10 overflow-hidden">
      <p className="text-center text-xs font-semibold tracking-[0.3em] text-orange-primary mb-10 uppercase">
        Built with
      </p>

      <div className="relative flex overflow-hidden motion-reduce:overflow-x-auto">
        <div className="flex gap-16 pr-16 tech-marquee motion-reduce:animate-none shrink-0">
          {row.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="text-3xl md:text-4xl font-bold text-gray-light/70 whitespace-nowrap shrink-0"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-16 pr-16 tech-marquee motion-reduce:hidden shrink-0" aria-hidden="true">
          {row.map((tech, i) => (
            <span
              key={`${tech}-dup-${i}`}
              className="text-3xl md:text-4xl font-bold text-gray-light/70 whitespace-nowrap shrink-0"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
