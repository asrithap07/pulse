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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em' }}>Dashboard</h1>
        <p style={{ color: '#475569', fontSize: 13, marginTop: 2 }}>
          {endpointCount === 0 ? 'No endpoints added yet' : `Monitoring ${endpointCount} endpoint${endpointCount !== 1 ? 's' : ''}`}
        </p>
      </div>
      <button
        onClick={onAddApi}
        disabled={disabled}
        aria-label="Add a new API endpoint"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 20px',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          background: disabled ? '#0d1220' : '#22d3ee',
          border: `1px solid ${disabled ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
          color: disabled ? '#475569' : '#080c14',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.15s',
          opacity: disabled ? 0.6 : 1,
        }}
        onMouseEnter={e => {
          if (!disabled) (e.target as HTMLButtonElement).style.opacity = '0.9'
        }}
        onMouseLeave={e => {
          if (!disabled) (e.target as HTMLButtonElement).style.opacity = '1'
        }}
      >
        <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add Endpoint
      </button>
    </div>
  )
}
