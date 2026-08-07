import type { Check } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Mono } from '@/components/ui/Mono'
import { fmtDateTime } from '@/lib/utils/format'

const GRID_COLUMNS = '1fr 140px 90px 90px 90px'

export function HistoryTable({ checks }: { checks: Check[] }) {
  return (
    <Card>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: GRID_COLUMNS,
          padding: '10px 18px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          fontSize: 11,
          fontWeight: 600,
          color: '#475569',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
        }}
      >
        <span>Endpoint</span>
        <span>Time</span>
        <span>Status</span>
        <span>Code</span>
        <span style={{ textAlign: 'right' }}>Latency</span>
      </div>
      <div style={{ maxHeight: 600, overflowY: 'auto' }}>
        {checks.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#475569', fontSize: 13 }}>No checks match</div>
        ) : (
          checks.map((c, i) => (
            <div
              key={c.id}
              style={{
                display: 'grid',
                gridTemplateColumns: GRID_COLUMNS,
                padding: '11px 18px',
                alignItems: 'center',
                borderBottom: i < checks.length - 1 ? '1px solid rgba(255,255,255,0.04)' : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.success ? '#10b981' : '#f43f5e', flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.apiName}</span>
                {c.error && (
                  <span
                    style={{
                      fontSize: 11,
                      color: '#f43f5e',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(244,63,94,0.08)',
                      padding: '1px 6px',
                      borderRadius: 6,
                      flexShrink: 0,
                    }}
                  >
                    {c.error}
                  </span>
                )}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569' }}>{fmtDateTime(c.timestamp)}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: c.success ? '#10b981' : '#f43f5e' }}>{c.success ? 'Success' : 'Failed'}</span>
              <Mono color={c.success ? '#94a3b8' : '#f43f5e'}>
                <span style={{ fontSize: 12 }}>{c.statusCode}</span>
              </Mono>
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: c.responseTime > 500 ? '#f59e0b' : '#94a3b8' }}>
                {c.success ? `${c.responseTime}ms` : '—'}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
