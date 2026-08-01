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

  let sql = 'INSERT IGNORE INTO projects (name, slug, builder, category, city, location, price_display, price_numeric, cover_image, bhk_options, min_bhk, max_bhk, possession, status, tagline, description, amenities, highlights, rera_number, latitude, longitude, is_featured, is_published, created_at, updated_at) VALUES\n';
  
  const values = projects.map(p => {
    return '(' + [
      escapeString(p.name),
      escapeString(p.slug),
      escapeString(p.builder),
      escapeString(p.category),
      escapeString(p.city),
      escapeString(p.location),
      escapeString(p.price_display),
      p.price_numeric || 'NULL',
      escapeString(p.cover_image),
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
      escapeString(p.created_at),
      escapeString(p.updated_at)
    ].join(', ') + ')';
  });

  sql += values.join(',\n') + ';';

  fs.writeFileSync('migrate_projects.sql', sql);
  console.log('Saved to migrate_projects.sql');

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
    console.error('MySQL Error:', err);
  }
}

migrate();
