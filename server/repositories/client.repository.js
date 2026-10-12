import { getDb } from '../db/connection.js';

export const clientRepository = {
  findAll({ matchmakerId, gender, journeyStage, city, search, page = 1, limit = 50 } = {}) {
    const db = getDb();
    const offset = (Math.max(1, page) - 1) * limit;

    const whereClauses = [];
    const params = [];

    if (matchmakerId) {
      whereClauses.push('c.matchmaker_id = ?');
      params.push(matchmakerId);
    }

    if (gender) {
      whereClauses.push('c.gender = ?');
      params.push(gender);
    }

    if (journeyStage) {
      whereClauses.push('c.journey_stage = ?');
      params.push(journeyStage);
    }

    if (city) {
      whereClauses.push('c.city = ?');
      params.push(city);
    }

    if (search) {
      whereClauses.push('(c.first_name LIKE ? OR c.last_name LIKE ? OR c.company LIKE ? OR c.designation LIKE ? OR c.city LIKE ?)');
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Optimized count query using index
    const countStmt = db.prepare(`SELECT COUNT(*) as total FROM clients c ${whereSql}`);
    const total = countStmt.get(...params).total;

    // Optimized select query with computed age and joined matchmaker name
    const queryStmt = db.prepare(`
      SELECT 
        c.id, c.matchmaker_id, c.first_name, c.last_name, c.gender, c.dob,
        cast((strftime('%Y', 'now') - strftime('%Y', c.dob)) - (strftime('%m-%d', 'now') < strftime('%m-%d', c.dob)) as integer) as age,
        c.country, c.city, c.height_cm, c.email, c.phone, c.college, c.degree,
        c.income_lpa, c.company, c.designation, c.marital_status, c.religion, c.caste,
        c.manglik, c.diet, c.drinking, c.smoking, c.want_kids, c.open_to_relocate,
        c.open_to_pets, c.siblings_count, c.family_type, c.family_values, c.horoscope_match,
        c.bio, c.profile_photo, c.journey_stage, c.is_verified, c.created_at,
        m.name as matchmaker_name
      FROM clients c
      LEFT JOIN matchmakers m ON c.matchmaker_id = m.id
      ${whereSql}
      ORDER BY c.journey_stage = 'actively_matching' DESC, c.created_at DESC
      LIMIT ? OFFSET ?
    `);

    const clients = queryStmt.all(...params, limit, offset);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      clients
    };
  },

  findById(id) {
    const db = getDb();

    const clientStmt = db.prepare(`
      SELECT 
        c.id, c.matchmaker_id, c.first_name, c.last_name, c.gender, c.dob,
        cast((strftime('%Y', 'now') - strftime('%Y', c.dob)) - (strftime('%m-%d', 'now') < strftime('%m-%d', c.dob)) as integer) as age,
        c.country, c.city, c.height_cm, c.email, c.phone, c.college, c.degree,
        c.income_lpa, c.company, c.designation, c.marital_status, c.religion, c.caste,
        c.manglik, c.diet, c.drinking, c.smoking, c.want_kids, c.open_to_relocate,
        c.open_to_pets, c.siblings_count, c.family_type, c.family_values, c.horoscope_match,
        c.bio, c.profile_photo, c.journey_stage, c.is_verified, c.created_at, c.updated_at,
        m.name as matchmaker_name, m.email as matchmaker_email
      FROM clients c
      LEFT JOIN matchmakers m ON c.matchmaker_id = m.id
      WHERE c.id = ?
    `);

    const client = clientStmt.get(id);
    if (!client) return null;

    // Fetch languages (normalized 1NF table)
    const langStmt = db.prepare(`
      SELECT language, proficiency
      FROM client_languages
      WHERE client_id = ?
      ORDER BY language ASC
    `);
    client.languages = langStmt.all(id);

    // Fetch interests (normalized 1NF table)
    const interestStmt = db.prepare(`
      SELECT interest
      FROM client_interests
      WHERE client_id = ?
      ORDER BY interest ASC
    `);
    client.interests = interestStmt.all(id).map(r => r.interest);

    return client;
  },

  updateJourneyStage(id, journeyStage) {
    const db = getDb();
    const stmt = db.prepare(`
      UPDATE clients
      SET journey_stage = ?, updated_at = datetime('now')
      WHERE id = ?
    `);
    const info = stmt.run(journeyStage, id);
    return info.changes > 0;
  },

  assignMatchmaker(id, matchmakerId) {
    const db = getDb();
    const stmt = db.prepare(`
      UPDATE clients
      SET matchmaker_id = ?, updated_at = datetime('now')
      WHERE id = ?
    `);
    const info = stmt.run(matchmakerId, id);
    return info.changes > 0;
  },

  findCandidatesForMatching(gender, excludeId, filters = {}) {
    const db = getDb();
    const whereClauses = ['c.gender = ?', 'c.id != ?', 'c.is_verified = 1'];
    const params = [gender, excludeId];

    if (filters.city) {
      whereClauses.push('(c.city = ? OR c.open_to_relocate IN (\'Yes\', \'Maybe\'))');
      params.push(filters.city);
    }

    if (filters.minAge || filters.maxAge) {
      if (filters.minAge) {
        whereClauses.push(`cast((strftime('%Y', 'now') - strftime('%Y', c.dob)) as integer) >= ?`);
        params.push(filters.minAge);
      }
      if (filters.maxAge) {
        whereClauses.push(`cast((strftime('%Y', 'now') - strftime('%Y', c.dob)) as integer) <= ?`);
        params.push(filters.maxAge);
      }
    }

    if (filters.maritalStatus) {
      whereClauses.push('c.marital_status = ?');
      params.push(filters.maritalStatus);
    }

    const whereSql = whereClauses.join(' AND ');

    // Fast indexed candidate query
    const stmt = db.prepare(`
      SELECT 
        c.id, c.first_name, c.last_name, c.gender, c.dob,
        cast((strftime('%Y', 'now') - strftime('%Y', c.dob)) - (strftime('%m-%d', 'now') < strftime('%m-%d', c.dob)) as integer) as age,
        c.country, c.city, c.height_cm, c.email, c.phone, c.college, c.degree,
        c.income_lpa, c.company, c.designation, c.marital_status, c.religion, c.caste,
        c.manglik, c.diet, c.drinking, c.smoking, c.want_kids, c.open_to_relocate,
        c.open_to_pets, c.siblings_count, c.family_type, c.family_values, c.horoscope_match,
        c.bio, c.profile_photo, c.journey_stage
      FROM clients c
      WHERE ${whereSql}
      ORDER BY c.income_lpa DESC
      LIMIT 120
    `);

    const candidates = stmt.all(...params);

    // Attach languages and interests
    const langStmt = db.prepare('SELECT language FROM client_languages WHERE client_id = ?');
    const interestStmt = db.prepare('SELECT interest FROM client_interests WHERE client_id = ?');

    return candidates.map(cand => ({
      ...cand,
      languages: langStmt.all(cand.id).map(r => r.language),
      interests: interestStmt.all(cand.id).map(r => r.interest)
    }));
  }
};
