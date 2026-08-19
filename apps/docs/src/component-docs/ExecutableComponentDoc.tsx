'use client'

import * as React from 'react'
import { getComponentDefinition } from './definitions'
import { MonacoCodeEditor } from './MonacoCodeEditor'
import type { ComponentDefinition, ComponentSpec } from './types'

export function ExecutableComponentDoc({ slug, embedded = false }: { slug: string; embedded?: boolean }) {
  const definition = getComponentDefinition(slug)
  if (!definition) return null
  return <ExecutableComponentLab definition={definition} embedded={embedded} />
}

function ExecutableComponentLab({ definition, embedded }: { definition: ComponentDefinition; embedded: boolean }) {
  const [spec, setSpec] = React.useState<ComponentSpec>(definition.defaultSpec)
  const [code, setCode] = React.useState(() => definition.toCode(definition.defaultSpec))
  const [parseError, setParseError] = React.useState<string | null>(null)
  const Preview = definition.Preview

  function updateSpec(nextSpec: ComponentSpec) {
    setSpec(nextSpec)
    setCode(definition.toCode(nextSpec))
    setParseError(null)
  }

  function updateCode(nextCode: string) {
    setCode(nextCode)
    try {
      setSpec(definition.fromCode(nextCode))
      setParseError(null)
    } catch (error) {
      setParseError(error instanceof Error ? error.message : '代码暂时无法映射到 spec')
    }
  }

  const Root = embedded ? 'div' : 'main'
  return <Root className="component-page">
    <header className="component-heading">
      <div><span className="eyebrow">{definition.group} · {definition.maturity}</span><h1>{definition.name}</h1><p className="lead">{definition.description}</p></div>
      <ul>{definition.checks.map((check) => <li key={check}>{check}</li>)}</ul>
    </header>

    <section className="preview-stage" aria-label={`${definition.name} preview`}>
      <div className="preview-label">Live preview</div>
      <div className="preview-canvas"><Preview spec={spec} /></div>
    </section>

    <section className="component-lab">
      <aside className="spec-panel">
        <div><span className="eyebrow">Spec</span><h2>属性映射</h2><p>修改 spec 会重写代码；修改代码会在可解析时回写 spec。</p></div>
        <div className="spec-fields">
          {definition.fields.map((field) => {
            const value = spec[field.key]
            return <label className={field.kind === 'boolean' ? 'spec-checkbox' : 'spec-field'} key={field.key}>
              <span>{field.label}</span>
              {field.kind === 'text' ? <input value={String(value)} onChange={(event) => updateSpec({ ...spec, [field.key]: event.target.value })} /> : null}
              {field.kind === 'select' ? <select value={String(value)} onChange={(event) => updateSpec({ ...spec, [field.key]: event.target.value })}>{field.options?.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select> : null}
              {field.kind === 'boolean' ? <input type="checkbox" checked={Boolean(value)} onChange={(event) => updateSpec({ ...spec, [field.key]: event.target.checked })} /> : null}
            </label>
          })}
        </div>
      </aside>
      <div className="editor-panel">
        <div className="editor-bar"><span>example.tsx</span><span className={parseError ? 'sync-error' : 'sync-ok'}>{parseError ? `未同步：${parseError}` : 'Spec ↔ Code 已同步'}</span></div>
        <MonacoCodeEditor slug={definition.slug} value={code} onChange={updateCode} />
      </div>
    </section>
  </Root>
}
