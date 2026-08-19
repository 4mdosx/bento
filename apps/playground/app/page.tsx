import Link from 'next/link'
import { componentCatalog } from '../src/catalog'

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-body-sm font-medium text-muted">Component validation tool</p><h1 className="text-heading-lg font-semibold">Bento Workbench</h1></div><Link href="/workflow" className="rounded-md border border-border px-3 py-2 text-body-sm font-medium hover:bg-muted/30">Develop a component →</Link></div>
      <p className="mt-2 max-w-2xl text-body-md text-muted">
        Exercise components across viewports, surfaces and interaction states,
        then record the manual checks required before contribution.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {componentCatalog.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-border p-5 hover:bg-muted/30"
          >
            <span className="flex items-center justify-between gap-2"><strong className="text-heading-md">{item.name}</strong><span className="rounded-full bg-muted px-2 py-1 text-xs">{item.maturity}</span></span>
            <span className="mt-2 block text-body-sm text-muted">
              {item.description}
            </span>
            <span className="mt-4 block text-xs font-medium uppercase tracking-wide text-muted">{item.layer} · {item.checks.length} checks</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
