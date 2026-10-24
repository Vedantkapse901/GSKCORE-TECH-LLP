import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#080808',
        'dark-surface': '#101010',
        'surface': '#141414',
        'elevated': '#1a1a1a',
        'orange-primary': '#ff6a00',
        'orange-bright': '#ff9a24',
        'orange-golden': '#ff9a24',
        'deep-orange': '#ff4d00',
        'red-orange': '#ff3d00',
        'orange-glow': '#ff6a00',
        'gray-light': '#f2f2f2',
        'gray-lighter': '#ffffff',
        'gray-secondary': '#a3a3a3',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(255, 107, 53, 0.3)' },
          '50%': { 'box-shadow': '0 0 40px rgba(255, 107, 53, 0.6)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
