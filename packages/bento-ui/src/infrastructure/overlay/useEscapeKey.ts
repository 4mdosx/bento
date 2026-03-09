'use client'

import * as React from 'react'

/**
 * Listens for the Escape key, used to close overlays.
 * Semantically identical to Radix DismissableLayer's onEscapeKeyDown, can be used independently in custom overlays.
 */
export function useEscapeKey(
  enabled: boolean,
  onEscape: (event: KeyboardEvent) => void,
): void {
  const onEscapeRef = React.useRef(onEscape)
  onEscapeRef.current = onEscape

  React.useEffect(() => {
    if (!enabled) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscapeRef.current(event)
      }
    }
    document.addEventListener('keydown', handleKeyDown, true)
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [enabled])
}
