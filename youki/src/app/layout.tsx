import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { BentoProvider } from '@/src/components/bento-provider'
import { ThemeProvider } from '@/src/components/theme-provider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bento Web Box',
  description: 'Bento',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BentoProvider platform="web">{children}</BentoProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
