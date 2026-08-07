import type { AiAnalysis } from '@/lib/types'
import { Label } from '@/components/ui/Label'

export function IncidentAiAnalysis({ ai }: { ai: AiAnalysis }) {
  return (
    <div style={{ padding: '0 20px 20px' }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
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
              background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(139,92,246,0.1))',
              border: '1px solid rgba(139,92,246,0.2)',
              color: '#a78bfa',
              letterSpacing: '0.04em',
            }}
          >
            ✦ AI Analysis
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: ai.confidence > 80 ? '#10b981' : '#f59e0b', fontWeight: 600 }}>
            {ai.confidence}%
          </span>
          <span style={{ fontSize: 12, color: '#475569' }}>confidence</span>
        </div>

        <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.65, marginBottom: 16 }}>{ai.summary}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div style={{ background: '#080c14', borderRadius: 8, padding: '13px 14px' }}>
            <Label>Likely Cause</Label>
            <p style={{ fontSize: 13, color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>{ai.likelyCause}</p>
          </div>
          <div style={{ background: '#080c14', borderRadius: 8, padding: '13px 14px' }}>
            <Label>Evidence</Label>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {ai.evidence.map((e, i) => (
                <li key={i} style={{ fontSize: 12, color: '#94a3b8', display: 'flex', gap: 7, lineHeight: 1.5 }}>
                  <span style={{ color: '#22d3ee', flexShrink: 0 }}>·</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ background: '#080c14', borderRadius: 8, padding: '13px 14px' }}>
          <Label>Suggested Actions</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {ai.actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#080c14',
                    background: '#22d3ee',
                    borderRadius: 4,
                    padding: '1px 5px',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.55 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
