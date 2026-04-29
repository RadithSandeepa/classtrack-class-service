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
 *     summary: Create schedule for a class (admin only)
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - classId
 *               - entries
 *             properties:
 *               classId:
 *                 type: integer
 *                 example: 1
 *               entries:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - day
 *                     - order
 *                     - subjectId
 *                   properties:
 *                     day:
 *                       type: string
 *                       example: "Monday"
 *                     order:
 *                       type: integer
 *                       example: 1
 *                     subjectId:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Schedule created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schedule created
 *       403:
 *         description: Forbidden (admin only)
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, requireRole(['admin']), controller.createSchedule);

/**
 * @swagger
 * /schedules/{classId}:
 *   get:
 *     summary: Get schedule by class
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   classId:
 *                     type: integer
 *                   day:
 *                     type: string
 *                   order:
 *                     type: integer
 *                   subjectId:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router.get('/:classId', authMiddleware, controller.getSchedule);

export default router;