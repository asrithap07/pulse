import type { Status } from '@/lib/types'
import { statusColor } from '@/lib/utils/status'

export function StatusDot({ status, size = 7 }: { status: Status; size?: number }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: statusColor(status),
        boxShadow: `0 0 5px ${statusColor(status)}99`,
        flexShrink: 0,
      }}
    />
  )
}
