import { designTokens } from './design-tokens'
import type { DesignToken, DesignTokenKind } from './types'

const kindLabels: Record<DesignTokenKind, string> = {
  color: '颜色',
  typography: '排版',
  radius: '圆角',
  spacing: '间距',
  breakpoint: '断点',
}

export function DesignTokenOverview() {
  return <div className="token-page">
    <header className="page-heading">
      <span className="eyebrow">Design system</span>
      <h1>Design tokens</h1>
      <p className="lead">视觉语义与取值集中定义 Bento 的颜色、排版、圆角、间距和响应式行为。组件只引用语义 Token，因此主题可以独立演进。</p>
    </header>

    {(Object.keys(kindLabels) as DesignTokenKind[]).map((kind) => {
      const group = designTokens.filter((token) => token.kind === kind)
      if (!group.length) return null
      return <section className="token-group" key={kind} aria-labelledby={`token-${kind}`}>
        <div className="token-group-heading"><span className="eyebrow">{kind}</span><h2 id={`token-${kind}`}>{kindLabels[kind]}</h2><p>{groupDescription(kind)}</p></div>
        <div className="token-grid">{group.map((token) => <TokenCard token={token} key={token.name} />)}</div>
      </section>
    })}
  </div>
}

function TokenCard({ token }: { token: DesignToken }) {
  return <article className="token-card">
    <TokenSample kind={token.kind} value={token.value} />
    <div className="token-meta"><span>{token.kind}</span><code>{token.name}</code></div>
    <strong>{token.value}</strong>
    <p>{token.description}</p>
  </article>
}

function TokenSample({ kind, value }: { kind: DesignTokenKind; value: string }) {
  if (kind === 'color') return <div className="token-sample token-color" style={{ backgroundColor: value }} aria-hidden="true" />
  if (kind === 'typography') return <div className="token-sample token-type" aria-hidden="true">Aa</div>
  if (kind === 'radius') return <div className="token-sample"><span className="token-radius" aria-hidden="true" /></div>
  if (kind === 'spacing') return <div className="token-sample"><span className="token-spacing" aria-hidden="true" /></div>
  return <div className="token-sample token-breakpoint" aria-hidden="true"><span /><span /></div>
}

function groupDescription(kind: DesignTokenKind) {
  return {
    color: '使用语义角色而不是原始色板，让明暗主题和品牌定制保持一致。',
    typography: '统一字号与行高，建立稳定、可复用的内容层级。',
    radius: '控制组件轮廓的柔和程度，维持跨组件的形态一致性。',
    spacing: '约束内容与控件之间的留白，形成一致的布局节奏。',
    breakpoint: '在共享阈值上切换布局与 Overlay 形态，避免重复定义响应式规则。',
  }[kind]
}
