const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const { data } = await axios.get(process.env.USER_SERVICE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data);
    req.user = data;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
