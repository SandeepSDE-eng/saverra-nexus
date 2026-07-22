const mysql = require('mysql2/promise');

async function init() {
  try {
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'saverra_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log("Creating floor_plans table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS floor_plans (
          id INT AUTO_INCREMENT PRIMARY KEY,
          type_key VARCHAR(50) NOT NULL UNIQUE,
          label VARCHAR(100) NOT NULL,
          area VARCHAR(100) NOT NULL,
          features TEXT,
          image_url TEXT,
          is_published BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    console.log("Inserting default floor plans...");
    await pool.query(`
      INSERT IGNORE INTO floor_plans (type_key, label, area, features, image_url) VALUES 
      ('1bhk', '1 BHK', '620 Sq.Ft', '["Living Room", "1 Bedroom", "Modular Kitchen", "Balcony"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
      ('2bhk', '2 BHK', '850 Sq.Ft', '["Spacious Living Room", "2 Bedrooms", "Modular Kitchen", "2 Bathrooms", "Balcony"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
      ('3bhk', '3 BHK', '1350 Sq.Ft', '["Grand Living Room", "3 Bedrooms", "Chef\\'s Kitchen", "3 Bathrooms", "Utility"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
      ('4bhk', '4 BHK', '2200 Sq.Ft', '["Duplex Layout", "4 Bedrooms", "Chef\\'s Kitchen", "4 Bathrooms", "Sky Deck"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
      ('pent', 'Penthouse', '4500 Sq.Ft', '["Duplex", "5 Bedrooms", "Private Terrace Pool", "Wine Cellar", "Home Theatre"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80');
    `);

    console.log("Successfully initialized floor_plans!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

init();
