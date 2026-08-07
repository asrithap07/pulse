import type { Api } from '@/lib/types'
import { StatCard } from '@/components/ui/StatCard'

export function EndpointStats({ api }: { api: Api }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }}>
      <StatCard label="Uptime" value={`${api.uptime}%`} valueColor={api.uptime > 99 ? '#10b981' : '#f59e0b'} />
      <StatCard label="Avg Latency" value={`${api.avgLatency}ms`} />
      <StatCard label="Interval" value={`${api.interval}m`} sub="minutes" />
      <StatCard label="Last Checked" value={api.lastChecked} />
    </div>
  )
}
