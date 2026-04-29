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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - teacherId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "10 - A"
 *               teacherId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Class created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Class created
 *                 classId:
 *                   type: integer
 *                   example: 1
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
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
 *     responses:
 *       200:
 *         description: List of classes
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
 *                   teacherId:
 *                     type: integer
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               teacherId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Class updated
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Class deleted
 */
router.delete('/:id', authMiddleware, requireRole(['admin']), controller.deleteClass);

export default router;