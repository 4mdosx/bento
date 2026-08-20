'use client'

import { Button } from 'bento-ui'
import type { ComponentDefinition, ComponentSpec } from './types'
import { buttonTokens, detailTokens, listTokens } from './design-tokens'
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

function optionalBooleanAttribute(code: string, name: string, fallback = false) {
  const match = code.match(new RegExp(`${name}=\\{(true|false)\\}`))
  return match ? match[1] === 'true' : fallback
}

function optionalStringAttribute(code: string, name: string, fallback: string) {
  const match = code.match(new RegExp(`${name}=["']([^"']*)["']`))
  return match?.[1] ?? fallback
}

function assertOption(value: string, options: readonly string[], name: string) {
  if (!options.includes(value)) throw new Error(`${name} 不支持 “${value}”`)
  return value
}

function ButtonPreview({ spec }: { spec: ComponentSpec }) {
  return (
    <Button
      type={spec.type as 'button' | 'submit' | 'reset'}
      loading={Boolean(spec.loading)}
      disabled={Boolean(spec.disabled)}
    >
      {String(spec.content)}
    </Button>
  )
}

function ListPreview({ spec }: { spec: ComponentSpec }) { return <ResourceListExample search={String(spec.search)} state={spec.state as 'success' | 'loading' | 'empty'} presentation={spec.presentation as 'auto' | 'cards' | 'table'} /> }
function DetailPreview({ spec }: { spec: ComponentSpec }) { return <DetailExample title={String(spec.title)} open={Boolean(spec.open)} /> }

export const componentDefinitions: ComponentDefinition[] = [
  {
    slug: 'button', name: 'Button', version: '1.1.0',
    dimensions: ['Primitive', 'Control', 'Source'],
    summary: [
      'A dependable action control with native semantics and styling freedom.',
      'Ship async actions without duplicate submissions or inaccessible state.',
    ],
    highlights: [
      { title: 'Style without API churn', description: 'Default tokens provide a baseline; className owns Tailwind overrides.' },
      { title: 'Native by default', description: 'Disabled, keyboard focus and button type retain platform semantics.' },
      { title: 'Safe async actions', description: 'Loading announces busy state and blocks repeated activation.' },
    ],
    tokens: buttonTokens,
    fields: [
      { key: 'content', label: 'Content', kind: 'text' },
      { key: 'type', label: 'Type', kind: 'select', options: ['button', 'submit', 'reset'].map((value) => ({ label: value, value })) },
      { key: 'loading', label: 'Loading', kind: 'boolean' },
      { key: 'disabled', label: 'Disabled', kind: 'boolean' },
    ],
    defaultSpec: { content: 'Save changes', type: 'button', loading: false, disabled: false },
    toCode: (spec) => `import { Button } from 'bento-ui'\n\nexport function Example() {\n  return (\n    <Button\n      type=${JSON.stringify(spec.type)}\n      loading={${Boolean(spec.loading)}}\n      disabled={${Boolean(spec.disabled)}}\n      className="rounded-full"\n    >\n      ${String(spec.content)}\n    </Button>\n  )\n}`,
    fromCode: (code) => ({
      type: assertOption(optionalStringAttribute(code, 'type', 'button'), ['button', 'submit', 'reset'], 'type'),
      loading: optionalBooleanAttribute(code, 'loading'),
      disabled: optionalBooleanAttribute(code, 'disabled'),
      content: code.match(/<Button[^>]*>\s*([^<{][\s\S]*?)\s*<\/Button>/)?.[1]?.trim() || (() => { throw new Error('Button 需要文本内容') })(),
    }),
    Preview: ButtonPreview,
  },
  {
    slug: 'list', name: 'List Host', version: '1.0.0',
    dimensions: ['Host', 'Interaction', 'Adaptation'],
    summary: [
      'Search, lifecycle states and responsive presentation.',
      'Coordinate the complete lifecycle of a responsive resource collection.',
    ],
    highlights: [
      { title: 'Query lifecycle', description: 'Search, loading, empty and error states share one Host contract.' },
      { title: 'Race-safe requests', description: 'Cancellation and latest-request-wins behavior are built in.' },
      { title: 'Adaptive presentation', description: 'Mobile lists and desktop tables preserve the same meaning.' },
    ],
    tokens: listTokens,
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
    slug: 'detail', name: 'Detail / Overlay', version: '1.0.0',
    dimensions: ['Pattern', 'Adaptation', 'UI Runtime'],
    summary: [
      'Adaptive overlay presentation and open state.',
      'Present focused detail in the right container for each viewport.',
    ],
    highlights: [
      { title: 'Adaptive container', description: 'Bottom Sheet, Drawer and Modal follow the shared breakpoint contract.' },
      { title: 'Accessible focus', description: 'Focus is contained while open and restored to the trigger on close.' },
      { title: 'Predictable dismissal', description: 'Escape and overlay dismissal use the shared UI Runtime.' },
    ],
    tokens: detailTokens,
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
