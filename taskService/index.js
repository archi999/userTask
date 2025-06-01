const express = require('express');
const taskRoutes = require('./routes/tasks');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json());

app.use('/tasks', authMiddleware, taskRoutes);

app.get('/ping', (req, res) => {
  res.json({
    message:"success"
  });
});

app.listen(3002, () => console.log(`Task service listening on port 3002`));
