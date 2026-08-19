'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useOverlayStack } from '../../../ui-runtime/overlay'
import { cn } from '../../shared/cn'

export interface BottomSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export interface BottomSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  className?: string
  children: React.ReactNode
}

export interface BottomSheetTitleProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Title> {}

export interface BottomSheetDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Description> {}

export interface BottomSheetCloseProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Close> {}

/**
 * BottomSheet: Bottom slide-out layer based on Radix Dialog, semantics are identical to Modal/Drawer.
 */
function BottomSheetRoot({
  open = false,
  onOpenChange,
  children,
}: BottomSheetProps) {
  const stack = useOverlayStack()
  const container = stack?.overlayContainerRef?.current ?? undefined

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          aria-hidden
        />
        {children}
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const BottomSheetContent = React.forwardRef<
  React.ComponentRef<typeof Dialog.Content>,
  BottomSheetContentProps
>(({ className, children, ...props }, ref) => (
  <Dialog.Content
    ref={ref}
    aria-describedby={undefined}
    className={cn(
      'fixed inset-x-0 bottom-0 z-10 max-h-[85vh] flex flex-col rounded-t-lg border border-b-0 border-border bg-background shadow-lg outline-none',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
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
))
BottomSheetContent.displayName = 'BottomSheetContent'

const BottomSheetTitle = React.forwardRef<
  React.ComponentRef<typeof Dialog.Title>,
  BottomSheetTitleProps
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn('text-heading-md text-foreground', className)}
    {...props}
  />
))
BottomSheetTitle.displayName = 'BottomSheetTitle'

const BottomSheetDescription = React.forwardRef<
  React.ComponentRef<typeof Dialog.Description>,
  BottomSheetDescriptionProps
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn('text-body-sm text-muted mt-1', className)}
    {...props}
  />
))
BottomSheetDescription.displayName = 'BottomSheetDescription'

const BottomSheetClose = React.forwardRef<
  React.ComponentRef<typeof Dialog.Close>,
  BottomSheetCloseProps
>((props, ref) => <Dialog.Close ref={ref} {...props} />)
BottomSheetClose.displayName = 'BottomSheetClose'

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Content: BottomSheetContent,
  Title: BottomSheetTitle,
  Description: BottomSheetDescription,
  Close: BottomSheetClose,
})
