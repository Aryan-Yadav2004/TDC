import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Sparkles, LogOut, HeartHandshake, ShieldCheck } from 'lucide-react';

export function Navbar({ activeTab, onTabChange, selectedCustomer, onClearCustomer }) {
  const { matchmaker, logout } = useAuth();

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid var(--tdc-border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div 
            onClick={() => onClearCustomer && onClearCustomer()}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            {/* TDC Monogram Emblem */}
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, var(--tdc-green-700), var(--tdc-green-900))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'inset 0 1px 2px var(--tdc-green-light), 0 2px 6px rgba(27,58,47,0.2)',
              border: '1px solid var(--tdc-gold-border)'
            }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, color: '#fef08a' }}>
                TDC
              </span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: 'var(--tdc-ink)',
                  letterSpacing: '-0.02em'
                }}>
                  The Date Crew
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: 'var(--tdc-gold-pale)',
                  color: 'var(--tdc-gold-dark)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--tdc-gold-border)'
                }}>
                  Matchmaker Studio
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--tdc-muted)' }}>
                Concierge Matchmaking &amp; Algorithm Engine
              </p>
            </div>
          </div>
        </div>

        {/* Center Navigation Links / Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => {
              if (onClearCustomer) onClearCustomer();
              if (onTabChange) onTabChange('clients');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: activeTab === 'clients' && !selectedCustomer ? 'var(--tdc-green-800)' : 'transparent',
              color: activeTab === 'clients' && !selectedCustomer ? '#ffffff' : 'var(--tdc-ink-soft)',
              fontWeight: 500,
              fontSize: '13.5px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Users size={16} />
            <span>Customer Roster</span>
          </button>

          {selectedCustomer && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--tdc-sand-dark)' }}>/</span>
              <button
                onClick={() => onTabChange && onTabChange('detail')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: activeTab === 'detail' ? 'var(--tdc-green-800)' : 'transparent',
                  color: activeTab === 'detail' ? '#ffffff' : 'var(--tdc-ink-soft)',
                  fontWeight: 500,
                  fontSize: '13.5px',
                  cursor: 'pointer'
                }}
              >
                <HeartHandshake size={16} />
                <span>{selectedCustomer.first_name}'s Profile &amp; Matches</span>
              </button>
            </div>
          )}
        </nav>

        {/* Right Matchmaker Profile & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {matchmaker && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              padding: '4px 12px 4px 6px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--tdc-cream-soft)',
              border: '1px solid var(--tdc-border)'
            }}>
              <img
                src={matchmaker.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'}
                alt={matchmaker.name}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid var(--tdc-gold)'
                }}
              />
              <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--tdc-ink)' }}>
                  {matchmaker.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--tdc-muted)' }}>
                  {matchmaker.role.replace('_', ' ')}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            title="Sign Out"
            style={{
              background: 'transparent',
              border: '1px solid var(--tdc-border)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--tdc-muted)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#b91c1c';
              e.currentTarget.style.borderColor = '#fca5a5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--tdc-muted)';
              e.currentTarget.style.borderColor = 'var(--tdc-border)';
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
