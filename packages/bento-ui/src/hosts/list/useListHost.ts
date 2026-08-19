'use client'

import * as React from 'react'
import type { BentoError } from '../../core'
import type {
  ListActions,
  ListItemKey,
  ListModel,
  ListQuery,
  ListResult,
  ListViewModel,
} from './contracts'

const toError = (value: unknown): Error =>
  value instanceof Error ? value : new Error(String(value))

export interface UseListHostOptions<Item> {
  model: ListModel<Item>
  actions: ListActions<Item>
  initialData?: ListResult<Item>
  onError?: (error: BentoError) => void
}

export interface ListHostValue<Item> extends ListViewModel<Item> {
  query: ListQuery
  total?: number
  nextCursor?: string
  refresh: () => Promise<void>
  setQuery: (query: ListQuery) => void
  setSelected: (key: ListItemKey, selected: boolean) => void
  runRowAction: (name: string, item: Item) => Promise<void>
}

export function useListHost<Item>({
  model,
  actions,
  initialData,
  onError,
}: UseListHostOptions<Item>): ListHostValue<Item> {
  const [query, setQuery] = React.useState(model.query)
  const [result, setResult] = React.useState<ListResult<Item>>(
    initialData ?? { items: [] },
  )
  const [error, setError] = React.useState<Error | null>(null)
  const [isLoading, setLoading] = React.useState(!initialData)
  const [isRefreshing, setRefreshing] = React.useState(false)
  const [pendingRowActions, setPendingRowActions] = React.useState<ReadonlySet<string>>(
    new Set(),
  )
  const [internalSelection, setInternalSelection] = React.useState<
    ReadonlySet<ListItemKey>
  >(() =>
    model.selection && 'defaultValue' in model.selection
      ? model.selection.defaultValue ?? new Set()
      : new Set(),
  )
  const requestRef = React.useRef<AbortController | null>(null)
  const requestIdRef = React.useRef(0)

  const controlledSelection =
    model.selection && 'value' in model.selection ? model.selection : null
  const selectedKeys = controlledSelection?.value ?? internalSelection

  const execute = React.useCallback(
    async (nextQuery: ListQuery, refresh = false) => {
      requestRef.current?.abort()
      const controller = new AbortController()
      const requestId = ++requestIdRef.current
      requestRef.current = controller
      setError(null)
      refresh ? setRefreshing(true) : setLoading(true)
      try {
        const next = await actions.query(nextQuery, { signal: controller.signal })
        if (!controller.signal.aborted && requestId === requestIdRef.current) {
          setResult(next)
        }
      } catch (cause) {
        if (!controller.signal.aborted && requestId === requestIdRef.current) {
          const nextError = toError(cause)
          setError(nextError)
          onError?.({
            code: 'LIST_QUERY_FAILED',
            message: nextError.message,
            cause,
            retryable: true,
          })
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false)
          setRefreshing(false)
        }
      }
    },
    [actions, onError],
  )

  React.useEffect(() => {
    void execute(query)
    return () => requestRef.current?.abort()
  }, [execute, query])

  const setSelected = React.useCallback(
    (key: ListItemKey, selected: boolean) => {
      const next = new Set(selectedKeys)
      selected ? next.add(key) : next.delete(key)
      if (controlledSelection) controlledSelection.onChange(next)
      else {
        setInternalSelection(next)
        if (model.selection && 'onChange' in model.selection) {
          model.selection.onChange?.(next)
        }
      }
    },
    [controlledSelection, model.selection, selectedKeys],
  )

  const runRowAction = React.useCallback(
    async (name: string, item: Item) => {
      const action = actions.row?.[name]
      if (!action) throw new Error(`Unknown row action: ${name}`)
      const controller = new AbortController()
      const key = `${name}:${model.getKey(item)}`
      const previous = result
      setPendingRowActions((current) => new Set(current).add(key))
      if (action.optimistic) {
        setResult((current) => ({
          ...current,
          items: action.optimistic!(current.items, item),
        }))
      }
      try {
        await action.run(item, { signal: controller.signal })
        await execute(query, true)
      } catch (cause) {
        setResult(previous)
        const nextError = toError(cause)
        setError(nextError)
        throw nextError
      } finally {
        setPendingRowActions((current) => {
          const next = new Set(current)
          next.delete(key)
          return next
        })
      }
    },
    [actions.row, execute, model, query, result],
  )

  return {
    query,
    items: result.items,
    total: result.total,
    nextCursor: result.nextCursor,
    selectedKeys,
    isLoading,
    isRefreshing,
    pendingRowActions,
    isEmpty: !isLoading && !error && result.items.length === 0,
    error,
    refresh: () => execute(query, true),
    setQuery,
    setSelected,
    runRowAction,
  }
}
