const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/userdb',
  ssl: {
    rejectUnauthorized: false, // Render uses self-signed certs
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
