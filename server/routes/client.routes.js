import { Router } from 'express';
import { clientController } from '../controllers/client.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', clientController.list);
router.get('/:id', clientController.getDetail);
router.patch('/:id/stage', clientController.updateJourneyStage);
router.post('/:id/notes', clientController.addNote);
router.delete('/notes/:noteId', clientController.deleteNote);

export default router;
