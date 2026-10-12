import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import confetti from 'canvas-confetti';
import { 
  X, Sparkles, Send, Copy, Check, Mail, RefreshCw, 
  MapPin, Briefcase, GraduationCap, DollarSign, CheckCircle2 
} from 'lucide-react';

export function SendMatchModal({
  customer,
  match,
  onClose,
  onMatchSent
}) {
  if (!match || !customer) return null;

  const { candidate, compatibilityScore, scoreBreakdown } = match;

  const [tone, setTone] = useState('warm_concierge');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [provider, setProvider] = useState('');

  // Automatically fetch initial pitch on open
  useEffect(() => {
    async function loadInitialPitch() {
      // If assignment already has existing pitch, use it
      if (match.assignment && match.assignment.pitch_subject && match.assignment.pitch_body) {
        setSubject(match.assignment.pitch_subject);
        setBody(match.assignment.pitch_body);
        return;
      }

      setLoadingAI(true);
      try {
        const res = await api.matching.generatePitch(customer.id, candidate.id, tone);
        if (res.success && res.data) {
          setSubject(res.data.subject);
          setBody(res.data.body);
          setProvider(res.data.provider || 'AI Engine');
        }
      } catch (err) {
        console.error('Failed to generate pitch:', err);
      } finally {
        setLoadingAI(false);
      }
    }

    loadInitialPitch();
  }, [customer.id, candidate.id, tone]);

  const handleRegenerate = async () => {
    setLoadingAI(true);
    try {
      const res = await api.matching.generatePitch(customer.id, candidate.id, tone);
      if (res.success && res.data) {
        setSubject(res.data.subject);
        setBody(res.data.body);
        setProvider(res.data.provider || 'AI Engine');
      }
    } catch (err) {
      console.error('Failed to regenerate pitch:', err);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleCopy = () => {
    const fullText = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMatch = async () => {
    setSubmitting(true);
    try {
      const res = await api.matching.sendMatch(customer.id, candidate.id, {
        subject,
        body,
        tone,
        compatibilityScore,
        scoreBreakdown
      });

      if (res.success) {
        // Fire confetti celebration
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#c9913e', '#1b3a2f', '#065f4e', '#fef08a']
          });
        } catch {}

        onMatchSent({
          candidateId: candidate.id,
          candidateName: `${candidate.first_name} ${candidate.last_name}`,
          subject,
          body
        });
        onClose();
      }
    } catch (err) {
      alert('Error sending match: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
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
              background: 'var(--tdc-gold-pale)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--tdc-gold-dark)'
            }}>
              <Send size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--tdc-ink)', fontFamily: 'var(--font-serif)' }}>
                Dispatch Curated Match Pitch
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--tdc-muted)' }}>
                Personalized introduction for {customer.first_name} {customer.last_name}
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

        {/* Modal Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Candidate Profile Snapshot Banner */}
          <div style={{
            background: 'var(--tdc-cream-soft)',
            border: '1px solid var(--tdc-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <img
              src={candidate.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
              alt={candidate.first_name}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--tdc-gold)'
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--tdc-ink)' }}>
                  {candidate.first_name} {candidate.last_name}
                </div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--tdc-gold-dark)',
                  background: 'var(--tdc-gold-pale)',
                  padding: '2px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--tdc-gold-border)'
                }}>
                  {compatibilityScore}% Fit
                </div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--tdc-ink-muted)', marginTop: '2px' }}>
                {candidate.designation} at {candidate.company} • ₹{candidate.income_lpa} LPA
              </div>
              <div style={{ fontSize: '12px', color: 'var(--tdc-muted)', marginTop: '3px' }}>
                {candidate.age} yrs • {candidate.city} • {candidate.college} • {candidate.diet}
              </div>
            </div>
          </div>

          {/* AI Intro Pitch Settings Toolbar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--tdc-ink-soft)' }}>
                Intro Tone:
              </span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="tdc-select"
                style={{ fontSize: '12.5px', padding: '6px 10px' }}
              >
                <option value="warm_concierge">Warm Concierge (Signature TDC)</option>
                <option value="modern_direct">Modern Direct &amp; Ambitious</option>
                <option value="family_conscious">Family &amp; Values Conscious</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {provider && (
                <span style={{ fontSize: '11px', color: 'var(--tdc-muted)', background: 'var(--tdc-cream-soft)', padding: '3px 8px', borderRadius: 'var(--radius-pill)' }}>
                  Generated by: {provider}
                </span>
              )}
              <button
                type="button"
                onClick={handleRegenerate}
                disabled={loadingAI}
                className="btn-ghost"
                style={{ fontSize: '12.5px', color: 'var(--tdc-green-800)' }}
              >
                <RefreshCw size={13} className={loadingAI ? 'animate-spin' : ''} />
                <span>{loadingAI ? 'Generating...' : 'Regenerate Intro'}</span>
              </button>
            </div>
          </div>

          {/* Subject Line Input */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--tdc-ink)', marginBottom: '6px' }}>
              Email Subject Line:
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject line..."
              className="tdc-input"
              style={{ fontWeight: 500 }}
            />
          </div>

          {/* Email Body Textarea */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--tdc-ink)', marginBottom: '6px' }}>
              Matchmaker Introduction Pitch (Editable):
            </label>
            <textarea
              rows={9}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Curated email text..."
              className="tdc-input"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13.5px',
                lineHeight: 1.6,
                resize: 'vertical'
              }}
            />
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--tdc-border)',
          background: 'var(--tdc-cream-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <button
            type="button"
            onClick={handleCopy}
            className="btn-secondary"
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            {copied ? <Check size={14} color="var(--tdc-success)" /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Pitch'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
              style={{ fontSize: '13px' }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSendMatch}
              disabled={submitting || !subject.trim() || !body.trim()}
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '14px' }}
            >
              <Send size={15} />
              <span>{submitting ? 'Dispatching...' : 'Send Match to Client'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
