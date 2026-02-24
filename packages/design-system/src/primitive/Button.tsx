'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

export interface ButtonPrimitiveProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

/**
 * 无样式按钮基元：仅提供行为（forwardRef、asChild 组合）与可访问性，
 * 不提供视觉样式与 API 风格。样式由 components 层通过 Tailwind + cva + design token 设置。
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonPrimitiveProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} {...props} />
  },
)

Button.displayName = 'ButtonPrimitive'
