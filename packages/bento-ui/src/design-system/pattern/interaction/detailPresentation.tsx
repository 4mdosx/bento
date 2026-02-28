import { useRouter, useSearchParams } from 'next/navigation'
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
  children: React.ReactNode
}

export function DetailPresentation({ id, children }: DetailStateProps) {
  const breakpoint = useBreakpoint()

  if (breakpoint === 'screen') {
    return (
      <>
        {/* <Modal open onClose={onClose}> */}
        {children}
        {/* </Modal> */}
      </>
    )
  }

  if (breakpoint === 'tablet') {
    return (
      <>
        {/* <Drawer open onClose={onClose}> */}
        {children}
        {/* </Drawer> */}
      </>
    )
  }

  return (
    <>
      {/* <BottomSheet open onClose={onClose}> */}
      {children}
      {/* </BottomSheet> */}
    </>
  )
}
