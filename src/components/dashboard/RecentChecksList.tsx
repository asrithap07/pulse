import type { Check } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { Mono } from '@/components/ui/Mono'
import { fmtTime } from '@/lib/utils/format'

export function RecentChecksList({ checks }: { checks: Check[] }) {
  const allChecks = [...checks]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 8)

  return (
    <div>
      <Label>Recent Checks</Label>
      <Card style={{ marginTop: 10 }}>
        {allChecks.length === 0 ? (
          <div
            style={{
              padding: '16px 14px',
              textAlign: 'center',
              fontSize: 12,
              color: '#475569',
            }}
          >
            No checks yet
          </div>
        ) : (
          allChecks.map((c, i) => (
            <div
              key={c.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 14px',
                borderBottom: i < allChecks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined,
              }}
              title={`${c.apiName} - ${c.statusCode}`}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: c.success ? '#10b981' : '#f43f5e',
                  flexShrink: 0,
                  boxShadow: c.success ? '0 0 8px rgba(16, 185, 129, 0.3)' : '0 0 8px rgba(244, 63, 94, 0.3)',
                }}
                aria-label={c.success ? 'Success' : 'Failed'}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={c.apiName}
                >
                  {c.apiName}
                </div>
                <Mono color="#475569">
                  <span style={{ fontSize: 11 }}>{c.statusCode}</span>
                </Mono>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    color: c.success ? '#22d3ee' : '#f43f5e',
                    fontWeight: 500,
                  }}
                  aria-label={c.success ? `Response time ${c.responseTime}ms` : 'Failed'}
                >
                  {c.success ? `${c.responseTime}ms` : 'error'}
                </div>
                <div style={{ fontSize: 10, color: '#475569' }} title={c.timestamp}>
                  {fmtTime(c.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  )
}