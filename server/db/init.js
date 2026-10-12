import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDb } from './connection.js';
import { MATCHMAKERS_SEED } from './seeds/matchmakers.seed.js';
import { generateProfilesSeed } from './seeds/profiles.seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function initializeDatabase({ force = false } = {}) {
  const db = getDb();

  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Execute Schema in a transaction
  db.transaction(() => {
    if (force) {
      db.prepare(`DROP TABLE IF EXISTS match_pitches`).run();
      db.prepare(`DROP TABLE IF EXISTS match_assignments`).run();
      db.prepare(`DROP TABLE IF EXISTS client_notes`).run();
      db.prepare(`DROP TABLE IF EXISTS client_interests`).run();
      db.prepare(`DROP TABLE IF EXISTS client_languages`).run();
      db.prepare(`DROP TABLE IF EXISTS clients`).run();
      db.prepare(`DROP TABLE IF EXISTS matchmakers`).run();
    }
    db.exec(schemaSql);
  })();

  // Check if matchmakers exist
  const mmCount = db.prepare('SELECT COUNT(*) as count FROM matchmakers').get().count;
  if (mmCount === 0) {
    seedDatabase(db);
  }

  return db;
}

export function seedDatabase(db) {
  console.log('Seeding TDC database with matchmakers, client profiles, and initial logs...');

  const insertMatchmaker = db.prepare(`
    INSERT INTO matchmakers (id, name, email, password_hash, role, avatar_url, bio, active)
    VALUES (@id, @name, @email, @password_hash, @role, @avatar_url, @bio, @active)
  `);

  const insertClient = db.prepare(`
    INSERT INTO clients (
      id, matchmaker_id, first_name, last_name, gender, dob, country, city, height_cm,
      email, phone, college, degree, income_lpa, company, designation, marital_status,
      religion, caste, manglik, diet, drinking, smoking, want_kids, open_to_relocate,
      open_to_pets, siblings_count, family_type, family_values, horoscope_match,
      bio, profile_photo, journey_stage, is_verified
    ) VALUES (
      @id, @matchmaker_id, @first_name, @last_name, @gender, @dob, @country, @city, @height_cm,
      @email, @phone, @college, @degree, @income_lpa, @company, @designation, @marital_status,
      @religion, @caste, @manglik, @diet, @drinking, @smoking, @want_kids, @open_to_relocate,
      @open_to_pets, @siblings_count, @family_type, @family_values, @horoscope_match,
      @bio, @profile_photo, @journey_stage, @is_verified
    )
  `);

  const insertLang = db.prepare(`
    INSERT OR IGNORE INTO client_languages (client_id, language, proficiency)
    VALUES (?, ?, ?)
  `);

  const insertInterest = db.prepare(`
    INSERT OR IGNORE INTO client_interests (client_id, interest)
    VALUES (?, ?)
  `);

  const insertNote = db.prepare(`
    INSERT INTO client_notes (id, client_id, matchmaker_id, note_type, content, created_at)
    VALUES (@id, @client_id, @matchmaker_id, @note_type, @content, @created_at)
  `);

  db.transaction(() => {
    // 1. Seed Matchmakers
    for (const mm of MATCHMAKERS_SEED) {
      insertMatchmaker.run(mm);
    }

    // 2. Seed 120+ Clients
    const profiles = generateProfilesSeed();
    for (const p of profiles) {
      insertClient.run({
        id: p.id,
        matchmaker_id: p.matchmaker_id,
        first_name: p.first_name,
        last_name: p.last_name,
        gender: p.gender,
        dob: p.dob,
        country: p.country,
        city: p.city,
        height_cm: p.height_cm,
        email: p.email,
        phone: p.phone,
        college: p.college,
        degree: p.degree,
        income_lpa: p.income_lpa,
        company: p.company,
        designation: p.designation,
        marital_status: p.marital_status,
        religion: p.religion,
        caste: p.caste,
        manglik: p.manglik,
        diet: p.diet,
        drinking: p.drinking,
        smoking: p.smoking,
        want_kids: p.want_kids,
        open_to_relocate: p.open_to_relocate,
        open_to_pets: p.open_to_pets,
        siblings_count: p.siblings_count,
        family_type: p.family_type,
        family_values: p.family_values,
        horoscope_match: p.horoscope_match,
        bio: p.bio,
        profile_photo: p.profile_photo,
        journey_stage: p.journey_stage,
        is_verified: p.is_verified
      });

      // Insert languages
      for (const lang of p.languages) {
        insertLang.run(p.id, lang, 'Fluent');
      }

      // Insert interests
      for (const int of p.interests) {
        insertInterest.run(p.id, int);
      }
    }

    // 3. Seed Realistic Matchmaker Notes for top active clients
    const initialNotes = [
      {
        id: 'note_001',
        client_id: 'client_m_001',
        matchmaker_id: 'mm_priya_01',
        note_type: 'call_summary',
        content: 'Onboarding 45-min Zoom debrief completed. Aarav is extremely articulate and grounded despite founding a high-growth tech startup. Key priorities: intellectual companionship, mutual respect for busy careers, loves outdoor treks and quiet weekend coffee dates.',
        created_at: '2026-10-08 14:30:00'
      },
      {
        id: 'note_002',
        client_id: 'client_m_001',
        matchmaker_id: 'mm_priya_01',
        note_type: 'preference_update',
        content: 'Client clarified he strongly prefers candidates who are either in Bangalore or open to relocating within 6-12 months. Dietary preference is flexible (he eats non-veg but comfortable with vegetarian partners).',
        created_at: '2026-10-10 11:15:00'
      },
      {
        id: 'note_003',
        client_id: 'client_f_001',
        matchmaker_id: 'mm_priya_01',
        note_type: 'meeting',
        content: 'In-person meeting at Indiranagar cafe. Ananya emphasized that emotional intelligence and a shared desire for a pet-friendly home are non-negotiables. Family background is progressive and warm.',
        created_at: '2026-10-09 16:45:00'
      },
      {
        id: 'note_004',
        client_id: 'client_f_002',
        matchmaker_id: 'mm_rohit_02',
        note_type: 'call_summary',
        content: 'Discussed recent match suggestions. Meera is keen on someone with creative pursuits outside of core corporate work. Prefers peer age group or up to 3 years older.',
        created_at: '2026-10-11 18:20:00'
      }
    ];

    for (const n of initialNotes) {
      insertNote.run(n);
    }
  })();

  console.log('TDC database initialized and seeded successfully.');
}
