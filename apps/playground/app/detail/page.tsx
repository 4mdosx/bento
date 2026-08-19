import { Suspense } from 'react'
import { DetailDemo } from '../../src/demos/detail/DetailDemo'

export default function DetailPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-heading-lg font-semibold">Detail / Overlay</h1>
        <p className="mt-2 text-body-md text-muted">
          Next.js URL state with automatic multi-device presentation.
        </p>
      </div>
      <Suspense fallback={<p className="text-body-sm text-muted">Loading demo…</p>}>
        <DetailDemo />
      </Suspense>
    </div>
  )
}
