import type { Api } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { StatusPill } from '@/components/ui/StatusPill'
import { Sparkline } from '@/components/charts/Sparkline'

export function EndpointListItem({ api, onSelect }: { api: Api; onSelect: (id: string) => void }) {
  return (
    <Card onClick={() => onSelect(api.id)} style={{ padding: '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 3 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{api.name}</span>
            <StatusPill status={api.status} />
            {!api.enabled && (
              <span
                style={{
                  fontSize: 11,
                  color: '#475569',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(255,255,255,0.04)',
                  padding: '1px 7px',
                  borderRadius: 9,
                }}
              >
                paused
              </span>
            )}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569' }}>{api.url}</span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 17,
                fontWeight: 700,
                color: api.avgLatency > 500 ? '#f59e0b' : '#e2e8f0',
                letterSpacing: '-0.02em',
              }}
            >
              {api.avgLatency > 0 ? api.avgLatency : '—'}
              <span style={{ fontSize: 11, color: '#475569', fontWeight: 400 }}>ms</span>
            </div>
            <div style={{ fontSize: 11, color: '#475569' }}>latency</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 17,
                fontWeight: 700,
                color: api.uptime > 99 ? '#10b981' : '#f59e0b',
                letterSpacing: '-0.02em',
              }}
            >
              {api.uptime}%
            </div>
            <div style={{ fontSize: 11, color: '#475569' }}>uptime</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#334155' }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M5.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 10, height: 32 }}>
        <Sparkline checks={api.checks} status={api.status} />
      </div>
    </Card>
  )
}
