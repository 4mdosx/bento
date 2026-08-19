import Link from 'next/link'

export default function Home() {
  return <main>
    <section className="hero"><div><div className="eyebrow">Application UI Toolkit · 0.1 Preview</div><h1>业务模型先行，界面自然成形。</h1><p className="lead">Bento 为 Next.js App Router 提供有主见的 Host、可修改的源码 View，以及自动多端适配。先完成数据与 Action，再获得一致、可控的应用界面。</p><div className="actions"><Link className="button primary" href="/getting-started">构建第一个列表</Link><Link className="button" href="/ai">交给 AI 实现</Link></div></div><div className="signal"><strong>最小闭环已冻结</strong><p>安装 → 定义 Model/Action → 生成 List View → Host 协调状态 → 多端展示 → 自动验证。</p></div></section>
    <section className="grid" aria-label="Bento 的三个核心原则"><article className="card"><span className="number">01</span><h3>状态留在 Host</h3><p>请求、取消、错误、选择与乐观更新由版本化包统一管理。</p></article><article className="card"><span className="number">02</span><h3>外观交付源码</h3><p>Primitive、Part、View 与 Layout 可以直接审阅和修改。</p></article><article className="card"><span className="number">03</span><h3>人和 Agent 同一规则</h3><p>公共契约、配方与机器清单共同限定正确组合方式。</p></article></section>
  </main>
}
