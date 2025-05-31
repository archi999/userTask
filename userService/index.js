const express = require('express');
const dotenv = require('dotenv');
const { signup, login } = require('./auth');
const authenticate = require('./middleware');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:4000" }));

// Public routes
app.post('/signup', signup);
app.post('/login', login);

// Protected route
//for authentication
app.get('/profile', authenticate, (req, res) => {
  res.json({ userId: req.user.userId, email: req.user.email });
});

app.get('/sample', (req, res) => {
  res.json({
    message:"success"
  });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
