import { ListDemo } from '../../src/demos/list/ListDemo'

export default function ListPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-heading-lg font-semibold">List</h1>
        <p className="mt-2 text-body-md text-muted">
          Responsive List View with filter and paging parts.
        </p>
      </div>
      <ListDemo />
    </div>
  )
}
