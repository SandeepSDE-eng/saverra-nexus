import { createServerFn } from '@tanstack/react-start';
import { getMySqlPool } from '@/lib/mysql';

export const getSocialPostsFn = createServerFn({ method: 'GET' })
  .handler(async () => {
    try {
      const pool = getMySqlPool();
      const [rows] = await pool.query(
        "SELECT * FROM social_media_posts WHERE status = 'active' ORDER BY created_at DESC"
      );
      return { success: true, data: rows as any[] };
    } catch (error: any) {
      console.error('Error fetching social posts:', error);
      return { success: false, error: error.message };
    }
  });

export const getAdminSocialPostsFn = createServerFn({ method: 'GET' })
  .handler(async () => {
    try {
      const pool = getMySqlPool();
      const [rows] = await pool.query('SELECT * FROM social_media_posts ORDER BY created_at DESC');
      return { success: true, data: rows as any[] };
    } catch (error: any) {
      console.error('Error fetching admin social posts:', error);
      return { success: false, error: error.message };
    }
  });

export const addSocialPostFn = createServerFn({ method: 'POST' })
  .validator((data: { platform: string; url: string; embed_id?: string; title?: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { platform, url, embed_id, title } = data;
      const pool = getMySqlPool();
      const [result]: any = await pool.query(
        'INSERT INTO social_media_posts (platform, url, embed_id, title) VALUES (?, ?, ?, ?)',
        [platform, url, embed_id || null, title || null]
      );
      return { success: true, id: result.insertId };
    } catch (error: any) {
      console.error('Error adding social post:', error);
      return { success: false, error: error.message };
    }
  });

export const deleteSocialPostFn = createServerFn({ method: 'POST' })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    try {
      const pool = getMySqlPool();
      await pool.query('DELETE FROM social_media_posts WHERE id = ?', [data.id]);
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting social post:', error);
      return { success: false, error: error.message };
    }
  });
