import type { Api, Check } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { StatusPill } from '@/components/ui/StatusPill'
import { Sparkline } from '@/components/charts/Sparkline'

export function EndpointListItem({ api, checks, onSelect }: { api: Api; checks: Check[]; onSelect: (id: string) => void }) {
  return (
    <Card
      onClick={() => onSelect(api.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(api.id)
        }
      }}
      aria-label={`${api.name} endpoint, status ${api.status}, ${api.uptime}% uptime`}
      style={{
        padding: '16px 20px',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 3, minWidth: 0 }}>
            <span
              style={{
                fontWeight: 600,
                fontSize: 14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={api.name}
            >
              {api.name}
            </span>
            <StatusPill status={api.status} />
            {!api.enabled && (
              <span
                style={{
                  fontSize: 11,
                  color: '#475569',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(255,255,255,0.04)',
                  padding: '1px 7px',
                  borderRadius: 6,
                  flexShrink: 0,
                }}
                title="This endpoint is currently paused"
              >
                paused
              </span>
            )}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: '#475569',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
            }}
            title={api.url}
          >
            {api.url}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 17,
                fontWeight: 700,
                color: api.avgLatency === 0 ? '#94a3b8' : api.avgLatency < 200 ? '#10b981' : api.avgLatency < 500 ? '#f59e0b' : '#f43f5e',
                letterSpacing: '-0.02em',
              }}
              aria-label={`Latency ${api.avgLatency > 0 ? api.avgLatency : 'unknown'} milliseconds`}
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
                color: api.uptime > 99.5 ? '#10b981' : api.uptime > 99 ? '#10b981' : api.uptime > 95 ? '#f59e0b' : '#f43f5e',
                letterSpacing: '-0.02em',
              }}
              aria-label={`Uptime ${api.uptime} percent`}
            >
              {api.uptime}%
            </div>
            <div style={{ fontSize: 11, color: '#475569' }}>uptime</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#334155' }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M5.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 10, height: 32 }}>
        <Sparkline checks={checks} status={api.status} />
      </div>
    </Card>
  )
}