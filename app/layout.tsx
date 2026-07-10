import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GSKCORE TECH LLP - Building Tomorrow\'s Digital Infrastructure',
  description: 'Transform ambitious ideas into scalable digital products. Custom websites, mobile apps, AI automation, and enterprise solutions.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-bg text-gray-light antialiased">
        {children}
      </body>
    </html>
  )
}
