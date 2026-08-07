import type { Incident } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { colors } from '@/lib/tokens/colors'
import { ActiveIncidentCard } from '@/components/dashboard/ActiveIncidentCard'

export function ActiveIncidentsPanel({ incidents, onViewIncidents }: { incidents: Incident[]; onViewIncidents: () => void }) {
  const active = incidents.filter(i => i.status === 'active')

  return (
    <div>
      <Label>Active Incidents</Label>
      <div style={{ marginTop: 10 }}>
        {active.length === 0 ? (
          <Card style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.statusVital, fontSize: 13, fontWeight: 500 }}>
              <span style={{ fontSize: 15 }}>✓</span> All systems operational
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {active.map(inc => (
              <ActiveIncidentCard key={inc.id} incident={inc} onViewIncidents={onViewIncidents} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
