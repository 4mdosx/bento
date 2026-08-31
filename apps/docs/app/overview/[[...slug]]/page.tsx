import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { DocsSidebar, Page } from '../../../components/bento/views/Documentation'
import { componentCatalog } from '../../../src/component-docs/catalog'
import { DesignTokenOverview } from '../../../src/component-docs/DesignTokenOverview'
import { ExecutableComponentDoc } from '../../../src/component-docs/ExecutableComponentDoc'
import { TypographyOverview } from '../../../src/component-docs/TypographyOverview'
import { getDoc, getDocEntries, resolveDocHref } from '../../../src/content/docs'

export async function generateStaticParams() {
  const docs = await getDocEntries()
  return [
    { slug: [] },
    { slug: ['tokens'] },
    { slug: ['typography'] },
    ...componentCatalog.map((component) => ({ slug: ['components', component.slug] })),
    ...docs.map((doc) => ({ slug: ['docs', ...doc.slug] })),
  ]
}

function itemLabel(section: string) {
  return ({ zh: '使用说明' } as Record<string, string>)[section] ?? section
}

export default async function OverviewPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params
  const docs = await getDocEntries()
  const activeHref = `/overview/${slug.join('/')}`.replace(/\/$/, '') || '/overview'
  const docSections = Array.from(new Set(docs.map((doc) => doc.section)))
  const isComponent = slug[0] === 'components' && slug.length === 2
  const isTokens = slug.length === 1 && slug[0] === 'tokens'
  const isTypography = slug.length === 1 && slug[0] === 'typography'
  const docSlug = slug[0] === 'docs' ? slug.slice(1) : []
  const doc = docSlug.length ? await getDoc(docSlug) : null

  if (slug.length && !isComponent && !isTokens && !isTypography && !doc) notFound()
  if (isComponent && !componentCatalog.some((item) => item.slug === slug[1])) notFound()

  return <Page className="overview-layout">
    <DocsSidebar label="文档导航">
      <Link className={activeHref === '/overview' ? 'active overview-home' : 'overview-home'} href="/overview">概览</Link>
      <section><h2>Design system</h2><Link className={activeHref === '/overview/tokens' ? 'active' : ''} href="/overview/tokens">Design tokens</Link><Link className={activeHref === '/overview/typography' ? 'active' : ''} href="/overview/typography">Typography</Link></section>
      <section><h2>组件</h2>{componentCatalog.map((item) => {
        const href = `/overview/components/${item.slug}`
        return <Link className={activeHref === href ? 'active' : ''} href={href} key={item.slug}>{item.name}</Link>
      })}</section>
      {docSections.map((section) => <section key={section}><h2>{itemLabel(section)}</h2>{docs.filter((entry) => entry.section === section).map((entry) => {
        const href = `/overview/docs/${entry.slug.join('/')}`
        return <Link className={activeHref === href ? 'active' : ''} href={href} key={href}>{entry.title}</Link>
      })}</section>)}
    </DocsSidebar>

    <div className="overview-content">
      {!slug.length ? <OverviewIndex docsCount={docs.length} /> : null}
      {isTokens ? <DesignTokenOverview /> : null}
      {isTypography ? <TypographyOverview /> : null}
      {isComponent ? <ExecutableComponentDoc slug={slug[1]} embedded /> : null}
      {doc ? <article className="prose markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children, ...props }) => <a href={resolveDocHref(href, docSlug)} {...props}>{children}</a> }}>{doc.source}</ReactMarkdown></article> : null}
    </div>
  </Page>
}

function OverviewIndex({ docsCount }: { docsCount: number }) {
  return <div className="overview-index"><span className="eyebrow">Overview</span><h1>组件与使用文档</h1><p className="lead">从左侧选择组件进行交互验证，或阅读使用说明与架构文档。</p><div className="overview-summary"><Link href="/overview/components/button"><strong>3 个组件实验</strong><span>编辑 spec 或代码并查看实时预览。</span></Link><Link href="/overview/docs/zh/architecture"><strong>{docsCount} 篇使用文档</strong><span>快速开始、概念、Use Case 与架构说明。</span></Link></div></div>
}
