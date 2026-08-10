
const mysql = require('mysql2/promise');

async function seed() {
  let dbHost = process.env.DB_HOST || '127.0.0.1';
  if (dbHost === 'localhost') dbHost = '127.0.0.1';

  console.log(`Connecting to MySQL Database at ${dbHost}...`);
  
  try {
    const pool = mysql.createPool({
      host: dbHost,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'saverra_db',
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
        cover_image VARCHAR(500),
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
    ('MICL Aaradhya OnePark', 'micl-aaradhya-onepark', 'MICL Group', 'Residential', 'Mumbai', '60ft Road, Ghatkopar East', '₹ 2.80 Cr', 28000000, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80', '3, 4 & 5 BHK', 3, 5, 'Dec 2026', 'P51800000001', 'new-launch', TRUE, TRUE, '["Swimming Pool", "Gym", "Concierge", "Security"]', '["Rooftop Infinity Pool", "State-of-the-art Gym"]', 'Ultra Luxury on 60ft Road', 'Aaradhya OnePark brings ultra-luxury living to the prestigious 60ft Road in Ghatkopar East.'),
    ('Adani The Views', 'adani-the-views', 'Adani Realty', 'Residential', 'Mumbai', 'Pant Nagar, Ghatkopar East, Mumbai', '₹ 1.99 Cr Onwards', 19900000, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', '2, 3 & 4 BHK', 2, 4, 'Dec 2027', 'P51900031165', 'under-construction', TRUE, TRUE, '["Skywalk", "Clubhouse", "Gymnasium", "Swimming Pool"]', '["200-foot Signature Skywalk", "Landscaped Podium Garden"]', 'Signature 200-ft Skywalk Living', 'Adani The Views in Pant Nagar, Ghatkopar East offers premium 2, 3 & 4 BHK residences featuring a signature 200-foot skywalk.'),
    ('Orient Odyssey', 'orient-odyssey', 'Orient Corp', 'Residential', 'Mumbai', 'Ghatkopar East, Mumbai', '₹ 1.91 Cr Onwards', 19100000, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', '1, 2, 3 & 4 BHK', 1, 4, 'Dec 2030', 'PM1180002600214', 'new-launch', TRUE, TRUE, '["Gymnasium", "Landscape Garden", "Jogging Track", "Yoga Deck"]', '["2 Towers over 0.36 Acres", "Yoga & Meditation Deck"]', 'Modern 2-Tower Odyssey in Ghatkopar', 'Orient Odyssey by Orient Corp offers thoughtfully designed 1, 2, 3 & 4 BHK residences across 2 high-rise towers in Ghatkopar East.'),
    ('9 Anemone Heights', '9-anemone-heights', 'Anemone Homes LLP', 'Residential', 'Mumbai', '90 Feet Rd, Pant Nagar, Ghatkopar East, Mumbai', '₹ 1.85 Cr Onwards', 18500000, 'https://images.unsplash.com/photo-1613490900233-141c5560d75d?w=1200&q=80', '2 & 3 BHK', 2, 3, 'June 2027', 'P51800099999', 'under-construction', TRUE, TRUE, '["Multipurpose Studio", "Banquet Hall", "Wellness Hub", "Business Zone", "Salon"]', '["Terrace Screening Zone & Cabanas", "7 High-speed Lifts per Tower"]', 'Rise Above The Skyline', 'Rising in the heart of Ghatkopar, 9 Anemone Heights by Anemone Homes LLP offers premium city-view residences.')`);

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
