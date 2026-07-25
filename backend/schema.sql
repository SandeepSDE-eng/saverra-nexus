-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS saverra_db;
USE saverra_db;

-- 1. Inquiries Table (Leads from Website & Portals)
CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    city VARCHAR(100),
    budget VARCHAR(100),
    message TEXT,
    source VARCHAR(50) DEFAULT 'Website', -- e.g., Website, 99acres, Housing, Meta, Google
    status VARCHAR(50) DEFAULT 'New', -- e.g., New, Contacted, Converted, Dead
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    price_range VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Under Construction', -- e.g., Ready to Move, Under Construction
    image_url TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Integrations Configuration Table (99acres, Housing)
CREATE TABLE IF NOT EXISTS integrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(100) NOT NULL, -- '99acres', 'housing'
    api_key VARCHAR(255),
    webhook_url VARCHAR(255),
    is_active BOOLEAN DEFAULT FALSE,
    last_synced_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default integration records
INSERT IGNORE INTO integrations (id, platform_name) VALUES (1, '99acres'), (2, 'housing');

-- 4. Marketing Campaigns Table (Meta, Google)
CREATE TABLE IF NOT EXISTS campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(100) NOT NULL, -- 'Meta Ads', 'Google Ads'
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_key VARCHAR(50) NOT NULL UNIQUE,
    label VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    features TEXT, -- JSON string array of features
    image_url TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default floor plans if they don't exist
INSERT IGNORE INTO floor_plans (type_key, label, area, features, image_url) VALUES 
('1bhk', '1 BHK', '620 Sq.Ft', '["Living Room", "1 Bedroom", "Modular Kitchen", "Balcony"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
('2bhk', '2 BHK', '850 Sq.Ft', '["Spacious Living Room", "2 Bedrooms", "Modular Kitchen", "2 Bathrooms", "Balcony"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
('3bhk', '3 BHK', '1350 Sq.Ft', '["Grand Living Room", "3 Bedrooms", "Chef\'s Kitchen", "3 Bathrooms", "Utility"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
('4bhk', '4 BHK', '2200 Sq.Ft', '["Duplex Layout", "4 Bedrooms", "Chef\'s Kitchen", "4 Bathrooms", "Sky Deck"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'),
('pent', 'Penthouse', '4500 Sq.Ft', '["Duplex", "5 Bedrooms", "Private Terrace Pool", "Wine Cellar", "Home Theatre"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80');

-- 6. Rental Updates Table (For YouTube Shorts style rental property updates)
CREATE TABLE IF NOT EXISTS rental_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    youtube_id VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
