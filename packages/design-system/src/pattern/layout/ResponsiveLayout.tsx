'use client'

import * as React from 'react'
import { min, getCurrentBreakpoint, BREAKPOINT_ORDER } from '../../lib/media'
import type { BreakpointName } from '../../token/breakpoints'


export function useBreakpoint(): BreakpointName {
  const [breakpoint, setBreakpoint] = React.useState<BreakpointName>(getCurrentBreakpoint())

  React.useEffect(() => {
    const mediaQueries = BREAKPOINT_ORDER.map((name) => ({
      name,
      mq: window.matchMedia(min(name)),
    }))

    const update = () => setBreakpoint(getCurrentBreakpoint())

    update()
    mediaQueries.forEach(({ mq }) => mq.addEventListener('change', update))
    

    return () => {
      mediaQueries.forEach(({ mq }) => mq.removeEventListener('change', update))
    }
  }, [])  

  return breakpoint
}

export interface ResponsiveLayoutSlots {
  mobile?: React.ReactNode
  tablet?: React.ReactNode
  screen?: React.ReactNode
  large?: React.ReactNode
}

export interface ResponsiveLayoutProps extends ResponsiveLayoutSlots {
  /** Whether to fallback to the smaller breakpoint slot when the current breakpoint has no corresponding slot. Default true */
  fallback?: boolean
  /** The root element that wraps the content. Default div */
  as?: React.ElementType
  className?: string
}

/**
 * Render the corresponding slot based on the current breakpoint.
 * Use media.ts and breakpoints to determine the viewport, and only render the slot matching the breakpoint (or fallback to a smaller breakpoint).
 */
const ResponsiveLayout = React.forwardRef<HTMLElement, ResponsiveLayoutProps>(
  (
    {
      mobile,
      tablet,
      screen,
      large,
      fallback = true,
      as: Comp = 'div',
      className,
      ...rest
    },
    ref
  ) => {
    const breakpoint = useBreakpoint()
    const slots: ResponsiveLayoutSlots = { large, screen, tablet, mobile }

    const content = React.useMemo(() => {
      const currentIndex = BREAKPOINT_ORDER.indexOf(breakpoint) || 0

      if (fallback) {
        for (let i = currentIndex; i < BREAKPOINT_ORDER.length; i++) {
          const name = BREAKPOINT_ORDER[i]
          const slot = slots[name as keyof ResponsiveLayoutSlots]
          if (slot != null) return slot
        }
      }

      return slots[breakpoint] ?? null
    }, [breakpoint, fallback, large, screen, tablet, mobile])

    return (
      <Comp ref={ref} className={className} {...rest}>
        {content}
      </Comp>
    )
  }
)

ResponsiveLayout.displayName = 'ResponsiveLayout'

export { ResponsiveLayout }
