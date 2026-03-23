import express from 'express';
import * as controller from '../controllers/subjectController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', authMiddleware, requireRole(['admin']), controller.createSubject);
router.get('/', authMiddleware, controller.getSubjects);

export default router;