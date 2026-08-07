import type { Incident } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { StatusDot } from '@/components/ui/StatusDot'
import { fmtTime, duration } from '@/lib/utils/format'
import { colors } from '@/lib/tokens/colors'

export function ActiveIncidentCard({ incident, onViewIncidents }: { incident: Incident; onViewIncidents: () => void }) {
  const stats = [
    { label: 'Duration', value: duration(incident.startTime), color: undefined },
    { label: 'Failed Checks', value: String(incident.failedChecks), color: undefined },
    { label: 'Status', value: 'Ongoing', color: colors.statusAlert },
  ]

  return (
    <Card glow="red" style={{ padding: 24, background: 'rgba(13, 18, 32, 0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <StatusDot status="down" size={8} />
          <span
            style={{
              fontWeight: 600,
              fontSize: 14,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={incident.apiName}
          >
            {incident.apiName}
          </span>
        </div>
        <span style={{ fontSize: 12, color: colors.textSecondary, fontFamily: 'var(--font-mono)' }}>
          Started {fmtTime(incident.startTime)}
        </span>
      </div>
      <p style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.55, marginBottom: 16 }}>{incident.description}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        {stats.map(({ label, value, color }) => (
          <div key={label}>
            <div style={{ fontSize: 11, color: colors.textSecondary, fontWeight: 500, marginBottom: 3 }}>{label}</div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: color || colors.textPrimary,
                letterSpacing: '-0.02em',
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onViewIncidents}
        aria-label="View incident details"
        style={{
          width: '100%',
          padding: '9px 0',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          background: colors.statusAlertBgStrong,
          border: `1px solid ${colors.statusAlertBorder}`,
          color: colors.statusAlert,
          cursor: 'pointer',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => ((e.target as HTMLButtonElement).style.opacity = '0.8')}
        onMouseLeave={e => ((e.target as HTMLButtonElement).style.opacity = '1')}
      >
        View Incident
      </button>
    </Card>
  )
}
