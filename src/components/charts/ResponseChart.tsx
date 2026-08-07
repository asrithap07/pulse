'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { Check } from '@/lib/types'
import { fmtTime } from '@/lib/utils/format'
import { colors } from '@/lib/tokens/colors'

export function ResponseChart({ checks, color = colors.accentClarity }: { checks: Check[]; color?: string }) {
  const data = checks.slice(-20).map(c => ({
    t: fmtTime(c.timestamp),
    ms: c.success ? c.responseTime : undefined,
  }))
  const gradientId = `g-${color.replace(/[^a-z0-9]/gi, '')}`

  return (
    <ResponsiveContainer width="100%" height={110}>
      <AreaChart data={data} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="t"
          tick={{ fontSize: 10, fill: colors.textSecondary, fontFamily: 'var(--font-mono)' }}
          axisLine={false}
          tickLine={false}
          interval={4}
        />
        <YAxis tick={{ fontSize: 10, fill: colors.textSecondary, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: colors.bgDark,
            border: `1px solid ${colors.borderActive}`,
            borderRadius: 8,
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
          }}
          labelStyle={{ color: colors.textSecondary }}
          itemStyle={{ color }}
          formatter={(v => [`${v}ms`, '']) as (value: unknown) => [string, string]}
        />
        <Area type="monotone" dataKey="ms" stroke={color} strokeWidth={1.5} fill={`url(#${gradientId})`} dot={false} connectNulls={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
