'use client'

import { Button } from 'bento-ui'

const VARIANTS = [
  'solid',
  'outline',
  'ghost',
  'destructive',
  'link',
] as const

export function ButtonVariantsDemo() {
  return (
    <section className="space-y-4">
      <h3 className="text-body-sm font-medium text-muted">Variants</h3>
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
    </section>
  )
}
