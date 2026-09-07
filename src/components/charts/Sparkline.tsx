'use client'

import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import type { Check } from '@/lib/types'

export function Sparkline({ checks, color }: { checks: Check[]; color: string }) {
  const data = checks.slice(-16).map(c => ({ ms: c.success ? c.responseTime : 0 }))
  const gradientId = `sp-${color.replace(/[^a-z0-9]/gi, '')}`

  return (
    <ResponsiveContainer width="100%" height={32}>
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.18} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="ms" stroke={color} strokeWidth={1.2} fill={`url(#${gradientId})`} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
