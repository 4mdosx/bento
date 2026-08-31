import { breakpointValues } from '../../ui-runtime/adaptation'

/**
 * Design tokens：仅使用语义化 Tailwind 类名（bg-primary, text-muted, rounded-md, duration-fast 等），
 * 不直接使用 raw palette（如 bg-neutral-900、bg-red-600）。
 * 语义由 theme.css 的 Layer 2 定义。
 */
export const tokens = {
  button: {
    base:
      'inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-body-sm font-medium text-primary-foreground transition-colors duration-fast hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  },
  breakpoints: breakpointValues,
} as const

export {
  min,
  max,
  between,
  breakpointPx,
} from '../../ui-runtime/adaptation'
export type { BreakpointName } from '../../ui-runtime/adaptation'
