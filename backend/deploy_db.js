const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' }); // Load .env from root

async function deployDB() {
  let connection;
  try {
    console.log("Connecting to MySQL Database...");
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'saverra_db',
      multipleStatements: true
    });

    console.log("Connection successful! Automatically creating tables...");

    const sqlScript = `
    -- 1. Inquiries Table (Leads from Website & Portals)
    CREATE TABLE IF NOT EXISTS inquiries (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        city VARCHAR(100),
        budget VARCHAR(100),
        message TEXT,
        source VARCHAR(50) DEFAULT 'Website', 
        status VARCHAR(50) DEFAULT 'New', 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- 2. Projects Table
    CREATE TABLE IF NOT EXISTS projects (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(100) DEFAULT 'Residential',
        city VARCHAR(100) DEFAULT 'Mumbai',
        location VARCHAR(255) NOT NULL,
        cover_image TEXT NOT NULL,
        price_display VARCHAR(100) NOT NULL,
        price_numeric DECIMAL(15,2),
        status VARCHAR(50) NOT NULL,
        bhk_options VARCHAR(100),
        possession VARCHAR(100),
        rera_number VARCHAR(100),
        builder VARCHAR(255),
        min_bhk INT,
        max_bhk INT,
        description TEXT,
        tagline TEXT,
        gallery JSON, 
        amenities JSON, 
        highlights JSON,
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        is_featured BOOLEAN DEFAULT FALSE,
        is_published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- 3. Integrations Configuration Table
    CREATE TABLE IF NOT EXISTS integrations (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        platform_name VARCHAR(100) NOT NULL UNIQUE,
        api_key VARCHAR(255),
        webhook_url VARCHAR(255),
        is_active BOOLEAN DEFAULT FALSE,
        last_synced_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Insert default integration records
    INSERT IGNORE INTO integrations (id, platform_name) VALUES (1, '99acres'), (2, 'housing');

    -- 4. Marketing Campaigns Table
    CREATE TABLE IF NOT EXISTS campaigns (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        platform_name VARCHAR(100) NOT NULL,
        campaign_id VARCHAR(255),
        campaign_name VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Active',
        spend DECIMAL(10, 2) DEFAULT 0.00,
        leads_generated INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- 5. Floor Plans Table
    CREATE TABLE IF NOT EXISTS floor_plans (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        type_key VARCHAR(50) NOT NULL UNIQUE,
        label VARCHAR(100) NOT NULL,
        area VARCHAR(100) NOT NULL,
        features JSON, 
        image_url TEXT,
        is_published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Insert default floor plans if they don't exist
    INSERT IGNORE INTO floor_plans (type_key, label, area, features, image_url) VALUES 
    ('1bhk', '1 BHK', '620 Sq.Ft', '["Living Room", "1 Bedroom", "Modular Kitchen", "Balcony"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
    ('2bhk', '2 BHK', '850 Sq.Ft', '["Spacious Living Room", "2 Bedrooms", "Modular Kitchen", "2 Bathrooms", "Balcony"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
    ('3bhk', '3 BHK', '1350 Sq.Ft', '["Grand Living Room", "3 Bedrooms", "Chef\\'s Kitchen", "3 Bathrooms", "Utility"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
    ('4bhk', '4 BHK', '2200 Sq.Ft', '["Duplex Layout", "4 Bedrooms", "Chef\\'s Kitchen", "4 Bathrooms", "Sky Deck"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
    ('pent', 'Penthouse', '4500 Sq.Ft', '["Duplex", "5 Bedrooms", "Private Terrace Pool", "Wine Cellar", "Home Theatre"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80');

    -- 6. Rental Updates Table 
    CREATE TABLE IF NOT EXISTS rental_updates (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        youtube_id VARCHAR(50) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- 7. Social Media Posts Table
    CREATE TABLE IF NOT EXISTS social_media_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        platform ENUM('instagram', 'youtube', 'facebook') NOT NULL,
        url TEXT NOT NULL,
        embed_id TEXT NOT NULL,
        title VARCHAR(255),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    await connection.query(sqlScript);
    console.log("✅ All tables created successfully in Hostinger MySQL!");

  } catch (error) {
    console.error("❌ Error setting up database:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

deployDB();
