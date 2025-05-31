const { query } = require('./db');

const createTables = async () => {
  try {
    await query(`CREATE SCHEMA IF NOT EXISTS taskservice;`);

    // Create tasks table inside the schema
    await query(`
      CREATE TABLE IF NOT EXISTS taskservice.tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        due_date DATE,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Tasks table created successfully!');
  } catch (error) {
    console.error('❌ Error creating tasks table:', error);
  }
};

createTables();
