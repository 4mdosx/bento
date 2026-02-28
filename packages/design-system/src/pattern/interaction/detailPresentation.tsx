import { useRouter } from 'next/navigation'
import { useBreakpoint } from '../layout/ResponsiveLayout'
import { useMemo, useState } from 'react'

interface DetailPresentationProps {
  key: string
  onClose?: () => void,
  modal?: React.ReactNode
  drawer?: React.ReactNode
  bottomSheet?: React.ReactNode
}

export function useDetailPresentation({ key, onClose, modal, drawer, bottomSheet }: DetailPresentationProps) {
  const router = useRouter()
  const breakpoint = useBreakpoint()    
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  const open = (id: string) => {
    // 当前路径
    const path = window.location.pathname
    router.push(`${path}?${key}=${encodeURIComponent(id)}`)
  }

  const presentation = useMemo(() => {
    if (breakpoint === 'screen' && modal) {
    // TODO: 实现 modal 组件
    //   return <DetailModal id={selectedId} onClose={() => setSelectedId(null)} />
    }
    if (breakpoint === 'tablet' && drawer) {
    // TODO: 实现 drawer 组件
    //   return <DetailDrawer id={selectedId} onClose={() => setSelectedId(null)} />
    }
    if (breakpoint === 'mobile' && bottomSheet) {
    // TODO: 实现 bottom sheet 组件
    //   return <DetailBottomSheet id={selectedId} onClose={() => setSelectedId(null)} />
    }
    const fallback = modal || drawer || bottomSheet
    return fallback
  }, [breakpoint, selectedId]) 

  return { open, presentation }
}
