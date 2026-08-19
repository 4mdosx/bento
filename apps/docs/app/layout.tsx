import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Bento UI', template: '%s · Bento UI' },
  description: 'A model-driven Application UI Toolkit for Next.js App Router.',
  openGraph: {
    title: 'Bento UI',
    description: 'Model first. UI follows.',
    images: ['/og.png'],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>
    <header className="site-header">
      <Link className="brand" href="/"><span aria-hidden="true">🍱</span> Bento</Link>
      <nav aria-label="主导航"><Link href="/getting-started">开始使用</Link><Link href="/overview">文档与组件</Link></nav>
    </header>
    {children}
    <footer><span>Bento UI 0.1 Preview</span><span>Next.js App Router only</span></footer>
  </body></html>
}
