import 'server-only'

import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const docsRoot = path.join(process.cwd(), 'content', 'docs')

export interface DocEntry {
  slug: string[]
  href: string
  title: string
  section: string
}

async function markdownFiles(directory = docsRoot): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return markdownFiles(absolute)
    return entry.name.endsWith('.md') ? [absolute] : []
  }))
  return nested.flat()
}

export async function getDocEntries(): Promise<DocEntry[]> {
  const files = await markdownFiles()
  return Promise.all(files.map(async (file) => {
    const relative = path.relative(docsRoot, file).replace(/\\/g, '/')
    const slug = relative.replace(/\.md$/, '').split('/')
    const source = await readFile(file, 'utf8')
    const title = source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? slug.at(-1) ?? 'Document'
    return { slug, href: `/overview/docs/${slug.join('/')}`, title, section: slug[0] }
  })).then((entries) => entries.sort((a, b) => a.href.localeCompare(b.href)))
}

export async function getDoc(slug: string[]) {
  if (!slug.length || slug.some((part) => !/^[a-zA-Z0-9-]+$/.test(part))) return null
  const file = path.join(docsRoot, `${slug.join('/')}.md`)
  try {
    const source = await readFile(file, 'utf8')
    return { source, title: source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? slug.at(-1) ?? 'Document' }
  } catch {
    return null
  }
}

export function resolveDocHref(href: string | undefined, slug: string[]) {
  if (!href || href.startsWith('#') || /^(https?:|mailto:)/.test(href)) return href
  const withoutExtension = href.replace(/\.md(?=#|$)/, '')
  if (withoutExtension.startsWith('/')) return withoutExtension
  const base = slug.slice(0, -1)
  const resolved = path.posix.normalize(path.posix.join('/overview/docs', ...base, withoutExtension))
  return resolved
}
