import express from 'express';
import * as controller from '../controllers/studentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', authMiddleware, requireRole(['admin']), controller.createStudent);
router.get('/class/:classId', authMiddleware, controller.getStudentsByClass);

export default router;