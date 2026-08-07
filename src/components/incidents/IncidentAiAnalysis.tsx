import type { AiAnalysis } from '@/lib/types'
import { Label } from '@/components/ui/Label'
import { colors } from '@/lib/tokens/colors'

export function IncidentAiAnalysis({ ai }: { ai: AiAnalysis }) {
  return (
    <div style={{ padding: '0 20px 20px' }}>
      <div style={{ borderTop: `1px solid ${colors.borderFaint}`, paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '3px 10px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${colors.accentClaritySubtle}, ${colors.accentInsightSubtle})`,
              border: `1px solid ${colors.accentInsightBorder}`,
              color: colors.accentInsight,
              letterSpacing: '0.04em',
            }}
          >
            ✦ AI Analysis
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: ai.confidence > 80 ? colors.statusVital : colors.statusWarning,
              fontWeight: 600,
            }}
          >
            {ai.confidence}%
          </span>
          <span style={{ fontSize: 12, color: colors.textSecondary }}>confidence</span>
        </div>

        <p style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.65, marginBottom: 16 }}>{ai.summary}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div style={{ background: colors.bgDarkest, borderRadius: 8, padding: '13px 14px' }}>
            <Label>Likely Cause</Label>
            <p style={{ fontSize: 13, color: colors.textPrimary, lineHeight: 1.6, margin: 0 }}>{ai.likelyCause}</p>
          </div>
          <div style={{ background: colors.bgDarkest, borderRadius: 8, padding: '13px 14px' }}>
            <Label>Evidence</Label>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {ai.evidence.map((e, i) => (
                <li key={i} style={{ fontSize: 12, color: colors.textSecondary, display: 'flex', gap: 7, lineHeight: 1.5 }}>
                  <span style={{ color: colors.accentClarity, flexShrink: 0 }}>·</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ background: colors.bgDarkest, borderRadius: 8, padding: '13px 14px' }}>
          <Label>Suggested Actions</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {ai.actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    fontWeight: 700,
                    color: colors.bgDarkest,
                    background: colors.accentClarity,
                    borderRadius: 4,
                    padding: '1px 5px',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.55 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
