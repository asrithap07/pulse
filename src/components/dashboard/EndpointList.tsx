import type { Api } from '@/lib/types'
import { Label } from '@/components/ui/Label'
import { EndpointListItem } from '@/components/dashboard/EndpointListItem'

export function EndpointList({ apis, onSelect }: { apis: Api[]; onSelect: (id: string) => void }) {
  return (
    <div>
      <Label>Monitored Endpoints</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
        {apis.map(api => (
          <EndpointListItem key={api.id} api={api} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
