'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../shared/cn'
import { ListFilterBarSlot } from '../parts/list/ListFilterBarSlot'
import { ListDataSlot } from '../parts/list/ListDataSlot'
import { ListListSlot } from '../parts/list/ListListSlot'
import { ListListItemSlot } from '../parts/list/ListListItemSlot'
import { ListPaginationSlot } from '../parts/list/ListPagination'

const listContainerRootClass =
  'flex flex-col gap-0 min-h-0 rounded-lg border border-border bg-background overflow-hidden'

export interface ListContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

/**
 * List pattern root: structure container that stacks Filter Bar → Data → Pagination.
 * Presentation slots (FilterBar, Data, List, ListItem, Pagination) are provided by block layer.
 */
const ListContainerRoot = React.forwardRef<HTMLDivElement, ListContainerProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(listContainerRootClass, className)}
        data-list-pattern="root"
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
ListContainerRoot.displayName = 'ListContainer'

const ListContainer = Object.assign(ListContainerRoot, {
  FilterBar: ListFilterBarSlot,
  Data: ListDataSlot,
  List: ListListSlot,
  ListItem: ListListItemSlot,
  Pagination: ListPaginationSlot,
})

export {
  ListContainer,
  ListContainerRoot,
  listContainerRootClass,
}
