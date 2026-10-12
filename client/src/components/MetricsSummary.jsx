import React from 'react';
import { Users, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

export function MetricsSummary({ stats }) {
  if (!stats) return null;

  const items = [
    {
      label: 'Verified Candidates Pool',
      value: stats.totalClients || 120,
      sub: 'Tier-1 professionals in active network',
      icon: Users,
      color: 'var(--tdc-green-700)'
    },
    {
      label: 'Actively Matching',
      value: stats.activelyMatching || 0,
      sub: 'Receiving curated introductions',
      icon: Sparkles,
      color: 'var(--tdc-gold-dark)'
    },
    {
      label: 'First Dates Arranged',
      value: stats.datesArranged || 0,
      sub: 'Concierge dates scheduled this month',
      icon: Calendar,
      color: 'var(--tdc-purple)'
    },
    {
      label: 'Matches Dispatched',
      value: stats.matchesDispatched || 0,
      sub: 'Curated pitches sent to clients',
      icon: CheckCircle2,
      color: 'var(--tdc-success)'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px',
      marginBottom: '28px'
    }}>
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="tdc-card"
            style={{
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--tdc-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--tdc-ink)', lineHeight: 1.1, marginBottom: '4px' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--tdc-subtle)' }}>
                {item.sub}
              </div>
            </div>

            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--tdc-cream-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: item.color,
              flexShrink: 0
            }}>
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
