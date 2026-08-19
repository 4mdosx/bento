'use client'

import * as React from 'react'
import { ListHost, type ListActions, type ListModel } from 'bento-ui/hosts/list'
import { ListContainer } from 'bento-ui/views'

interface Resource {
  id: string
  name: string
  kind: 'Document' | 'Dataset' | 'Dashboard'
  owner: string
}

export interface ResourceListExampleProps {
  search: string
  state: 'success' | 'loading' | 'empty'
  presentation: 'auto' | 'cards' | 'table'
}

const resources: Resource[] = [
  { id: '1', name: 'Product brief', kind: 'Document', owner: 'Mina' },
  { id: '2', name: 'Usage metrics', kind: 'Dataset', owner: 'Ravi' },
  { id: '3', name: 'Operations', kind: 'Dashboard', owner: 'Jo' },
]

export function ResourceListExample({ search, state, presentation }: ResourceListExampleProps) {
  const model = React.useMemo<ListModel<Resource>>(() => ({
    getKey: (resource) => resource.id,
    query: { search, filters: {}, sort: [{ field: 'name', direction: 'ascending' }], pagination: { kind: 'page', page: 1, pageSize: 20 } },
  }), [search])
  const actions = React.useMemo<ListActions<Resource>>(() => ({
    query: async (query, { signal }) => {
      await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, state === 'loading' ? 60_000 : 80)
        signal.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Cancelled', 'AbortError')) })
      })
      const items = state === 'empty' ? [] : resources.filter((item) => item.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()))
      return { items, total: items.length }
    },
  }), [state])
  const initialItems = state === 'empty' ? [] : resources.filter((item) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  return <ListHost key={`${search}:${state}`} model={model} actions={actions} initialData={state === 'loading' ? undefined : { items: initialItems }}>
    {(host) => <ListContainer aria-label="Resources">
      <ListContainer.FilterBar><label className="preview-search"><span>Search</span><input aria-label="Search resources" value={host.query.search} readOnly /></label></ListContainer.FilterBar>
      {host.isLoading && <p role="status">Loading resources…</p>}
      {host.error && <p role="alert">{host.error.message}</p>}
      {host.isEmpty && <p role="status">No resources found.</p>}
      {!host.isLoading && !host.isEmpty ? <ListContainer.Data
        mobile={<ul aria-label="Resource cards">{host.items.map((item) => <li key={item.id}><strong>{item.name}</strong> · {item.kind}</li>)}</ul>}
        tablet={<table aria-label="Resource table"><thead><tr><th>Name</th><th>Type</th><th>Owner</th></tr></thead><tbody>{host.items.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.kind}</td><td>{item.owner}</td></tr>)}</tbody></table>}
      /> : null}
      <small>Presentation: {presentation}</small>
    </ListContainer>}
  </ListHost>
}
