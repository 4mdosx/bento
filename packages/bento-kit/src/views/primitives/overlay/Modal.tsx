'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useOverlayStack } from '../../../ui-runtime/overlay'
import { cn } from '../../shared/cn'

export interface ModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  className?: string
  children: React.ReactNode
}

export interface ModalTitleProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Title> {}

export interface ModalDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Description> {}

export interface ModalCloseProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Close> {}

/**
 * Modal: Centered popup layer based on Radix Dialog, semantic Root/Portal/Overlay/Content.
 */
function ModalRoot({ open = false, onOpenChange, children }: ModalProps) {
  const stack = useOverlayStack()
  const container = stack?.overlayContainerRef?.current ?? undefined

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 duration-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          aria-hidden
        />
        {children}
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  ModalContentProps
>(({ className, children, ...props }, ref) => (
  <Dialog.Content
    ref={ref}
    aria-describedby={undefined}
    className={cn(
      'fixed left-1/2 top-1/2 z-10 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg outline-none',
      'duration-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      className,
    )}
    {...props}
  >
    {children}
    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity duration-fast hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </Dialog.Close>
  </Dialog.Content>
))
ModalContent.displayName = 'ModalContent'

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  ModalTitleProps
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn('text-heading-md text-foreground', className)}
    {...props}
  />
))
ModalTitle.displayName = 'ModalTitle'

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  ModalDescriptionProps
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn('text-body-sm text-muted mt-1', className)}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

const ModalClose = React.forwardRef<
  React.ElementRef<typeof Dialog.Close>,
  ModalCloseProps
>((props, ref) => <Dialog.Close ref={ref} {...props} />)
ModalClose.displayName = 'ModalClose'

export const Modal = Object.assign(ModalRoot, {
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
})
