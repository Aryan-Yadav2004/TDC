import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Sparkles, MapPin, Briefcase, ChevronRight, UserCheck, Shield } from 'lucide-react';
import { JOURNEY_STAGE_LABELS } from '../utils/constants';

export function CustomerList({
  clients,
  loading,
  selectedId,
  onSelectCustomer,
  search,
  onSearchChange,
  filterStage,
  onStageChange,
  filterGender,
  onGenderChange,
  assignedOnly,
  onAssignedOnlyChange,
  totalCount
}) {
  const { matchmaker } = useAuth();

  return (
    <div>
      {/* Search & Filter Controls */}
      <div className="tdc-card" style={{ padding: '18px 20px', marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 300px', minWidth: '240px' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by client name, company, designation, city..."
              className="tdc-input"
              style={{ paddingLeft: '38px' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--tdc-subtle)' }} />
          </div>

          {/* Quick Filter Selectors */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            {/* Assigned To Me Toggle */}
            <div style={{
              display: 'inline-flex',
              background: 'var(--tdc-cream-soft)',
              padding: '3px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--tdc-border)'
            }}>
              <button
                type="button"
                onClick={() => onAssignedOnlyChange(true)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: assignedOnly ? 'var(--tdc-green-800)' : 'transparent',
                  color: assignedOnly ? '#ffffff' : 'var(--tdc-muted)',
                  transition: 'all 0.15s ease'
                }}
              >
                Assigned to Me
              </button>
              <button
                type="button"
                onClick={() => onAssignedOnlyChange(false)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: !assignedOnly ? 'var(--tdc-green-800)' : 'transparent',
                  color: !assignedOnly ? '#ffffff' : 'var(--tdc-muted)',
                  transition: 'all 0.15s ease'
                }}
              >
                All Network ({totalCount})
              </button>
            </div>

            {/* Stage Selector */}
            <select
              value={filterStage}
              onChange={(e) => onStageChange(e.target.value)}
              className="tdc-select"
            >
              <option value="">All Journey Stages</option>
              <option value="actively_matching">Actively Matching</option>
              <option value="verified">Profile Verified</option>
              <option value="first_date_arranged">First Date Arranged</option>
              <option value="deep_talks">Deep Talks</option>
              <option value="onboarding">Onboarding</option>
              <option value="on_hold">On Hold</option>
              <option value="success_matched">Matched &amp; Off-Market</option>
            </select>

            {/* Gender Filter */}
            <select
              value={filterGender}
              onChange={(e) => onGenderChange(e.target.value)}
              className="tdc-select"
            >
              <option value="">All Genders</option>
              <option value="male">Male Clients</option>
              <option value="female">Female Clients</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Cards List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--tdc-muted)' }}>
          <div style={{ fontSize: '16px', fontWeight: 500 }}>Loading verified customer profiles...</div>
        </div>
      ) : clients.length === 0 ? (
        <div className="tdc-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--tdc-ink)', marginBottom: '8px' }}>
            No profiles found matching criteria
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--tdc-muted)' }}>
            Try adjusting your search query, clearing the filters, or switching to "All Network".
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {clients.map((client) => {
            const isSelected = selectedId === client.id;
            const stageLabel = JOURNEY_STAGE_LABELS[client.journey_stage] || client.journey_stage;

            return (
              <div
                key={client.id}
                onClick={() => onSelectCustomer(client)}
                className="tdc-card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--tdc-gold)' : 'var(--tdc-border)',
                  background: isSelected ? 'var(--tdc-gold-pale)' : '#ffffff',
                  transform: isSelected ? 'translateX(4px)' : 'none'
                }}
              >
                {/* Left: Avatar & Personal Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px' }}>
                  <img
                    src={client.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={client.first_name}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--tdc-border)',
                      flexShrink: 0
                    }}
                  />

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--tdc-ink)' }}>
                        {client.first_name} {client.last_name}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--tdc-muted)', fontWeight: 500 }}>
                        ({client.age} yrs, {client.gender === 'male' ? 'M' : 'F'})
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: 'var(--tdc-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <MapPin size={13} color="var(--tdc-gold)" />
                        {client.city}
                      </span>
                      <span>•</span>
                      <span>{client.marital_status}</span>
                      <span>•</span>
                      <span>{client.height_cm} cm</span>
                    </div>
                  </div>
                </div>

                {/* Middle: Professional Career Info */}
                <div style={{ minWidth: '220px', display: 'none', md: 'block' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--tdc-ink)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Briefcase size={14} color="var(--tdc-green-700)" />
                    {client.designation}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--tdc-muted)' }}>
                    {client.company} • ₹{client.income_lpa} LPA
                  </div>
                </div>

                {/* Status Tag Badge */}
                <div>
                  <span className={`badge badge-stage-${client.journey_stage}`}>
                    {stageLabel}
                  </span>
                </div>

                {/* Right: Open Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{
                      padding: '7px 16px',
                      fontSize: '12.5px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCustomer(client);
                    }}
                  >
                    <span>Match Studio</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
