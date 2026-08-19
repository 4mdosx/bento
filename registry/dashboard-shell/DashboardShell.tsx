import type { ReactNode } from 'react'

export function DashboardShell({ navigation, children }: { navigation: ReactNode; children: ReactNode }) {
  return <div className="grid min-h-screen md:grid-cols-[16rem_1fr]"><aside>{navigation}</aside><main>{children}</main></div>
}
