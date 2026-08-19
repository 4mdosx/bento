'use client'

import * as React from 'react'

type Viewport = 'mobile' | 'tablet' | 'desktop' | 'fluid'
type Surface = 'canvas' | 'muted' | 'inverse'

const viewportWidths: Record<Viewport, number | undefined> = {
  mobile: 390,
  tablet: 768,
  desktop: 1200,
  fluid: undefined,
}

export function ComponentWorkbench({
  title,
  description,
  checks,
  children,
}: {
  title: string
  description: string
  checks: readonly string[]
  children: React.ReactNode
}) {
  const [viewport, setViewport] = React.useState<Viewport>('fluid')
  const [surface, setSurface] = React.useState<Surface>('canvas')
  const [showGrid, setShowGrid] = React.useState(false)
  const [completed, setCompleted] = React.useState<ReadonlySet<number>>(new Set())

  const toggleCheck = (index: number) => {
    setCompleted((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return <div className="space-y-5">
    <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div><p className="text-body-sm font-medium text-muted">Interactive validation</p><h1 className="text-heading-lg font-semibold">{title}</h1><p className="mt-2 max-w-2xl text-body-md text-muted">{description}</p></div>
      <div className="rounded-full border border-border px-3 py-1 text-body-sm"><strong>{completed.size}/{checks.length}</strong> checks passed</div>
    </header>

    <section className="overflow-hidden rounded-xl border border-border bg-background" aria-label={`${title} validation workbench`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/30 p-3">
        <fieldset className="flex flex-wrap gap-1"><legend className="sr-only">Preview viewport</legend>{(Object.keys(viewportWidths) as Viewport[]).map((item) => <button key={item} type="button" aria-pressed={viewport === item} onClick={() => setViewport(item)} className={`rounded-md px-3 py-1.5 text-body-sm ${viewport === item ? 'bg-foreground text-background' : 'hover:bg-muted'}`}>{item}</button>)}</fieldset>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2 text-body-sm"><span>Surface</span><select value={surface} onChange={(event) => setSurface(event.target.value as Surface)} className="rounded border border-border bg-background px-2 py-1"><option value="canvas">Canvas</option><option value="muted">Muted</option><option value="inverse">Inverse</option></select></label>
          <label className="flex items-center gap-2 text-body-sm"><input type="checkbox" checked={showGrid} onChange={(event) => setShowGrid(event.target.checked)} />Grid</label>
        </div>
      </div>
      <div className="overflow-x-auto bg-muted/20 p-4 sm:p-8">
        <div
          className={`mx-auto min-h-80 rounded-lg border border-border p-5 transition-all ${surface === 'muted' ? 'bg-muted' : surface === 'inverse' ? 'bg-foreground text-background' : 'bg-background'} ${showGrid ? 'workbench-grid' : ''}`}
          style={{ width: viewportWidths[viewport] ? `${viewportWidths[viewport]}px` : '100%', maxWidth: '100%' }}
          data-viewport={viewport}
        >{children}</div>
      </div>
    </section>

    <section className="grid gap-3 rounded-xl border border-border p-4 md:grid-cols-3" aria-labelledby="validation-checklist">
      <div><h2 id="validation-checklist" className="text-heading-md font-semibold">Validation checklist</h2><p className="mt-1 text-body-sm text-muted">Run each check manually in the preview, then record the result.</p></div>
      <div className="grid gap-2 md:col-span-2">{checks.map((check, index) => <label key={check} className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/20"><input type="checkbox" checked={completed.has(index)} onChange={() => toggleCheck(index)} /><span className={completed.has(index) ? 'line-through text-muted' : ''}>{check}</span></label>)}</div>
    </section>
  </div>
}
