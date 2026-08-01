const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getInquiriesFn = async () => {
  try {
    const res = await fetch(`${API_URL}/api/inquiries`);
    if (!res.ok) throw new Error("Failed to fetch inquiries");
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
};

export const addInquiryFn = async ({ data }: { data: any }) => {
  try {
    const res = await fetch(`${API_URL}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add inquiry");
    const result = await res.json();
    return { success: true, insertId: result.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteInquiryFn = async ({ data: id }: { data: number }) => {
  try {
    const res = await fetch(`${API_URL}/api/inquiries/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete inquiry");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
