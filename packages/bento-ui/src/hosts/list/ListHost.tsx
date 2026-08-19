'use client'

import * as React from 'react'
import type { ListActions, ListModel, ListResult } from './contracts'
import { useListHost, type ListHostValue } from './useListHost'

export interface ListHostProps<Item> {
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
}: ListHostProps<Item>) {
  const host = useListHost({ model, actions, initialData })
  return <>{children(host)}</>
}
