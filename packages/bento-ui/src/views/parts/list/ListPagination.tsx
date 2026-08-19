'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../shared/cn'

export const paginationClass =
  'shrink-0 border-t border-border bg-muted/30 px-4 py-3 flex items-center justify-between gap-4'

export interface ListPaginationSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

/**
 * Pagination slot: paging controls area, below the data container.
 */
const ListPaginationSlot = React.forwardRef<HTMLDivElement, ListPaginationSlotProps>(
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
ListPaginationSlot.displayName = 'ListPaginationSlot'

const btnClass =
  'rounded border border-border px-2 py-1 text-body-sm hover:bg-muted/50'

export interface ListPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label template; {total} is replaced with the total count */
  totalLabel?: string
  /** Rendered when total is not provided */
  fallback?: React.ReactNode
  /** When provided, replaces the default prev/next buttons */
  children?: React.ReactNode
  total?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
  onPreviousPage?: () => void
  onNextPage?: () => void
}

/**
 * Default controlled pagination block: total label + previous/next actions.
 */
const ListPagination = React.forwardRef<HTMLDivElement, ListPaginationProps>(
  (
    {
      className,
      totalLabel = '{total} items',
      fallback = null,
      children,
      total,
      hasPreviousPage = false,
      hasNextPage = false,
      onPreviousPage,
      onNextPage,
      ...props
    },
    ref,
  ) => {
    if (total === undefined) {
      return (
        <ListPaginationSlot ref={ref} className={cn(className)} {...props}>
          {fallback}
        </ListPaginationSlot>
      )
    }

    const label = totalLabel.replace('{total}', String(total))

    return (
      <ListPaginationSlot ref={ref} className={cn(className)} {...props}>
        {children ?? (
          <>
            <span className="text-body-sm text-muted">{label}</span>
            <div className="flex gap-2">
              <button
                type="button"
                className={btnClass}
                disabled={!hasPreviousPage}
                onClick={onPreviousPage}
              >
                Previous
              </button>
              <button
                type="button"
                className={btnClass}
                disabled={!hasNextPage}
                onClick={onNextPage}
              >
                Next
              </button>
            </div>
          </>
        )}
      </ListPaginationSlot>
    )
  },
)
ListPagination.displayName = 'ListPagination'

export { ListPagination, ListPaginationSlot }
