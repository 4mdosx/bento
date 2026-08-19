import Link from 'next/link'

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="text-heading-lg font-semibold">Bento Playground</h1>
      <p className="mt-2 max-w-2xl text-body-md text-muted">
        Each component has an independent route for focused development,
        documentation and interaction testing.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ['/button', 'Button', 'Primitive variants and sizes.'],
          ['/list', 'List', 'Responsive list, table and pagination.'],
          ['/detail', 'Detail / Overlay', 'Adaptive detail presentation.'],
        ].map(([href, title, description]) => (
          <Link
            key={href}
            href={href}
            className="rounded-lg border border-border p-5 hover:bg-muted/30"
          >
            <strong className="text-heading-md">{title}</strong>
            <span className="mt-2 block text-body-sm text-muted">
              {description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
