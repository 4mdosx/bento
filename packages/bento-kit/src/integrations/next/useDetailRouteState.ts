'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/** Next.js App Router integration for URL-addressable detail state. */
export function useDetailState(paramKey: string) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get(paramKey)

  const open = (nextId: string) => {
    const next = new URLSearchParams(searchParams.toString())
    next.set(paramKey, nextId)
    router.push(`${pathname}?${next.toString()}`)
  }

  const close = () => {
    const next = new URLSearchParams(searchParams.toString())
    next.delete(paramKey)
    const query = next.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return { id, open, close }
}
