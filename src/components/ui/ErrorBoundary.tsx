'use client'

import React from 'react'
import { Card } from './Card'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('Dashboard error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card
          style={{
            padding: 20,
            background: 'rgba(244, 63, 94, 0.08)',
            border: '1px solid rgba(244, 63, 94, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <span style={{ fontWeight: 600, color: '#f43f5e' }}>Something went wrong</span>
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>
            We encountered an error loading your dashboard. Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              background: '#f43f5e',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Refresh Page
          </button>
        </Card>
      )
    }

    return this.props.children
  }
}
