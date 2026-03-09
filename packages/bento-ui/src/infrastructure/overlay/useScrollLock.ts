'use client'

import * as React from 'react'

/**
 * Locks body scroll to prevent underlying page from scrolling when an overlay is open.
 * Semantically identical to Radix's RemoveScroll, providing a reusable hook for custom overlays here.
 */
export function useScrollLock(locked: boolean): void {
  React.useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
