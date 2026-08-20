import Link from 'next/link'
import { Callout, CodeBlock, DocsLayout } from '../../components/bento/views/Documentation'

const install = 'npm install bento-ui@0.1.0-preview.0\nnpx bento init\nnpx bento add list\nnpx bento doctor'
const model = "const model: ListModel<Resource> = {\n  getKey: (resource) => resource.id,\n  query: {\n    search: '', filters: {}, sort: [],\n    pagination: { kind: 'page', page: 1, pageSize: 20 },\n  },\n}\n\nconst actions: ListActions<Resource> = {\n  query: (query, { signal }) => api.resources.list(query, { signal }),\n}"
const render = '<ListHost model={model} actions={actions}>\n  {(host) => (\n    <ListView host={host} renderItem={(item) => item.name} />\n  )}\n</ListHost>'

export default function GettingStarted() {
  const navigation = <><strong>开始使用</strong><a href="#install">安装</a><a href="#model">Model 与 Action</a><a href="#render">连接 View</a><a href="#verify">验证</a></>
  return <DocsLayout navigation={navigation}>
    <div className="eyebrow">Minimum MVP</div><h2>十分钟完成可筛选资源列表</h2><p className="lead">当前 Preview 只承诺 Next.js 16 App Router、React 19 和 List 垂直闭环。</p>
    <section id="install"><h3>1. 初始化并生成 View</h3><CodeBlock>{install}</CodeBlock></section>
    <section id="model"><h3>2. 定义业务 Model 与 Action</h3><CodeBlock>{model}</CodeBlock><p>Action 必须传递并响应 AbortSignal。不要在 View 中直接请求数据。</p></section>
    <section id="render"><h3>3. 将生成的 View 接到 Host</h3><CodeBlock>{render}</CodeBlock></section>
    <section id="verify"><h3>4. 验证交付</h3><CodeBlock>{'npm run typecheck\nnpm run build\nnpx bento diff list'}</CodeBlock><Callout>样式和结构修改生成的 View；状态、副作用和并发规则通过 Host 公共 API 配置。</Callout></section>
    <p><Link href="/overview/docs/zh/architecture">继续阅读架构说明 →</Link></p>
  </DocsLayout>
}
