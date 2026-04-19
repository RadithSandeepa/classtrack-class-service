import express from 'express';
import * as controller from '../controllers/subjectController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Subject management
 */

/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Create subject (admin only)
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, requireRole(['admin']), controller.createSubject);

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authMiddleware, controller.getSubjects);

export default router;