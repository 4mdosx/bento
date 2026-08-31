import type { BentoAction, ControllableState } from '../../core'

export type ListItemKey = string | number
export type SortDirection = 'ascending' | 'descending'

export interface ListSort {
  field: string
  direction: SortDirection
}

export type ListFilterValue = string | number | boolean | readonly string[] | null
export type ListFilters = Readonly<Record<string, ListFilterValue>>

export interface ListPageQuery {
  kind: 'page'
  page: number
  pageSize: number
}

export interface ListCursorQuery {
  kind: 'cursor'
  cursor?: string
  pageSize: number
}

export type ListPaginationQuery = ListPageQuery | ListCursorQuery

export interface ListQuery {
  search: string
  filters: ListFilters
  sort: readonly ListSort[]
  pagination: ListPaginationQuery
}

export interface ListResult<Item> {
  items: readonly Item[]
  total?: number
  nextCursor?: string
}

export interface ListModel<Item> {
  getKey: (item: Item) => ListItemKey
  query: ListQuery
  selection?: ControllableState<ReadonlySet<ListItemKey>>
}

export interface ListActions<Item> {
  query: BentoAction<ListQuery, ListResult<Item>>
  row?: Readonly<Record<string, ListRowAction<Item>>>
}

export interface ListRowAction<Item> {
  run: BentoAction<Item, void>
  optimistic?: (items: readonly Item[], item: Item) => readonly Item[]
}

export interface ListViewModel<Item> {
  items: readonly Item[]
  selectedKeys: ReadonlySet<ListItemKey>
  isLoading: boolean
  isRefreshing: boolean
  pendingRowActions: ReadonlySet<string>
  isEmpty: boolean
  error: Error | null
}

export interface ListSlots<Item> {
  item?: (item: Item) => React.ReactNode
  empty?: () => React.ReactNode
  error?: (error: Error) => React.ReactNode
  loading?: () => React.ReactNode
}
