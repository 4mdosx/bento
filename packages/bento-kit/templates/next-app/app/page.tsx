'use client'

import { ListHost, type ListActions, type ListModel } from 'bento-kit/hosts/list'
import { ListView } from '@/components/bento/views/ListView'

type Resource = { id: string; name: string }

const model: ListModel<Resource> = {
  getKey: (resource) => resource.id,
  query: {
    search: '',
    filters: {},
    sort: [],
    pagination: { kind: 'page', page: 1, pageSize: 20 },
  },
}

const actions: ListActions<Resource> = {
  query: async (_query, { signal }) => {
    await Promise.resolve()
    if (signal.aborted) throw new DOMException('Cancelled', 'AbortError')
    return {
      items: [{ id: '1', name: 'Replace this list with your resource' }],
      total: 1,
    }
  },
}

export default function HomePage() {
  return (
    <ListHost model={model} actions={actions}>
      {(host) => <ListView host={host} renderItem={(item) => item.name} />}
    </ListHost>
  )
}
