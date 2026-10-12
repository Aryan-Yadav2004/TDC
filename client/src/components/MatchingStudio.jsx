import React, { useState } from 'react';
import { MatchCard } from './MatchCard';
import { 
  Sparkles, ArrowLeft, Filter, SlidersHorizontal, User, 
  MapPin, CheckCircle2, Info, Search 
} from 'lucide-react';

export function MatchingStudio({
  customer,
  matches,
  loading,
  filters,
  onFilterChange,
  onBackToCustomer,
  onOpenSendMatch,
  onViewPitch
}) {
  if (!customer) return null;

  const isMale = customer.gender.toLowerCase() === 'male';

  return (
    <div>
      {/* Top Breadcrumb & Customer Anchor Banner */}
      <div className="tdc-card" style={{ padding: '20px 24px', marginBottom: '20px', background: '#ffffff' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              onClick={onBackToCustomer}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '13px' }}
            >
              <ArrowLeft size={15} />
              <span>Back to Biodata</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={customer.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={customer.first_name}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--tdc-gold)' }}
              />
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--tdc-ink)' }}>
                  Curating Matches for {customer.first_name} {customer.last_name}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--tdc-muted)' }}>
                  {customer.age} yrs • {customer.city} • {customer.designation} at {customer.company} (₹{customer.income_lpa}L)
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--tdc-gold-pale)',
            border: '1px solid var(--tdc-gold-border)',
            borderRadius: 'var(--radius-pill)',
            padding: '6px 14px',
            fontSize: '12px',
            color: 'var(--tdc-gold-dark)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={14} />
            {matches.length} Verified Candidates Evaluated
          </div>
        </div>

        {/* Gender-Specific Matching Logic Explainer Bar */}
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--tdc-cream-soft)',
          borderLeft: '4px solid var(--tdc-green-700)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <Info size={18} color="var(--tdc-green-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '13px', color: 'var(--tdc-ink-soft)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--tdc-green-900)' }}>
              Active Gender-Specific Algo Logic ({isMale ? 'Male Client Profile' : 'Female Client Profile'}):
            </strong>{' '}
            {isMale ? (
              <span>
                Matching with women who are <strong>younger</strong> (dob bracket), <strong>earn within harmonious ratio</strong> (≤ ₹{customer.income_lpa} LPA), <strong>shorter</strong> (&lt; {customer.height_cm} cm), and hold <strong>identical views on children</strong> ('{customer.want_kids}').
              </span>
            ) : (
              <span>
                Optimizing for <strong>professional synergy</strong> ({customer.company} tier &amp; growth), <strong>value alignment</strong> (diet: {customer.diet}, pets: {customer.open_to_pets}), <strong>geographic mobility</strong>, and <strong>balanced peer age/height dynamic</strong>.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filter Toolbar for Match Pool */}
      <div className="tdc-card" style={{ padding: '14px 20px', marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--tdc-ink)' }}>
            <SlidersHorizontal size={15} color="var(--tdc-gold)" />
            <span>Candidate Pool Filters:</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            <select
              value={filters.city || ''}
              onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
              className="tdc-select"
            >
              <option value="">All Locations / Open to Relocate</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="London">London (NRI)</option>
              <option value="Singapore">Singapore (NRI)</option>
              <option value="New York">New York (NRI)</option>
            </select>

            <select
              value={filters.maritalStatus || ''}
              onChange={(e) => onFilterChange({ ...filters, maritalStatus: e.target.value })}
              className="tdc-select"
            >
              <option value="">All Marital Statuses</option>
              <option value="Never Married">Never Married Only</option>
              <option value="Divorced">Divorced</option>
            </select>

            <button
              type="button"
              onClick={() => onFilterChange({ city: '', minAge: '', maxAge: '', maritalStatus: '' })}
              className="btn-ghost"
              style={{ fontSize: '12.5px' }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Ranked Candidate Match Feed */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--tdc-muted)' }}>
          <div style={{ fontSize: '16px', fontWeight: 500 }}>Executing algorithmic scoring on opposite-gender pool...</div>
        </div>
      ) : matches.length === 0 ? (
        <div className="tdc-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--tdc-ink)', marginBottom: '8px' }}>
            No candidates match active filter parameters
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--tdc-muted)' }}>
            Try expanding location or marital status to evaluate more profiles.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {matches.map((match) => (
            <MatchCard
              key={match.candidate.id}
              match={match}
              customer={customer}
              onOpenSendMatch={onOpenSendMatch}
              onViewPitch={onViewPitch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
