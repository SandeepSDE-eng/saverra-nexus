const fs = require('fs');
const mysql = require('mysql2/promise');

async function migrate() {
  const projects = JSON.parse(fs.readFileSync('supabase_projects.json', 'utf8'));
  
  if (projects.length === 0) return;

  const escapeString = (str) => {
    if (str === null || str === undefined) return 'NULL';
    return "'" + String(str).replace(/'/g, "''") + "'";
  };
  
  const escapeJSON = (obj) => {
    if (!obj) return 'NULL';
    return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'";
  };
  
  const escapeBool = (b) => b ? 'TRUE' : 'FALSE';

  let sql = `-- Step 1: Ensure cover_image column can store long image URLs\nALTER TABLE projects MODIFY cover_image LONGTEXT;\n\n`;
  sql += `-- Step 2: Unpublish old draft projects first\nUPDATE projects SET is_published = FALSE WHERE slug NOT IN ('micl-aaradhya-onepark', 'adani-the-views', 'orient-odyssey', '9-anemone-heights', 'house-of-hiranandani-chembur', 'rustomjee-balmoral-golf-links');\n\n`;
  sql += `-- Step 3: Insert or Replace the 6 Live Projects with distinct Cover & Gallery images\nREPLACE INTO projects (id, name, slug, builder, category, city, location, price_display, price_numeric, cover_image, gallery, bhk_options, min_bhk, max_bhk, possession, status, tagline, description, amenities, highlights, rera_number, latitude, longitude, is_featured, is_published, created_at, updated_at) VALUES\n`;
  
  const values = projects.map(p => {
    return '(' + [
      p.id || 'NULL',
      escapeString(p.name),
      escapeString(p.slug),
      escapeString(p.builder),
      escapeString(p.category),
      escapeString(p.city),
      escapeString(p.location),
      escapeString(p.price_display),
      p.price_numeric || 'NULL',
      escapeString(p.cover_image),
      escapeJSON(p.gallery),
      escapeString(p.bhk_options),
      p.min_bhk || 'NULL',
      p.max_bhk || 'NULL',
      escapeString(p.possession),
      escapeString(p.status),
      escapeString(p.tagline),
      escapeString(p.description),
      escapeJSON(p.amenities),
      escapeJSON(p.highlights),
      escapeString(p.rera_number),
      p.latitude || 'NULL',
      p.longitude || 'NULL',
      escapeBool(p.is_featured),
      escapeBool(p.is_published),
      escapeString(p.created_at || new Date().toISOString()),
      escapeString(p.updated_at || new Date().toISOString())
    ].join(', ') + ')';
  });

  sql += values.join(',\n') + ';';

  fs.writeFileSync('migrate_projects.sql', sql);
  console.log('Successfully generated migrate_projects.sql with REPLACE INTO!');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'saverra_db',
    });

    await connection.query(sql);
    console.log('Inserted into local MySQL database!');
    await connection.end();
  } catch (err) {
    // Local DB might not be running, SQL file is what user imports in phpMyAdmin
  }
}

migrate();
