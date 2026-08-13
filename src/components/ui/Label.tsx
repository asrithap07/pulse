import type { ReactNode } from 'react'
import { colors } from '@/lib/tokens/colors'

export function Label({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10.5,
        fontWeight: 700,
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  )
}
