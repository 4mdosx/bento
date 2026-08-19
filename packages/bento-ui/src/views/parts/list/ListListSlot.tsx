'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../shared/cn'

export const listClass = 'flex flex-col gap-0 divide-y divide-border'

export interface ListListSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

/**
 * List slot: vertical list container for mobile, used with ListListItemSlot.
 */
const ListListSlot = React.forwardRef<HTMLDivElement, ListListSlotProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(listClass, className)}
        data-list-pattern="list"
        {...props}
      />
    )
  },
)
ListListSlot.displayName = 'ListListSlot'

export { ListListSlot }
