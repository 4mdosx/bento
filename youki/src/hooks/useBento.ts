
import { BentoContext } from '@/src/components/bento-provider'
import { useContext } from 'react'

export function useBento() {
  const context = useContext(BentoContext)
  return context
}
