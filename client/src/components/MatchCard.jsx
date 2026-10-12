import React, { useState } from 'react';
import { 
  Sparkles, Send, CheckCircle2, ChevronDown, ChevronUp, MapPin, 
  Briefcase, Heart, User, ShieldCheck, AlertTriangle, ArrowUpRight
} from 'lucide-react';

export function MatchCard({
  match,
  customer,
  onOpenSendMatch,
  onViewPitch
}) {
  const [expanded, setExpanded] = useState(false);
  const { candidate, compatibilityScore, scoreBreakdown, matchTier, strengths, watchouts, assignment } = match;

  const isSent = assignment && assignment.status === 'sent_to_client';

  // Height helper in feet/inches
  const heightInInches = Math.round(candidate.height_cm / 2.54);
  const feet = Math.floor(heightInInches / 12);
  const inches = heightInInches % 12;

  // Score color styling
  const scoreClass = compatibilityScore >= 85 ? 'score-high' : (compatibilityScore >= 72 ? 'score-strong' : 'score-moderate');
  const tierClass = compatibilityScore >= 85 ? 'badge-tier-high' : (compatibilityScore >= 72 ? 'badge-tier-strong' : 'badge-tier-moderate');

  return (
    <div
      className="tdc-card"
      style={{
        padding: '22px 24px',
        borderColor: isSent ? 'var(--tdc-gold)' : (compatibilityScore >= 88 ? 'var(--tdc-gold-border)' : 'var(--tdc-border)'),
        background: isSent ? '#fdfbf7' : '#ffffff',
        boxShadow: compatibilityScore >= 90 ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'all 0.25s ease'
      }}
    >
      {/* Top Header Row */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '16px'
      }}>
        {/* Candidate Photo & Header Bio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={candidate.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={candidate.first_name}
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2.5px solid var(--tdc-gold)'
              }}
            />
            {compatibilityScore >= 90 && (
              <span style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                background: 'var(--tdc-gold)',
                color: '#ffffff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }} title="Top Compatibility Match">
                <Sparkles size={11} />
              </span>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '3px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--tdc-ink)' }}>
                {candidate.first_name} {candidate.last_name}
              </h4>
              <span style={{ fontSize: '13.5px', color: 'var(--tdc-muted)', fontWeight: 500 }}>
                ({candidate.age} yrs, {candidate.height_cm} cm / {feet}'{inches}")
              </span>
              <span className={`badge ${tierClass}`}>
                {matchTier}
              </span>
            </div>

            <div style={{ fontSize: '13.5px', color: 'var(--tdc-ink-muted)', marginBottom: '4px' }}>
              <strong>{candidate.designation}</strong> at {candidate.company} • ₹{candidate.income_lpa} LPA
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12.5px', color: 'var(--tdc-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <MapPin size={13} color="var(--tdc-gold)" /> {candidate.city}
              </span>
              <span>•</span>
              <span>{candidate.college}</span>
              <span>•</span>
              <span>{candidate.marital_status}</span>
              <span>•</span>
              <span>Diet: {candidate.diet}</span>
            </div>
          </div>
        </div>

        {/* Right: Score Ring & Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ textAlign: 'center' }}>
            <div className={`score-circle ${scoreClass}`}>
              {compatibilityScore}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--tdc-muted)', marginTop: '2px', fontWeight: 600 }}>
              FIT SCORE
            </div>
          </div>

          <div>
            {isSent ? (
              <button
                type="button"
                onClick={() => onViewPitch(match)}
                className="btn-secondary"
                style={{
                  background: '#f0fdf4',
                  borderColor: '#bbf7d0',
                  color: '#166534',
                  padding: '9px 18px',
                  fontSize: '13px'
                }}
              >
                <CheckCircle2 size={15} color="#166534" />
                <span>Sent to Client</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onOpenSendMatch(match)}
                className="btn-primary"
                style={{ padding: '9px 20px', fontSize: '13.5px' }}
              >
                <Send size={14} />
                <span>Send Match</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Strengths Highlights */}
      {strengths && strengths.length > 0 && (
        <div style={{
          background: 'var(--tdc-cream-soft)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '14px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {strengths.slice(0, 3).map((str, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '12px',
                color: 'var(--tdc-green-800)',
                background: '#ffffff',
                padding: '3px 10px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--tdc-border-subtle)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CheckCircle2 size={12} color="var(--tdc-green-600)" />
              {str}
            </span>
          ))}
        </div>
      )}

      {/* Accordion Toggle for Deep Score Breakdown & AI Insights */}
      <div style={{ borderTop: '1px solid var(--tdc-border-subtle)', paddingTop: '10px' }}>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="btn-ghost"
          style={{ width: '100%', justifyContent: 'space-between', padding: '6px 8px' }}
        >
          <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--tdc-gold-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} />
            {expanded ? 'Hide Deep Compatibility Breakdown & Insights' : 'Inspect Algorithmic Breakdown & AI Matchmaker Fit'}
          </span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expanded && (
          <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '14px', animation: 'fadeIn 0.2s ease' }}>
            {/* Metric Bars */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              background: 'var(--tdc-cream)',
              padding: '14px',
              borderRadius: 'var(--radius-md)'
            }}>
              {Object.entries(scoreBreakdown || {}).map(([key, val]) => {
                const label = key.replace('Score', '').toUpperCase();
                return (
                  <div key={key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--tdc-muted)', marginBottom: '3px' }}>
                      <span>{label}</span>
                      <span>{val}%</span>
                    </div>
                    <div style={{ height: '5px', background: 'var(--tdc-sand)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${Math.min(100, val)}%`,
                        height: '100%',
                        background: val >= 80 ? 'var(--tdc-green-600)' : (val >= 60 ? 'var(--tdc-gold)' : '#ef4444'),
                        borderRadius: '3px'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Watchouts if any */}
            {watchouts && watchouts.length > 0 && (
              <div style={{ background: '#fffbeb', border: '1px solid #fef08a', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '12.5px', color: '#92400e' }}>
                <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                  <AlertTriangle size={13} /> Nuances to Note:
                </div>
                {watchouts.map((w, idx) => (
                  <div key={idx}>• {w}</div>
                ))}
              </div>
            )}

            {/* Candidate Bio Quote */}
            <div style={{ fontSize: '13px', color: 'var(--tdc-ink-soft)', fontStyle: 'italic', background: '#ffffff', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--tdc-border-subtle)' }}>
              "{candidate.bio}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
