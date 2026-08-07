import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { colors } from '@/lib/tokens/colors'

export function StatCard({
  label,
  value,
  sub,
  valueColor,
}: {
  label: string
  value: string
  sub?: string
  valueColor?: string
}) {
  return (
    <Card style={{ padding: '20px 24px' }}>
      <Label>{label}</Label>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: valueColor || colors.textPrimary,
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: colors.textSecondary, marginTop: 4 }}>{sub}</div>}
    </Card>
  )
}
