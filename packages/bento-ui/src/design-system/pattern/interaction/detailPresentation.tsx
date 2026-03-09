import { useRouter, useSearchParams } from 'next/navigation'
import { Modal, Drawer, BottomSheet } from '../../../infrastructure/overlay'
import { useBreakpoint } from '../layout/ResponsiveLayout'

interface DetailPresentationProps {
  key: string
}

export function useDetailState(paramKey: string) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const id = searchParams.get(paramKey)

  const open = (id: string) => {
    const path = window.location.pathname
    router.push(`${path}?${paramKey}=${encodeURIComponent(id)}`)
  }

  const close = () => {
    const path = window.location.pathname
    router.push(path)
  }

  return { id, open, close }
}

export interface DetailStateProps {
  id: string
  onClose?: () => void
  title?: string
  children: React.ReactNode
}

export function DetailPresentation({ id, onClose, title = 'Detail', children }: DetailStateProps) {
  const breakpoint = useBreakpoint()
  const open = Boolean(id)
  const handleOpenChange = (next: boolean) => {
    if (!next) onClose?.()
  }

  if (breakpoint === 'screen' || breakpoint === 'large') {
    return (
      <Modal open={open} onOpenChange={handleOpenChange}>
        <Modal.Content aria-describedby={undefined}>
          <Modal.Title className="sr-only">{title}</Modal.Title>
          {children}
        </Modal.Content>
      </Modal>
    )
  }

  if (breakpoint === 'tablet') {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <Drawer.Content aria-describedby={undefined}>
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          {children}
        </Drawer.Content>
      </Drawer>
    )
  }

  return (
    <BottomSheet open={open} onOpenChange={handleOpenChange}>
      <BottomSheet.Content aria-describedby={undefined} className="h-[90dvh] max-h-[90dvh]">
        <BottomSheet.Title className="sr-only">{title}</BottomSheet.Title>
        {children}
      </BottomSheet.Content>
    </BottomSheet>
  )
}
