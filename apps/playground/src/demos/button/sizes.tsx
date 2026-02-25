'use client'

import { Button } from 'design-system'

const SIZES = ['sm', 'md', 'lg', 'icon'] as const

export function ButtonSizesDemo() {
  return (
    <section className="space-y-4">
      <h3 className="text-body-sm font-medium text-muted">Sizes</h3>
      <div className="flex flex-wrap items-center gap-3">
        {SIZES.map((size) => (
          <Button
            key={size}
            size={size}
            variant="outline"
            {...(size === 'icon' ? { 'aria-label': 'Icon button' } : {})}
          >
            {size === 'icon' ? '◆' : size}
          </Button>
        ))}
      </div>
    </section>
  )
}
