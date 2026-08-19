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
  container = typeof document !== 'undefined' ? document.body : null,
  overlayContainerRef,
}: OverlayRootProps) {
  if (!container) return null
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
    container,
  )
}

OverlayRoot.displayName = 'OverlayRoot'
