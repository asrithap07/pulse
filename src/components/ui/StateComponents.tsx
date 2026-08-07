import { Card } from './Card'

interface ErrorStateProps {
  title: string
  message: string
  onRetry?: () => void
}

export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <Card
      style={{
        padding: 20,
        background: 'rgba(244, 63, 94, 0.08)',
        border: '1px solid rgba(244, 63, 94, 0.2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 18 }}>⚠️</span>
        <span style={{ fontWeight: 600, color: '#f43f5e', fontSize: 14 }}>{title}</span>
      </div>
      <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 14 }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '8px 14px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            background: '#f43f5e',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => ((e.target as HTMLButtonElement).style.opacity = '0.9')}
          onMouseLeave={e => ((e.target as HTMLButtonElement).style.opacity = '1')}
        >
          Try Again
        </button>
      )}
    </Card>
  )
}

interface EmptyStateProps {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
  icon?: string
}

export function EmptyState({ title, message, actionLabel, onAction, icon = '📭' }: EmptyStateProps) {
  return (
    <Card
      style={{
        padding: 40,
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(34, 211, 238, 0.05) 100%)',
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16, maxWidth: 300, margin: '0 auto 16px' }}>
        {message}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            padding: '9px 18px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            background: '#22d3ee',
            border: 'none',
            color: '#080c14',
            cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => ((e.target as HTMLButtonElement).style.opacity = '0.9')}
          onMouseLeave={e => ((e.target as HTMLButtonElement).style.opacity = '1')}
        >
          {actionLabel}
        </button>
      )}
    </Card>
  )
}
