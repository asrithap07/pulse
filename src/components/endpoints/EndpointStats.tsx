import type { Api } from '@/lib/types'
import { StatCard } from '@/components/ui/StatCard'
import { colors } from '@/lib/tokens/colors'
import { timeAgo } from '@/lib/utils/format'
import { formatIntervalMinutes } from '@/lib/utils/interval'

export function EndpointStats({ api }: { api: Api }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }}>
      <StatCard
        label="Uptime"
        value={`${api.uptime}%`}
        valueColor={api.uptime > 99 ? colors.statusVital : colors.statusWarning}
      />
      <StatCard
        label="Avg Latency"
        value={`${api.avgLatency}ms`}
        valueColor={api.avgLatency < 200 ? colors.statusVital : api.avgLatency < 1000 ? colors.statusWarning : colors.statusAlert}
      />
      <StatCard label="Interval" value={formatIntervalMinutes(api.interval)} sub="minutes" />
      <StatCard label="Last Checked" value={timeAgo(api.lastChecked)} />
    </div>
  )
}