'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ResponsiveLayout } from '../pattern/layout/ResponsiveLayout'
import { cn } from '../lib/cn'

export const dataContainerClass =
  'flex-1 min-h-0 overflow-auto border-border [&:not(:last-child)]:border-b-0'

export interface ListDataSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  /** 移动端内容（List + item 垂直布局）；与 tablet 同时传入时使用 ResponsiveLayout 切换 */
  mobile?: React.ReactNode
  /** 平板及以上内容（如表格）；与 mobile 同时传入时在 tablet/screen/large 断点展示 */
  tablet?: React.ReactNode
}

/**
 * Data container slot: main content area for table or list.
 * When both mobile and tablet are provided, uses ResponsiveLayout to switch by breakpoint.
 */
const ListDataSlot = React.forwardRef<HTMLDivElement, ListDataSlotProps>(
  ({ className, asChild = false, mobile, tablet, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    const hasResponsiveSlots = mobile != null && tablet != null
    const content = hasResponsiveSlots ? (
      <ResponsiveLayout mobile={mobile} tablet={tablet} className="h-full" />
    ) : (
      children
    )
    return (
      <Comp
        ref={ref}
        className={cn(dataContainerClass, className)}
        data-list-pattern="data"
        {...props}
      >
        {content}
      </Comp>
    )
  },
)
ListDataSlot.displayName = 'ListDataSlot'

export { ListDataSlot }
