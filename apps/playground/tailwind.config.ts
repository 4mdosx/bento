import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/bento-ui/src/**/*.{ts,tsx}',
  ],
} satisfies Config
