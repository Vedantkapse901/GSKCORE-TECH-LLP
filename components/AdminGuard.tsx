'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { adminCheckSession } from '@/lib/api'
import AdminNavigation from '@/components/AdminNavigation'

export default function AdminGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'
  const [checked, setChecked] = useState(isLoginPage)

  useEffect(() => {
    if (isLoginPage) return

    let cancelled = false
    adminCheckSession()
      .then((res) => {
        if (cancelled) return
        if (!res.loggedIn) {
          router.replace('/admin/login')
        } else {
          setChecked(true)
        }
      })
      .catch(() => {
        if (!cancelled) router.replace('/admin/login')
      })

    return () => {
      cancelled = true
    }
  }, [isLoginPage, router])

  if (isLoginPage) return <>{children}</>

  return (
    <div className="min-h-screen bg-dark-bg">
      <AdminNavigation />
      <main className="pt-20">{checked ? children : null}</main>
    </div>
  )
}
