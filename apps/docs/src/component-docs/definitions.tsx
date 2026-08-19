'use client'

import { Button } from 'bento-ui'
import type { ComponentDefinition, ComponentSpec } from './types'
import { DetailExample } from './examples/DetailExample'
import { ResourceListExample } from './examples/ResourceListExample'

function stringAttribute(code: string, name: string) {
  const match = code.match(new RegExp(`${name}=["']([^"']*)["']`))
  if (!match) throw new Error(`缺少 ${name} 属性`)
  return match[1]
}

function booleanAttribute(code: string, name: string) {
  const match = code.match(new RegExp(`${name}=\\{(true|false)\\}`))
  if (!match) throw new Error(`缺少 ${name}={true|false} 属性`)
  return match[1] === 'true'
}

function assertOption(value: string, options: readonly string[], name: string) {
  if (!options.includes(value)) throw new Error(`${name} 不支持 “${value}”`)
  return value
}

function ButtonPreview({ spec }: { spec: ComponentSpec }) {
  return (
    <Button
      variant={spec.variant as 'solid' | 'outline' | 'ghost' | 'destructive' | 'link'}
      size={spec.size as 'sm' | 'md' | 'lg' | 'icon'}
      disabled={Boolean(spec.disabled)}
    >
      {String(spec.label)}
    </Button>
  )
}

function ListPreview({ spec }: { spec: ComponentSpec }) { return <ResourceListExample search={String(spec.search)} state={spec.state as 'success' | 'loading' | 'empty'} presentation={spec.presentation as 'auto' | 'cards' | 'table'} /> }
function DetailPreview({ spec }: { spec: ComponentSpec }) { return <DetailExample title={String(spec.title)} open={Boolean(spec.open)} /> }

export const componentDefinitions: ComponentDefinition[] = [
  {
    slug: 'button', name: 'Button', group: 'Primitive', maturity: 'ready',
    description: 'Variants, sizes, labels and disabled behavior.',
    checks: ['All variants render', 'Keyboard focus is visible', 'Disabled state blocks interaction'],
    fields: [
      { key: 'variant', label: 'Variant', kind: 'select', options: ['solid', 'outline', 'ghost', 'destructive', 'link'].map((value) => ({ label: value, value })) },
      { key: 'size', label: 'Size', kind: 'select', options: ['sm', 'md', 'lg', 'icon'].map((value) => ({ label: value, value })) },
      { key: 'label', label: 'Label', kind: 'text' },
      { key: 'disabled', label: 'Disabled', kind: 'boolean' },
    ],
    defaultSpec: { variant: 'solid', size: 'md', label: 'Save changes', disabled: false },
    toCode: (spec) => `import { Button } from 'bento-ui'\n\nexport function Example() {\n  return (\n    <Button variant=${JSON.stringify(spec.variant)} size=${JSON.stringify(spec.size)} disabled={${Boolean(spec.disabled)}}>\n      ${String(spec.label)}\n    </Button>\n  )\n}`,
    fromCode: (code) => ({
      variant: assertOption(stringAttribute(code, 'variant'), ['solid', 'outline', 'ghost', 'destructive', 'link'], 'variant'),
      size: assertOption(stringAttribute(code, 'size'), ['sm', 'md', 'lg', 'icon'], 'size'),
      disabled: booleanAttribute(code, 'disabled'),
      label: code.match(/<Button[^>]*>\s*([^<{][\s\S]*?)\s*<\/Button>/)?.[1]?.trim() || (() => { throw new Error('Button 需要文本内容') })(),
    }),
    Preview: ButtonPreview,
  },
  {
    slug: 'list', name: 'List Host', group: 'Host + View', maturity: 'preview',
    description: 'Search, lifecycle states and responsive presentation.',
    checks: ['Search updates results', 'Loading and empty states are announced', 'Mobile and desktop views preserve meaning'],
    fields: [
      { key: 'search', label: 'Search', kind: 'text' },
      { key: 'state', label: 'State', kind: 'select', options: ['success', 'loading', 'empty'].map((value) => ({ label: value, value })) },
      { key: 'presentation', label: 'Presentation', kind: 'select', options: ['auto', 'cards', 'table'].map((value) => ({ label: value, value })) },
    ],
    defaultSpec: { search: '', state: 'success', presentation: 'auto' },
    toCode: (spec) => `export function Example() {\n  return (\n    <ResourceListExample\n      search=${JSON.stringify(spec.search)}\n      state=${JSON.stringify(spec.state)}\n      presentation=${JSON.stringify(spec.presentation)}\n    />\n  )\n}`,
    fromCode: (code) => ({
      search: stringAttribute(code, 'search'),
      state: assertOption(stringAttribute(code, 'state'), ['success', 'loading', 'empty'], 'state'),
      presentation: assertOption(stringAttribute(code, 'presentation'), ['auto', 'cards', 'table'], 'presentation'),
    }),
    Preview: ListPreview,
  },
  {
    slug: 'detail', name: 'Detail / Overlay', group: 'Pattern + Runtime', maturity: 'preview',
    description: 'Adaptive overlay presentation and open state.',
    checks: ['Trigger opens detail', 'Escape closes the overlay', 'Focus returns to the trigger'],
    fields: [
      { key: 'title', label: 'Title', kind: 'text' },
      { key: 'open', label: 'Initially open', kind: 'boolean' },
    ],
    defaultSpec: { title: 'Project detail', open: false },
    toCode: (spec) => `export function Example() {\n  return <DetailExample title=${JSON.stringify(spec.title)} open={${Boolean(spec.open)}} />\n}`,
    fromCode: (code) => ({ title: stringAttribute(code, 'title'), open: booleanAttribute(code, 'open') }),
    Preview: DetailPreview,
  },
]

export function getComponentDefinition(slug: string) {
  return componentDefinitions.find((definition) => definition.slug === slug)
}
