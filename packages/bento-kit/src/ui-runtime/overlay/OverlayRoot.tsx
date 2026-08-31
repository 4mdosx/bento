'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { overlayZIndex } from './zIndex'

/**
 * Base container: Mount point carrying all overlays.
 * Rendered under body to avoid being clipped by parent overflow/transform, and uniformly manages the z-index layer.
 */
export interface OverlayRootProps {
  children?: React.ReactNode
  /** Mounted DOM node, defaults to document.body */
  container?: HTMLElement | null
  /** Injected by Provider: overlay root element ref, used for Portal container */
  overlayContainerRef: React.RefObject<HTMLDivElement | null>
}

export function OverlayRoot({
  children,
  container,
  overlayContainerRef,
}: OverlayRootProps) {
  const [portalContainer, setPortalContainer] =
    React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    setPortalContainer(container ?? document.body)
  }, [container])

  // Server rendering and the first client render must produce the same tree.
  // Mount the portal only after hydration, when the browser container exists.
  if (!portalContainer) return null

  return createPortal(
    <div
      ref={overlayContainerRef}
      id="bento-overlay-root"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: overlayZIndex(0) }}
      aria-hidden
    >
      <div className="pointer-events-auto contents">{children}</div>
    </div>,
    portalContainer,
  )
}

OverlayRoot.displayName = 'OverlayRoot'
