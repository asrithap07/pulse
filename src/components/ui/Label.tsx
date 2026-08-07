import type { ReactNode } from 'react'

export function Label({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#475569',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        marginBottom: 6,
      }}
    >
      {children}
    </div>
  )
}
