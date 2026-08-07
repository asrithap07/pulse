import { colors } from '@/lib/tokens/colors'

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
          background: colors.bgDark,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: 8,
          padding: '8px 13px',
          color: colors.textPrimary,
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
            background: filter === f.value ? colors.accentClaritySubtle : 'transparent',
            border: `1px solid ${filter === f.value ? colors.accentClarityBorder : colors.borderSubtle}`,
            color: filter === f.value ? colors.accentClarity : colors.textSecondary,
            cursor: 'pointer',
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
