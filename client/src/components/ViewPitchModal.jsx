import React from 'react';
import { X, Mail, CheckCircle2, Copy } from 'lucide-react';

export function ViewPitchModal({ match, customer, onClose }) {
  if (!match) return null;
  const { candidate, assignment } = match;

  const handleCopy = () => {
    const text = `Subject: ${assignment.pitch_subject || ''}\n\n${assignment.pitch_body || ''}`;
    navigator.clipboard.writeText(text);
    alert('Pitch copied to clipboard!');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          padding: '18px 22px',
          borderBottom: '1px solid var(--tdc-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#047857'
            }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--tdc-ink)', fontFamily: 'var(--font-serif)' }}>
                Dispatched Match Pitch Record
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--tdc-muted)' }}>
                Sent to {customer.first_name} {customer.last_name} • {assignment.sent_to_client_at || 'Recently'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-ghost"
            style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--tdc-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Candidate:
            </div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--tdc-ink)' }}>
              {candidate.first_name} {candidate.last_name} ({candidate.designation} at {candidate.company})
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--tdc-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Subject:
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--tdc-green-800)', background: 'var(--tdc-cream-soft)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
              {assignment.pitch_subject || 'Curated Match Introduction'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--tdc-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Dispatched Intro Message:
            </div>
            <div style={{
              fontSize: '13.5px',
              color: 'var(--tdc-ink-soft)',
              whiteSpace: 'pre-wrap',
              background: 'var(--tdc-cream-card)',
              border: '1px solid var(--tdc-border-subtle)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              lineHeight: 1.6,
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {assignment.pitch_body || 'Pitch message logged in database.'}
            </div>
          </div>
        </div>

        <div style={{
          padding: '16px 22px',
          borderTop: '1px solid var(--tdc-border)',
          background: 'var(--tdc-cream-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            type="button"
            onClick={handleCopy}
            className="btn-secondary"
            style={{ fontSize: '13px' }}
          >
            <Copy size={14} />
            <span>Copy Pitch</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="btn-primary"
            style={{ fontSize: '13px', padding: '8px 18px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
