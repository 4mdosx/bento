'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'
import { ListFilterBarSlot } from '../../block/ListFilterBarSlot'
import { ListDataSlot } from '../../block/ListDataSlot'
import { ListListSlot } from '../../block/ListListSlot'
import { ListListItemSlot } from '../../block/ListListItemSlot'
import { ListPaginationSlot } from '../../block/ListPagination'

const listContainerRootClass =
  'flex flex-col gap-0 min-h-0 rounded-lg border border-border bg-background overflow-hidden'

// -------- List Page State (page index + intermediate state) --------

export interface ListPageState {
  page: number
  pageSize: number
  total: number
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  setTotal: (total: number) => void
  hasNextPage: boolean
  hasPrevPage: boolean
  goNext: () => void
  goPrev: () => void
}

const ListPageStateContext = React.createContext<ListPageState | null>(null)

export function useListPageStateContext() {
  const ctx = React.useContext(ListPageStateContext)
  return ctx
}

export interface UseListPageStateOptions {
  page?: number
  pageSize?: number
  total?: number
}

/**
 * List page state: page index, page size, total count, and derived helpers.
 * Pass the return value into ListContainer via the listPageState prop.
 */
export function useListPageState(
  initial: UseListPageStateOptions = {},
): ListPageState {
  const [page, setPage] = React.useState(initial.page ?? 1)
  const [pageSize, setPageSize] = React.useState(initial.pageSize ?? 10)
  const [total, setTotal] = React.useState(initial.total ?? 0)

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const goNext = React.useCallback(() => {
    setPage((p) => Math.min(p + 1, totalPages))
  }, [totalPages])

  const goPrev = React.useCallback(() => {
    setPage((p) => Math.max(p - 1, 1))
  }, [])

  return React.useMemo(
    () => ({
      page,
      pageSize,
      total,
      setPage,
      setPageSize,
      setTotal,
      hasNextPage,
      hasPrevPage,
      goNext,
      goPrev,
    }),
    [
      page,
      pageSize,
      total,
      hasNextPage,
      hasPrevPage,
      goNext,
      goPrev,
    ],
  )
}

// -------- Composition Root (structure container only) --------

export interface ListContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  /** State from useListPageState; when provided, child blocks can consume it via useListPageStateContext */
  listPageState?: ListPageState | null
}

/**
 * List pattern root: structure container that stacks Filter Bar → Data → Pagination.
 * Presentation slots (FilterBar, Data, List, ListItem, Pagination) are provided by block layer.
 */
const ListContainerRoot = React.forwardRef<HTMLDivElement, ListContainerProps>(
  ({ className, asChild = false, listPageState, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    const content = listPageState ? (
      <ListPageStateContext.Provider value={listPageState}>
        {children}
      </ListPageStateContext.Provider>
    ) : (
      children
    )
    return (
      <Comp
        ref={ref}
        className={cn(listContainerRootClass, className)}
        data-list-pattern="root"
        {...props}
      >
        {content}
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
