import type { Api } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { Mono } from '@/components/ui/Mono'
import { fmtTime } from '@/lib/utils/format'

export function RecentChecksList({ apis }: { apis: Api[] }) {
  const allChecks = apis
    .flatMap(a => a.checks)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 8)

  return (
    <div>
      <Label>Recent Checks</Label>
      <Card style={{ marginTop: 10 }}>
        {allChecks.map((c, i) => (
          <div
            key={c.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 14px',
              borderBottom: i < allChecks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.success ? '#10b981' : '#f43f5e', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.apiName}</div>
              <Mono color="#475569">
                <span style={{ fontSize: 11 }}>{c.statusCode}</span>
              </Mono>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: c.success ? '#22d3ee' : '#f43f5e' }}>
                {c.success ? `${c.responseTime}ms` : 'error'}
              </div>
              <div style={{ fontSize: 10, color: '#475569' }}>{fmtTime(c.timestamp)}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}
