import type { Api, Check } from '@/lib/types'
import { Label } from '@/components/ui/Label'
import { EndpointListItem } from '@/components/dashboard/EndpointListItem'

export function EndpointList({ apis, checks, onSelect }: { apis: Api[]; checks: Check[]; onSelect: (id: string) => void }) {
  return (
    <div>
      <Label>Monitored Endpoints</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
        {apis.map(api => (
          <EndpointListItem key={api.id} api={api} checks={checks.filter(c => c.apiId === api.id)} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}