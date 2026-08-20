import type { HTMLAttributes, ReactNode } from 'react'

type ElementProps<T extends HTMLElement> = HTMLAttributes<T> & { children: ReactNode }

export function SiteHeader({ children, className = '', ...props }: ElementProps<HTMLElement>) {
  return <header className={`site-header ${className}`.trim()} {...props}>{children}</header>
}

export function SiteFooter({ children, className = '', ...props }: ElementProps<HTMLElement>) {
  return <footer className={`site-footer ${className}`.trim()} {...props}>{children}</footer>
}

export function Page({ children, className = '', ...props }: ElementProps<HTMLElement>) {
  return <main className={className} {...props}>{children}</main>
}

export function DocsLayout({ navigation, children, className = '' }: {
  navigation: ReactNode
  children: ReactNode
  className?: string
}) {
  return <Page className={`docs-layout ${className}`.trim()}><aside className="toc">{navigation}</aside><article className="prose">{children}</article></Page>
}

export function DocsSidebar({ children, label = 'Documentation navigation', className = '' }: {
  children: ReactNode
  label?: string
  className?: string
}) {
  return <aside className={`overview-nav ${className}`.trim()} aria-label={label}>{children}</aside>
}

export function CardGrid({ children, label, className = '' }: {
  children: ReactNode
  label?: string
  className?: string
}) {
  return <section className={`grid ${className}`.trim()} aria-label={label}>{children}</section>
}

export function Card({ children, className = '', ...props }: ElementProps<HTMLElement>) {
  return <article className={`card ${className}`.trim()} {...props}>{children}</article>
}

export function CodeBlock({ children }: { children: string }) {
  return <pre><code>{children}</code></pre>
}

export function Callout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rule ${className}`.trim()}>{children}</div>
}
