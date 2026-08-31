'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../shared/cn'

export const listItemClass = 'px-4 py-3 flex flex-col gap-1'

export interface ListListItemSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

/**
 * List item slot: single row in mobile list, used with ListListSlot.
 */
const ListListItemSlot = React.forwardRef<HTMLDivElement, ListListItemSlotProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(listItemClass, className)}
        data-list-pattern="list-item"
        {...props}
      />
    )
  },
)
ListListItemSlot.displayName = 'ListListItemSlot'

export { ListListItemSlot }
