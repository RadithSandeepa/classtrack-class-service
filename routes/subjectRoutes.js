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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mathematics"
 *     responses:
 *       201:
 *         description: Subject created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subject created
 *                 subjectId:
 *                   type: integer
 *                   example: 3
 *       403:
 *         description: Forbidden (admin only)
 *       500:
 *         description: Server error
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
 *     responses:
 *       200:
 *         description: List of subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, controller.getSubjects);

export default router;