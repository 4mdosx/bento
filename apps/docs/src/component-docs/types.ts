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

export type DesignTokenKind = 'color' | 'typography' | 'radius' | 'spacing' | 'breakpoint'

export interface DesignToken {
  name: string
  kind: DesignTokenKind
  value: string
  description: string
}

export interface ComponentDefinition {
  slug: string
  name: string
  group: 'Primitive' | 'Host + View' | 'Pattern + Runtime'
  maturity: 'ready' | 'preview'
  description: string
  checks: string[]
  tokens: DesignToken[]
  fields: SpecField[]
  defaultSpec: ComponentSpec
  toCode: (spec: ComponentSpec) => string
  fromCode: (code: string) => ComponentSpec
  Preview: ComponentType<{ spec: ComponentSpec }>
}
