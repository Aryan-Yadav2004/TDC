import React, { useState } from 'react';
import { 
  MapPin, Briefcase, GraduationCap, DollarSign, Calendar, Heart, 
  Sparkles, CheckCircle2, MessageSquare, Plus, Trash2, ArrowRight,
  ShieldCheck, Phone, Mail, User, Compass, AlertCircle
} from 'lucide-react';
import { JOURNEY_STAGE_LABELS } from '../utils/constants';

export function CustomerDetail({
  customer,
  onUpdateStage,
  onOpenAddNote,
  onDeleteNote,
  onGoToMatching
}) {
  if (!customer) return null;

  const stages = [
    { key: 'onboarding', label: 'Onboarding' },
    { key: 'verified', label: 'Verified' },
    { key: 'actively_matching', label: 'Actively Matching' },
    { key: 'first_date_arranged', label: '1st Date Arranged' },
    { key: 'deep_talks', label: 'Deep Talks' },
    { key: 'on_hold', label: 'On Hold' },
    { key: 'success_matched', label: 'Success Matched' }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === customer.journey_stage);

  // Height helper in feet/inches
  const heightInInches = Math.round(customer.height_cm / 2.54);
  const feet = Math.floor(heightInInches / 12);
  const inches = heightInInches % 12;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header Hero Card */}
      <div className="tdc-card" style={{ padding: '24px 28px', background: '#ffffff' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {/* Avatar and Primary Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src={customer.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
              alt={customer.first_name}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--tdc-gold)',
                boxShadow: 'var(--shadow-md)'
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '26px', fontFamily: 'var(--font-serif)', color: 'var(--tdc-ink)' }}>
                  {customer.first_name} {customer.last_name}
                </h2>
                <span className={`badge badge-stage-${customer.journey_stage}`}>
                  {JOURNEY_STAGE_LABELS[customer.journey_stage] || customer.journey_stage}
                </span>
                {customer.is_verified ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: 'var(--tdc-success)', background: '#ecfdf5', padding: '2px 8px', borderRadius: 'var(--radius-pill)', border: '1px solid #a7f3d0' }}>
                    <ShieldCheck size={12} /> Verified
                  </span>
                ) : null}
              </div>

              <div style={{ fontSize: '14px', color: 'var(--tdc-ink-muted)', marginBottom: '6px' }}>
                {customer.designation} at <strong style={{ color: 'var(--tdc-ink)' }}>{customer.company}</strong> • ₹{customer.income_lpa} LPA
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12.5px', color: 'var(--tdc-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="var(--tdc-gold)" /> {customer.city}, {customer.country}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={14} /> {customer.email}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={14} /> {customer.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Call to Action: Go to Matchmaking Studio */}
          <div>
            <button
              type="button"
              onClick={onGoToMatching}
              className="btn-gold"
              style={{ padding: '12px 24px', fontSize: '14.5px' }}
            >
              <Sparkles size={16} />
              <span>Open Matchmaking Algo Studio</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* 2. Interactive Journey Stage Tracker */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--tdc-border)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--tdc-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
            Customer Matchmaking Journey Stage:
          </div>
          <div className="journey-stepper">
            {stages.map((st, idx) => {
              const isActive = customer.journey_stage === st.key;
              const isPast = idx < currentStageIndex;

              return (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => onUpdateStage(st.key)}
                  className={`stepper-step ${isActive ? 'active' : isPast ? 'completed' : ''}`}
                >
                  {isPast ? <CheckCircle2 size={13} /> : <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isActive ? '#fef08a' : 'currentColor' }} />}
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Three-Column Comprehensive Biodata Sections */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {/* Card 1: Personal & Astrological Profile */}
        <div className="tdc-card" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--tdc-green-800)' }}>
            <User size={18} color="var(--tdc-gold)" />
            Personal &amp; Matrimonial Biodata
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Gender &amp; Age</span>
              <span style={{ fontWeight: 600 }}>{customer.gender === 'male' ? 'Male' : 'Female'}, {customer.age} yrs</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Date of Birth</span>
              <span style={{ fontWeight: 600 }}>{customer.dob}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Height</span>
              <span style={{ fontWeight: 600 }}>{customer.height_cm} cm ({feet}'{inches}")</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Marital Status</span>
              <span style={{ fontWeight: 600 }}>{customer.marital_status}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Religion &amp; Caste</span>
              <span style={{ fontWeight: 600 }}>{customer.religion}{customer.caste ? ` (${customer.caste})` : ''}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Manglik Status</span>
              <span style={{ fontWeight: 600 }}>{customer.manglik}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Kundali / Horoscope</span>
              <span style={{ fontWeight: 600 }}>{customer.horoscope_match}</span>
            </div>
            <div>
              <span style={{ display: 'block', color: 'var(--tdc-muted)', marginBottom: '6px' }}>Languages Known:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(customer.languages || []).map((l, i) => (
                  <span key={i} style={{ background: 'var(--tdc-cream-soft)', padding: '3px 9px', borderRadius: 'var(--radius-pill)', fontSize: '12px', border: '1px solid var(--tdc-border)' }}>
                    {typeof l === 'string' ? l : l.language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Career, Education & Financials */}
        <div className="tdc-card" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--tdc-green-800)' }}>
            <Briefcase size={18} color="var(--tdc-gold)" />
            Career, Education &amp; Relocation
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Current Company</span>
              <span style={{ fontWeight: 600 }}>{customer.company}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Designation</span>
              <span style={{ fontWeight: 600 }}>{customer.designation}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Annual Income</span>
              <span style={{ fontWeight: 700, color: 'var(--tdc-green-700)' }}>₹{customer.income_lpa} LPA</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>College / University</span>
              <span style={{ fontWeight: 600 }}>{customer.college}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Degree</span>
              <span style={{ fontWeight: 600 }}>{customer.degree}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Current City</span>
              <span style={{ fontWeight: 600 }}>{customer.city}, {customer.country}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Open to Relocate</span>
              <span style={{ fontWeight: 600, color: customer.open_to_relocate === 'Yes' ? 'var(--tdc-success)' : 'inherit' }}>
                {customer.open_to_relocate}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Lifestyle, Family & Future Vision */}
        <div className="tdc-card" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--tdc-green-800)' }}>
            <Heart size={18} color="var(--tdc-gold)" />
            Lifestyle, Family &amp; Habits
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Diet</span>
              <span style={{ fontWeight: 600 }}>{customer.diet}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Drinking / Smoking</span>
              <span style={{ fontWeight: 600 }}>{customer.drinking} / {customer.smoking}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Want Children</span>
              <span style={{ fontWeight: 600, color: customer.want_kids === 'Yes' ? 'var(--tdc-green-700)' : 'inherit' }}>
                {customer.want_kids}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Open to Pets</span>
              <span style={{ fontWeight: 600 }}>{customer.open_to_pets}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Siblings Count</span>
              <span style={{ fontWeight: 600 }}>{customer.siblings_count} siblings</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--tdc-border-subtle)' }}>
              <span style={{ color: 'var(--tdc-muted)' }}>Family Type &amp; Values</span>
              <span style={{ fontWeight: 600 }}>{customer.family_type} ({customer.family_values})</span>
            </div>
            <div>
              <span style={{ display: 'block', color: 'var(--tdc-muted)', marginBottom: '6px' }}>Interests &amp; Passions:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(customer.interests || []).map((int, i) => (
                  <span key={i} style={{ background: 'var(--tdc-gold-pale)', color: '#854d0e', padding: '3px 9px', borderRadius: 'var(--radius-pill)', fontSize: '12px', border: '1px solid var(--tdc-gold-border)' }}>
                    {int}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bio Quote Card */}
      {customer.bio && (
        <div className="tdc-card" style={{ padding: '20px 24px', background: 'var(--tdc-cream-soft)', borderLeft: '4px solid var(--tdc-gold)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--tdc-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
            Client Statement &amp; Intent:
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '15px', color: 'var(--tdc-ink)', lineHeight: 1.6 }}>
            "{customer.bio}"
          </p>
        </div>
      )}

      {/* 5. Matchmaker Call & Meeting Notes Section */}
      <div className="tdc-card" style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--tdc-ink)' }}>
              Matchmaker Call Logs &amp; Meeting Notes
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--tdc-muted)' }}>
              Record meeting debriefs, call takeaways, and behavioral nuances.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenAddNote}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            <Plus size={15} />
            <span>Record Quick Note</span>
          </button>
        </div>

        {/* Timeline of Notes */}
        {(!customer.notes || customer.notes.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '32px 16px', background: 'var(--tdc-cream)', borderRadius: 'var(--radius-md)', color: 'var(--tdc-muted)' }}>
            <MessageSquare size={24} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
            <div style={{ fontSize: '14px', fontWeight: 500 }}>No notes recorded for {customer.first_name} yet.</div>
            <div style={{ fontSize: '12.5px' }}>Click "Record Quick Note" to log onboarding debriefs or phone calls.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {customer.notes.map((note) => (
              <div
                key={note.id}
                style={{
                  background: 'var(--tdc-cream-card)',
                  border: '1px solid var(--tdc-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 18px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)',
                      background: note.note_type === 'meeting' ? '#eff6ff' : (note.note_type === 'feedback' ? '#fdf2f8' : '#f0fdf4'),
                      color: note.note_type === 'meeting' ? '#1d4ed8' : (note.note_type === 'feedback' ? '#be185d' : '#15803d')
                    }}>
                      {note.note_type.replace('_', ' ')}
                    </span>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--tdc-ink)' }}>
                      By {note.matchmaker_name}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--tdc-subtle)' }}>
                      • {note.created_at}
                    </span>
                  </div>

                  {onDeleteNote && (
                    <button
                      type="button"
                      onClick={() => onDeleteNote(note.id)}
                      title="Delete Note"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--tdc-subtle)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--tdc-subtle)'}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <p style={{ fontSize: '13.5px', color: 'var(--tdc-ink-soft)', lineHeight: 1.5 }}>
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
