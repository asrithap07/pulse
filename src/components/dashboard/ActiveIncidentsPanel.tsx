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
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: colors.statusVital,
                  boxShadow: `0 0 0 6px ${colors.statusVitalBg}`,
                  display: 'inline-block',
                }}
              />
              <div>
                <div style={{ color: colors.statusVital, fontSize: 13, fontWeight: 700 }}>All systems operational</div>
                <div style={{ color: colors.textSecondary, fontSize: 12, marginTop: 2 }}>No active alerts across your surface.</div>
              </div>
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
