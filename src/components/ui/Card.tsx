'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import { colors } from '@/lib/tokens/colors'

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
  [key: string]: unknown
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
        background: 'linear-gradient(180deg, rgba(18, 28, 43, 0.96), rgba(12, 18, 28, 0.95))',
        border: `1px solid ${
          glow === 'red' ? colors.statusAlertBorder : hov && onClick ? colors.borderActive : colors.borderSubtle
        }`,
        borderRadius: 16,
        boxShadow: hov && onClick ? '0 18px 28px rgba(4, 8, 14, 0.32)' : 'inset 0 1px 0 rgba(255,255,255,0.02)',
        transition: 'border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease',
        transform: hov && onClick ? 'translateY(-1px)' : 'translateY(0)',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
      {...ariaProps}
    >
      {children}
    </div>
  )
}
