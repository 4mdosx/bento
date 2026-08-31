import type { Metadata } from 'next'
import Link from 'next/link'
import { OverlayProvider } from 'bento-kit/ui-runtime/overlay'
import { DashboardShell } from '@/components/bento/views/DashboardShell'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bento App',
  description: 'Built with Bento Kit',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <OverlayProvider>
          <DashboardShell
            navigation={
              <nav>
                <Link href="/">Home</Link>
              </nav>
            }
          >
            {children}
          </DashboardShell>
        </OverlayProvider>
      </body>
    </html>
  )
}
