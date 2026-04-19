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
 */
router.get('/class/:classId', authMiddleware, controller.getStudentsByClass);

export default router;