'use client'

import * as React from 'react'
import {
  ListContainerPagination,
  useListPageStateContext,
} from '../pattern/composition/ListContainer'
import { cn } from '../lib/cn'

const btnClass =
  'rounded border border-border px-2 py-1 text-body-sm hover:bg-muted/50'

export interface ListPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label template; {total} is replaced with the total count */
  totalLabel?: string
  /** Rendered when listPageState is not provided */
  fallback?: React.ReactNode
  /** When provided, replaces the default prev/next buttons */
  children?: React.ReactNode
}

/**
 * Default pagination block: total label + prev/next. Requires listPageState from useListPageState via ListContainer.
 */
const ListPagination = React.forwardRef<HTMLDivElement, ListPaginationProps>(
  (
    {
      className,
      totalLabel = '{total} items',
      fallback = null,
      children,
      ...props
    },
    ref,
  ) => {
    const state = useListPageStateContext()

    if (!state) {
      return (
        <ListContainerPagination ref={ref} className={cn(className)} {...props}>
          {fallback}
        </ListContainerPagination>
      )
    }

    const { total, hasPrevPage, hasNextPage, goPrev, goNext } = state
    const label = totalLabel.replace('{total}', String(total))

    return (
      <ListContainerPagination ref={ref} className={cn(className)} {...props}>
        {children ?? (
          <>
            <span className="text-body-sm text-muted">{label}</span>
            <div className="flex gap-2">
              <button
                type="button"
                className={btnClass}
                disabled={!hasPrevPage}
                onClick={goPrev}
              >
                Previous
              </button>
              <button
                type="button"
                className={btnClass}
                disabled={!hasNextPage}
                onClick={goNext}
              >
                Next
              </button>
            </div>
          </>
        )}
      </ListContainerPagination>
    )
  },
)
ListPagination.displayName = 'ListPagination'

export { ListPagination }
