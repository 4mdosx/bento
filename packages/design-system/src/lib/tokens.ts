/**
 * Design tokens：映射到 Tailwind 类名，供 components 层使用。
 * 仅定义语义化 token，不包含 Radix 的视觉 API。
 */
export const tokens = {
  button: {
    variant: {
      solid: 'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700',
      outline:
        'border border-neutral-300 bg-transparent hover:bg-neutral-100 active:bg-neutral-200',
      ghost: 'bg-transparent hover:bg-neutral-100 active:bg-neutral-200',
      destructive:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
      link: 'text-neutral-900 underline-offset-4 hover:underline',
    },
    size: {
      sm: 'h-8 px-3 text-sm rounded-md',
      md: 'h-9 px-4 text-sm rounded-md',
      lg: 'h-10 px-6 text-base rounded-lg',
      icon: 'h-9 w-9 rounded-md',
    },
    base: 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  },
} as const
