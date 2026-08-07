import type { ReactNode } from 'react'

export function Mono({ children, color }: { children: ReactNode; color?: string }) {
  return <span style={{ fontFamily: 'var(--font-mono)', color }}>{children}</span>
}
