'use client'

import * as React from 'react'
import type { ListActions, ListModel, ListResult } from './contracts'
import { useListHost, type ListHostValue, type UseListHostOptions } from './useListHost'

export interface ListHostProps<Item> extends Omit<UseListHostOptions<Item>, 'model' | 'actions' | 'initialData'> {
  model: ListModel<Item>
  actions: ListActions<Item>
  initialData?: ListResult<Item>
  children: (host: ListHostValue<Item>) => React.ReactNode
}

export function ListHost<Item>({
  model,
  actions,
  initialData,
  children,
  ...options
}: ListHostProps<Item>) {
  const host = useListHost({ model, actions, initialData, ...options })
  return <>{children(host)}</>
}
