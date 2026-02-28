'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../lib/cn'

export const filterBarClass =
  'shrink-0 border-b border-border bg-muted/30 px-4 py-3 flex items-center gap-3 flex-wrap'

export interface ListFilterBarSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

/**
 * Filter bar slot: filter controls area, above the data container.
 */
const ListFilterBarSlot = React.forwardRef<HTMLDivElement, ListFilterBarSlotProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(filterBarClass, className)}
        data-list-pattern="filter-bar"
        {...props}
      />
    )
  },
)
ListFilterBarSlot.displayName = 'ListFilterBarSlot'

export { ListFilterBarSlot }
