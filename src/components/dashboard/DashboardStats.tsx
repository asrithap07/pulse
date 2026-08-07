import type { Api, Incident } from '@/lib/types'
import { StatCard } from '@/components/ui/StatCard'

export function DashboardStats({ apis, incidents }: { apis: Api[]; incidents: Incident[] }) {
  const active = incidents.filter(i => i.status === 'active')
  const avgUptime = apis.length ? (apis.reduce((s, a) => s + a.uptime, 0) / apis.length).toFixed(2) : '—'
  const apisWithLatency = apis.filter(a => a.avgLatency > 0)
  const avgLatency = apisWithLatency.length
    ? Math.round(apisWithLatency.reduce((s, a) => s + a.avgLatency, 0) / apisWithLatency.length)
    : 0

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
      <StatCard
        label="Avg Uptime"
        value={`${avgUptime}%`}
        sub="Last 30 days"
        valueColor={parseFloat(avgUptime) > 99 ? '#10b981' : '#f59e0b'}
      />
      <StatCard label="Avg Latency" value={`${avgLatency}ms`} sub="All endpoints" />
      <StatCard
        label="Active Incidents"
        value={String(active.length)}
        sub={active.length > 0 ? 'Needs attention' : 'All clear'}
        valueColor={active.length > 0 ? '#f43f5e' : '#10b981'}
      />
      <StatCard label="Endpoints" value={`${apis.filter(a => a.enabled).length}/${apis.length}`} sub="Active / Total" />
    </div>
  )
}
