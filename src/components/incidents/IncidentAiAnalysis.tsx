import type { AiAnalysis } from '@/lib/types'

export function IncidentAiAnalysis({ ai }: { ai: AiAnalysis }) {
  return (
    <div style={{ padding: '0 22px 26px' }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 12px',
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

        {/* Likely cause — the headline, not buried in a panel */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            marginBottom: 28,
            paddingLeft: 16,
            borderLeft: '3px solid #a78bfa',
          }}
        >
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>
              Likely cause
            </div>
            <p style={{ fontSize: 16, color: '#f1f5f9', lineHeight: 1.55, fontWeight: 600, margin: 0 }}>{ai.likelyCause}</p>
          </div>
        </div>

        {/* Evidence + Next steps — side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Evidence — bulleted list */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 14 }}>
              Evidence
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {ai.evidence.map((e, i) => (
                <li key={i} style={{ fontSize: 13, color: '#94a3b8', display: 'flex', gap: 10, lineHeight: 1.6 }}>
                  <span style={{ color: '#22d3ee', flexShrink: 0 }}>·</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested actions — checklist, one line each */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 14 }}>
              Next steps
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ai.actions.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 4,
                      border: '1.5px solid #334155',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <span style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}