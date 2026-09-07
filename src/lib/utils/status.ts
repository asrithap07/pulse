import type { Status } from '@/lib/types'
import { colors } from '@/lib/tokens/colors'

export function statusColor(status: Status) {
  return status === 'healthy' ? colors.statusVital : status === 'degraded' ? colors.statusWarning : colors.statusAlert
}

/** Latency-only color — same thresholds as the Avg Latency stat card (EndpointStats). */
export function latencyColor(avgLatency: number): string {
  return avgLatency < 200 ? colors.statusVital : avgLatency < 1000 ? colors.statusWarning : colors.statusAlert
}

/** Combined latency + uptime (status) signal — worst of the two wins, so a slow
 *  but otherwise-healthy endpoint still surfaces amber/red. */
export function statusLatencyColor(api: { status: Status; avgLatency: number }): string {
  const color = latencyColor(api.avgLatency)
  // Availability (uptime) is the anchor and escalates if worse than latency.

  if (api.status === 'down') return colors.statusAlert
  if (api.status === 'degraded' && color === colors.statusVital) return colors.statusWarning
  return color
}

export function statusBg(status: Status) {
  return status === 'healthy'
    ? colors.statusVitalBg
    : status === 'degraded'
      ? colors.statusWarningBg
      : colors.statusAlertBg
}

export const STATUS_LABELS: Record<Status, string> = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  down: 'Down',
}
