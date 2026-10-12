import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export function LoginView() {
  const { login } = useAuth();
  const [email, setEmail] = useState('priya@thedatecrew.com');
  const [password, setPassword] = useState('tdc123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('tdc123');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #10261e 0%, #18352b 40%, var(--tdc-cream) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '6px 16px',
          borderRadius: 'var(--radius-pill)',
          color: '#fef08a',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          border: '1px solid rgba(254, 240, 138, 0.25)',
          marginBottom: '16px'
        }}>
          <Sparkles size={14} />
          Internal Matchmaker Concierge
        </div>

        <h1 style={{
          fontSize: '38px',
          fontFamily: 'var(--font-serif)',
          color: '#ffffff',
          fontWeight: 500,
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}>
          The Date Crew
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.75)',
          fontSize: '15px',
          maxWidth: '440px',
          margin: '0 auto'
        }}>
          Curating high-trust introductions for relationship-ready professionals across India.
        </p>
      </div>

      {/* Login Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: '36px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: 'var(--shadow-modal)',
        border: '1px solid var(--tdc-border)'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--tdc-ink)', marginBottom: '4px' }}>
            Matchmaker Portal
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--tdc-muted)' }}>
            Enter your credentials to access client profiles and the matching algorithm.
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            marginBottom: '18px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--tdc-ink-soft)', marginBottom: '6px' }}>
              Work Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="matchmaker@thedatecrew.com"
                required
                className="tdc-input"
                style={{ paddingLeft: '38px' }}
              />
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--tdc-subtle)' }} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--tdc-ink-soft)', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="tdc-input"
                style={{ paddingLeft: '38px' }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--tdc-subtle)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '15px' }}
          >
            {loading ? 'Authenticating...' : (
              <>
                <span>Enter Studio</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast-Login Roster */}
        <div style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px dashed var(--tdc-border)'
        }}>
          <p style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--tdc-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '10px'
          }}>
            Quick Login with Sample Credentials:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Priya Sharma (Senior Matchmaker)', email: 'priya@thedatecrew.com' },
              { name: 'Rohit Verma (Lead Matchmaker)', email: 'rohit@thedatecrew.com' },
              { name: 'Ananya Sen (Relationship Coach)', email: 'ananya@thedatecrew.com' }
            ].map(user => (
              <button
                key={user.email}
                type="button"
                onClick={() => handleQuickLogin(user.email)}
                style={{
                  textAlign: 'left',
                  background: email === user.email ? 'var(--tdc-cream-soft)' : '#ffffff',
                  border: `1px solid ${email === user.email ? 'var(--tdc-gold)' : 'var(--tdc-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--tdc-ink)' }}>{user.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--tdc-muted)' }}>{user.email} • Pass: tdc123</div>
                </div>
                {email === user.email && (
                  <span style={{ fontSize: '11px', color: 'var(--tdc-gold-dark)', fontWeight: 600 }}>Selected</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--tdc-muted)', textAlign: 'center' }}>
        Confidential Internal Tool © 2026 The Date Crew (TDC). All Rights Reserved.
      </div>
    </div>
  );
}
