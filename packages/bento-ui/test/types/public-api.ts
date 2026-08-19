import type { ListActions, ListModel, ListViewModel } from '../../src/hosts/list'

type Resource = { id: string; name: string }

const model: ListModel<Resource> = {
  getKey: (item) => item.id,
  query: { search: '', filters: {}, sort: [], pagination: { kind: 'page', page: 1, pageSize: 20 } },
}
const actions: ListActions<Resource> = { query: async () => ({ items: [] }) }
const viewModel: ListViewModel<Resource> = {
  items: [], selectedKeys: new Set(), isLoading: false, isRefreshing: false,
  pendingRowActions: new Set(), isEmpty: true, error: null,
}

void [model, actions, viewModel]
