import type { DesignToken } from './types'

export const buttonTokens: DesignToken[] = [
  { name: '--color-primary', kind: 'color', value: '#1d4ed8', description: '实心按钮的主背景色，表达页面中的主要操作。' },
  { name: '--color-primary-foreground', kind: 'color', value: '#ffffff', description: '主色背景上的前景色，保证按钮文字清晰可读。' },
  { name: '--color-border', kind: 'color', value: '#d1d5db', description: '描边按钮与结构边界使用的语义颜色。' },
  { name: '--color-ring', kind: 'color', value: '#9ca3af', description: '键盘聚焦时的可见焦点环，反馈当前交互位置。' },
  { name: '--text-body-sm', kind: 'typography', value: '14px / 1.5', description: '小号与默认控件、表格内容和辅助信息的基础排版。' },
  { name: 'rounded-md', kind: 'radius', value: '6px', description: '小号与默认控件采用的圆角尺度。' },
  { name: 'spacing-md', kind: 'spacing', value: '16px', description: '默认控件的水平内边距，平衡内容与点击区域。' },
]

export const listTokens: DesignToken[] = [
  { name: '--color-background', kind: 'color', value: '#ffffff', description: '组件容器、筛选控件与 Overlay 的基础表面颜色。' },
  { name: '--color-border', kind: 'color', value: '#d1d5db', description: '输入框、表格和分页控件之间的结构边界。' },
  { name: '--color-muted', kind: 'color', value: '#6b7280', description: '辅助信息、分页说明和弱化状态的文字颜色。' },
  { name: '--text-body-sm', kind: 'typography', value: '14px / 1.5', description: '表格内容、筛选控件和分页信息的基础排版。' },
  { name: '--breakpoint-tablet', kind: 'breakpoint', value: '640px', description: '从移动布局切换到信息密度更高的平板展示。' },
  { name: '--breakpoint-screen', kind: 'breakpoint', value: '1024px', description: '为桌面布局及居中 Modal 提供切换阈值。' },
]

export const detailTokens: DesignToken[] = [
  { name: '--color-background', kind: 'color', value: '#ffffff', description: 'Modal、Drawer 与 Bottom Sheet 的内容表面。' },
  { name: '--color-foreground', kind: 'color', value: '#171717', description: '详情标题和主要内容使用的高强调前景色。' },
  { name: '--color-muted', kind: 'color', value: '#6b7280', description: '详情描述和辅助元数据使用的弱化文字颜色。' },
  { name: '--color-ring', kind: 'color', value: '#9ca3af', description: 'Overlay 内交互元素的键盘焦点反馈。' },
  { name: '--text-heading-md', kind: 'typography', value: '18px / 1.3', description: '自适应详情容器的标题排版层级。' },
  { name: '--breakpoint-tablet', kind: 'breakpoint', value: '640px', description: '在 Bottom Sheet 与 Drawer 等详情形态之间切换。' },
  { name: '--breakpoint-screen', kind: 'breakpoint', value: '1024px', description: '在宽屏环境中切换为居中的 Modal 呈现。' },
]

export const designTokens = Array.from(
  new Map([...buttonTokens, ...listTokens, ...detailTokens].map((token) => [token.name, token])).values(),
)
