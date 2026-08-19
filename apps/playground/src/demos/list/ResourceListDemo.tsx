'use client'

import * as React from 'react'
import {
  ListHost,
  type ListActions,
  type ListModel,
} from 'bento-ui/hosts/list'
import { ListContainer } from 'bento-ui/views'

interface Resource {
  id: string
  name: string
  kind: 'Document' | 'Dataset' | 'Dashboard'
  owner: string
}

const resources: Resource[] = [
  { id: '1', name: 'Product brief', kind: 'Document', owner: 'Mina' },
  { id: '2', name: 'Usage metrics', kind: 'Dataset', owner: 'Ravi' },
  { id: '3', name: 'Operations', kind: 'Dashboard', owner: 'Jo' },
]

const model: ListModel<Resource> = {
  getKey: (resource) => resource.id,
  query: {
    search: '',
    filters: {},
    sort: [{ field: 'name', direction: 'ascending' }],
    pagination: { kind: 'page', page: 1, pageSize: 20 },
  },
}

const actions: ListActions<Resource> = {
  query: async (query, { signal }) => {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 80)
      signal.addEventListener('abort', () => {
        clearTimeout(timer)
        reject(new DOMException('Cancelled', 'AbortError'))
      })
    })
    const search = query.search.toLocaleLowerCase()
    const items = resources.filter((item) =>
      item.name.toLocaleLowerCase().includes(search),
    )
    return { items, total: items.length }
  },
}

export function ResourceListDemo() {
  return (
    <ListHost model={model} actions={actions} initialData={{ items: resources }}>
      {(host) => (
        <ListContainer aria-label="Resources">
          <ListContainer.FilterBar>
            <label>
              <span className="sr-only">Search resources</span>
              <input
                aria-label="Search resources"
                value={host.query.search}
                onChange={(event) =>
                  host.setQuery({ ...host.query, search: event.target.value })
                }
              />
            </label>
            <button onClick={() => void host.refresh()} disabled={host.isRefreshing}>
              Refresh
            </button>
          </ListContainer.FilterBar>
          {host.isLoading && <p role="status">Loading resources…</p>}
          {host.error && <p role="alert">{host.error.message}</p>}
          {host.isEmpty && <p role="status">No resources found.</p>}
          <ListContainer.Data
            mobile={
              <ul aria-label="Resource cards">
                {host.items.map((item) => (
                  <li key={item.id}><strong>{item.name}</strong> · {item.kind} · {item.owner}</li>
                ))}
              </ul>
            }
            tablet={<div role="region" aria-label="Resource table">
              <table className="w-full">
                <thead><tr><th>Name</th><th>Type</th><th>Owner</th></tr></thead>
                <tbody>{host.items.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.kind}</td><td>{item.owner}</td></tr>)}</tbody>
              </table>
            </div>}
          />
        </ListContainer>
      )}
    </ListHost>
  )
}
