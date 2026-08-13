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
    <Card style={{ padding: '18px 18px 16px', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: '0 auto auto 0',
          width: '100%',
          height: 2,
          background: valueColor || colors.accentClarity,
          opacity: 0.9,
        }}
      />
      <Label>{label}</Label>
      <div
        style={{
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: '-0.05em',
          color: valueColor || colors.textPrimary,
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.05,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: colors.textSecondary, marginTop: 8, letterSpacing: '-0.01em' }}>{sub}</div>
      )}
    </Card>
  )
}
