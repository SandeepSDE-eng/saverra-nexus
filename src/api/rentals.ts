import { createServerFn } from "@tanstack/react-start";
import { getMySqlPool } from "@/lib/mysql";

// Get all active rentals for the public website
export const getRentalsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    const [rows]: any = await pool.query(
      'SELECT * FROM rental_updates WHERE is_active = TRUE ORDER BY created_at DESC'
    );
    return { success: true, data: rows };
  } catch (error: any) {
    console.error("Error fetching rentals:", error);
    return { success: false, error: error.message, data: [] };
  }
});

// Get all rentals (active and inactive) for the Admin Panel
export const getAdminRentalsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    const [rows]: any = await pool.query(
      'SELECT * FROM rental_updates ORDER BY created_at DESC'
    );
    return { success: true, data: rows };
  } catch (error: any) {
    console.error("Error fetching admin rentals:", error);
    return { success: false, error: error.message, data: [] };
  }
});

export const addRentalFn = createServerFn({ method: "POST" })
  .validator((d: { title: string; youtube_id: string }) => d)
  .handler(async ({ data }) => {
    try {
      const { title, youtube_id } = data;
      const pool = getMySqlPool();
      
      const [result]: any = await pool.query(
        'INSERT INTO rental_updates (title, youtube_id, is_active) VALUES (?, ?, TRUE)',
        [title, youtube_id]
      );
      
      return { success: true, insertId: result.insertId };
    } catch (error: any) {
      console.error("Error adding rental:", error);
      return { success: false, error: error.message };
    }
});

export const toggleRentalStatusFn = createServerFn({ method: "POST" })
  .validator((d: { id: number; is_active: boolean }) => d)
  .handler(async ({ data }) => {
    try {
      const { id, is_active } = data;
      const pool = getMySqlPool();
      
      await pool.query(
        'UPDATE rental_updates SET is_active = ? WHERE id = ?',
        [is_active, id]
      );
      
      return { success: true };
    } catch (error: any) {
      console.error("Error toggling rental status:", error);
      return { success: false, error: error.message };
    }
});

export const updateRentalFn = createServerFn({ method: "POST" })
  .validator((d: { id: number; title: string; youtube_id: string }) => d)
  .handler(async ({ data }) => {
    try {
      const { id, title, youtube_id } = data;
      const pool = getMySqlPool();
      
      await pool.query(
        'UPDATE rental_updates SET title = ?, youtube_id = ? WHERE id = ?',
        [title, youtube_id, id]
      );
      
      return { success: true };
    } catch (error: any) {
      console.error("Error updating rental:", error);
      return { success: false, error: error.message };
    }
});

export const deleteRentalFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('DELETE FROM rental_updates WHERE id = ?', [id]);
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting rental:", error);
      return { success: false, error: error.message };
    }
});
