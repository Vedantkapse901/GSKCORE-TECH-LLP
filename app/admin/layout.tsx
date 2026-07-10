import { ReactNode } from 'react'
import AdminNavigation from '@/components/AdminNavigation'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-bg">
      <AdminNavigation />
      <main className="pt-20">{children}</main>
    </div>
  )
}
