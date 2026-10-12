import { Router } from 'express';
import { matchingController } from '../controllers/matching.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

// Get algorithmic ranked matches for a customer
router.get('/customer/:customerId', matchingController.getRankedMatches);

// Generate AI personalized email pitch intro
router.post('/customer/:customerId/candidate/:candidateId/pitch', matchingController.generatePitch);

// Deep AI reasoning explanation
router.get('/customer/:customerId/candidate/:candidateId/reasoning', matchingController.getReasoning);

// Dispatch match to client ("Send Match" action)
router.post('/customer/:customerId/candidate/:candidateId/send', matchingController.sendMatch);

export default router;
