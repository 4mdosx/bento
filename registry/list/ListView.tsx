'use client'

import type { ListHostValue } from 'bento-kit/hosts/list'

export function ListView<Item>({ host, renderItem }: { host: ListHostValue<Item>; renderItem: (item: Item) => React.ReactNode }) {
  if (host.isLoading) return <p role="status">Loading…</p>
  if (host.error) return <p role="alert">{host.error.message}</p>
  if (host.isEmpty) return <p>No results.</p>
  return <ul>{host.items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>
}
