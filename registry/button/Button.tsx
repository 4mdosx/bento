import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  loading?: boolean
  loadingIndicator?: React.ReactNode
}

function DefaultLoadingIndicator() {
  return <svg className="size-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" opacity=".25" />
    <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
  </svg>
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  asChild = false,
  children,
  className = '',
  disabled = false,
  loading = false,
  loadingIndicator,
  onClick,
  tabIndex,
  type,
  ...props
}, ref) {
  const Comp = asChild ? Slot : 'button'
  const interactionDisabled = disabled || loading

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (interactionDisabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    onClick?.(event)
  }

  return <Comp
    ref={ref}
    {...props}
    type={asChild ? undefined : type ?? 'button'}
    disabled={asChild ? undefined : interactionDisabled}
    aria-disabled={asChild && interactionDisabled ? true : undefined}
    aria-busy={loading || undefined}
    data-loading={loading ? '' : undefined}
    tabIndex={asChild && interactionDisabled ? -1 : tabIndex}
    className={`inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-body-sm font-medium text-primary-foreground transition-colors duration-fast hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 ${className}`.trim()}
    onClick={handleClick}
  >
    {loading ? loadingIndicator ?? <DefaultLoadingIndicator /> : null}
    <Slottable>{children}</Slottable>
  </Comp>
})
