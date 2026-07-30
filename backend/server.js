const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection pool
// Connects to local MySQL (root/blank by default if not specified in .env)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'saverra_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected', message: 'Backend is running securely.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed.', error: error.message });
  }
});

// --- INQUIRIES (LEADS) ---
app.get('/api/inquiries', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/inquiries', async (req, res) => {
  const { name, phone, city, budget, message, source } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO inquiries (name, phone, city, budget, message, source) VALUES (?, ?, ?, ?, ?, ?)',
      [name, phone, city, budget, message, source || 'Website']
    );
    res.status(201).json({ id: result.insertId, message: 'Inquiry saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- INTEGRATIONS (99acres, Housing) ---
app.get('/api/integrations', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM integrations');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/integrations/:id', async (req, res) => {
  const { is_active, api_key, webhook_url } = req.body;
  try {
    await pool.query(
      'UPDATE integrations SET is_active = ?, api_key = ?, webhook_url = ? WHERE id = ?',
      [is_active, api_key, webhook_url, req.params.id]
    );
    res.json({ message: 'Integration updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mock Webhook endpoint for receiving leads from portals
app.post('/api/webhooks/:platform', async (req, res) => {
  const { platform } = req.params; // '99acres' or 'housing'
  const leadData = req.body;
  
  try {
    // In a real scenario, map the platform's JSON fields to our DB fields
    const name = leadData.name || 'Portal Lead';
    const phone = leadData.phone || '0000000000';
    
    await pool.query(
      'INSERT INTO inquiries (name, phone, source) VALUES (?, ?, ?)',
      [name, phone, platform]
    );
    
    // Update last_synced_at
    await pool.query('UPDATE integrations SET last_synced_at = NOW() WHERE platform_name = ?', [platform]);
    
    res.json({ status: 'success', message: 'Lead recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- MARKETING CAMPAIGNS (Meta, Google) ---
app.get('/api/campaigns', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM campaigns');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- FLOOR PLANS ---
app.get('/api/floor-plans', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM floor_plans WHERE is_published = TRUE');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/floor-plans', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM floor_plans');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/floor-plans', async (req, res) => {
  const { type_key, label, area, features, image_url, is_published } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO floor_plans (type_key, label, area, features, image_url, is_published) VALUES (?, ?, ?, ?, ?, ?)',
      [type_key, label, area, JSON.stringify(features), image_url, is_published !== false]
    );
    res.status(201).json({ id: result.insertId, message: 'Floor plan created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/floor-plans/:id', async (req, res) => {
  const { type_key, label, area, features, image_url, is_published } = req.body;
  try {
    await pool.query(
      'UPDATE floor_plans SET type_key = ?, label = ?, area = ?, features = ?, image_url = ?, is_published = ? WHERE id = ?',
      [type_key, label, area, JSON.stringify(features), image_url, is_published, req.params.id]
    );
    res.json({ message: 'Floor plan updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/floor-plans/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM floor_plans WHERE id = ?', [req.params.id]);
    res.json({ message: 'Floor plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SOCIAL MEDIA POSTS ---
app.get('/api/social-media', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM social_media_posts WHERE status = 'active' ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/social-media', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM social_media_posts ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/social-media', async (req, res) => {
  const { platform, url, embed_id, title } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO social_media_posts (platform, url, embed_id, title) VALUES (?, ?, ?, ?)',
      [platform, url, embed_id, title]
    );
    res.status(201).json({ id: result.insertId, message: 'Social post saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/social-media/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM social_media_posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Social post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- REAL ESTATE AI CHATBOT ---
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages format' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are the official AI Assistant for Saverra Realty, a premium real estate firm in India. Your goal is to be extremely helpful, professional, polite, and to capture the user's contact details (like their phone number) so a senior agent can call them. \n\nKey details:\n- Saverra Realty Phone Number: +91 98765 43210\n- Saverra Realty Email: contact@saverrarealty.com\n- We sell premium and ultra-luxury properties (villas, apartments, penthouses).\n- Prime projects include 'f Residences', 'MICL Aaradhya' in Ghatkopar East, and premium villas in Bengaluru.\n- Prices generally range from ₹1.5 Cr to ₹5 Cr+.\n- Amenities typically include infinity pools, gyms, smart homes, and high-tier security.\n- ALWAYS respond in short, natural, human-like sentences. Never use robotic formatting like bullet points or markdown. You are in a live chat window.\n- If a user provides a 10-digit phone number, thank them and say an agent will call in 5 minutes.",
    });

    // Format chat history for Gemini
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    
    // Gemini requires the first message in history to be from 'user'
    while (history.length > 0 && history[0].role !== 'user') {
      history.shift();
    }
    
    const latestMessage = messages[messages.length - 1].text;
    
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: 'Failed to process AI chat', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Saverra Backend running on port ${PORT}`);
});
