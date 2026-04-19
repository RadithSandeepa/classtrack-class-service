import express from 'express';
import * as controller from '../controllers/attendanceController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance tracking for students
 */

/**
 * @swagger
 * /attendance:
 *   post:
 *     summary: Mark attendance (teacher only)
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 */
// only teachers
router.post('/', authMiddleware, requireRole(['teacher']), controller.markAttendance);

/**
 * @swagger
 * /attendance:
 *   get:
 *     summary: Get attendance (admin & teacher)
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 */
// admin + teacher can view
router.get('/', authMiddleware, requireRole(['admin', 'teacher']), controller.getAttendance);

export default router;