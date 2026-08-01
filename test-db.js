import mysql from 'mysql2/promise';

async function test() {
  try {
    const pool = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'saverra_db',
    });

    console.log("Connected to pool.");
    
    // First, let's describe the table
    const [columns] = await pool.query('DESCRIBE inquiries');
    console.log("Table structure:", columns);

    // Let's test the insert that LeadPopup does
    const [result] = await pool.query(
      'INSERT INTO inquiries (name, email, phone, message, project_id) VALUES (?, ?, ?, ?, ?)',
      ['Test', null, '1234567890', 'Test message', null]
    );
    
    console.log("Insert result:", result);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

test();
