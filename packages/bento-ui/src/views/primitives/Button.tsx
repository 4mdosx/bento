'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../shared/cn'
import { tokens } from '../shared/tokens'

const buttonVariants = cva(tokens.button.base, {
  variants: {
    variant: {
      solid: tokens.button.variant.solid,
      outline: tokens.button.variant.outline,
      ghost: tokens.button.variant.ghost,
      destructive: tokens.button.variant.destructive,
      link: tokens.button.variant.link,
    },
    size: {
      sm: tokens.button.size.sm,
      md: tokens.button.size.md,
      lg: tokens.button.size.lg,
      icon: tokens.button.size.icon,
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

export interface ButtonPrimitiveProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export interface ButtonProps
  extends ButtonPrimitiveProps,
    VariantProps<typeof buttonVariants> {}

/**
 * 按钮：提供 forwardRef、asChild 组合与可访问性，
 * 样式通过 Tailwind + cva + design token 设置。
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
