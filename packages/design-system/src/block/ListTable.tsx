'use client'

import * as React from 'react'
import { ListContainerData } from '../pattern/composition/ListContainer'
import { cn } from '../lib/cn'

const tableClass = 'w-full text-left text-body-sm'
const thClass = 'border-b border-border px-4 py-2 font-medium'
const trClass = 'border-b border-border/50'
const tdClass = 'px-4 py-2'
const theadClass = 'sticky top-0 bg-muted/50'

export interface ListTableColumn<T = unknown> {
  key: keyof T | string
  label: React.ReactNode
  render?: (row: T) => React.ReactNode
}

export interface ListTableProps<T = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  columns: ListTableColumn<T>[]
  data: T[]
  /** Field or function used as row key; defaults to 'id' */
  rowKey?: keyof T | ((row: T) => string | number)
  children?: React.ReactNode
  /** 为 false 时仅渲染 table，不包一层 ListContainerData；用于放入 ListContainer.Data 的 tablet slot */
  wrapInDataContainer?: boolean
}

function getRowKey<T>(row: T, rowKey: keyof T | ((row: T) => string | number)): string | number {
  return typeof rowKey === 'function' ? rowKey(row) : (row[rowKey] as string | number)
}

/**
 * Default table block: thead + tbody. Composes with ListContainer.Data.
 */
const tableContent = <T,>(
  columns: ListTableColumn<T>[],
  data: T[],
  keyFn: (row: T) => string | number,
  children?: React.ReactNode
) =>
  children ?? (
    <table className={tableClass}>
      <thead className={theadClass}>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className={thClass}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={String(keyFn(row))} className={trClass}>
            {columns.map((col) => (
              <td key={String(col.key)} className={tdClass}>
                {col.render
                  ? col.render(row)
                  : (row[col.key as keyof T] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )

function ListTableInner<T>(
  {
    columns,
    data,
    rowKey = 'id' as keyof T,
    className,
    children,
    wrapInDataContainer = true,
    ...props
  }: ListTableProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  const keyFn = typeof rowKey === 'function' ? rowKey : (row: T) => getRowKey(row, rowKey)
  const table = tableContent(columns, data, keyFn, children)

  if (!wrapInDataContainer) {
    return <>{table}</>
  }

  return (
    <ListContainerData ref={ref} className={cn(className)} {...props}>
      {table}
    </ListContainerData>
  )
}

export type ListTableComponent = <T = Record<string, unknown>>(
  props: ListTableProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement

const ListTable = React.forwardRef(ListTableInner) as ListTableComponent & {
  displayName?: string
}

ListTable.displayName = 'ListTable'

export { ListTable }
