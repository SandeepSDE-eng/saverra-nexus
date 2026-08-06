import { createServerFn } from "@tanstack/react-start";
import { getMySqlPool } from "@/lib/mysql";

// --- Database Init Helpers ---
async function ensureTablesExist(pool: any) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS statuses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url LONGTEXT NOT NULL,
        title VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS global_popups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url LONGTEXT NOT NULL,
        link_url TEXT,
        is_active BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  try {
    await pool.query('ALTER TABLE statuses MODIFY COLUMN image_url LONGTEXT');
    await pool.query('ALTER TABLE global_popups MODIFY COLUMN image_url LONGTEXT');
  } catch (e) {
    // Ignore if it fails (e.g., column doesn't exist yet in a race condition, though it should)
  }
}

// ==========================================
// STATUSES API
// ==========================================

export const getActiveStatusesFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    await ensureTablesExist(pool);
    const [rows]: any = await pool.query('SELECT * FROM statuses WHERE is_active = TRUE ORDER BY created_at DESC');
    return { success: true, data: rows };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
});

export const getAdminStatusesFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    await ensureTablesExist(pool);
    const [rows]: any = await pool.query('SELECT * FROM statuses ORDER BY created_at DESC');
    return { success: true, data: rows };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
});

export const addStatusFn = createServerFn({ method: "POST" })
  .validator((d: { image_url: string; title: string }) => d)
  .handler(async ({ data: { image_url, title } }) => {
    try {
      const pool = getMySqlPool();
      await ensureTablesExist(pool);
      await pool.query('INSERT INTO statuses (image_url, title, is_active) VALUES (?, ?, TRUE)', [image_url, title]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

export const toggleStatusFn = createServerFn({ method: "POST" })
  .validator((d: { id: number; is_active: boolean }) => d)
  .handler(async ({ data: { id, is_active } }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('UPDATE statuses SET is_active = ? WHERE id = ?', [is_active, id]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

export const deleteStatusFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('DELETE FROM statuses WHERE id = ?', [id]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

// ==========================================
// GLOBAL POPUPS API
// ==========================================

export const getActivePopupFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    await ensureTablesExist(pool);
    // Only fetch one active popup at a time to prevent multiple overlays
    const [rows]: any = await pool.query('SELECT * FROM global_popups WHERE is_active = TRUE ORDER BY created_at DESC LIMIT 1');
    return { success: true, data: rows[0] || null };
  } catch (error: any) {
    return { success: false, error: error.message, data: null };
  }
});

export const getAdminPopupsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    await ensureTablesExist(pool);
    const [rows]: any = await pool.query('SELECT * FROM global_popups ORDER BY created_at DESC');
    return { success: true, data: rows };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
});

export const addPopupFn = createServerFn({ method: "POST" })
  .validator((d: { image_url: string; link_url: string; is_active: boolean }) => d)
  .handler(async ({ data: { image_url, link_url, is_active } }) => {
    try {
      const pool = getMySqlPool();
      await ensureTablesExist(pool);
      
      // If we are making this one active, deactivate all others first
      if (is_active) {
        await pool.query('UPDATE global_popups SET is_active = FALSE');
      }
      
      await pool.query('INSERT INTO global_popups (image_url, link_url, is_active) VALUES (?, ?, ?)', [image_url, link_url, is_active]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

export const togglePopupFn = createServerFn({ method: "POST" })
  .validator((d: { id: number; is_active: boolean }) => d)
  .handler(async ({ data: { id, is_active } }) => {
    try {
      const pool = getMySqlPool();
      
      // If turning on, turn off all others
      if (is_active) {
        await pool.query('UPDATE global_popups SET is_active = FALSE');
      }
      
      await pool.query('UPDATE global_popups SET is_active = ? WHERE id = ?', [is_active, id]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

export const deletePopupFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('DELETE FROM global_popups WHERE id = ?', [id]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});
