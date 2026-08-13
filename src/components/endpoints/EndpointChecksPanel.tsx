import type { Api, Check } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { ResponseChart } from '@/components/charts/ResponseChart'
import { fmtTime } from '@/lib/utils/format'
import { statusColor } from '@/lib/utils/status'
import { colors } from '@/lib/tokens/colors'

export function EndpointChecksPanel({ api, checks }: { api: Api; checks: Check[] }) {
  const recent = checks.slice().reverse().slice(0, 14)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20, marginBottom: 22 }}>
      <Card style={{ padding: '18px 20px 16px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <Label>Response Time</Label>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: statusColor(api.status),
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: 999,
              padding: '4px 8px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {api.status}
          </span>
        </div>
        <div style={{ marginTop: 6 }}>
          <ResponseChart checks={checks} color={statusColor(api.status)} />
        </div>
      </Card>

      <Card style={{ padding: '18px 20px', overflow: 'hidden' }}>
        <Label>Recent Checks</Label>
        <div style={{ maxHeight: 188, overflowY: 'auto', marginTop: 8, paddingRight: 4 }}>
          {recent.map((c, i) => (
            <div
              key={c.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '9px 0',
                borderBottom: i < recent.length - 1 ? `1px solid ${colors.surfaceHover}` : undefined,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: c.success ? colors.statusVital : colors.statusAlert,
                  boxShadow: c.success ? `0 0 0 4px ${colors.statusVitalBg}` : `0 0 0 4px ${colors.statusAlertBg}`,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span style={{ flex: 1, fontSize: 12, fontFamily: 'var(--font-mono)', color: colors.textSecondary }}>
                {fmtTime(c.timestamp)}
              </span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: c.success ? colors.accentClarity : colors.statusAlert }}>
                {c.success ? `${c.responseTime}ms` : c.error || 'error'}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: c.success ? colors.textTertiary : colors.statusAlert,
                  minWidth: 28,
                  textAlign: 'right',
                }}
              >
                {c.statusCode}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
