const task = '创建一个可搜索、筛选和分页的资源列表。\n业务类型为 Resource；查询通过 AbortSignal 支持取消。\n使用 ListHost 管理状态，通过 bento add list 生成 View。\n不得修改 Host 内部；完成后运行项目质量门禁。'

export default function AiDocs() {
  return <main className="docs-layout"><aside className="toc"><strong>AI 入口</strong><a href="#task">任务模板</a><a href="#sources">读取顺序</a><a href="#constraints">约束</a><a href="#done">完成标准</a></aside><article className="prose">
    <div className="eyebrow">Agent-facing documentation</div><h2>低歧义地生成 Bento 应用界面</h2><p className="lead">Agent 应先选择 Use Case，再选择 Host 与 Registry View；不能从组件名称反推业务架构。</p>
    <section id="task"><h3>推荐任务描述</h3><pre><code>{task}</code></pre></section>
    <section id="sources"><h3>读取顺序</h3><ol><li><code>packages/bento-ui/manifest.json</code></li><li><code>docs/zh/use-cases/resource-list.md</code></li><li><code>docs/agent/recipes/filterable-resource-list.md</code></li><li>List Host 公共类型</li></ol></section>
    <section id="constraints"><h3>不可违反</h3><div className="rule">状态与副作用留在 Host；视觉结构留在生成源码；跨职责只导入公共入口。</div></section>
    <section id="done"><h3>完成标准</h3><ul><li>只定义业务 Model、Action 和显示映射。</li><li>快速查询只接受最后一个响应。</li><li>移动端和桌面端语义保持一致。</li><li>没有修改 Host 内部或引入重复基础设施。</li><li>类型、测试、构建、包和 Agent 评估全部通过。</li></ul></section>
  </article></main>
}
