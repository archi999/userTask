const express = require('express');
const router = express.Router();
const pool = require('../db');
const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.connect().catch(console.error);

const CHANNEL = 'task_notifications';

// CREATE a task
router.post('/', async (req, res) => {
  console.log('here')
  const userId = req.user.userId;
  const { title, description, status = 'pending', dueDate } = req.body;
console.log(userId)
  try {
    const client = await pool.getClient();
    const query = `
      INSERT INTO taskservice.tasks (title, description, status, due_date, user_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [title, description, status, dueDate || null, userId];
    const result = await client.query(query, values);
    client.release();

    const task = result.rows[0];

    await redisClient.publish(CHANNEL, JSON.stringify({
      userId,
      taskId: task.id,
      action: 'created',
      taskTitle: task.title,
    }));

    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// READ all tasks for user
router.get('/', async (req, res) => {
  const userId = req.user.userId;
  try {
    const client = await pool.getClient();
    const query = 'SELECT * FROM taskservice.tasks WHERE user_id = $1 ORDER BY due_date ASC NULLS LAST';
    const result = await client.query(query, [userId]);
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// READ single task by id
router.get('/:id', async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;
  console.log(typeof(taskId))

  try {
    const client = await pool.getClient();
    const query = 'SELECT * FROM taskservice.tasks WHERE id = $1 AND user_id = $2';
    const result = await client.query(query, [taskId, userId]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get task by id error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE a task
router.put('/:id', async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;
  const { title, description, status, dueDate } = req.body;

  try {
    const client = await pool.getClient();

    // Check if task belongs to user
    const check = await client.query('SELECT * FROM taskservice.tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
    if (check.rows.length === 0) {
      client.release();
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    // Update fields (only if provided)
    const updatedTask = {
      title: title ?? check.rows[0].title,
      description: description ?? check.rows[0].description,
      status: status ?? check.rows[0].status,
      due_date: dueDate ?? check.rows[0].due_date,
    };

    const query = `
      UPDATE taskservice.tasks
      SET title = $1, description = $2, status = $3, due_date = $4
      WHERE id = $5 AND user_id = $6 RETURNING *`;
    const values = [updatedTask.title, updatedTask.description, updatedTask.status, updatedTask.due_date, taskId, userId];
    const result = await client.query(query, values);
    client.release();

    const task = result.rows[0];

    await redisClient.publish(CHANNEL, JSON.stringify({
      userId,
      taskId: task.id,
      action: 'updated',
      taskTitle: task.title,
    }));

    res.json(task);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  try {
    const client = await pool.getClient();

    // Check ownership
    const check = await client.query('SELECT * FROM taskservice.tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
    if (check.rows.length === 0) {
      client.release();
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    // Delete
    await client.query('DELETE FROM taskservice.tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
    client.release();

    await redisClient.publish(CHANNEL, JSON.stringify({
      userId,
      taskId,
      action: 'deleted',
      taskTitle: check.rows[0].title,
    }));

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// MARK task as complete
router.post('/:id/complete', async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  try {
    const client = await pool.getClient();

    const check = await client.query('SELECT * FROM taskservice.tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
    if (check.rows.length === 0) {
      client.release();
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    const query = `UPDATE taskservice.tasks SET status = 'completed' WHERE id = $1 AND user_id = $2 RETURNING *`;
    const result = await client.query(query, [taskId, userId]);
    client.release();

    const task = result.rows[0];

    await redisClient.publish(CHANNEL, JSON.stringify({
      userId,
      taskId: task.id,
      action: 'completed',
      taskTitle: task.title,
    }));

    res.json(task);
  } catch (err) {
    console.error('Mark complete error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
