import { breakpointValues } from '../../ui-runtime/adaptation'

/**
 * Design tokens：仅使用语义化 Tailwind 类名（bg-primary, text-muted, border-border 等），
 * 不直接使用 raw palette（如 bg-neutral-900、bg-red-600）。
 * 语义由 globals.css 的 Layer 2 定义。
 */
export const tokens = {
  button: {
    variant: {
      solid:
        'bg-primary text-primary-foreground hover:opacity-90 active:opacity-80',
      outline:
        'border border-border bg-transparent hover:bg-muted/50 active:bg-muted',
      ghost: 'bg-transparent hover:bg-muted/50 active:bg-muted',
      destructive:
        'bg-destructive text-destructive-foreground hover:opacity-90 active:opacity-80',
      link: 'text-foreground underline-offset-4 hover:underline',
    },
    size: {
      sm: 'h-8 px-3 text-body-sm rounded-md',
      md: 'h-9 px-4 text-body-sm rounded-md',
      lg: 'h-10 px-6 text-body-md rounded-lg',
      icon: 'h-9 w-9 rounded-md',
    },
    base:
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
