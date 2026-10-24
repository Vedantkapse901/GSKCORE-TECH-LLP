'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin, ApiError } from '@/lib/api'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await adminLogin(username, password)
      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-surface border border-white/10 rounded-2xl p-8"
      >
        <h1 className="display-type text-3xl mb-2">Admin Login</h1>
        <p className="text-gray-secondary text-sm mb-8">GSKCORE TECH LLP</p>

        {error && (
          <p className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-dark-bg border border-white/10 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
            required
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-dark-bg border border-white/10 rounded-lg text-gray-light focus:outline-none focus:border-orange-primary"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-orange-primary text-black rounded-full font-semibold hover:shadow-[0_0_24px_rgba(255,106,0,0.45)] transition-shadow disabled:opacity-50"
        >
          {loading ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  )
}
