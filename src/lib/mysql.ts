import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getMySqlPool() {
  if (!pool) {
    let dbHost = process.env.DB_HOST || '127.0.0.1';
    if (dbHost === 'localhost') {
      dbHost = '127.0.0.1'; // Fix for Node.js IPv6 '::1' access denied error on Hostinger
    }

    let dbUser = process.env.DB_USER;
    if (!dbUser || dbUser === 'root') {
      dbUser = 'u278286324_user';
    }

    let dbPass = process.env.DB_PASSWORD;
    if (!dbPass) {
      dbPass = 'Saverra@123';
    }

    let dbName = process.env.DB_NAME;
    if (!dbName || dbName === 'saverra_db') {
      dbName = 'u278286324_saverra';
    }

    pool = mysql.createPool({
      host: dbHost,
      user: dbUser,
      password: dbPass,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

