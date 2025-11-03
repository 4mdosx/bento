'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useBento } from '@/hooks/useBento'
import { Button } from '@/src/components/ui/button'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'

export function ModeToggle() {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function OverviewPage() {
  const { theme, setTheme } = useTheme()
  return (
    <article className="prose">
      <ModeToggle />
      <Button variant="outline" onClick={() => setTheme('light')}>Light</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
      <Button onClick={() => setTheme('system')}>System</Button>
      <p>Current theme: {theme}</p>
      <h1>Welcome to Bento</h1>
      <p>Prepare everything focus on business</p>
      <h2>Motivation</h2>
      <p>
        Starting a new web project often means facing an overwhelming number of
        technical choices. We're tired of setting up dozens of tools and plugins
        every time a new project begins. Bento delivers an out‑of‑the‑box
        experience with ready‑made UI components and well‑designed common
        modules—so you can focus on building great products and launch your MVP
        faster than ever.
      </p>
    </article>
  )
}
