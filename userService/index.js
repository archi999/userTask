const express = require('express');
const dotenv = require('dotenv');
const { signup, login } = require('./auth');
const authenticate = require('./middleware');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Public routes
app.post('/signup', signup);
app.post('/login', login);

// Protected route
//for authentication
app.get('/profile', authenticate, (req, res) => {
  res.json({ userId: req.user.userId, email: req.user.email });
});

app.get('/ping', (req, res) => {
  res.json({
    message:"success"
  });
});

app.listen(3001, () => console.log(`User Service running on port 3001`));
