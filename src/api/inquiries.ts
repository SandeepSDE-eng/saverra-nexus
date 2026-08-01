import { createServerFn } from "@tanstack/react-start";
import { getMySqlPool } from "@/lib/mysql";

// Get all inquiries for the admin panel
export const getInquiriesFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = getMySqlPool();
    const [rows]: any = await pool.query(
      'SELECT * FROM inquiries ORDER BY created_at DESC'
    );
    return { success: true, data: rows };
  } catch (error: any) {
    console.error("Error fetching inquiries:", error);
    return { success: false, error: error.message, data: [] };
  }
});

export const addInquiryFn = createServerFn({ method: "POST" })
  .validator((d: { name: string; email?: string; phone: string; message?: string; project_id?: number; city?: string; budget?: string; source?: string }) => d)
  .handler(async ({ data }) => {
    try {
      const { name, email, phone, message, project_id, city, budget, source } = data;
      const pool = getMySqlPool();
      
      const [result]: any = await pool.query(
        'INSERT INTO inquiries (name, email, phone, message, project_id, city, budget, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email || null, phone, message || null, project_id || null, city || null, budget || null, source || 'Website']
      );
      
      return { success: true, insertId: result.insertId };
    } catch (error: any) {
      console.error("Error adding inquiry:", error);
      return { success: false, error: error.message };
    }
});

export const deleteInquiryFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('DELETE FROM inquiries WHERE id = ?', [id]);
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting inquiry:", error);
      return { success: false, error: error.message };
    }
});
