import { BreakpointName, breakpointValues } from './breakpoints'

/** 生成 min-width 媒体查询字符串，用于 matchMedia 或 CSS-in-JS */
export function min(name: BreakpointName): string {
  const px = breakpointValues[name]
  return px === 0 ? '(min-width: 0px)' : `(min-width: ${px}px)`
}

/** 生成 max-width 媒体查询字符串（不包含该断点宽度，即 max-width: N-1px） */
export function max(name: BreakpointName): string {
  const px = breakpointValues[name]
  if (px === 0) return '(max-width: -1px)' /* 无匹配 */
  return `(max-width: ${px - 1}px)`
}

/** 生成介于两断点之间的媒体查询字符串 */
export function between(
  nameMin: BreakpointName,
  nameMax: BreakpointName
): string {
  const minPx = breakpointValues[nameMin]
  const maxPx = breakpointValues[nameMax]
  if (maxPx === 0) return '(max-width: -1px)'
  return `(min-width: ${minPx}px) and (max-width: ${maxPx - 1}px)`
}

export const BREAKPOINT_ORDER: BreakpointName[] = ['large', 'screen', 'tablet', 'mobile']
export function getCurrentBreakpoint(): BreakpointName {
    if (typeof window === 'undefined') return 'mobile'
    for (const name of BREAKPOINT_ORDER) {
      if (window.matchMedia(min(name)).matches) return name
    }
    return 'mobile'
  }
  
