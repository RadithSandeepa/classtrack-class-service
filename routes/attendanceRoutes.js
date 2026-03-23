import express from 'express';
import * as controller from '../controllers/attendanceController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

// only teachers
router.post('/', authMiddleware, requireRole(['teacher']), controller.markAttendance);

// admin + teacher can view
router.get('/', authMiddleware, requireRole(['admin', 'teacher']), controller.getAttendance);

export default router;