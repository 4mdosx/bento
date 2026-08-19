'use client'

import Editor, { type BeforeMount } from '@monaco-editor/react'

const declarations = `
declare namespace JSX {
  type Element = unknown
  interface IntrinsicAttributes { key?: string | number }
  interface IntrinsicElements { [elementName: string]: Record<string, unknown> }
}
declare module 'react' {
  export type ReactNode = unknown
}
declare module 'react/jsx-runtime' {
  export const Fragment: unique symbol
  export function jsx(type: unknown, props: unknown, key?: string): JSX.Element
  export function jsxs(type: unknown, props: unknown, key?: string): JSX.Element
}
declare module 'bento-ui' {
  export interface ButtonProps {
    variant?: 'solid' | 'outline' | 'ghost' | 'destructive' | 'link'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    disabled?: boolean
    children?: import('react').ReactNode
  }
  export function Button(props: ButtonProps): import('react').ReactNode
}
declare function ResourceListExample(props: {
  search: string
  state: 'success' | 'loading' | 'empty'
  presentation: 'auto' | 'cards' | 'table'
}): import('react').ReactNode
declare function DetailExample(props: {
  title: string
  open: boolean
}): import('react').ReactNode
`

export function MonacoCodeEditor({ slug, value, onChange }: { slug: string; value: string; onChange: (value: string) => void }) {
  const beforeMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      allowNonTsExtensions: true,
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      target: monaco.languages.typescript.ScriptTarget.ES2022,
    })
    monaco.languages.typescript.typescriptDefaults.addExtraLib(declarations, 'file:///bento-ui.d.ts')
  }

  return <Editor
    beforeMount={beforeMount}
    height="clamp(440px, 65vh, 640px)"
    language="typescript"
    path={`file:///examples/${slug}.tsx`}
    theme="vs-dark"
    value={value}
    onChange={(next) => onChange(next ?? '')}
    options={{
      minimap: { enabled: false },
      fontSize: 14,
      lineHeight: 22,
      padding: { top: 14 },
      quickSuggestions: true,
      tabCompletion: 'on',
      wordWrap: 'on',
      scrollBeyondLastLine: false,
      automaticLayout: true,
      fixedOverflowWidgets: true,
      hover: { above: false, sticky: true },
      ariaLabel: `${slug} component example editor`,
    }}
  />
}
