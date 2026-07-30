import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getFloorPlansFn, createFloorPlanFn, updateFloorPlanFn, deleteFloorPlanFn, updateFloorPlanStatusFn } from "@/api/misc";

export const Route = createFileRoute("/admin/floor-plans")({ component: AdminFloorPlans });

type FloorPlan = {
  id: string; // UUID from Supabase
  type_key: string;
  label: string;
  area: string;
  features: string | any[]; // JSONB from Supabase
  image_url: string;
  is_published: boolean;
};

type FloorPlanForm = Partial<FloorPlan> & { featuresStr?: string };

const empty: FloorPlanForm = {
  type_key: "",
  label: "",
  area: "",
  featuresStr: "",
  image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  is_published: true,
};

function AdminFloorPlans() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FloorPlan | null>(null);
  const [form, setForm] = useState<FloorPlanForm>(empty);
  const { data = [], isLoading, error: queryError } = useQuery({
    queryKey: ["admin", "floor-plans"],
    retry: false,
    queryFn: async () => {
      const response = await getFloorPlansFn();
      if (!response.success) {
        console.warn("MySQL Error (using mock fallback):", response.error);
        return [
          { id: 1, type_key: "1bhk", label: "1 BHK", area: "620 Sq.Ft", features: '["Living Room", "1 Bedroom", "Modular Kitchen", "Balcony"]', image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", is_published: true },
          { id: 2, type_key: "2bhk", label: "2 BHK", area: "850 Sq.Ft", features: '["Spacious Living Room", "2 Bedrooms", "Modular Kitchen", "2 Bathrooms", "Balcony"]', image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", is_published: true }
        ] as any[];
      }
      return response.data as FloorPlan[];
    },
  });

  const save = useMutation({
    mutationFn: async (payload: FloorPlanForm) => {
      let featuresArray = [];
      try {
        featuresArray = typeof payload.featuresStr === "string" 
          ? payload.featuresStr.split(",").map(s => s.trim()).filter(Boolean) 
          : [];
      } catch(e) {
        featuresArray = [];
      }
      
      const body = { 
        type_key: payload.type_key,
        label: payload.label,
        area: payload.area,
        image_url: payload.image_url,
        is_published: payload.is_published !== false,
        features: featuresArray 
      };

      if (editing) {
        const response = await updateFloorPlanFn({ data: { id: Number(editing.id), ...body } as any });
        if (!response.success) throw new Error(response.error);
      } else {
        const response = await createFloorPlanFn({ data: body as any });
        if (!response.success) throw new Error(response.error);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "floor-plans"] });
      qc.invalidateQueries({ queryKey: ["site", "floor-plans"] });
      toast.success(editing ? "Floor plan updated" : "Floor plan created");
      setOpen(false); setEditing(null); setForm(empty);
    },
    onError: (e: any) => toast.error(e.message ?? "Save failed"),
  });

  const del = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteFloorPlanFn({ data: id });
      if (!response.success) throw new Error(response.error);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "floor-plans"] });
      qc.invalidateQueries({ queryKey: ["site", "floor-plans"] });
      toast.success("Floor plan deleted");
    },
    onError: (e: any) => toast.error(e.message ?? "Delete failed"),
  });

  const togglePub = useMutation({
    mutationFn: async (p: FloorPlan) => {
      const response = await updateFloorPlanStatusFn({ data: { id: Number(p.id), is_published: !p.is_published }});
      if (!response.success) throw new Error(response.error);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "floor-plans"] });
      qc.invalidateQueries({ queryKey: ["site", "floor-plans"] });
    },
  });

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (p: FloorPlan) => {
    setEditing(p);
    let featuresStr = "";
    if (Array.isArray(p.features)) {
      featuresStr = p.features.join(", ");
    } else if (typeof p.features === "string") {
      try {
        const parsed = JSON.parse(p.features);
        featuresStr = Array.isArray(parsed) ? parsed.join(", ") : p.features;
      } catch {
        featuresStr = p.features;
      }
    }
    setForm({ ...p, featuresStr });
    setOpen(true);
  };

  const set = (k: keyof FloorPlanForm) => (v: any) => setForm((s) => ({ ...s, [k]: v }));

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-primary">Floor Plans</h1>
          <p className="mt-1 text-sm text-muted-foreground">{data.length} plan(s). Changes appear instantly on the homepage.</p>
        </div>
        <Button variant="gold" onClick={openNew}><Plus className="size-4" /> Add Plan</Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/70 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Label</th>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id} className="border-t border-border/70">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image_url} alt="" className="size-11 rounded-md object-cover" />
                      <div className="font-semibold text-primary">{p.label}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground/80">{p.type_key}</td>
                  <td className="px-4 py-3 text-foreground/80">{p.area}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${p.is_published ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                      {p.is_published ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => togglePub.mutate(p)} title={p.is_published ? "Unpublish" : "Publish"}>
                        {p.is_published ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => openEdit(p)} title="Edit"><Pencil className="size-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete "${p.label}"?`)) del.mutate(Number(p.id)); }} title="Delete">
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No floor plans yet. Click "Add Plan" to create one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display text-2xl">{editing ? "Edit Floor Plan" : "New Floor Plan"}</DialogTitle></DialogHeader>
          <form
            onSubmit={(e) => { e.preventDefault(); save.mutate(form); }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div><Label>Label*</Label><Input required value={form.label ?? ""} onChange={(e) => set("label")(e.target.value)} placeholder="e.g. 1 BHK" className="mt-1" /></div>
            <div><Label>Type Key* (Unique identifier)</Label><Input required value={form.type_key ?? ""} onChange={(e) => set("type_key")(e.target.value)} placeholder="e.g. 1bhk" className="mt-1" disabled={!!editing} /></div>
            <div><Label>Carpet Area*</Label><Input required value={form.area ?? ""} onChange={(e) => set("area")(e.target.value)} placeholder="e.g. 620 Sq.Ft" className="mt-1" /></div>
            
            <div className="sm:col-span-2">
              <Label>Image URL*</Label>
              <Input required value={form.image_url ?? ""} onChange={(e) => set("image_url")(e.target.value)} className="mt-1" />
            </div>
            
            <div className="sm:col-span-2">
              <Label>Features (comma-separated)</Label>
              <Textarea required value={form.featuresStr ?? ""} onChange={(e) => set("featuresStr")(e.target.value)} rows={2} className="mt-1" placeholder="Living Room, 1 Bedroom, Balcony" />
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!form.is_published} onChange={(e) => set("is_published")(e.target.checked)} /> Published (visible on site)
              </label>
            </div>
            <DialogFooter className="sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="gold" disabled={save.isPending}>{save.isPending ? "Saving…" : (editing ? "Save changes" : "Create plan")}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
