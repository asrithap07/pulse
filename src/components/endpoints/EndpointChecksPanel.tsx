import type { Api, Check } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { ResponseChart } from '@/components/charts/ResponseChart'
import { fmtTime } from '@/lib/utils/format'
import { statusColor } from '@/lib/utils/status'

export function EndpointChecksPanel({ api, checks }: { api: Api; checks: Check[] }) {
  const recent = checks.slice().reverse().slice(0, 14)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20, marginBottom: 22 }}>
      <Card style={{ padding: '18px 20px' }}>
        <Label>Response Time</Label>
        <div style={{ marginTop: 10 }}>
          <ResponseChart checks={checks} color={statusColor(api.status)} />
        </div>
      </Card>

      <Card style={{ padding: '18px 20px', overflow: 'hidden' }}>
        <Label>Recent Checks</Label>
        <div style={{ maxHeight: 180, overflowY: 'auto', marginTop: 10 }}>
          {recent.map((c, i) => (
            <div
              key={c.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '8px 0',
                borderBottom: i < recent.length - 1 ? '1px solid rgba(255,255,255,0.04)' : undefined,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.success ? '#10b981' : '#f43f5e', flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, fontFamily: 'var(--font-mono)', color: '#475569' }}>{fmtTime(c.timestamp)}</span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: c.success ? '#22d3ee' : '#f43f5e' }}>
                {c.success ? `${c.responseTime}ms` : c.error || 'error'}
              </span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: c.success ? '#334155' : '#f43f5e' }}>{c.statusCode}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}