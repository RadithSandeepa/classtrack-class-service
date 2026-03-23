import express from 'express';
import * as controller from '../controllers/classController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', authMiddleware, requireRole(['admin']), controller.createClass);
router.get('/', authMiddleware, requireRole(['admin']), controller.getClasses);
router.put('/:id', authMiddleware, requireRole(['admin']), controller.updateClass);
router.delete('/:id', authMiddleware, requireRole(['admin']), controller.deleteClass);

export default router;