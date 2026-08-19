'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Button,
  cn,
  DashboardShell,
  OverlayProvider,
  useDashboardShell,
} from 'bento-ui'
import { componentCatalog } from '../src/catalog'

function NavigationTrigger() {
  const { setAsideOpen } = useDashboardShell()

  return (
    <Button
      className="md:hidden"
      size="sm"
      variant="outline"
      onClick={() => setAsideOpen(true)}
    >
      Menu
    </Button>
  )
}

const links = [
  ['/', 'Workbench home'],
  ...componentCatalog.map((item) => [item.href, item.name] as const),
  ['/workflow', 'Development workflow'],
] as const

function NavigationLink({ href, label }: { href: string; label: string }) {
  const { setAsideOpen } = useDashboardShell()
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-md px-3 py-2 text-body-sm hover:bg-muted/50',
        active && 'bg-muted/50 font-medium',
      )}
      onClick={() => setAsideOpen(false)}
    >
      {label}
    </Link>
  )
}

export function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <OverlayProvider>
      <DashboardShell>
        <DashboardShell.Header className="gap-3">
          <NavigationTrigger />
          <Link href="/" className="text-heading-md font-semibold">
            Bento Playground
          </Link>
        </DashboardShell.Header>
        <DashboardShell.Body>
          <DashboardShell.Aside>
            <nav className="flex flex-col gap-1 p-3" aria-label="Validation navigation">
              {links.map(([href, label]) => (
                <NavigationLink key={href} href={href} label={label} />
              ))}
            </nav>
          </DashboardShell.Aside>
          <DashboardShell.Main>{children}</DashboardShell.Main>
        </DashboardShell.Body>
      </DashboardShell>
    </OverlayProvider>
  )
}
