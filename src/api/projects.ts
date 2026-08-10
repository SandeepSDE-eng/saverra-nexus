import { createServerFn } from "@tanstack/react-start";
import { getMySqlPool } from "@/lib/mysql";
import { MOCK_PROJECTS } from "@/lib/mockProjects";

const LIVE_SLUGS = ["micl-aaradhya-onepark", "adani-the-views", "orient-odyssey", "9-anemone-heights"];

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
    if (!rows || rows.length === 0) {
      return { success: true, data: MOCK_PROJECTS };
    }
    return { success: true, data: rows };
  } catch (error: any) {
    console.error("Error fetching admin projects:", error);
    return { success: true, data: MOCK_PROJECTS };
  }
});

// Get active/published projects for the public website
export const getProjectsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    const [rows]: any = await pool.query(
      'SELECT * FROM projects WHERE is_published = TRUE ORDER BY created_at DESC'
    );
    
    // Check if the returned rows contain our new live projects
    const hasNewLiveProjects = rows && rows.some((r: any) => LIVE_SLUGS.includes(r.slug));
    if (!rows || rows.length === 0 || !hasNewLiveProjects) {
      return { success: true, data: MOCK_PROJECTS.filter((p: any) => p.is_published !== false) };
    }
    
    // Return only published projects that match our current slug configuration
    const validLiveRows = rows.filter((r: any) => LIVE_SLUGS.includes(r.slug));
    return { success: true, data: validLiveRows.length > 0 ? validLiveRows : MOCK_PROJECTS.filter((p: any) => p.is_published !== false) };
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return { success: true, data: MOCK_PROJECTS.filter((p: any) => p.is_published !== false) };
  }
});

// Get featured projects
export const getFeaturedProjectsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    const [rows]: any = await pool.query(
      'SELECT * FROM projects WHERE is_published = TRUE AND is_featured = TRUE ORDER BY created_at DESC LIMIT 8'
    );
    
    const hasNewLiveProjects = rows && rows.some((r: any) => LIVE_SLUGS.includes(r.slug));
    if (!rows || rows.length === 0 || !hasNewLiveProjects) {
      return { success: true, data: MOCK_PROJECTS.filter((p: any) => p.is_published !== false) };
    }
    
    const validLiveRows = rows.filter((r: any) => LIVE_SLUGS.includes(r.slug));
    return { success: true, data: validLiveRows.length > 0 ? validLiveRows : MOCK_PROJECTS.filter((p: any) => p.is_published !== false) };
  } catch (error: any) {
    console.error("Error fetching featured projects:", error);
    return { success: true, data: MOCK_PROJECTS.filter((p: any) => p.is_published !== false) };
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
      if (rows && rows.length > 0) {
        return { success: true, data: rows[0] };
      }
      const mock = MOCK_PROJECTS.find((p: any) => p.slug === slug);
      if (mock) return { success: true, data: mock };
      return { success: false, error: "Project not found", data: null };
    } catch (error: any) {
      const mock = MOCK_PROJECTS.find((p: any) => p.slug === slug);
      if (mock) return { success: true, data: mock };
      return { success: false, error: error.message, data: null };
    }
});

export const syncLiveProjectsFn = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    // 1. Unpublish all current projects in DB first
    await pool.query('UPDATE projects SET is_published = FALSE');

    // 2. Upsert/Add all MOCK_PROJECTS into DB
    for (const p of MOCK_PROJECTS) {
      const formatted = formatForDb(p);
      const keys = Object.keys(formatted).filter(k => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
      const values = keys.map(k => formatted[k]);

      const [existing]: any = await pool.query('SELECT id FROM projects WHERE slug = ?', [p.slug]);
      if (existing && existing.length > 0) {
        const setClause = keys.map(k => `${k} = ?`).join(', ');
        await pool.query(`UPDATE projects SET ${setClause} WHERE id = ?`, [...values, existing[0].id]);
      } else {
        const placeholders = keys.map(() => '?').join(', ');
        await pool.query(`INSERT INTO projects (${keys.join(', ')}) VALUES (${placeholders})`, values);
      }
    }
    return { success: true };
  } catch (error: any) {
    console.error("Error syncing live projects:", error);
    return { success: false, error: error.message };
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
