import { colors } from '@/lib/tokens/colors'

export function DashboardHeader({
  endpointCount,
  onAddApi,
  disabled = false,
}: {
  endpointCount: number
  onAddApi: () => void
  disabled?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 28,
        padding: '12px 4px 6px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: colors.textSecondary,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: colors.statusVital,
              boxShadow: `0 0 0 6px ${colors.statusVitalBg}`,
            }}
          />
          Live operations
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 3vw, 3.2rem)', lineHeight: 1, letterSpacing: '-0.06em', fontWeight: 700 }}>
          Pulse command
        </h1>
        <p style={{ color: colors.textSecondary, fontSize: 14, maxWidth: 540 }}>
          {endpointCount === 0
            ? 'No endpoints added yet — start with a single health check and build the signal.'
            : `Monitoring ${endpointCount} endpoint${endpointCount !== 1 ? 's' : ''} across your delivery surface.`}
        </p>
      </div>

      <button
        onClick={onAddApi}
        disabled={disabled}
        aria-label="Add a new API endpoint"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '12px 18px',
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 700,
          background: disabled ? colors.bgDark : 'linear-gradient(135deg, #dff8ff 0%, #7ae7ff 100%)',
          border: `1px solid ${disabled ? colors.borderSubtle : 'rgba(122, 231, 255, 0.6)'}`,
          color: disabled ? colors.textTertiary : '#071319',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease',
          opacity: disabled ? 0.6 : 1,
          boxShadow: disabled ? 'none' : '0 12px 24px rgba(122, 231, 255, 0.2)',
        }}
        onMouseEnter={e => {
          if (!disabled) {
            ;(e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 18px 28px rgba(122, 231, 255, 0.22)'
          }
        }}
        onMouseLeave={e => {
          if (!disabled) {
            ;(e.target as HTMLButtonElement).style.transform = 'translateY(0)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 12px 24px rgba(122, 231, 255, 0.2)'
          }
        }}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Endpoint
      </button>
    </div>
  )
}