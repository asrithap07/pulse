import type { Check } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { Mono } from '@/components/ui/Mono'
import { fmtTime } from '@/lib/utils/format'
import { colors } from '@/lib/tokens/colors'

export function RecentChecksList({ checks }: { checks: Check[] }) {
  const allChecks = [...checks]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 8)

  return (
    <div>
      <Label>Recent Checks</Label>
      <Card style={{ marginTop: 12, overflow: 'hidden' }}>
        {allChecks.length === 0 ? (
          <div
            style={{
              padding: '16px 16px',
              textAlign: 'center',
              fontSize: 12,
              color: colors.textSecondary,
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
                padding: '12px 16px',
                borderBottom: i < allChecks.length - 1 ? `1px solid ${colors.borderFaint}` : undefined,
              }}
              title={`${c.apiName} - ${c.statusCode}`}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: c.success ? colors.statusVital : colors.statusAlert,
                  flexShrink: 0,
                  boxShadow: c.success ? '0 0 10px rgba(61, 220, 151, 0.4)' : '0 0 10px rgba(255, 107, 116, 0.4)',
                }}
                aria-label={c.success ? 'Success' : 'Failed'}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    letterSpacing: '-0.01em',
                  }}
                  title={c.apiName}
                >
                  {c.apiName}
                </div>
                <Mono color={colors.textSecondary}>
                  <span style={{ fontSize: 11 }}>{c.statusCode}</span>
                </Mono>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    color: c.success ? colors.accentClarity : colors.statusAlert,
                    fontWeight: 600,
                  }}
                  aria-label={c.success ? `Response time ${c.responseTime}ms` : 'Failed'}
                >
                  {c.success ? `${c.responseTime}ms` : 'error'}
                </div>
                <div style={{ fontSize: 10, color: colors.textSecondary, marginTop: 2 }} title={c.timestamp}>
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