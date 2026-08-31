'use client'

import * as React from 'react'
import { Button, DetailPresentation } from 'bento-kit'

export function DetailExample({ title, open: requestedOpen }: { title: string; open: boolean }) {
  const [open, setOpen] = React.useState(requestedOpen)
  React.useEffect(() => setOpen(requestedOpen), [requestedOpen])

  return <>
    <Button onClick={() => setOpen(true)}>Open adaptive detail</Button>
    <DetailPresentation id={open ? 'alpha' : ''} onClose={() => setOpen(false)} title={title}>
      <div className="detail-preview-content"><h2>{title}</h2><p>The presentation adapts through BottomSheet, Drawer or Modal.</p></div>
    </DetailPresentation>
  </>
}
