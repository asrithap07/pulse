import type { Incident } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { StatusDot } from '@/components/ui/StatusDot'
import { fmtTime, duration } from '@/lib/utils/format'

export function ActiveIncidentCard({ incident, onViewIncidents }: { incident: Incident; onViewIncidents: () => void }) {
  const stats = [
    { label: 'Duration', value: duration(incident.startTime), color: undefined },
    { label: 'Failed Checks', value: String(incident.failedChecks), color: undefined },
    { label: 'Status', value: 'Ongoing', color: '#f43f5e' },
  ]

  return (
    <Card glow="red" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StatusDot status="down" size={8} />
          <span style={{ fontWeight: 600, fontSize: 14 }}>{incident.apiName}</span>
        </div>
        <span style={{ fontSize: 12, color: '#475569', fontFamily: 'var(--font-mono)' }}>Started {fmtTime(incident.startTime)}</span>
      </div>
      <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.55, marginBottom: 16 }}>{incident.description}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        {stats.map(({ label, value, color }) => (
          <div key={label}>
            <div style={{ fontSize: 11, color: '#475569', fontWeight: 500, marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', color: color || '#e2e8f0', letterSpacing: '-0.02em' }}>
              {value}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onViewIncidents}
        style={{
          width: '100%',
          padding: '9px 0',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          background: 'rgba(244,63,94,0.12)',
          border: '1px solid rgba(244,63,94,0.2)',
          color: '#f43f5e',
          cursor: 'pointer',
        }}
      >
        View Incident
      </button>
    </Card>
  )
}
