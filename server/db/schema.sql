-- ============================================================================
-- The Date Crew (TDC) Matchmaker Database Schema
-- Strict DBMS Compliance: 3NF Relational Normalization, Foreign Key Cascades,
-- Domain Constraints, Check Constraints, and Optimal Covering Indexes.
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Matchmakers Table (Internal Operators & Dating Experts)
CREATE TABLE IF NOT EXISTS matchmakers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'senior_matchmaker' CHECK (role IN ('lead_matchmaker', 'senior_matchmaker', 'relationship_coach', 'admin')),
    avatar_url TEXT,
    bio TEXT,
    active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Clients Table (Verified Customers & Candidate Pool)
CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    matchmaker_id TEXT REFERENCES matchmakers(id) ON DELETE SET NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    dob TEXT NOT NULL, -- Format: YYYY-MM-DD
    country TEXT NOT NULL DEFAULT 'India',
    city TEXT NOT NULL,
    height_cm INTEGER NOT NULL CHECK (height_cm >= 130 AND height_cm <= 230),
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    phone TEXT NOT NULL,
    college TEXT NOT NULL,
    degree TEXT NOT NULL,
    income_lpa REAL NOT NULL CHECK (income_lpa >= 0),
    company TEXT NOT NULL,
    designation TEXT NOT NULL,
    marital_status TEXT NOT NULL CHECK (marital_status IN ('Never Married', 'Divorced', 'Awaiting Divorce', 'Annulled', 'Widowed')),
    religion TEXT NOT NULL,
    caste TEXT,
    manglik TEXT NOT NULL DEFAULT 'No' CHECK (manglik IN ('Yes', 'No', 'Partial / Anshik', 'Anshik / Partial', 'Doesn''t Matter')),
    diet TEXT NOT NULL CHECK (diet IN ('Vegetarian', 'Eggetarian', 'Non-Vegetarian', 'Jain', 'Vegan')),
    drinking TEXT NOT NULL CHECK (drinking IN ('Never', 'Socially', 'Regularly')),
    smoking TEXT NOT NULL CHECK (smoking IN ('Never', 'Occasionally', 'Regularly')),
    want_kids TEXT NOT NULL CHECK (want_kids IN ('Yes', 'No', 'Maybe')),
    open_to_relocate TEXT NOT NULL CHECK (open_to_relocate IN ('Yes', 'No', 'Maybe')),
    open_to_pets TEXT NOT NULL CHECK (open_to_pets IN ('Yes', 'No', 'Maybe')),
    siblings_count INTEGER NOT NULL DEFAULT 0 CHECK (siblings_count >= 0),
    family_type TEXT NOT NULL DEFAULT 'Nuclear' CHECK (family_type IN ('Nuclear', 'Joint')),
    family_values TEXT NOT NULL DEFAULT 'Moderate' CHECK (family_values IN ('Traditional', 'Moderate', 'Liberal')),
    horoscope_match TEXT NOT NULL DEFAULT 'Not Necessary' CHECK (horoscope_match IN ('Must Have', 'Preferred', 'Not Necessary')),
    bio TEXT,
    profile_photo TEXT,
    journey_stage TEXT NOT NULL DEFAULT 'actively_matching' CHECK (journey_stage IN (
        'onboarding',
        'verified',
        'actively_matching',
        'first_date_arranged',
        'deep_talks',
        'on_hold',
        'success_matched'
    )),
    is_verified INTEGER NOT NULL DEFAULT 1 CHECK (is_verified IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Normalized Languages Table (1NF Decomposition)
CREATE TABLE IF NOT EXISTS client_languages (
    client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    proficiency TEXT NOT NULL DEFAULT 'Fluent' CHECK (proficiency IN ('Native', 'Fluent', 'Conversational', 'Basic')),
    PRIMARY KEY (client_id, language)
);

-- 4. Normalized Hobbies & Interests Table
CREATE TABLE IF NOT EXISTS client_interests (
    client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    interest TEXT NOT NULL,
    PRIMARY KEY (client_id, interest)
);

-- 5. Matchmaker Notes Table (Call summaries, meeting logs, behavioral notes)
CREATE TABLE IF NOT EXISTS client_notes (
    id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    matchmaker_id TEXT NOT NULL REFERENCES matchmakers(id) ON DELETE RESTRICT,
    note_type TEXT NOT NULL DEFAULT 'call_summary' CHECK (note_type IN (
        'call_summary',
        'meeting',
        'preference_update',
        'feedback',
        'internal'
    )),
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 6. Match Assignments Table (Suggested, Curated & Dispatched Matches)
CREATE TABLE IF NOT EXISTS match_assignments (
    id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    candidate_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    matchmaker_id TEXT NOT NULL REFERENCES matchmakers(id) ON DELETE RESTRICT,
    compatibility_score INTEGER NOT NULL CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
    score_breakdown TEXT NOT NULL, -- Stored as valid JSON string {age, career, height, kids, relocate, lifestyle}
    ai_summary TEXT,
    ai_strengths TEXT, -- Stored as JSON string array
    ai_watchouts TEXT, -- Stored as JSON string array
    status TEXT NOT NULL DEFAULT 'suggested' CHECK (status IN (
        'suggested',
        'pitch_generated',
        'sent_to_client',
        'client_approved',
        'client_passed',
        'date_scheduled'
    )),
    sent_to_client_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (client_id, candidate_id)
);

-- 7. Curated Matchmaker Pitch Emails (Discreet concierge introductions)
CREATE TABLE IF NOT EXISTS match_pitches (
    id TEXT PRIMARY KEY,
    assignment_id TEXT NOT NULL REFERENCES match_assignments(id) ON DELETE CASCADE,
    client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    candidate_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    tone TEXT NOT NULL DEFAULT 'warm_concierge',
    ai_generated INTEGER NOT NULL DEFAULT 1 CHECK (ai_generated IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================================
-- PERFORMANCE INDEXES (Prime Query Optimization)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_clients_gender_verified ON clients(gender, is_verified);
CREATE INDEX IF NOT EXISTS idx_clients_matchmaker ON clients(matchmaker_id);
CREATE INDEX IF NOT EXISTS idx_clients_journey_stage ON clients(journey_stage);
CREATE INDEX IF NOT EXISTS idx_clients_city ON clients(city);
CREATE INDEX IF NOT EXISTS idx_clients_dob ON clients(dob);
CREATE INDEX IF NOT EXISTS idx_clients_income ON clients(income_lpa);
CREATE INDEX IF NOT EXISTS idx_clients_height ON clients(height_cm);
CREATE INDEX IF NOT EXISTS idx_client_notes_client_date ON client_notes(client_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_match_assign_client ON match_assignments(client_id, status);
CREATE INDEX IF NOT EXISTS idx_match_assign_candidate ON match_assignments(candidate_id);
CREATE INDEX IF NOT EXISTS idx_match_pitches_assignment ON match_pitches(assignment_id);
