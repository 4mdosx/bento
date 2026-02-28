'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ResponsiveLayout } from '../layout/ResponsiveLayout'
import { cn } from '../../lib/cn'

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

// -------- Composition Slots --------

export interface ListContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  /** State from useListPageState; when provided, child blocks can consume it via useListPageStateContext */
  listPageState?: ListPageState | null
}

/**
 * List pattern root: stacks Filter Bar → Data Container → Pagination.
 * Composition only; listPageState is provided for block layer when injected.
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

const filterBarClass =
  'shrink-0 border-b border-border bg-muted/30 px-4 py-3 flex items-center gap-3 flex-wrap'

export interface ListContainerFilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

/**
 * Filter bar (optional): filter controls area, above the data container.
 */
const ListContainerFilterBar = React.forwardRef<HTMLDivElement, ListContainerFilterBarProps>(
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
ListContainerFilterBar.displayName = 'ListContainerFilterBar'

const dataContainerClass =
  'flex-1 min-h-0 overflow-auto border-border [&:not(:last-child)]:border-b-0'

export interface ListContainerDataProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  /** 移动端内容（List + item 垂直布局）；与 tablet 同时传入时使用 ResponsiveLayout 切换 */
  mobile?: React.ReactNode
  /** 平板及以上内容（如表格）；与 mobile 同时传入时在 tablet/screen/large 断点展示 */
  tablet?: React.ReactNode
}

/**
 * Data container (table/list): main content area for table or list content.
 * 当同时传入 mobile 与 tablet 时，内部使用 ResponsiveLayout：移动端展示 mobile slot，其余断点展示 tablet slot。
 */
const ListContainerData = React.forwardRef<HTMLDivElement, ListContainerDataProps>(
  ({ className, asChild = false, mobile, tablet, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    const hasResponsiveSlots = mobile != null && tablet != null
    const content = hasResponsiveSlots ? (
      <ResponsiveLayout mobile={mobile} tablet={tablet} className="h-full" />
    ) : (
      children
    )
    return (
      <Comp
        ref={ref}
        className={cn(dataContainerClass, className)}
        data-list-pattern="data"
        {...props}
      >
        {content}
      </Comp>
    )
  },
)
ListContainerData.displayName = 'ListContainerData'

const listClass = 'flex flex-col gap-0 divide-y divide-border'

export interface ListContainerListProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

/**
 * 移动端列表容器：垂直方向布局，与 ListContainer.ListItem 搭配用于 List + item 模式。
 */
const ListContainerList = React.forwardRef<HTMLDivElement, ListContainerListProps>(
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
ListContainerList.displayName = 'ListContainerList'

const listItemClass = 'px-4 py-3 flex flex-col gap-1'

export interface ListContainerListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

/**
 * 移动端列表项：与 ListContainer.List 搭配，用于移动端垂直列表中的单条展示。
 */
const ListContainerListItem = React.forwardRef<HTMLDivElement, ListContainerListItemProps>(
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
ListContainerListItem.displayName = 'ListContainerListItem'

const paginationClass =
  'shrink-0 border-t border-border bg-muted/30 px-4 py-3 flex items-center justify-between gap-4'

export interface ListContainerPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

/**
 * Pagination (optional): paging controls, below the data container.
 */
const ListContainerPagination = React.forwardRef<HTMLDivElement, ListContainerPaginationProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(paginationClass, className)}
        data-list-pattern="pagination"
        {...props}
      />
    )
  },
)
ListContainerPagination.displayName = 'ListContainerPagination'

const ListContainer = Object.assign(ListContainerRoot, {
  FilterBar: ListContainerFilterBar,
  Data: ListContainerData,
  List: ListContainerList,
  ListItem: ListContainerListItem,
  Pagination: ListContainerPagination,
})

export {
  ListContainer,
  ListContainerRoot,
  ListContainerFilterBar,
  ListContainerData,
  ListContainerList,
  ListContainerListItem,
  ListContainerPagination,
  listContainerRootClass,
  filterBarClass,
  dataContainerClass,
  listClass,
  listItemClass,
  paginationClass,
}
