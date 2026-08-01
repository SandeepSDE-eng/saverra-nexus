import { createServerFn } from "@tanstack/react-start";
import { getMySqlPool } from "@/lib/mysql";

// --- Floor Plans ---
export const getFloorPlansFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    const [rows]: any = await pool.query('SELECT * FROM floor_plans ORDER BY id ASC');
    return { success: true, data: rows };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
});

export const updateFloorPlanStatusFn = createServerFn({ method: "POST" })
  .validator((d: { id: number; is_published: boolean }) => d)
  .handler(async ({ data: { id, is_published } }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('UPDATE floor_plans SET is_published = ? WHERE id = ?', [is_published, id]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

export const updateFloorPlanFn = createServerFn({ method: "POST" })
  .validator((d: { id: number; type_key: string; label: string; area: string; image_url: string; is_published: boolean; features: string[] }) => d)
  .handler(async ({ data }) => {
    try {
      const pool = getMySqlPool();
      await pool.query(
        'UPDATE floor_plans SET type_key = ?, label = ?, area = ?, image_url = ?, is_published = ?, features = ? WHERE id = ?', 
        [data.type_key, data.label, data.area, data.image_url, data.is_published, JSON.stringify(data.features), data.id]
      );
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

export const createFloorPlanFn = createServerFn({ method: "POST" })
  .validator((d: { type_key: string; label: string; area: string; image_url: string; is_published: boolean; features: string[] }) => d)
  .handler(async ({ data }) => {
    try {
      const pool = getMySqlPool();
      await pool.query(
        'INSERT INTO floor_plans (type_key, label, area, image_url, is_published, features) VALUES (?, ?, ?, ?, ?, ?)', 
        [data.type_key, data.label, data.area, data.image_url, data.is_published, JSON.stringify(data.features)]
      );
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

export const deleteFloorPlanFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('DELETE FROM floor_plans WHERE id = ?', [id]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

// --- Career Applications ---
export const getCareerApplicationsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    // Create table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS career_applications (
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
      )
    `);
    const [rows]: any = await pool.query('SELECT * FROM career_applications ORDER BY created_at DESC');
    return { success: true, data: rows };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
});

export const updateCareerStatusFn = createServerFn({ method: "POST" })
  .validator((d: { id: number; status: string }) => d)
  .handler(async ({ data: { id, status } }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('UPDATE career_applications SET status = ? WHERE id = ?', [status, id]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

export const deleteCareerApplicationFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('DELETE FROM career_applications WHERE id = ?', [id]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});

export const submitCareerApplicationFn = createServerFn({ method: "POST" })
  .validator((d: any) => d)
  .handler(async ({ data }) => {
    try {
      const pool = getMySqlPool();
      await pool.query(`
        CREATE TABLE IF NOT EXISTS career_applications (
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
        )
      `);
      await pool.query(
        'INSERT INTO career_applications (first_name, last_name, email, phone, position, experience_years, resume_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [data.first_name, data.last_name, data.email, data.phone, data.position, data.experience_years, data.resume_url]
      );
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
});
