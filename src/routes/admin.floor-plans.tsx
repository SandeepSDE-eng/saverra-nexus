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

export const Route = createFileRoute("/admin/floor-plans")({ component: AdminFloorPlans });

type FloorPlan = {
  id: number;
  type_key: string;
  label: string;
  area: string;
  features: string;
  image_url: string;
  is_published: boolean;
};

type FloorPlanForm = Partial<FloorPlan>;

const empty: FloorPlanForm = {
  type_key: "",
  label: "",
  area: "",
  features: "",
  image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  is_published: true,
};

function AdminFloorPlans() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FloorPlan | null>(null);
  const [form, setForm] = useState<FloorPlanForm>(empty);

  const API_URL = "http://localhost:5000/api";

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "floor-plans"],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_URL}/admin/floor-plans`);
        if (!res.ok) throw new Error("Failed to fetch floor plans");
        return await res.json() as FloorPlan[];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  const save = useMutation({
    mutationFn: async (payload: FloorPlanForm) => {
      let featuresArray = [];
      try {
        if (typeof payload.features === "string") {
            featuresArray = JSON.parse(payload.features);
        } else {
            featuresArray = payload.features;
        }
      } catch(e) {
          featuresArray = typeof payload.features === "string" ? payload.features.split(",").map(s => s.trim()) : [];
      }
      
      const body = { ...payload, features: featuresArray };
      const url = editing ? `${API_URL}/floor-plans/${editing.id}` : `${API_URL}/floor-plans`;
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Save failed");
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
      const res = await fetch(`${API_URL}/floor-plans/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
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
      let featuresArray = [];
      try {
          featuresArray = typeof p.features === "string" ? JSON.parse(p.features) : p.features;
      } catch (e) {
          featuresArray = p.features;
      }
      const res = await fetch(`${API_URL}/floor-plans/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, is_published: !p.is_published, features: featuresArray }),
      });
      if (!res.ok) throw new Error("Update failed");
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
    try {
        const arr = typeof p.features === "string" ? JSON.parse(p.features) : p.features;
        featuresStr = Array.isArray(arr) ? arr.join(", ") : "";
    } catch(e) {
        featuresStr = p.features || "";
    }

    setForm({
      ...p,
      features: featuresStr
    });
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
                      <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete "${p.label}"?`)) del.mutate(p.id); }} title="Delete">
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
              <Textarea required value={form.features as string ?? ""} onChange={(e) => set("features")(e.target.value)} rows={2} className="mt-1" placeholder="Living Room, 1 Bedroom, Balcony" />
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
