import type { Status } from '@/lib/types'
import { statusColor, statusBg, STATUS_LABELS } from '@/lib/utils/status'
import { StatusDot } from '@/components/ui/StatusDot'

export function StatusPill({ status }: { status: Status }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '2px 9px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        color: statusColor(status),
        background: statusBg(status),
      }}
    >
      <StatusDot status={status} size={6} />
      {STATUS_LABELS[status]}
    </span>
  )
}
