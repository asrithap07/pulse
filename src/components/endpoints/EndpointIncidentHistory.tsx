import type { Incident } from '@/lib/types'
import { Label } from '@/components/ui/Label'
import { IncidentCard } from '@/components/incidents/IncidentCard'

export function EndpointIncidentHistory({ incidents }: { incidents: Incident[] }) {
  if (incidents.length === 0) return null

  return (
    <div>
      <Label>Incident History</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
        {incidents.map(inc => (
          <IncidentCard key={inc.id} incident={inc} defaultOpen={inc.status === 'active'} />
        ))}
      </div>
    </div>
  )
}
