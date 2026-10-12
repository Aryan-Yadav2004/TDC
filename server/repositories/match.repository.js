import { getDb } from '../db/connection.js';

export const matchRepository = {
  findAssignment(clientId, candidateId) {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT 
        a.id, a.client_id, a.candidate_id, a.matchmaker_id, a.compatibility_score,
        a.score_breakdown, a.ai_summary, a.ai_strengths, a.ai_watchouts, a.status,
        a.sent_to_client_at, a.created_at, a.updated_at,
        p.id as pitch_id, p.subject as pitch_subject, p.body as pitch_body, p.tone as pitch_tone
      FROM match_assignments a
      LEFT JOIN match_pitches p ON a.id = p.assignment_id
      WHERE a.client_id = ? AND a.candidate_id = ?
    `);
    const row = stmt.get(clientId, candidateId);
    if (!row) return null;

    return {
      ...row,
      score_breakdown: JSON.parse(row.score_breakdown || '{}'),
      ai_strengths: JSON.parse(row.ai_strengths || '[]'),
      ai_watchouts: JSON.parse(row.ai_watchouts || '[]')
    };
  },

  upsertAssignment({
    id,
    clientId,
    candidateId,
    matchmakerId,
    compatibilityScore,
    scoreBreakdown,
    aiSummary,
    aiStrengths,
    aiWatchouts,
    status = 'suggested'
  }) {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO match_assignments (
        id, client_id, candidate_id, matchmaker_id, compatibility_score,
        score_breakdown, ai_summary, ai_strengths, ai_watchouts, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      ON CONFLICT(client_id, candidate_id) DO UPDATE SET
        compatibility_score = excluded.compatibility_score,
        score_breakdown = excluded.score_breakdown,
        ai_summary = excluded.ai_summary,
        ai_strengths = excluded.ai_strengths,
        ai_watchouts = excluded.ai_watchouts,
        updated_at = datetime('now')
    `);

    stmt.run(
      id,
      clientId,
      candidateId,
      matchmakerId,
      compatibilityScore,
      JSON.stringify(scoreBreakdown),
      aiSummary,
      JSON.stringify(aiStrengths),
      JSON.stringify(aiWatchouts),
      status
    );

    return this.findAssignment(clientId, candidateId);
  },

  updateStatus(assignmentId, status, markSent = false) {
    const db = getDb();
    const sentSql = markSent ? `, sent_to_client_at = datetime('now')` : '';
    const stmt = db.prepare(`
      UPDATE match_assignments
      SET status = ?, updated_at = datetime('now') ${sentSql}
      WHERE id = ?
    `);
    const info = stmt.run(status, assignmentId);
    return info.changes > 0;
  },

  recordPitch({ id, assignmentId, clientId, candidateId, subject, body, tone, aiGenerated = 1 }) {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO match_pitches (id, assignment_id, client_id, candidate_id, subject, body, tone, ai_generated, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      ON CONFLICT(id) DO UPDATE SET
        subject = excluded.subject,
        body = excluded.body,
        tone = excluded.tone,
        updated_at = datetime('now')
    `);
    stmt.run(id, assignmentId, clientId, candidateId, subject, body, tone, aiGenerated ? 1 : 0);
  },

  findByClient(clientId) {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT 
        a.id, a.client_id, a.candidate_id, a.matchmaker_id, a.compatibility_score,
        a.score_breakdown, a.ai_summary, a.ai_strengths, a.ai_watchouts, a.status,
        a.sent_to_client_at, a.created_at,
        c.first_name as candidate_first_name, c.last_name as candidate_last_name,
        c.city as candidate_city, c.company as candidate_company, c.designation as candidate_designation,
        c.income_lpa as candidate_income_lpa, c.profile_photo as candidate_profile_photo,
        p.id as pitch_id, p.subject as pitch_subject, p.body as pitch_body
      FROM match_assignments a
      JOIN clients c ON a.candidate_id = c.id
      LEFT JOIN match_pitches p ON a.id = p.assignment_id
      WHERE a.client_id = ?
      ORDER BY a.updated_at DESC
    `);
    const rows = stmt.all(clientId);
    return rows.map(r => ({
      ...r,
      score_breakdown: JSON.parse(r.score_breakdown || '{}'),
      ai_strengths: JSON.parse(r.ai_strengths || '[]'),
      ai_watchouts: JSON.parse(r.ai_watchouts || '[]')
    }));
  }
};
