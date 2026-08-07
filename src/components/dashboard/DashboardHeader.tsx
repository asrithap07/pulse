export function DashboardHeader({ endpointCount, onAddApi }: { endpointCount: number; onAddApi: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em' }}>Dashboard</h1>
        <p style={{ color: '#475569', fontSize: 13, marginTop: 2 }}>Monitoring {endpointCount} endpoints</p>
      </div>
      <button
        onClick={onAddApi}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '9px 18px',
          borderRadius: 9,
          fontSize: 13,
          fontWeight: 600,
          background: '#22d3ee',
          border: 'none',
          color: '#080c14',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add Endpoint
      </button>
    </div>
  )
}
