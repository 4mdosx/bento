'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Button as ButtonPrimitive } from '../primitive/Button'
import { cn } from '../lib/cn'
import { tokens } from '../lib/tokens'

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

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof ButtonPrimitive>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <ButtonPrimitive
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
)

Button.displayName = 'Button'

export { Button, buttonVariants }
