import type { KeyboardEvent } from 'react'
import type { Api, Check } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { StatusPill } from '@/components/ui/StatusPill'
import { Sparkline } from '@/components/charts/Sparkline'
import { colors } from '@/lib/tokens/colors'

export function EndpointListItem({ api, checks, onSelect }: { api: Api; checks: Check[]; onSelect: (id: string) => void }) {
  return (
    <Card
      onClick={() => onSelect(api.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(api.id)
        }
      }}
      aria-label={`${api.name} endpoint, status ${api.status}, ${api.uptime}% uptime`}
      style={{
        padding: '18px 18px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 5, minWidth: 0 }}>
            <span
              style={{
                fontWeight: 600,
                fontSize: 15,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.02em',
              }}
              title={api.name}
            >
              {api.name}
            </span>
            <StatusPill status={api.status} />
            {!api.enabled && (
              <span
                style={{
                  fontSize: 10.5,
                  color: colors.textSecondary,
                  fontFamily: 'var(--font-mono)',
                  background: colors.surfaceHover,
                  padding: '2px 7px',
                  borderRadius: 999,
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
              color: colors.textSecondary,
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 16,
                fontWeight: 700,
                color:
                  api.avgLatency === 0
                    ? colors.textSecondary
                    : api.avgLatency < 200
                      ? colors.statusVital
                      : api.avgLatency < 500
                        ? colors.statusWarning
                        : colors.statusAlert,
                letterSpacing: '-0.04em',
              }}
              aria-label={`Latency ${api.avgLatency > 0 ? api.avgLatency : 'unknown'} milliseconds`}
            >
              {api.avgLatency > 0 ? api.avgLatency : '—'}
              <span style={{ fontSize: 10, color: colors.textSecondary, fontWeight: 400 }}>ms</span>
            </div>
            <div style={{ fontSize: 10.5, color: colors.textSecondary, marginTop: 2 }}>latency</div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 16,
                fontWeight: 700,
                color:
                  api.uptime > 99.5
                    ? colors.statusVital
                    : api.uptime > 99
                      ? colors.statusVital
                      : api.uptime > 95
                        ? colors.statusWarning
                        : colors.statusAlert,
                letterSpacing: '-0.04em',
              }}
              aria-label={`Uptime ${api.uptime} percent`}
            >
              {api.uptime}%
            </div>
            <div style={{ fontSize: 10.5, color: colors.textSecondary, marginTop: 2 }}>uptime</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', color: colors.textTertiary }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M5.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, height: 34 }}>
        <Sparkline checks={checks} status={api.status} />
      </div>
    </Card>
  )
}