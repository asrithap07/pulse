import type { Incident } from '@/lib/types'
import { Label } from '@/components/ui/Label'
import { Card } from '@/components/ui/Card'
import { IncidentCard } from '@/components/incidents/IncidentCard'
import { colors } from '@/lib/tokens/colors'

export function EndpointIncidentHistory({ incidents }: { incidents: Incident[] }) {
  const active = incidents.filter(i => i.status === 'active')
  const past = incidents.filter(i => i.status === 'resolved')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <Label>Active Incidents</Label>
        {active.length === 0 ? (
          <Card style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke={colors.statusVital} strokeWidth="1.5" />
              <path d="M5 8.2l2 2 4-4.4" stroke={colors.statusVital} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 13, color: colors.textSecondary }}>No active incidents</span>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            {active.map(inc => (
              <IncidentCard key={inc.id} incident={inc} defaultOpen />
            ))}
          </div>
        )}
      </div>

      <div>
        <Label>Past Incidents</Label>
        {past.length === 0 ? (
          <Card style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: colors.textSecondary }}>No past incidents</span>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            {past.map(inc => (
              <IncidentCard key={inc.id} incident={inc} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
