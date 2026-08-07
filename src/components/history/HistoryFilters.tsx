const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'failed', label: 'Failed' },
] as const

export type HistoryFilter = (typeof FILTERS)[number]['value']

export function HistoryFilters({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: {
  search: string
  onSearchChange: (value: string) => void
  filter: HistoryFilter
  onFilterChange: (value: HistoryFilter) => void
}) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="Filter by endpoint…"
        style={{
          background: '#0d1220',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 8,
          padding: '8px 13px',
          color: '#e2e8f0',
          fontSize: 13,
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          width: 200,
        }}
      />
      {FILTERS.map(f => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            background: filter === f.value ? 'rgba(34,211,238,0.1)' : 'transparent',
            border: `1px solid ${filter === f.value ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.09)'}`,
            color: filter === f.value ? '#22d3ee' : '#475569',
            cursor: 'pointer',
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
