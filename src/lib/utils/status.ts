import type { Status } from '@/lib/types'

export function statusColor(status: Status) {
  return status === 'healthy' ? '#10b981' : status === 'degraded' ? '#f59e0b' : '#f43f5e'
}

export function statusBg(status: Status) {
  return status === 'healthy'
    ? 'rgba(16,185,129,0.1)'
    : status === 'degraded'
      ? 'rgba(245,158,11,0.1)'
      : 'rgba(244,63,94,0.1)'
}

export const STATUS_LABELS: Record<Status, string> = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  down: 'Down',
}
