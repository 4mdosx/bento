export default function Architecture() {
  return <main className="docs-layout"><aside className="toc"><strong>冻结架构</strong><a href="#boundary">交付边界</a><a href="#direction">依赖方向</a><a href="#scope">MVP 范围</a><a href="#rules">禁止事项</a></aside><article className="prose">
    <div className="eyebrow">Frozen for 0.1 Preview</div><h2>视觉可修改，行为可升级。</h2><p className="lead">0.1 Preview 内不再新增顶层概念，也不改变依赖方向。新增能力必须落入既有职责。</p>
    <section id="boundary"><h3>交付边界</h3><table><thead><tr><th>层</th><th>交付</th><th>职责</th></tr></thead><tbody><tr><td>Core / Host / Integration / UI Runtime</td><td>npm 包</td><td>契约、状态、副作用和标准行为</td></tr><tr><td>Primitive / Part / View / Layout</td><td>CLI 源码</td><td>结构、样式和业务呈现</td></tr></tbody></table></section>
    <section id="direction"><h3>单向依赖</h3><pre><code>{'core\n  ↑\nhosts   ui-runtime   integrations/next\n  ↑          ↑              ↑\n  └──────── views ───────────┘'}</code></pre></section>
    <section id="scope"><h3>0.1 MVP 支持范围</h3><p>支持 List Host、页码/游标 Query、筛选、排序、选择、取消、刷新、乐观 Row Action、响应式 List/Table 和 Detail Overlay。Form Host 与 Chat Host 不属于本次冻结范围。</p></section>
    <section id="rules"><h3>禁止事项</h3><ul><li>不得为改样式而修改或复制 Host。</li><li>不得在 View 中复制请求取消、竞态和乐观回滚。</li><li>不得从 Core、Host 或 UI Runtime 反向导入 View。</li><li>不得建立第二套 Overlay、断点或 Token 基础设施。</li></ul></section>
  </article></main>
}
