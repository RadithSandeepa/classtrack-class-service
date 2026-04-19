import express from 'express';
import * as controller from '../controllers/classController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Class management operations
 */

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create a class (admin only)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, requireRole(['admin']), controller.createClass);

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authMiddleware, requireRole(['admin']), controller.getClasses);

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Update class (admin only)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authMiddleware, requireRole(['admin']), controller.updateClass);

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Delete class (admin only)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authMiddleware, requireRole(['admin']), controller.deleteClass);

export default router;