import express from 'express';
import * as controller from '../controllers/scheduleController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', authMiddleware, requireRole(['admin']), controller.createSchedule);
router.get('/:classId', authMiddleware, controller.getSchedule);

export default router;