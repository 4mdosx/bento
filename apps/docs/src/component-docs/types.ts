import type { ComponentType } from 'react'

export type SpecValue = string | boolean
export type ComponentSpec = Record<string, SpecValue>

export interface SpecOption {
  label: string
  value: string
}

export interface SpecField {
  key: string
  label: string
  kind: 'text' | 'select' | 'boolean'
  options?: SpecOption[]
  help?: string
}

export interface ComponentDefinition {
  slug: string
  name: string
  group: 'Primitive' | 'Host + View' | 'Pattern + Runtime'
  maturity: 'ready' | 'preview'
  description: string
  checks: string[]
  fields: SpecField[]
  defaultSpec: ComponentSpec
  toCode: (spec: ComponentSpec) => string
  fromCode: (code: string) => ComponentSpec
  Preview: ComponentType<{ spec: ComponentSpec }>
}
