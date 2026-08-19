import { Suspense } from 'react'
import { DetailDemo } from '../../src/demos/detail/DetailDemo'
import { ComponentWorkbench } from '../../components/ComponentWorkbench'
import { componentCatalog } from '../../src/catalog'

export default function DetailPage() {
  const item = componentCatalog[2]
  return <div className="mx-auto w-full max-w-7xl"><ComponentWorkbench title={item.name} description={item.description} checks={item.checks}><Suspense fallback={<p className="text-body-sm text-muted">Loading demo…</p>}><DetailDemo /></Suspense></ComponentWorkbench></div>
}
