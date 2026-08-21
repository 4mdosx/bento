import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const semanticRoles = [
  {
    name: 'typography-page-title',
    sample: '构建清晰的产品界面',
    description: '页面的最高视觉标题；内部映射 display token。',
  },
  {
    name: 'typography-heading',
    sample: '组织内容与操作',
    description: '大型表单等页面级组件的标题；内部映射 heading-lg token。',
  },
  {
    name: 'typography-body',
    sample: '正文承担主要的信息表达，并保持适合连续阅读的行高。',
    description: '默认正文与说明；内部映射 body token。',
  },
] as const

const markdownExample = `# 一级标题

这是默认正文，包含 **粗体**、*斜体*、~~删除线~~、[链接](https://example.com) 和行内代码 \`const value = 1\`。

## 二级标题

> 引用用于补充背景、结论或需要特别注意的信息。

### 三级标题

- 无序列表
- 第二项
  - 嵌套列表

1. 有序列表
2. 第二个步骤

#### 四级标题

- [x] 已完成的任务
- [ ] 尚未完成的任务

##### 五级标题

\`\`\`tsx
export function Example() {
  return <article className="prose">Content</article>
}
\`\`\`

###### 六级标题

| 内容类型 | Typography 映射 |
| --- | --- |
| 标题 | heading token |
| 正文 | body token |
| 代码 | body-sm + mono |

---

![Bento UI 示例图片](/og.png)
`

export function TypographyOverview() {
  return <div className="typography-page">
    <header className="page-heading">
      <span className="eyebrow">Design system</span>
      <h1 className="typography-page-title">Typography</h1>
      <p className="lead">尺寸 Token 留在组件内部；产品代码只使用少量、稳定的语义接口。Markdown 与富文本通过一个 prose 容器获得完整排版。</p>
    </header>

    <section className="typography-doc-section" aria-labelledby="typography-roles">
      <div className="typography-section-heading">
        <span className="eyebrow">Semantic roles</span>
        <h2 className="typography-heading" id="typography-roles">三个公共接口</h2>
        <p>接口按用途命名，不要求使用者记忆 lg、xl 或具体像素值。</p>
      </div>
      <div className="typography-specimens">
        {semanticRoles.map((role) => <article className="typography-specimen" key={role.name}>
          <code>{role.name}</code>
          <div className={role.name}>{role.sample}</div>
          <p>{role.description}</p>
        </article>)}
      </div>
    </section>

    <section className="typography-doc-section" aria-labelledby="typography-prose">
      <div className="typography-section-heading">
        <span className="eyebrow">Content recipe</span>
        <h2 className="typography-heading" id="typography-prose">一个 prose 容器</h2>
        <p>Markdown 和富文本不逐个指定样式。prose 完整覆盖标准 Markdown 与 GFM 内容块。</p>
        <pre><code>{'<article className="prose">\n  <Markdown>{content}</Markdown>\n</article>'}</code></pre>
      </div>
      <div className="typography-markdown-example">
        <article className="prose typography-prose-preview">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownExample}</ReactMarkdown>
        </article>
        <details className="typography-markdown-source">
          <summary>查看完整 Markdown 源码</summary>
          <pre><code>{markdownExample}</code></pre>
        </details>
      </div>
    </section>

    <section className="typography-contract" aria-labelledby="typography-contract">
      <span className="eyebrow">Contract</span>
      <h2 className="typography-heading" id="typography-contract">维护边界</h2>
      <ol>
        <li>UI 组件内部可以使用 <code>text-heading-lg</code>、<code>text-body-md</code> 和 <code>text-body-sm</code>。</li>
        <li>面向使用者的示例与参数只提供三个 <code>typography-*</code> 接口和 <code>prose</code>。</li>
        <li>大型页面组件使用 <code>typography-heading</code>，组件内部的分区标题使用 <code>text-heading-md</code>。</li>
        <li>一次性视觉差异使用 Tailwind；只有形成稳定、重复的语义后才扩展公共接口。</li>
      </ol>
    </section>
  </div>
}
