'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../design-system/lib/cn'
import { useOverlayStack } from './useOverlayStack'

export type DrawerSide = 'left' | 'right'

export interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Slide out direction */
  side?: DrawerSide
  children: React.ReactNode
}

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  className?: string
  children: React.ReactNode
  side?: DrawerSide
}

export interface DrawerTitleProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Title> {}

export interface DrawerDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Description> {}

export interface DrawerCloseProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Close> {}

const sideClasses: Record<DrawerSide, string> = {
  left: 'inset-y-0 left-0 h-full w-full max-w-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
  right:
    'inset-y-0 right-0 h-full w-full max-w-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
}

/**
 * Drawer: Side slide-out layer based on Radix Dialog, semantics are identical to Modal, only the display form differs.
 */
function DrawerRoot({
  open = false,
  onOpenChange,
  side = 'right',
  children,
}: DrawerProps) {
  const stack = useOverlayStack()
  const container = stack?.overlayContainerRef?.current ?? undefined

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          aria-hidden
        />
        <DrawerContentContext.Provider value={side}>
          {children}
        </DrawerContentContext.Provider>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const DrawerContentContext = React.createContext<DrawerSide>('right')

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  DrawerContentProps
>(({ className, children, side, ...props }, ref) => {
  const sideFromContext = React.useContext(DrawerContentContext)
  const s = side ?? sideFromContext
  return (
    <Dialog.Content
      ref={ref}
      aria-describedby={undefined}
      className={cn(
        'fixed z-10 flex flex-col rounded-none border-border bg-background shadow-lg outline-none',
        sideClasses[s],
        className,
      )}
      {...props}
    >
      {children}
      <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Dialog.Close>
    </Dialog.Content>
  )
})
DrawerContent.displayName = 'DrawerContent'

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn('text-heading-md text-foreground', className)}
    {...props}
  />
))
DrawerTitle.displayName = 'DrawerTitle'

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn('text-body-sm text-muted mt-1', className)}
    {...props}
  />
))
DrawerDescription.displayName = 'DrawerDescription'

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof Dialog.Close>,
  DrawerCloseProps
>((props, ref) => <Dialog.Close ref={ref} {...props} />)
DrawerClose.displayName = 'DrawerClose'

export const Drawer = Object.assign(DrawerRoot, {
  Content: DrawerContent,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
})
