import type { Status } from '@/lib/types'
import { colors } from '@/lib/tokens/colors'

export function statusColor(status: Status) {
  return status === 'healthy' ? colors.statusVital : status === 'degraded' ? colors.statusWarning : colors.statusAlert
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
