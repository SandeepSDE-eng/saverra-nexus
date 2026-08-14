
const mysql = require('mysql2/promise');

async function seed() {
  let dbHost = process.env.DB_HOST || '127.0.0.1';
  if (dbHost === 'localhost') dbHost = '127.0.0.1';

  console.log(`Connecting to MySQL Database at ${dbHost}...`);
  
  try {
    const pool = mysql.createPool({
      host: dbHost,
      user: process.env.DB_USER || 'u278286324_user',
      password: process.env.DB_PASSWORD || 'Saverra@123',
      database: process.env.DB_NAME || 'u278286324_saverra',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: true
    });

    console.log("Creating tables...");

    const tables = [
      `DROP TABLE IF EXISTS projects; CREATE TABLE projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        builder VARCHAR(255),
        category VARCHAR(100),
        city VARCHAR(100),
        location VARCHAR(255),
        price_display VARCHAR(100),
        price_numeric BIGINT,
        cover_image LONGTEXT,
        gallery JSON,
        bhk_options VARCHAR(255),
        min_bhk INT,
        max_bhk INT,
        possession VARCHAR(100),
        status VARCHAR(100),
        tagline VARCHAR(255),
        description TEXT,
        amenities JSON,
        highlights JSON,
        rera_number VARCHAR(100),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        is_featured BOOLEAN DEFAULT FALSE,
        is_published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      `DROP TABLE IF EXISTS social_media_posts; CREATE TABLE social_media_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        platform VARCHAR(100) NOT NULL,
        url VARCHAR(500) NOT NULL,
        embed_id VARCHAR(255),
        title VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `DROP TABLE IF EXISTS rental_updates; CREATE TABLE rental_updates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        youtube_id VARCHAR(100) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `DROP TABLE IF EXISTS floor_plans; CREATE TABLE floor_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type_key VARCHAR(100) NOT NULL,
        label VARCHAR(255) NOT NULL,
        area VARCHAR(100),
        features JSON,
        image_url VARCHAR(500),
        is_published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `DROP TABLE IF EXISTS career_applications; CREATE TABLE career_applications (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          email VARCHAR(255),
          phone VARCHAR(50),
          position VARCHAR(100),
          experience_years VARCHAR(50),
          resume_url TEXT,
          status VARCHAR(50) DEFAULT 'new',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `DROP TABLE IF EXISTS inquiries; CREATE TABLE inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50) NOT NULL,
        message TEXT,
        project_id INT,
        city VARCHAR(100),
        budget VARCHAR(100),
        source VARCHAR(100) DEFAULT 'Website',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    for (const query of tables) {
      await pool.query(query);
    }
    
    console.log("Tables created. Seeding data...");

    await pool.query(`INSERT IGNORE INTO projects (name, slug, builder, category, city, location, price_display, price_numeric, cover_image, bhk_options, min_bhk, max_bhk, possession, rera_number, status, is_featured, is_published, amenities, highlights, tagline, description) VALUES 
    ('Sai Shankar by Sai Life', 'sai-shankar-sai-life', 'Sai Life Realtors', 'Residential', 'Mumbai', 'M.G. Road, Pant Nagar, Ghatkopar East, Mumbai', '₹ 1.65 Cr Onwards', 16500000, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80', '2, 3 BHK & Jodi Options (4, 5 BHK)', 2, 5, 'Dec 2028', 'P51800054397', 'under-construction', TRUE, TRUE, '["Gymnasium", "Mini Theatre", "Multipurpose Hall", "Indoor Games Room", "Podium Parking", "Landscaped Gardens", "24/7 Security", "EV Charging"]', '["3 Grand Wings Spanning a 0.77-Acre Land Parcel", "Spacious 2 & 3 BHK Layouts with Large Jodi Combinations", "Private Mini-Theatre & Air-Conditioned Gymnasium", "Double-Height Designer Reception Lobby"]', '3 Magnificent Wings of Modern Luxury in Pant Nagar', 'Sai Shankar by Sai Life is a landmark residential development rising across 0.77 acres on M.G. Road in Pant Nagar, Ghatkopar East. Designed across three magnificent wings, it offers meticulously crafted 2 BHK and 3 BHK luxury residences along with expansive Jodi combinations.'),
    ('PSK Aura', 'psk-aura-ghatkopar', 'PSK Group', 'Residential', 'Mumbai', 'Hingwala Lane, Saibaba Nagar, Pant Nagar, Ghatkopar East, Mumbai', '₹ 1.75 Cr Onwards', 17500000, 'https://pskaura.in/public/admin/images/PSK-Aura-elevation-image-1-04082025105835.jpg', '2, 3 & 4 BHK', 2, 4, 'March 2029', 'P51800080013', 'under-construction', TRUE, TRUE, '["Fitness Centre", "Open Podium Garden", "Mini Theatre", "Multipurpose Court", "Reading Library", "Kids Play Zone", "Basement Parking", "EV Charging"]', '["G+20 Storey Standalone Boutique High-Rise Tower", "Open-to-Sky Landscaped Podium Garden", "3 Levels of Secure Basement Parking with EV Stations", "450m from Proposed Pantnagar Metro"]', 'Boutique G+20 High-Rise Living in Prime Ghatkopar', 'PSK Aura is an exclusive G+20 storey boutique residential tower located on Hingwala Lane, Pant Nagar, Ghatkopar East offering ultra-luxurious 2, 3, and 4 BHK residences.'),
    ('Silver Stellar', 'silver-stellar-ghatkopar', 'Silver Group', 'Residential', 'Mumbai', 'Bhanushali Lane, Pant Nagar, Ghatkopar East, Mumbai', '₹ 2.45 Cr Onwards', 24500000, 'https://silverstellar.in/assets/img/banners/Desktop-banner-1.jpg', '3 & 4 BHK', 3, 4, 'Dec 2028', 'P51800056223', 'under-construction', TRUE, TRUE, '["Sky Lounge", "Infinity View Deck", "Gymnasium", "Italian Marble Lobby", "Yoga Pavilion", "Automated Parking", "24/7 Security"]', '["Ultra-Spacious Luxury 3 & 4 BHK Residences", "Rooftop Sky Deck & Horizon Stargazing Lounge", "Grand Double-Height Italian Marble Entrance Lobby"]', 'Ultra-Spacious 3 & 4 BHK Residences by Silver Group', 'Silver Stellar by Silver Group represents the pinnacle of spacious family living in Ghatkopar East in the serene neighborhood of Bhanushali Lane.'),
    ('Silver House', 'silver-house-ghatkopar', 'Silver Group', 'Commercial', 'Mumbai', 'Tilak Road, Opp. Gurukrupa Hotel, Ghatkopar East, Mumbai', '₹ 1.15 Cr Onwards', 11500000, 'https://silverhouse.business/assets/img/banner/desk1.jpg', 'Boutique Offices & High-Street Retail', 1, 1, 'Dec 2029', 'PC1180002500363', 'under-construction', TRUE, TRUE, '["Business Lounge", "High-Speed Elevators", "Paddle Ball Court", "Cafeteria", "Amphitheatre", "Conference Rooms", "Basement Parking", "24/7 Security"]', '["Iconic G+16 Storey Glass Facade Commercial Landmark", "Double-Height Grand Drop-Off Reception Lobby", "Rooftop Business Lounge, Cafeteria & Open-Air Screening", "Pickle / Paddle Ball Court"]', 'G+16 Storey Iconic Commercial Landmark on Tilak Road', 'Silver House is a premier G+16 storey next-generation commercial tower developed by Silver Group on Tilak Road, Ghatkopar East.'),
    ('One Alag', 'alag-one-chembur', 'Alag Group', 'Commercial', 'Mumbai', 'Central Chembur / Ghatkopar Link, Chembur, Mumbai', '₹ 95 Lac Onwards', 9500000, 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80', 'Smart Commercial Suites & Retail Outlets', 1, 1, 'Dec 2028', 'P51800052341', 'under-construction', TRUE, TRUE, '["Grade-A Lobby", "High-Speed Elevators", "Business Center", "Power Backup", "BMS Surveillance", "Visitor Parking", "EV Charging"]', '["Grade-A Commercial Infrastructure by Reputed Alag Group", "High-Visibility Frontage on High Traffic Corridor", "Double-Height Designer Lobby with Biometric Access"]', 'Next-Gen Commercial & Retail Hub by Alag Group', 'One Alag by Alag Group is a high-profile commercial and retail hub situated along the prime Chembur-Ghatkopar growth corridor.'),
    ('Shubham Artesia', 'shubham-artesia-ghatkopar', 'Shubham Group', 'Residential', 'Mumbai', '328, Ramanarayan Narkar Marg, Pant Nagar, Ghatkopar East, Mumbai', '₹ 1.80 Cr Onwards', 18000000, 'https://shubhamartesiaghatkopareast.in/assets/img/common/metaimage.jpg', '2 & 3 BHK', 2, 3, 'Dec 2027', 'P51800079435', 'under-construction', TRUE, TRUE, '["AC Gymnasium", "Banquet Hall", "Party Lawn", "High-Street Retail", "Kids Play Area", "Smart Security", "Podium Parking"]', '["Magnificent 20-Storey Architectural High-Rise", "Air-Conditioned Gymnasium & Wellness Studio", "Grand Banquet Hall with Landscaped Party Lawn", "High-Street Retail Boulevard at Ground Level"]', '20-Storey Architectural Wonder in Heart of Pant Nagar', 'Shubham Artesia by Shubham Group is a 20-storey architectural masterpiece located on Ramanarayan Narkar Marg in Pant Nagar, Ghatkopar East.')`);

    await pool.query(`INSERT IGNORE INTO social_media_posts (platform, url, embed_id, title) VALUES
    ('instagram', 'https://instagram.com/p/sample', 'C12345678', 'Experience Luxury Living'),
    ('youtube', 'https://youtube.com/watch?v=sample', 'dQw4w9WgXcQ', 'Project Walkthrough Video')`);

    await pool.query(`INSERT IGNORE INTO floor_plans (type_key, label, area, features, image_url) VALUES 
    ('2bhk', '2 BHK Premium', '850 sq.ft.', '["2 Bedrooms", "2 Bathrooms", "Deck"]', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3'),
    ('3bhk', '3 BHK Luxury', '1250 sq.ft.', '["3 Bedrooms", "3 Bathrooms", "Servant Room"]', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3')`);

    await pool.query(`INSERT IGNORE INTO rental_updates (title, youtube_id) VALUES 
    ('Luxury Villa in Bengaluru', 'abcdefghij'),
    ('Premium Apartment in Mumbai', 'klmnopqrst')`);

    console.log("Database seeded successfully!");
    process.exit(0);

  } catch (err) {
    console.error("Database seeding failed:", err);
    process.exit(1);
  }
}

seed();
