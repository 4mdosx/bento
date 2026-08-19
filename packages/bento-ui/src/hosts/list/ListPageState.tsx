'use client'

import * as React from 'react'

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

export interface UseListPageStateOptions {
  page?: number
  pageSize?: number
  total?: number
}

const ListPageStateContext = React.createContext<ListPageState | null>(null)

export function useListPageStateContext(): ListPageState | null {
  return React.useContext(ListPageStateContext)
}

export function ListPageStateProvider({
  value,
  children,
}: {
  value: ListPageState
  children: React.ReactNode
}) {
  return (
    <ListPageStateContext.Provider value={value}>
      {children}
    </ListPageStateContext.Provider>
  )
}

/**
 * Temporary paging host state. This will evolve into ListHost without leaking
 * its state implementation into the generated List view.
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
    setPage((current) => Math.min(current + 1, totalPages))
  }, [totalPages])

  const goPrev = React.useCallback(() => {
    setPage((current) => Math.max(current - 1, 1))
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
