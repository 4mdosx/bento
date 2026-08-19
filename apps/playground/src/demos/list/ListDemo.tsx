'use client'

import {
  ListContainer,
  ListFilterBar,
  ListPagination,
  ListTable,
} from 'bento-ui'
import type { ListTableColumn } from 'bento-ui/views'

type DemoRow = {
  id: string
  name: string
  status: string
}

const rows: DemoRow[] = [
  { id: 'alpha', name: 'Alpha', status: 'Active' },
  { id: 'beta', name: 'Beta', status: 'Draft' },
  { id: 'gamma', name: 'Gamma', status: 'Archived' },
]

const columns: ListTableColumn<DemoRow>[] = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
]

export function ListDemo() {
  return (
    <ListContainer>
      <ListFilterBar searchPlaceholder="Search projects…" />
      <ListContainer.Data
        mobile={
          <ListContainer.List>
            {rows.map((row) => (
              <ListContainer.ListItem key={row.id}>
                <strong>{row.name}</strong>
                <span className="text-body-sm text-muted">{row.status}</span>
              </ListContainer.ListItem>
            ))}
          </ListContainer.List>
        }
        tablet={<ListTable columns={columns} data={rows} />}
      />
      <ListPagination total={rows.length} />
    </ListContainer>
  )
}
