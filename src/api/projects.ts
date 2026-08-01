import { createServerFn } from "@tanstack/react-start";
import { getMySqlPool } from "@/lib/mysql";

// Helper to stringify JSON fields if needed
const formatForDb = (data: any) => {
  const formatted = { ...data };
  if (Array.isArray(formatted.gallery)) formatted.gallery = JSON.stringify(formatted.gallery);
  if (Array.isArray(formatted.amenities)) formatted.amenities = JSON.stringify(formatted.amenities);
  if (Array.isArray(formatted.highlights)) formatted.highlights = JSON.stringify(formatted.highlights);
  return formatted;
};

// Get all projects for the admin panel
export const getAdminProjectsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    const [rows]: any = await pool.query(
      'SELECT * FROM projects ORDER BY created_at DESC'
    );
    return { success: true, data: rows };
  } catch (error: any) {
    console.error("Error fetching admin projects:", error);
    return { success: false, error: error.message, data: [] };
  }
});

// Get active/published projects for the public website
export const getProjectsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    const [rows]: any = await pool.query(
      'SELECT * FROM projects WHERE is_published = TRUE ORDER BY created_at DESC'
    );
    return { success: true, data: rows };
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return { success: false, error: error.message, data: [] };
  }
});

// Get featured projects
export const getFeaturedProjectsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    const [rows]: any = await pool.query(
      'SELECT * FROM projects WHERE is_published = TRUE AND is_featured = TRUE ORDER BY created_at DESC LIMIT 6'
    );
    return { success: true, data: rows };
  } catch (error: any) {
    console.error("Error fetching featured projects:", error);
    return { success: false, error: error.message, data: [] };
  }
});

export const getProjectBySlugFn = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const pool = getMySqlPool();
      const [rows]: any = await pool.query(
        'SELECT * FROM projects WHERE slug = ? LIMIT 1',
        [slug]
      );
      if (rows.length === 0) return { success: false, error: "Project not found", data: null };
      return { success: true, data: rows[0] };
    } catch (error: any) {
      console.error("Error fetching project by slug:", error);
      return { success: false, error: error.message, data: null };
    }
});

export const addProjectFn = createServerFn({ method: "POST" })
  .validator((d: any) => d)
  .handler(async ({ data }) => {
    try {
      const formatted = formatForDb(data);
      const pool = getMySqlPool();
      const keys = Object.keys(formatted).filter(k => k !== 'id');
      const values = keys.map(k => formatted[k]);
      
      const placeholders = keys.map(() => '?').join(', ');
      const query = `INSERT INTO projects (${keys.join(', ')}) VALUES (${placeholders})`;
      
      const [result]: any = await pool.query(query, values);
      return { success: true, insertId: result.insertId };
    } catch (error: any) {
      console.error("Error adding project:", error);
      return { success: false, error: error.message };
    }
});

export const updateProjectFn = createServerFn({ method: "POST" })
  .validator((d: { id: number, data: any }) => d)
  .handler(async ({ data: { id, data } }) => {
    try {
      const formatted = formatForDb(data);
      const pool = getMySqlPool();
      const keys = Object.keys(formatted).filter(k => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
      const values = keys.map(k => formatted[k]);
      
      const setClause = keys.map(k => `${k} = ?`).join(', ');
      const query = `UPDATE projects SET ${setClause} WHERE id = ?`;
      
      await pool.query(query, [...values, id]);
      return { success: true };
    } catch (error: any) {
      console.error("Error updating project:", error);
      return { success: false, error: error.message };
    }
});

export const toggleProjectStatusFn = createServerFn({ method: "POST" })
  .validator((d: { id: number; is_published: boolean }) => d)
  .handler(async ({ data }) => {
    try {
      const { id, is_published } = data;
      const pool = getMySqlPool();
      
      await pool.query(
        'UPDATE projects SET is_published = ? WHERE id = ?',
        [is_published, id]
      );
      
      return { success: true };
    } catch (error: any) {
      console.error("Error toggling project status:", error);
      return { success: false, error: error.message };
    }
});

export const deleteProjectFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('DELETE FROM projects WHERE id = ?', [id]);
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting project:", error);
      return { success: false, error: error.message };
    }
});
