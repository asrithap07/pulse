import { Card } from './Card'

export function SkeletonStatCard() {
  return (
    <Card style={{ padding: 18 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            height: 12,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 4,
            width: '60%',
          }}
        />
        <div
          style={{
            height: 28,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 4,
            width: '80%',
          }}
        />
      </div>
    </Card>
  )
}

export function SkeletonEndpointCard() {
  return (
    <Card style={{ padding: '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: 16,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 4,
              marginBottom: 8,
              width: '70%',
            }}
          />
          <div
            style={{
              height: 12,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 4,
              width: '100%',
            }}
          />
        </div>
        <div
          style={{
            width: 80,
            height: 40,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 4,
            flexShrink: 0,
          }}
        />
      </div>
      <div
        style={{
          height: 32,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 4,
        }}
      />
    </Card>
  )
}

export function SkeletonIncidentCard() {
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <div
          style={{
            width: 8,
            height: 8,
            background: 'rgba(244,63,94,0.3)',
            borderRadius: '50%',
            flexShrink: 0,
          }}
        />
        <div
          style={{
            flex: 1,
            height: 16,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 4,
            width: '50%',
          }}
        />
      </div>
      <div
        style={{
          height: 12,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 4,
          marginBottom: 12,
          width: '100%',
        }}
      />
      <div
        style={{
          height: 8,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 4,
          width: '80%',
        }}
      />
    </Card>
  )
}
