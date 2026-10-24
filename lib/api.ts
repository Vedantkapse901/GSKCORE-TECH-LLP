const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

export interface Service {
  id: number
  name: string
  title: string | null
  description: string
  icon: string | null
  created_at: string
}

export interface Project {
  id: number
  company_name: string
  name: string
  category: string
  description: string
  status: string
  website_url: string | null
  logo_url: string | null
  screenshot_url: string | null
  created_at: string
}

export interface Category {
  id: number
  name: string
  created_at: string
}

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(options.body && !(options.body instanceof FormData)
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...options.headers,
    },
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new ApiError(data.error || `Request failed (${res.status})`, res.status)
  }
  return data as T
}

// --- Public reads ---
export const getServices = () => request<Service[]>('/services.php')
export const getProjects = () => request<Project[]>('/projects.php')
export const getCategories = () => request<Category[]>('/categories.php')

// --- Public write ---
export const submitContact = (payload: {
  name: string
  email: string
  subject?: string
  message: string
}) =>
  request<{ ok: true }>('/contact.php', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

// --- Admin auth ---
export const adminLogin = (username: string, password: string) =>
  request<{ ok: true }>('/login.php', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })

export const adminLogout = () => request<{ ok: true }>('/logout.php', { method: 'POST' })

export const adminCheckSession = () => request<{ loggedIn: boolean }>('/me.php')

// --- Admin writes ---
export const adminCreateService = (payload: {
  name: string
  title?: string
  description: string
  icon?: string
}) =>
  request<{ ok: true; id: number }>('/services.php', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const adminDeleteService = (id: number) =>
  request<{ ok: true }>(`/services.php?id=${id}`, { method: 'DELETE' })

export const adminCreateProject = (payload: Omit<Project, 'id' | 'created_at'>) =>
  request<{ ok: true; id: number }>('/projects.php', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const adminUpdateProject = (id: number, payload: Omit<Project, 'id' | 'created_at'>) =>
  request<{ ok: true }>(`/projects.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const adminDeleteProject = (id: number) =>
  request<{ ok: true }>(`/projects.php?id=${id}`, { method: 'DELETE' })

export const adminCreateCategory = (name: string) =>
  request<{ ok: true }>('/categories.php', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })

export const uploadLogo = async (file: File): Promise<string> => {
  const form = new FormData()
  form.append('logo', file)
  const data = await request<{ ok: true; url: string }>('/upload.php', {
    method: 'POST',
    body: form,
  })
  return data.url
}

export { ApiError }
