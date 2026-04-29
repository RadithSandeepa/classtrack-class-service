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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - classId
 *               - studentId
 *               - date
 *               - status
 *             properties:
 *               classId:
 *                 type: integer
 *                 example: 1
 *               studentId:
 *                 type: integer
 *                 example: 10
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-04-28"
 *               status:
 *                 type: string
 *                 enum: [present, absent]
 *                 example: present
 *     responses:
 *       200:
 *         description: Attendance marked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Attendance marked
 *       403:
 *         description: Forbidden (only assigned teacher can mark attendance)
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, requireRole(['teacher']), controller.markAttendance);

/**
 * @swagger
 * /attendance:
 *   get:
 *     summary: Get attendance by class and date
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: classId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Class ID
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   studentId:
 *                     type: integer
 *                   classId:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: string
 *                   markedBy:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, requireRole(['admin', 'teacher']), controller.getAttendance);

export default router;