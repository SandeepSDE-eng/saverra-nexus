import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getMySqlPool() {
  if (!pool) {
    let dbHost = process.env.DB_HOST || '127.0.0.1';
    if (dbHost === 'localhost') {
      dbHost = '127.0.0.1'; // Fix for Node.js IPv6 '::1' access denied error on Hostinger
    }

    pool = mysql.createPool({
      host: dbHost,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'saverra_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}
