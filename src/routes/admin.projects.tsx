import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/projects")({ component: AdminProjects });

type Project = Tables<"projects">;
type ProjectForm = Partial<TablesInsert<"projects">>;

const CATEGORIES = ["apartment", "villa", "commercial", "plot", "penthouse"];
const STATUSES = ["new-launch", "ultra-luxury", "premium", "ready-to-move", "upcoming"];

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 60);

const empty: ProjectForm = {
  name: "", slug: "", tagline: "", category: "apartment", status: "new-launch",
  city: "", location: "", builder: "SAVERRA Developers", bhk_options: "",
  price_display: "", possession: "", rera_number: "", cover_image: "",
  description: "", is_published: true, is_featured: true, gallery: [], amenities: [], highlights: [],
};

function AdminProjects() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectForm>(empty);

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async (payload: ProjectForm) => {
      const body: any = { ...payload };
      body.gallery = typeof body.gallery === "string" ? body.gallery.split(",").map((s: string) => s.trim()).filter(Boolean) : body.gallery ?? [];
      body.amenities = typeof body.amenities === "string" ? body.amenities.split(",").map((s: string) => s.trim()).filter(Boolean) : body.amenities ?? [];
      body.highlights = typeof body.highlights === "string" ? body.highlights.split(",").map((s: string) => s.trim()).filter(Boolean) : body.highlights ?? [];
      if (!body.slug) body.slug = slugify(body.name ?? "");
      if (editing) {
        const { error } = await supabase.from("projects").update(body).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(body);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["projects", "featured"] });
      toast.success(editing ? "Project updated" : "Project created");
      setOpen(false); setEditing(null); setForm(empty);
    },
    onError: (e: any) => toast.error(e.message ?? "Save failed"),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["projects", "featured"] });
      toast.success("Project deleted");
    },
    onError: (e: any) => toast.error(e.message ?? "Delete failed"),
  });

  const togglePub = useMutation({
    mutationFn: async (p: Project) => {
      const { error } = await supabase.from("projects").update({ is_published: !p.is_published }).eq("id", p.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["projects", "featured"] });
    },
  });

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      ...p,
      gallery: (p.gallery ?? []).join(", ") as any,
      amenities: (p.amenities ?? []).join(", ") as any,
      highlights: (p.highlights ?? []).join(", ") as any,
    });
    setOpen(true);
  };

  const set = (k: keyof ProjectForm) => (v: any) => setForm((s) => ({ ...s, [k]: v }));

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-primary">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">{data.length} project(s). Changes appear instantly on the homepage.</p>
        </div>
        <Button variant="gold" onClick={openNew}><Plus className="size-4" /> Add Project</Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/70 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id} className="border-t border-border/70">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.cover_image} alt="" className="size-11 rounded-md object-cover" />
                      <div>
                        <div className="font-semibold text-primary">{p.name}</div>
                        <div className="text-xs text-muted-foreground">/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground/80">{p.location}</td>
                  <td className="px-4 py-3 capitalize text-foreground/80">{p.category}</td>
                  <td className="px-4 py-3 font-semibold">{p.price_display}</td>
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
                      <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete "${p.name}"?`)) del.mutate(p.id); }} title="Delete">
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No projects yet. Click "Add Project" to create one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display text-2xl">{editing ? "Edit Project" : "New Project"}</DialogTitle></DialogHeader>
          <form
            onSubmit={(e) => { e.preventDefault(); save.mutate(form); }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-2"><Label>Name*</Label><Input required value={form.name ?? ""} onChange={(e) => set("name")(e.target.value)} className="mt-1" /></div>
            <div><Label>Slug (URL)</Label><Input value={form.slug ?? ""} onChange={(e) => set("slug")(e.target.value)} placeholder="auto-from-name" className="mt-1" /></div>
            <div><Label>Tagline</Label><Input value={form.tagline ?? ""} onChange={(e) => set("tagline")(e.target.value)} className="mt-1" /></div>
            <div><Label>Category</Label>
              <Select value={form.category ?? "apartment"} onValueChange={set("category")}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Status</Label>
              <Select value={form.status ?? "new-launch"} onValueChange={set("status")}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{STATUSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>City*</Label><Input required value={form.city ?? ""} onChange={(e) => set("city")(e.target.value)} className="mt-1" /></div>
            <div><Label>Location*</Label><Input required value={form.location ?? ""} onChange={(e) => set("location")(e.target.value)} placeholder="Bandra, Mumbai" className="mt-1" /></div>
            <div><Label>Builder</Label><Input value={form.builder ?? ""} onChange={(e) => set("builder")(e.target.value)} className="mt-1" /></div>
            <div><Label>BHK Options</Label><Input value={form.bhk_options ?? ""} onChange={(e) => set("bhk_options")(e.target.value)} placeholder="2, 3 & 4 BHK" className="mt-1" /></div>
            <div><Label>Price (display)*</Label><Input required value={form.price_display ?? ""} onChange={(e) => set("price_display")(e.target.value)} placeholder="₹ 1.75 Cr*" className="mt-1" /></div>
            <div><Label>Possession</Label><Input value={form.possession ?? ""} onChange={(e) => set("possession")(e.target.value)} placeholder="Dec 2026" className="mt-1" /></div>
            <div><Label>RERA Number</Label><Input value={form.rera_number ?? ""} onChange={(e) => set("rera_number")(e.target.value)} className="mt-1" /></div>
            <div className="sm:col-span-2"><Label>Cover Image URL*</Label><Input required value={form.cover_image ?? ""} onChange={(e) => set("cover_image")(e.target.value)} placeholder="https://…" className="mt-1" /></div>
            <div className="sm:col-span-2"><Label>Gallery URLs (comma-separated)</Label><Textarea value={form.gallery as any ?? ""} onChange={(e) => set("gallery")(e.target.value)} rows={2} className="mt-1" /></div>
            <div className="sm:col-span-2"><Label>Amenities (comma-separated)</Label><Textarea value={form.amenities as any ?? ""} onChange={(e) => set("amenities")(e.target.value)} rows={2} className="mt-1" /></div>
            <div className="sm:col-span-2"><Label>Highlights (comma-separated)</Label><Textarea value={form.highlights as any ?? ""} onChange={(e) => set("highlights")(e.target.value)} rows={2} className="mt-1" /></div>
            <div className="sm:col-span-2"><Label>Description</Label><Textarea rows={4} value={form.description ?? ""} onChange={(e) => set("description")(e.target.value)} className="mt-1" /></div>
            <div className="flex items-center gap-3 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!form.is_published} onChange={(e) => set("is_published")(e.target.checked)} /> Published (visible on site)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!form.is_featured} onChange={(e) => set("is_featured")(e.target.checked)} /> Featured
              </label>
            </div>
            <DialogFooter className="sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="gold" disabled={save.isPending}>{save.isPending ? "Saving…" : (editing ? "Save changes" : "Create project")}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
