import Link from 'next/link'
import { Card, CardGrid, Page } from '../components/bento/views/Documentation'

export default function Home() {
  return <Page>
    <section className="hero"><div><div className="eyebrow">Bento UI · 0.1 Preview</div><h1>Next.js 应用 UI 工具包</h1><p className="lead">Bento 提供负责业务状态的 Host 和可直接修改的 View 源码。当前版本面向 Next.js App Router，重点支持列表和详情界面。</p><div className="actions"><Link className="button primary" href="/getting-started">开始使用</Link><Link className="button" href="/overview">查看文档与组件</Link></div></div><div className="signal"><strong>当前支持范围</strong><p>List Host、筛选与排序、响应式列表、Detail Overlay，以及对应的组件验证工具。</p></div></section>
    <CardGrid label="Bento 的组成"><Card><span className="number">01</span><h3>Host 管理状态</h3><p>统一处理请求、取消、错误、选择和乐观更新。</p></Card><Card><span className="number">02</span><h3>View 提供源码</h3><p>应用可以直接修改组件结构和样式。</p></Card><Card><span className="number">03</span><h3>文档包含验证工具</h3><p>在同一站点阅读文档、编辑组件配置和检查预览。</p></Card></CardGrid>
  </Page>
}
