'use client'

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-dark-bg">
      {/* Technical grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Off-center volumetric glow */}
      <div
        className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,106,0,0.22) 0%, rgba(255,106,0,0) 65%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,77,0,0.14) 0%, rgba(255,77,0,0) 70%)',
        }}
      />

      {/* Slow diagonal sweep, decorative only */}
      <div className="hero-sweep motion-reduce:hidden" />

      {/* Vignette to keep text legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/40 via-transparent to-dark-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/60 via-transparent to-transparent" />
    </div>
  )
}
