'use client'

import * as React from 'react'
import { ListFilterBarSlot } from './ListFilterBarSlot'
import { cn } from '../../shared/cn'

const inputClass =
  'h-8 rounded-md border border-border bg-background px-3 text-body-sm outline-none focus:ring-2 focus:ring-ring'
const selectClass =
  'h-8 rounded-md border border-border bg-background px-3 text-body-sm outline-none focus:ring-2 focus:ring-ring'

export interface ListFilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Placeholder text for the search input */
  searchPlaceholder?: string
  /** Filter dropdown options, e.g. [{ value: '', label: 'All' }, ...] */
  filterOptions?: Array<{ value: string; label: string }>
  /** Controlled search value */
  searchValue?: string
  /** Controlled filter value */
  filterValue?: string
  onSearchChange?: (value: string) => void
  onFilterChange?: (value: string) => void
  /** When provided, replaces the default search + select UI */
  children?: React.ReactNode
}

/**
 * Default filter block: search input + filter dropdown. Composes with ListContainer.FilterBar.
 */
const ListFilterBar = React.forwardRef<HTMLDivElement, ListFilterBarProps>(
  (
    {
      className,
      searchPlaceholder = 'Search...',
      filterOptions = [],
      searchValue,
      filterValue,
      onSearchChange,
      onFilterChange,
      children,
      ...props
    },
    ref,
  ) => {
    const isControlledSearch = searchValue !== undefined
    const isControlledFilter = filterValue !== undefined
    const [localSearch, setLocalSearch] = React.useState('')
    const [localFilter, setLocalFilter] = React.useState('')

    const search = isControlledSearch ? searchValue : localSearch
    const filter = isControlledFilter ? filterValue : localFilter

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      if (!isControlledSearch) setLocalSearch(v)
      onSearchChange?.(v)
    }
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const v = e.target.value
      if (!isControlledFilter) setLocalFilter(v)
      onFilterChange?.(v)
    }

    return (
      <ListFilterBarSlot ref={ref} className={cn(className)} {...props}>
        {children ?? (
          <>
            <input
              type="search"
              placeholder={searchPlaceholder}
              className={inputClass}
              value={search}
              onChange={handleSearchChange}
            />
            {filterOptions.length > 0 && (
              <select
                className={selectClass}
                value={filter}
                onChange={handleFilterChange}
              >
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </>
        )}
      </ListFilterBarSlot>
    )
  },
)
ListFilterBar.displayName = 'ListFilterBar'

export { ListFilterBar }
