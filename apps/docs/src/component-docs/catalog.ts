export const componentCatalog = [
  {
    slug: 'button',
    name: 'Button',
    group: 'Primitive',
    maturity: 'ready',
    description: 'Variants, sizes, labels and disabled behavior.',
  },
  {
    slug: 'list',
    name: 'List Host',
    group: 'Host + View',
    maturity: 'preview',
    description: 'Search, lifecycle states and responsive presentation.',
  },
  {
    slug: 'detail',
    name: 'Detail / Overlay',
    group: 'Pattern + Runtime',
    maturity: 'preview',
    description: 'Adaptive overlay presentation and open state.',
  },
] as const

export type ComponentCatalogItem = (typeof componentCatalog)[number]
