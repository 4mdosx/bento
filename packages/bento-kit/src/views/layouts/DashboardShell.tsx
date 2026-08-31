'use client'

import * as React from 'react'
import { cn } from '../shared/cn'
import { Drawer } from '../primitives/overlay/Drawer'

export interface DashboardShellContextValue {
  isAsideOpen: boolean
  setAsideOpen: (open: boolean) => void
}

const DashboardShellContext = React.createContext<DashboardShellContextValue | undefined>(undefined)

/**
 * Hook to access the DashboardShell context, useful for creating custom menu triggers
 * to toggle the mobile sidebar drawer.
 */
export function useDashboardShell() {
  const context = React.useContext(DashboardShellContext)
  if (!context) {
    throw new Error('useDashboardShell must be used within a DashboardShell')
  }
  return context
}

export interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * The root container for the DashboardLayout. 
 * Forces the layout to be screen height and manages the mobile drawer state.
 */
function DashboardShellRoot({ children, className, ...props }: DashboardShellProps) {
  const [isAsideOpen, setAsideOpen] = React.useState(false)

  return (
    <DashboardShellContext.Provider value={{ isAsideOpen, setAsideOpen }}>
      <div 
        className={cn("flex flex-col h-screen overflow-hidden bg-background", className)} 
        {...props}
      >
        {children}
      </div>
    </DashboardShellContext.Provider>
  )
}

export interface DashboardShellHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

/**
 * The header area. Fixed at the top.
 */
function DashboardShellHeader({ children, className, ...props }: DashboardShellHeaderProps) {
  return (
    <header 
      className={cn(
        "flex h-16 shrink-0 items-center px-4 border-b border-border bg-background z-10",
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}

/**
 * The body wrapper that contains Aside and Main side-by-side.
 */
export interface DashboardShellBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function DashboardShellBody({ children, className, ...props }: DashboardShellBodyProps) {
  return (
    <div className={cn("flex flex-1 overflow-hidden relative", className)} {...props}>
      {children}
    </div>
  )
}

export interface DashboardShellAsideProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

/**
 * The aside container. Displays as a persistent sidebar on desktop (md+) 
 * and automatically acts as a Drawer on mobile.
 */
function DashboardShellAside({ children, className, ...props }: DashboardShellAsideProps) {
  const { isAsideOpen, setAsideOpen } = useDashboardShell()

  return (
    <>
      {/* Desktop Aside */}
      <aside 
        className={cn(
          "hidden md:flex flex-col w-64 shrink-0 border-r border-border bg-background overflow-y-auto",
          className
        )}
        {...props}
      >
        {children}
      </aside>

      {/* Mobile Drawer Aside */}
      <Drawer open={isAsideOpen} onOpenChange={setAsideOpen} side="left">
        <Drawer.Content className={cn("w-[280px] p-0 border-r border-border", className)}>
          <span className="sr-only">
            <Drawer.Title>Navigation Drawer</Drawer.Title>
            <Drawer.Description>Navigation links for the dashboard</Drawer.Description>
          </span>
          <div className="flex flex-col h-full overflow-y-auto bg-background">
            {children}
          </div>
        </Drawer.Content>
      </Drawer>
    </>
  )
}

export interface DashboardShellMainProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

/**
 * The main content area. Scrollable independently from Header and Aside.
 */
function DashboardShellMain({ children, className, ...props }: DashboardShellMainProps) {
  return (
    <main 
      className={cn("flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6", className)}
      {...props}
    >
      {children}
    </main>
  )
}

export const DashboardShell = Object.assign(DashboardShellRoot, {
  Header: DashboardShellHeader,
  Body: DashboardShellBody,
  Aside: DashboardShellAside,
  Main: DashboardShellMain,
})
