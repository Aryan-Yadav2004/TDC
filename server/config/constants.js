export const JOURNEY_STAGES = {
  ONBOARDING: 'onboarding',
  VERIFIED: 'verified',
  ACTIVELY_MATCHING: 'actively_matching',
  FIRST_DATE_ARRANGED: 'first_date_arranged',
  DEEP_TALKS: 'deep_talks',
  ON_HOLD: 'on_hold',
  SUCCESS_MATCHED: 'success_matched'
};

export const JOURNEY_STAGE_LABELS = {
  [JOURNEY_STAGES.ONBOARDING]: 'Onboarding',
  [JOURNEY_STAGES.VERIFIED]: 'Profile Verified',
  [JOURNEY_STAGES.ACTIVELY_MATCHING]: 'Actively Matching',
  [JOURNEY_STAGES.FIRST_DATE_ARRANGED]: 'First Date Arranged',
  [JOURNEY_STAGES.DEEP_TALKS]: 'Deep Talks',
  [JOURNEY_STAGES.ON_HOLD]: 'On Hold',
  [JOURNEY_STAGES.SUCCESS_MATCHED]: 'Matched & Off-Market'
};

export const MATCH_STATUSES = {
  SUGGESTED: 'suggested',
  PITCH_GENERATED: 'pitch_generated',
  SENT_TO_CLIENT: 'sent_to_client',
  CLIENT_APPROVED: 'client_approved',
  CLIENT_PASSED: 'client_passed',
  DATE_SCHEDULED: 'date_scheduled'
};

export const NOTE_TYPES = {
  CALL_SUMMARY: 'call_summary',
  MEETING: 'meeting',
  PREFERENCE_UPDATE: 'preference_update',
  FEEDBACK: 'feedback',
  INTERNAL: 'internal'
};

export const MATCHING_WEIGHTS = {
  MALE_SEEKING_FEMALE: {
    AGE: 0.20,         // Candidate younger
    INCOME: 0.20,      // Candidate earns less or sensible ratio
    HEIGHT: 0.15,      // Candidate shorter
    KIDS_OUTLOOK: 0.20,// Aligned view on children
    RELOCATION: 0.15,  // Open to relocate or same city
    LIFESTYLE: 0.10    // Diet, smoking, drinking, pets synergy
  },
  FEMALE_SEEKING_MALE: {
    CAREER_SYNERGY: 0.25, // Profession, education pedigree, ambitious growth
    VALUES_LIFESTYLE: 0.20,// Diet, pets, smoking, drinking, manglik alignment
    RELOCATION: 0.20,     // Relocation compatibility, geographic mobility
    KIDS_FAMILY: 0.20,    // Children view & family orientation
    AGE_HEIGHT_FIT: 0.15  // Mature age bracket, taller height preference
  }
};
