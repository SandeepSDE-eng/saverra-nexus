const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getSocialPostsFn = async () => {
  try {
    const res = await fetch(`${API_URL}/api/social-media`);
    if (!res.ok) throw new Error("Failed to fetch social posts");
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getAdminSocialPostsFn = async () => {
  try {
    const res = await fetch(`${API_URL}/api/admin/social-media`);
    if (!res.ok) throw new Error("Failed to fetch admin social posts");
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const addSocialPostFn = async ({ data }: { data: { platform: string; url: string; embed_id?: string; title?: string } }) => {
  try {
    const res = await fetch(`${API_URL}/api/social-media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add social post");
    const result = await res.json();
    return { success: true, id: result.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteSocialPostFn = async ({ data }: { data: { id: number } }) => {
  try {
    const res = await fetch(`${API_URL}/api/social-media/${data.id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete social post");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
