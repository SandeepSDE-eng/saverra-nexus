const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// --- Floor Plans ---
export const getFloorPlansFn = async () => {
  try {
    const res = await fetch(`${API_URL}/api/admin/floor-plans`);
    if (!res.ok) throw new Error("Failed to fetch floor plans");
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
};

export const updateFloorPlanStatusFn = async ({ data: { id, is_published } }: { data: { id: number; is_published: boolean } }) => {
  try {
    const res = await fetch(`${API_URL}/api/floor-plans/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateFloorPlanFn = async ({ data }: { data: { id: number; type_key: string; label: string; area: string; image_url: string; is_published: boolean; features: string[] } }) => {
  try {
    const res = await fetch(`${API_URL}/api/floor-plans/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update floor plan");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const createFloorPlanFn = async ({ data }: { data: { type_key: string; label: string; area: string; image_url: string; is_published: boolean; features: string[] } }) => {
  try {
    const res = await fetch(`${API_URL}/api/floor-plans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create floor plan");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteFloorPlanFn = async ({ data: id }: { data: number }) => {
  try {
    const res = await fetch(`${API_URL}/api/floor-plans/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete floor plan");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// --- Career Applications ---
export const getCareerApplicationsFn = async () => {
  try {
    const res = await fetch(`${API_URL}/api/careers`);
    if (!res.ok) throw new Error("Failed to fetch applications");
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
};

export const updateCareerStatusFn = async ({ data: { id, status } }: { data: { id: number; status: string } }) => {
  try {
    const res = await fetch(`${API_URL}/api/careers/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteCareerApplicationFn = async ({ data: id }: { data: number }) => {
  try {
    const res = await fetch(`${API_URL}/api/careers/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete application");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const submitCareerApplicationFn = async ({ data }: { data: any }) => {
  try {
    const res = await fetch(`${API_URL}/api/careers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit application");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
