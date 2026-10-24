// One-time migration helper: pulls existing rows out of Supabase and writes
// them as MySQL INSERT statements, ready to run in phpMyAdmin after db.sql.
//
// Usage: node scripts/export-supabase-data.mjs
// Reads credentials from .env.local (never committed) and writes
// php-api/data-import.sql.

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function loadEnvLocal() {
  const env = {}
  const raw = readFileSync(join(root, '.env.local'), 'utf8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    env[trimmed.slice(0, idx)] = trimmed.slice(idx + 1)
  }
  return env
}

function sqlString(value) {
  if (value === null || value === undefined) return 'NULL'
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

async function fetchTable(baseUrl, key, table) {
  const res = await fetch(`${baseUrl}/rest/v1/${table}?select=*`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch ${table}: ${res.status} ${await res.text()}`)
  }
  return res.json()
}

function toMysqlDatetime(iso) {
  if (!iso) return null
  return new Date(iso).toISOString().slice(0, 19).replace('T', ' ')
}

async function main() {
  const env = loadEnvLocal()
  const url = env.NEXT_PUBLIC_SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or a Supabase key in .env.local')
    process.exit(1)
  }

  const lines = ['SET NAMES utf8mb4;', '']

  console.log('Fetching categories...')
  const categories = await fetchTable(url, key, 'categories')
  for (const c of categories) {
    lines.push(
      `INSERT IGNORE INTO categories (name, created_at) VALUES (${sqlString(c.name)}, ${sqlString(toMysqlDatetime(c.created_at))});`
    )
  }

  console.log('Fetching services...')
  const services = await fetchTable(url, key, 'services')
  for (const s of services) {
    lines.push(
      `INSERT INTO services (name, title, description, icon, created_at) VALUES (${sqlString(s.name)}, ${sqlString(s.title)}, ${sqlString(s.description)}, ${sqlString(s.icon)}, ${sqlString(toMysqlDatetime(s.created_at))});`
    )
  }

  console.log('Fetching projects...')
  const projects = await fetchTable(url, key, 'projects')
  for (const p of projects) {
    lines.push(
      `INSERT INTO projects (company_name, name, category, description, status, website_url, logo_url, created_at) VALUES (${sqlString(p.company_name)}, ${sqlString(p.name)}, ${sqlString(p.category)}, ${sqlString(p.description)}, ${sqlString(p.status)}, ${sqlString(p.website_url)}, ${sqlString(p.logo_url)}, ${sqlString(toMysqlDatetime(p.created_at))});`
    )
  }

  console.log('Fetching contact_submissions...')
  const contacts = await fetchTable(url, key, 'contact_submissions')
  for (const c of contacts) {
    lines.push(
      `INSERT INTO contact_submissions (name, email, subject, message, created_at) VALUES (${sqlString(c.name)}, ${sqlString(c.email)}, ${sqlString(c.subject)}, ${sqlString(c.message)}, ${sqlString(toMysqlDatetime(c.created_at))});`
    )
  }

  const outPath = join(root, 'php-api', 'data-import.sql')
  writeFileSync(outPath, lines.join('\n') + '\n', 'utf8')

  console.log(`\nDone. ${categories.length} categories, ${services.length} services, ${projects.length} projects, ${contacts.length} contact submissions.`)
  console.log(`Wrote ${outPath}`)
  console.log('Note: project logo_url values still point at Supabase storage — see migration notes for re-uploading them.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
