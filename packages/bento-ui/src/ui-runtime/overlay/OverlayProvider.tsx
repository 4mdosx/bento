'use client'

import * as React from 'react'
import { OverlayRoot } from './OverlayRoot'
import { OverlayStackProvider } from './useOverlayStack'

export interface OverlayProviderProps {
  children: React.ReactNode
  /** Portal mounting container, defaults to document.body */
  container?: HTMLElement | null
}

/**
 * Provides the mounting root and stack context for overlays.
 * The application should wrap it once in the root layout, Modal/Drawer/BottomSheet will render within the OverlayRoot of this Provider.
 */
export function OverlayProvider({
  children,
  container,
}: OverlayProviderProps) {
  const overlayContainerRef = React.useRef<HTMLDivElement | null>(null)
  const [level, setLevel] = React.useState(0)
  const register = React.useCallback(() => {
    setLevel((n) => n + 1)
    return () => setLevel((n) => Math.max(0, n - 1))
  }, [])
  const value = React.useMemo(
    () => ({ level, register, overlayContainerRef }),
    [level, register],
  )
  return (
    <OverlayStackProvider value={value}>
      {children}
      <OverlayRoot container={container} overlayContainerRef={overlayContainerRef} />
    </OverlayStackProvider>
  )
}

OverlayProvider.displayName = 'OverlayProvider'
