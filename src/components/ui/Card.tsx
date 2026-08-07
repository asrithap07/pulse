'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'

export function Card({
  children,
  style,
  onClick,
  glow,
  role,
  tabIndex,
  onKeyDown,
  ...ariaProps
}: {
  children: ReactNode
  style?: CSSProperties
  onClick?: () => void
  glow?: 'red' | 'none'
  role?: string
  tabIndex?: number
  onKeyDown?: (e: React.KeyboardEvent) => void
  [key: string]: any
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      role={role}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#0d1220',
        border: `1px solid ${
          glow === 'red' ? 'rgba(244,63,94,0.2)' : hov && onClick ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.07)'
        }`,
        borderRadius: 10,
        transition: 'border-color 0.15s',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
      {...ariaProps}
    >
      {children}
    </div>
  )
}
