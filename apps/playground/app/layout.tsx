import type { Metadata } from 'next'
import './globals.css'
import { ShellLayout } from '../components/ShellLayout'

export const metadata: Metadata = {
  title: 'Bento Playground',
  description: 'Design system component demos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ShellLayout>{children}</ShellLayout>
      </body>
    </html>
  )
}
