const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getDashboardStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);

router
  .route('/')
  .get(getTasks)
  .post(
    [
      body('title').trim().notEmpty().withMessage('Title is required'),
      body('description').optional().trim(),
      body('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Invalid status'),
      body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Invalid priority'),
    ],
    validate,
    createTask
  );

router
  .route('/:id')
  .get(getTask)
  .put(
    [
      body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
      body('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Invalid status'),
      body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Invalid priority'),
    ],
    validate,
    updateTask
  )
  .delete(deleteTask);

module.exports = router;
