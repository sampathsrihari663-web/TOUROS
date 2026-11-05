const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
} = require('../controllers/taskController');

// /api/tasks
router.route('/')
  .get(getTasks)
  .post(createTask);

// /api/tasks/:id
router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

// /api/tasks/:id/status
router.route('/:id/status')
  .patch(updateTaskStatus);

module.exports = router;

