import type { Api, Incident } from '@/lib/types'
import { StatCard } from '@/components/ui/StatCard'
import { colors } from '@/lib/tokens/colors'

export function DashboardStats({ apis, incidents }: { apis: Api[]; incidents: Incident[] }) {
  const active = incidents.filter(i => i.status === 'active')
  const avgUptime = apis.length ? (apis.reduce((s, a) => s + a.uptime, 0) / apis.length).toFixed(2) : '—'
  const apisWithLatency = apis.filter(a => a.avgLatency > 0)
  const avgLatency = apisWithLatency.length
    ? Math.round(apisWithLatency.reduce((s, a) => s + a.avgLatency, 0) / apisWithLatency.length)
    : 0

  const latencyColor = avgLatency === 0 ? '#64748b' : avgLatency < 200 ? '#3ddc97' : avgLatency < 500 ? '#f3b15f' : '#ff6b74'

  const metrics = [
    {
      label: 'Avg Uptime',
      value: `${avgUptime}%`,
      sub: avgUptime === '—' ? 'No telemetry yet' : 'Last 30 days',
      valueColor: avgUptime === '—' ? '#64748b' : parseFloat(avgUptime) > 99 ? colors.statusVital : colors.statusWarning,
    },
    {
      label: 'Avg Latency',
      value: `${avgLatency}ms`,
      sub: avgLatency === 0 ? 'Waiting on checks' : 'Across monitored routes',
      valueColor: latencyColor,
    },
    {
      label: 'Active Incidents',
      value: String(active.length),
      sub: active.length > 0 ? 'Needs attention' : 'All clear',
      valueColor: active.length > 0 ? colors.statusAlert : colors.statusVital,
    },
    {
      label: 'Endpoints',
      value: `${apis.filter(a => a.enabled).length}/${apis.length}`,
      sub: apis.length > 0 ? 'Active / Total' : 'No endpoints registered',
      valueColor: apis.length > 0 ? colors.accentClarity : '#64748b',
    },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16, marginBottom: 28 }}>
      {metrics.map(metric => (
        <StatCard key={metric.label} label={metric.label} value={metric.value} sub={metric.sub} valueColor={metric.valueColor} />
      ))}
    </div>
  )
}
