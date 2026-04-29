import express from 'express';
import * as controller from '../controllers/studentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management within classes
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create student (admin only)
 *     tags: [Students]
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
 *               - classId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               classId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Student created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student created
 *                 studentId:
 *                   type: integer
 *                   example: 10
 *       403:
 *         description: Forbidden (admin only)
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, requireRole(['admin']), controller.createStudent);

/**
 * @swagger
 * /students/class/{classId}:
 *   get:
 *     summary: Get students by class
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the class
 *     responses:
 *       200:
 *         description: List of students in the class
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
 *                   classId:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router.get('/class/:classId', authMiddleware, controller.getStudentsByClass);

export default router;