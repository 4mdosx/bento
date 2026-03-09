'use client'

import * as React from 'react'

export interface OverlayStackContextValue {
  /** Current stack depth, used for z-index and layering */
  level: number
  /** Update stack depth on register/unregister */
  register: () => () => void
  /** DOM container for overlay mounting, Portal's container */
  overlayContainerRef: React.RefObject<HTMLDivElement | null>
}

const OverlayStackContext = React.createContext<OverlayStackContextValue | null>(
  null,
)

export function useOverlayStack(): OverlayStackContextValue | null {
  return React.useContext(OverlayStackContext)
}

/** Get overlay mounting container, used for Radix Portal container */
export function useOverlayContainer(): HTMLDivElement | null {
  const ctx = useOverlayStack()
  return ctx?.overlayContainerRef?.current ?? null
}

/** Injected by OverlayProvider */
export function OverlayStackProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: OverlayStackContextValue
}) {
  return (
    <OverlayStackContext.Provider value={value}>
      {children}
    </OverlayStackContext.Provider>
  )
}
