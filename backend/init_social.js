const mysql = require('mysql2/promise');
require('dotenv').config();

async function initSocialTable() {
  let connection;
  try {
    // Note: This matches the configuration in server.js
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'saverra_db',
    });

    console.log('Connected to MySQL successfully.');

    // Create the table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS social_media_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        platform ENUM('instagram', 'youtube', 'facebook') NOT NULL,
        url TEXT NOT NULL,
        embed_id TEXT NOT NULL,
        title VARCHAR(255),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.query(createTableQuery);
    console.log('social_media_posts table initialized successfully in MySQL.');

  } catch (error) {
    console.error('Error initializing MySQL table:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initSocialTable();
