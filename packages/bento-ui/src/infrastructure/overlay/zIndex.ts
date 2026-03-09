/**
 * Layer rules: The z-index base and step for the Overlay stack.
 * Ensures the correct order when multiple layers of Modal / Drawer / BottomSheet are stacked.
 */
export const OVERLAY_Z_BASE = 1000
export const OVERLAY_Z_STEP = 10

/** z-index for a single overlay layer (backdrop + content on the same layer) */
export function overlayZIndex(level: number): number {
  return OVERLAY_Z_BASE + level * OVERLAY_Z_STEP
}
