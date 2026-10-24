import type { Metadata, Viewport } from 'next'
import './globals.css'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const siteUrl = 'https://www.gskcoretech.com'
const title = 'GSKCORE TECH LLP — We Build What\'s Next'
const description =
  'GSKCORE TECH LLP builds websites, mobile apps, custom software, and AI-powered automation — from the first idea to a production-ready digital product.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | GSKCORE TECH LLP',
  },
  description,
  icons: {
    icon: '/logo1.png',
    apple: '/logo1.png',
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'GSKCORE TECH LLP',
    images: ['/logo1.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/logo1.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080808',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-bg text-gray-light antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  )
}
