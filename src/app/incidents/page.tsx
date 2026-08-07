'use client'

import { useQuery } from '@tanstack/react-query'
import { getIncidents } from '@/lib/api'
import { colors } from '@/lib/tokens/colors'
import { Label } from '@/components/ui/Label'
import { IncidentCard } from '@/components/incidents/IncidentCard'

export default function IncidentsPage() {
  const { data: incidents = [] } = useQuery({ queryKey: ['incidents'], queryFn: getIncidents })
  const active = incidents.filter(i => i.status === 'active')
  const resolved = incidents.filter(i => i.status === 'resolved')

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em' }}>Incidents</h1>
        <p style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>
          {active.length} active · {resolved.length} resolved
        </p>
      </div>

      {active.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <Label>Active</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            {active.map(i => (
              <IncidentCard key={i.id} incident={i} defaultOpen />
            ))}
          </div>
        </div>
      )}

      <div>
        <Label>Resolved</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
          {resolved.map(i => (
            <IncidentCard key={i.id} incident={i} />
          ))}
        </div>
      </div>
    </div>
  )
}