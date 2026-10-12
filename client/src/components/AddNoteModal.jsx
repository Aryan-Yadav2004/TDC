import React, { useState } from 'react';
import { X, MessageSquare, Phone, Calendar, Sparkles, Check } from 'lucide-react';

export function AddNoteModal({ customer, onClose, onNoteAdded }) {
  const [noteType, setNoteType] = useState('call_summary');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!customer) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      await onNoteAdded(customer.id, {
        noteType,
        content: content.trim()
      });
      onClose();
    } catch (err) {
      alert('Error recording note: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
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
              background: 'var(--tdc-green-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--tdc-green-800)'
            }}>
              <MessageSquare size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--tdc-ink)', fontFamily: 'var(--font-serif)' }}>
                Record Matchmaker Note
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--tdc-muted)' }}>
                Client: {customer.first_name} {customer.last_name}
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--tdc-ink-soft)', marginBottom: '6px' }}>
                Interaction Type:
              </label>
              <select
                value={noteType}
                onChange={(e) => setNoteType(e.target.value)}
                className="tdc-select"
                style={{ width: '100%' }}
              >
                <option value="call_summary">Phone / Zoom Call Summary</option>
                <option value="meeting">In-Person Consultation / Meeting</option>
                <option value="preference_update">Preference / Requirement Update</option>
                <option value="feedback">Client Feedback on Suggested Match</option>
                <option value="internal">Internal Matchmaker Observation</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--tdc-ink-soft)', marginBottom: '6px' }}>
                Note Details &amp; Observations:
              </label>
              <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Log key takeaways, nuances regarding chemistry, family preferences, lifestyle priorities..."
                required
                className="tdc-input"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13.5px',
                  lineHeight: 1.5,
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div style={{
            padding: '16px 22px',
            borderTop: '1px solid var(--tdc-border)',
            background: 'var(--tdc-cream-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px'
          }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
              style={{ fontSize: '13px' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="btn-primary"
              style={{ padding: '9px 20px', fontSize: '13.5px' }}
            >
              <span>{submitting ? 'Saving...' : 'Save Note to Timeline'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
