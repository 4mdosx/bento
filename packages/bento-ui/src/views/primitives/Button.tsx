'use client'

import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cn } from '../shared/cn'
import { tokens } from '../shared/tokens'

export interface ButtonPrimitiveProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  loading?: boolean
  loadingIndicator?: React.ReactNode
}

export type ButtonProps = ButtonPrimitiveProps

function DefaultLoadingIndicator() {
  return <svg className="size-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" opacity=".25" />
    <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
  </svg>
}

/**
 * 按钮只建模交互能力；外观通过默认 Token 和 className 设置。
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    asChild = false,
    children,
    className,
    disabled = false,
    loading = false,
    loadingIndicator,
    onClick,
    tabIndex,
    type,
    ...props
  }, ref) => {
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

    return (
      <Comp
        ref={ref}
        {...props}
        type={asChild ? undefined : type ?? 'button'}
        disabled={asChild ? undefined : interactionDisabled}
        aria-disabled={asChild && interactionDisabled ? true : undefined}
        aria-busy={loading || undefined}
        data-loading={loading ? '' : undefined}
        tabIndex={asChild && interactionDisabled ? -1 : tabIndex}
        className={cn(tokens.button.base, className)}
        onClick={handleClick}
      >
        {loading ? loadingIndicator ?? <DefaultLoadingIndicator /> : null}
        <Slottable>{children}</Slottable>
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button }
