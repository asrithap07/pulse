import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'

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
    <Card style={{ padding: '18px 20px' }}>
      <Label>{label}</Label>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: valueColor || '#e2e8f0',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>{sub}</div>}
    </Card>
  )
}
