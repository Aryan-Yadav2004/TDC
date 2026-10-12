import { getDb } from '../db/connection.js';

export const noteRepository = {
  findByClientId(clientId) {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT 
        n.id, n.client_id, n.matchmaker_id, n.note_type, n.content, n.created_at,
        m.name as matchmaker_name, m.avatar_url as matchmaker_avatar
      FROM client_notes n
      JOIN matchmakers m ON n.matchmaker_id = m.id
      WHERE n.client_id = ?
      ORDER BY n.created_at DESC
    `);
    return stmt.all(clientId);
  },

  create({ id, clientId, matchmakerId, noteType, content }) {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO client_notes (id, client_id, matchmaker_id, note_type, content, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `);
    stmt.run(id, clientId, matchmakerId, noteType, content);
    return this.findById(id);
  },

  findById(id) {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT 
        n.id, n.client_id, n.matchmaker_id, n.note_type, n.content, n.created_at,
        m.name as matchmaker_name, m.avatar_url as matchmaker_avatar
      FROM client_notes n
      JOIN matchmakers m ON n.matchmaker_id = m.id
      WHERE n.id = ?
    `);
    return stmt.get(id);
  },

  delete(id) {
    const db = getDb();
    const stmt = db.prepare('DELETE FROM client_notes WHERE id = ?');
    const info = stmt.run(id);
    return info.changes > 0;
  }
};
