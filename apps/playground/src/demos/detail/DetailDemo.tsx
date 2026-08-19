'use client'

import { Button, DetailPresentation, useDetailState } from 'bento-ui'

export function DetailDemo() {
  const detail = useDetailState('detail')

  return (
    <>
      <Button onClick={() => detail.open('alpha')}>Open adaptive detail</Button>
      <DetailPresentation
        id={detail.id ?? ''}
        onClose={detail.close}
        title="Project detail"
      >
        <div className="p-6">
          <h2 className="text-heading-md font-semibold">Project {detail.id}</h2>
          <p className="mt-2 text-body-sm text-muted">
            The presentation adapts automatically through BottomSheet, Drawer
            or Modal.
          </p>
        </div>
      </DetailPresentation>
    </>
  )
}
