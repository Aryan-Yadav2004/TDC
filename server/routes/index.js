import { Router } from 'express';
import authRoutes from './auth.routes.js';
import clientRoutes from './client.routes.js';
import matchingRoutes from './matching.routes.js';
import { getDb } from '../db/connection.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/clients', clientRoutes);
router.use('/matching', matchingRoutes);

// Health check and overview dashboard metrics
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/stats', (req, res) => {
  const db = getDb();
  const totalClients = db.prepare('SELECT COUNT(*) as count FROM clients').get().count;
  const activelyMatching = db.prepare('SELECT COUNT(*) as count FROM clients WHERE journey_stage = "actively_matching"').get().count;
  const verifiedClients = db.prepare('SELECT COUNT(*) as count FROM clients WHERE journey_stage = "verified"').get().count;
  const datesArranged = db.prepare('SELECT COUNT(*) as count FROM clients WHERE journey_stage = "first_date_arranged"').get().count;
  const matchesDispatched = db.prepare('SELECT COUNT(*) as count FROM match_assignments WHERE status = "sent_to_client"').get().count;

  res.json({
    success: true,
    data: {
      totalClients,
      activelyMatching,
      verifiedClients,
      datesArranged,
      matchesDispatched
    }
  });
});

export default router;
