const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function init() {
  try {
    console.log("Connecting to MySQL...");
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      multipleStatements: true
    });

    console.log("Reading schema.sql...");
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

    console.log("Executing schema.sql...");
    await connection.query(schema);

    console.log("Database initialized successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

init();
