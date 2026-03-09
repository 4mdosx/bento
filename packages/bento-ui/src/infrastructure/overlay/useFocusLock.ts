'use client'

import * as React from 'react'

/**
 * Restricts focus within a specified container (focus trap), used for modal overlays.
 * Semantically identical to Radix FocusScope; this is a lightweight implementation, complex scenarios can be paired with @radix-ui/react-focus-scope.
 */
export function useFocusLock(
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
): void {
  const previousActiveElement = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (!enabled || !containerRef.current) return
    const container = containerRef.current
    previousActiveElement.current = document.activeElement as HTMLElement | null

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const focusable = container.querySelectorAll<HTMLElement>(focusableSelector)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first && last) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last && first) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    first?.focus()

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      previousActiveElement.current?.focus?.()
    }
  }, [enabled, containerRef])
}
