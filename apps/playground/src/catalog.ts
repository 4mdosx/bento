export const componentCatalog = [
  {
    href: '/button',
    name: 'Button',
    layer: 'Primitive',
    maturity: 'ready',
    description: 'Variants, sizes, keyboard focus and disabled states.',
    checks: ['All variants render', 'Keyboard focus is visible', 'Disabled state blocks interaction'],
  },
  {
    href: '/list',
    name: 'List Host',
    layer: 'Host + View',
    maturity: 'preview',
    description: 'Query lifecycle, responsive presentations and empty states.',
    checks: ['Search updates results', 'Loading and empty states are announced', 'Mobile and desktop views preserve meaning'],
  },
  {
    href: '/detail',
    name: 'Detail / Overlay',
    layer: 'Pattern + Runtime',
    maturity: 'preview',
    description: 'Adaptive overlay presentation and route-backed state.',
    checks: ['Trigger opens detail', 'Escape closes the overlay', 'Focus returns to the trigger'],
  },
] as const

export type CatalogItem = (typeof componentCatalog)[number]
