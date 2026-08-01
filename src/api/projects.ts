const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Get all projects for the admin panel
export const getAdminProjectsFn = async () => {
  try {
    const res = await fetch(`${API_URL}/api/admin/projects`);
    if (!res.ok) throw new Error("Failed to fetch admin projects");
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
};

// Get active/published projects for the public website
export const getProjectsFn = async () => {
  try {
    const res = await fetch(`${API_URL}/api/projects`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
};

// Get featured projects
export const getFeaturedProjectsFn = async () => {
  try {
    const res = await fetch(`${API_URL}/api/projects/featured`);
    if (!res.ok) throw new Error("Failed to fetch featured projects");
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
};

export const getProjectBySlugFn = async ({ data: slug }: { data: string }) => {
  try {
    const res = await fetch(`${API_URL}/api/projects/slug/${slug}`);
    if (!res.ok) {
      if (res.status === 404) return { success: false, error: "Project not found", data: null };
      throw new Error("Failed to fetch project");
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: null };
  }
};

export const addProjectFn = async ({ data }: { data: any }) => {
  try {
    const res = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add project");
    const result = await res.json();
    return { success: true, insertId: result.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateProjectFn = async ({ data: { id, data } }: { data: { id: number; data: any } }) => {
  try {
    const res = await fetch(`${API_URL}/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update project");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const toggleProjectStatusFn = async ({ data }: { data: { id: number; is_published: boolean } }) => {
  try {
    const res = await fetch(`${API_URL}/api/projects/${data.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: data.is_published }),
    });
    if (!res.ok) throw new Error("Failed to toggle status");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteProjectFn = async ({ data: id }: { data: number }) => {
  try {
    const res = await fetch(`${API_URL}/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete project");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
