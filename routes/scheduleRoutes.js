import express from 'express';
import * as controller from '../controllers/scheduleController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: Class scheduling operations
 */

/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Create schedule (admin only)
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, requireRole(['admin']), controller.createSchedule);

/**
 * @swagger
 * /schedules/{classId}:
 *   get:
 *     summary: Get class schedule
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:classId', authMiddleware, controller.getSchedule);

export default router;