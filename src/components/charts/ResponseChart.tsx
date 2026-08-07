'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { Check } from '@/lib/types'
import { fmtTime } from '@/lib/utils/format'

export function ResponseChart({ checks, color = '#22d3ee' }: { checks: Check[]; color?: string }) {
  const data = checks.slice(-20).map(c => ({
    t: fmtTime(c.timestamp),
    ms: c.success ? c.responseTime : undefined,
  }))
  const gradientId = `g-${color.replace('#', '')}`

  return (
    <ResponsiveContainer width="100%" height={110}>
      <AreaChart data={data} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#475569', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} interval={4} />
        <YAxis tick={{ fontSize: 10, fill: '#475569', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-mono)' }}
          labelStyle={{ color: '#475569' }}
          itemStyle={{ color }}
          formatter={(v => [`${v}ms`, '']) as (value: unknown) => [string, string]}
        />
        <Area type="monotone" dataKey="ms" stroke={color} strokeWidth={1.5} fill={`url(#${gradientId})`} dot={false} connectNulls={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
