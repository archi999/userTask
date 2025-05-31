const express = require('express');
const taskRoutes = require('./routes/tasks');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json());

app.use('/tasks', authMiddleware, taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Task service listening on port ${PORT}`));
