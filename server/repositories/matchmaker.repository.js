import { getDb } from '../db/connection.js';

export const matchmakerRepository = {
  findByEmail(email) {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT id, name, email, password_hash, role, avatar_url, bio, active, created_at
      FROM matchmakers
      WHERE email = ? COLLATE NOCASE
    `);
    return stmt.get(email);
  },

  findById(id) {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT id, name, email, role, avatar_url, bio, active, created_at
      FROM matchmakers
      WHERE id = ?
    `);
    return stmt.get(id);
  },

  getAll() {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT id, name, email, role, avatar_url, bio, active, created_at
      FROM matchmakers
      WHERE active = 1
      ORDER BY name ASC
    `);
    return stmt.all();
  }
};
