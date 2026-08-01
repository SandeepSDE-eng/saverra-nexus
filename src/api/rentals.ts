const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getRentalsFn = async () => {
  try {
    const res = await fetch(`${API_URL}/api/rentals`);
    if (!res.ok) throw new Error("Failed to fetch rentals");
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
};

export const getAdminRentalsFn = async () => {
  try {
    const res = await fetch(`${API_URL}/api/admin/rentals`);
    if (!res.ok) throw new Error("Failed to fetch admin rentals");
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
};

export const addRentalFn = async ({ data }: { data: { title: string; youtube_id: string } }) => {
  try {
    const res = await fetch(`${API_URL}/api/rentals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add rental");
    const result = await res.json();
    return { success: true, insertId: result.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const toggleRentalStatusFn = async ({ data }: { data: { id: number; is_active: boolean } }) => {
  try {
    const res = await fetch(`${API_URL}/api/rentals/${data.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: data.is_active }),
    });
    if (!res.ok) throw new Error("Failed to toggle rental status");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateRentalFn = async ({ data }: { data: { id: number; title: string; youtube_id: string } }) => {
  try {
    const res = await fetch(`${API_URL}/api/rentals/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update rental");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteRentalFn = async ({ data: id }: { data: number }) => {
  try {
    const res = await fetch(`${API_URL}/api/rentals/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete rental");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
