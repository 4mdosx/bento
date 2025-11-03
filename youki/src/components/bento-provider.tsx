'use client'
import { createContext } from "react"
interface BentoProviderProps {
  platform: 'web' | 'mobile'
  children: React.ReactNode
}

export function BentoProvider({ platform = 'web', children }: BentoProviderProps) {
  return (
    <BentoContext.Provider value={{ platform, children }}>
        {children}
    </BentoContext.Provider>
  )
}

export const BentoContext = createContext<BentoProviderProps>({
  platform: 'web',
  children: null,
})
