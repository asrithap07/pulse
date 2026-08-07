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
        background: colors.bgDark,
        border: `1px solid ${
          glow === 'red' ? colors.statusAlertBorder : hov && onClick ? colors.borderActive : colors.borderSubtle
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
