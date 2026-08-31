import type { DesignToken } from './types'

export const colorTokens: DesignToken[] = [
  { name: '--color-background', kind: 'color', value: '#f7f5ed', description: '页面与组件容器的基础表面颜色。' },
  { name: '--color-foreground', kind: 'color', value: '#17201b', description: '标题和主要内容使用的高强调前景色。' },
  { name: '--color-primary', kind: 'color', value: '#17201b', description: '实心按钮等主要操作的背景色。' },
  { name: '--color-primary-foreground', kind: 'color', value: '#f7f5ed', description: '主色背景上的前景色，保证文字清晰可读。' },
  { name: '--color-muted', kind: 'color', value: '#e8eee6', description: '弱化表面背景，用于次级区域和辅助结构。' },
  { name: '--color-muted-foreground', kind: 'color', value: '#5f6d64', description: '辅助文字和次级信息的前景色。' },
  { name: '--color-border', kind: 'color', value: '#d8d9cd', description: '输入框、表格和分页控件之间的结构边界。' },
  { name: '--color-ring', kind: 'color', value: '#93a097', description: '键盘聚焦时的可见焦点环。' },
  { name: '--color-destructive', kind: 'color', value: '#dc2626', description: '危险或破坏性操作的语义颜色。' },
  { name: '--color-destructive-foreground', kind: 'color', value: '#ffffff', description: '危险色背景上的前景色。' },
]

export const typographyTokens: DesignToken[] = [
  { name: '--text-display-lg', kind: 'typography', value: '56px / 1.1', description: '页面级展示标题。' },
  { name: '--text-heading-lg', kind: 'typography', value: '32px / 1.25', description: '区块与页面组件的主标题。' },
  { name: '--text-heading-md', kind: 'typography', value: '18px / 1.3', description: '卡片、Overlay 与小节标题。' },
  { name: '--text-body-lg', kind: 'typography', value: '18px / 1.5', description: '强调正文与导语。' },
  { name: '--text-body-md', kind: 'typography', value: '16px / 1.5', description: '默认正文与连续阅读。' },
  { name: '--text-body-sm', kind: 'typography', value: '14px / 1.5', description: '控件、表格内容和辅助信息。' },
  { name: '--text-caption', kind: 'typography', value: '12px / 1.4', description: '标签、元信息和极小辅助文字。' },
]

export const radiusTokens: DesignToken[] = [
  { name: '--radius-sm', kind: 'radius', value: '0.5rem', description: '紧凑控件与关闭按钮的小圆角。' },
  { name: '--radius-md', kind: 'radius', value: '0.8rem', description: '默认控件（按钮、输入框）的圆角。' },
  { name: '--radius-lg', kind: 'radius', value: '1rem', description: '卡片、列表容器与 Modal 的表面圆角。' },
  { name: '--radius-pill', kind: 'radius', value: '999px', description: '胶囊形轮廓；Tailwind 中映射为 rounded-full。' },
]

export const durationTokens: DesignToken[] = [
  { name: '--duration-fast', kind: 'duration', value: '150ms', description: '颜色、透明度等即时反馈，用于按钮与控件。' },
  { name: '--duration-default', kind: 'duration', value: '200ms', description: '通用界面过渡，例如卡片位移与边框变化。' },
  { name: '--duration-overlay', kind: 'duration', value: '300ms', description: 'Modal、Drawer 与 Bottom Sheet 的进入与退出。' },
]

export const spacingTokens: DesignToken[] = [
  { name: 'spacing-md', kind: 'spacing', value: '16px', description: '默认控件的水平内边距，平衡内容与点击区域。' },
]

export const breakpointTokens: DesignToken[] = [
  { name: '--breakpoint-tablet', kind: 'breakpoint', value: '640px', description: '从移动布局切换到信息密度更高的平板展示。' },
  { name: '--breakpoint-screen', kind: 'breakpoint', value: '1024px', description: '为桌面布局及居中 Modal 提供切换阈值。' },
]

const byName = (...groups: DesignToken[][]) => {
  const tokens = new Map<string, DesignToken>()
  for (const token of groups.flat()) tokens.set(token.name, token)
  return (name: string) => {
    const token = tokens.get(name)
    if (!token) throw new Error(`Unknown design token: ${name}`)
    return token
  }
}

const token = byName(colorTokens, typographyTokens, radiusTokens, durationTokens, spacingTokens, breakpointTokens)

export const buttonTokens: DesignToken[] = [
  token('--color-primary'),
  token('--color-primary-foreground'),
  token('--color-border'),
  token('--color-ring'),
  token('--text-body-sm'),
  token('--radius-md'),
  token('--duration-fast'),
  token('spacing-md'),
]

export const listTokens: DesignToken[] = [
  token('--color-background'),
  token('--color-border'),
  token('--color-muted'),
  token('--text-body-sm'),
  token('--radius-lg'),
  token('--breakpoint-tablet'),
  token('--breakpoint-screen'),
]

export const detailTokens: DesignToken[] = [
  token('--color-background'),
  token('--color-foreground'),
  token('--color-muted'),
  token('--color-ring'),
  token('--text-heading-md'),
  token('--radius-lg'),
  token('--duration-overlay'),
  token('--breakpoint-tablet'),
  token('--breakpoint-screen'),
]

export const designTokens: DesignToken[] = [
  ...colorTokens,
  ...typographyTokens,
  ...radiusTokens,
  ...durationTokens,
  ...spacingTokens,
  ...breakpointTokens,
]
