import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getAdminProjectsFn, addProjectFn, updateProjectFn, deleteProjectFn, toggleProjectStatusFn, syncLiveProjectsFn } from "@/api/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

import { MOCK_PROJECTS } from "@/lib/mockProjects";

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
  const [isGenerating, setIsGenerating] = useState(false);

  const seed = useMutation({
    mutationFn: async () => {
      const response = await syncLiveProjectsFn();
      if (!response.success) throw new Error(response.error);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["projects", "featured"] });
      toast.success("Live Projects synchronized (4 Live + Rest Draft)!");
    },
    onError: (e: any) => toast.error(e.message ?? "Sync failed"),
  });

  const generateAI = async () => {
    if (!form.name || !form.location) {
      toast.error("Please enter Project Name and Location first.");
      return;
    }
    setIsGenerating(true);
    
    const hooks = [
      `Welcome to ${form.name}, an iconic landmark redefining luxury living in ${form.location}.`,
      `Discover the pinnacle of elegance at ${form.name}, beautifully situated in the vibrant heart of ${form.location}.`,
      `Experience a lifestyle beyond compare at ${form.name}, a premium sanctuary located in ${form.location}.`,
      `${form.name} in ${form.location} presents a rare opportunity to own a masterpiece of modern architecture.`
    ];
    
    const bodies = [
      `Designed for those with impeccable taste, this property offers world-class amenities and breathtaking panoramic views.`,
      `Every inch of this development has been meticulously crafted to offer unparalleled comfort, blending tranquility with urban convenience.`,
      `Boasting state-of-the-art facilities, lush green landscapes, and exclusive clubhouses, it sets a new benchmark for premium real estate.`,
      `With spacious layouts, abundant natural light, and premium fittings, it promises a living experience that is both lavish and serene.`
    ];
    
    const closings = [
      `Step into your dream home today and embrace a future of limitless possibilities.`,
      `This is not just a residence; it is a statement of your success and refined lifestyle.`,
      `Secure your piece of paradise and elevate your everyday living to extraordinary heights.`,
      `Don't miss the chance to be part of this exclusive community of forward-thinkers.`
    ];

    const taglines = [
      `Ultimate Luxury in ${form.location}`,
      `Redefining Elegance at ${form.name}`,
      `Your Dream Home Awaits in ${form.location}`,
      `Premium Living, Perfected.`
    ];

    const allAmenities = [
      "Infinity Pool, Clubhouse, 24/7 Security",
      "Gymnasium, Landscaped Gardens, Smart Home Features",
      "Spa, Kids Play Area, Jogging Track, Rooftop Lounge",
      "Concierge Service, Vastu Compliant, High-Speed Elevators"
    ];

    const allHighlights = [
      "Premium Location, Vastu Compliant, High-Speed Elevators, Smart Home Features",
      "100% Power Backup, Earth-quake Resistant, Italian Marble Flooring",
      "Exclusive Sky Lounge, Private Pools, Multi-tier Security",
      "Close to Metro Station, Top Schools nearby, High ROI & Capital Growth"
    ];

    const randomPick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Simulate AI generation delay
    setTimeout(() => {
      setForm((s: any) => ({
        ...s,
        description: `${randomPick(hooks)} ${randomPick(bodies)} ${randomPick(closings)}`,
        tagline: randomPick(taglines),
        amenities: randomPick(allAmenities) as any,
        highlights: randomPick(allHighlights) as any
      }));
      setIsGenerating(false);
      toast.success("AI generated a unique premium description!");
    }, 1500);
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      try {
        const response = await getAdminProjectsFn();
        if (!response.success) throw new Error((response as any).error || "Failed to fetch");
        return response.data as Project[];
      } catch (error: any) {
        console.warn("MySQL Error:", error);
        return [];
      }
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
        const response = await updateProjectFn({ data: { id: Number(editing.id), data: body } });
        if (!response.success) throw new Error(response.error);
      } else {
        const response = await addProjectFn({ data: body });
        if (!response.success) throw new Error(response.error);
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
    mutationFn: async (id: number | string) => {
      const response = await deleteProjectFn({ data: Number(id) });
      if (!response.success) throw new Error(response.error);
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
      const response = await toggleProjectStatusFn({ data: { id: Number(p.id), is_published: !p.is_published } });
      if (!response.success) throw new Error(response.error);
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

const compressImage = (file: File, maxWidth = 1200, quality = 0.85): Promise<string> => {
  return new Promise((resolve) => {
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || "");
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } else {
          resolve((e.target?.result as string) || "");
        }
      };
      img.onerror = () => resolve((e.target?.result as string) || "");
      img.src = (e.target?.result as string) || "";
    };
    reader.readAsDataURL(file);
  });
};

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "cover_image" | "gallery") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    if (field === "cover_image") {
      const base64 = await compressImage(files[0]);
      setForm(s => ({ ...s, cover_image: base64 }));
      toast.success("Cover image uploaded permanently!");
    } else {
      const fileList = Array.from(files);
      const base64Urls = await Promise.all(fileList.map(f => compressImage(f)));
      const validUrls = base64Urls.filter(Boolean);
      const existing = typeof form.gallery === "string" ? form.gallery : (form.gallery?.join(", ") || "");
      const newGallery = existing ? `${existing}, ${validUrls.join(", ")}` : validUrls.join(", ");
      setForm(s => ({ ...s, gallery: newGallery as any }));
      toast.success(`${validUrls.length} images added to gallery permanently!`);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-primary">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">{data.length} project(s). Changes appear instantly on the homepage.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => seed.mutate()} disabled={seed.isPending} className="border-gold text-gold hover:bg-gold/10">
            <Sparkles className="size-4 mr-2" />
            {seed.isPending ? "Syncing..." : "Sync Live Projects (4 Live + Draft)"}
          </Button>
          <Button variant="gold" onClick={openNew}><Plus className="size-4 mr-1" /> Add Project</Button>
        </div>
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
                      <img 
                        src={p.cover_image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&q=80"} 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&q=80";
                        }}
                        alt={p.name} 
                        className="size-11 rounded-md object-cover bg-muted" 
                      />
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
            <div><Label>Configuration (BHK)</Label><Input value={form.bhk_options ?? ""} onChange={(e) => set("bhk_options")(e.target.value)} placeholder="2, 3 & 4 BHK" className="mt-1" /></div>
            <div><Label>Carpet Area</Label><Input value={form.rera_number ?? ""} onChange={(e) => set("rera_number")(e.target.value)} placeholder="e.g. 750 - 1,450 Sq.Ft." className="mt-1" /></div>
            <div><Label>Starting Price (display)*</Label><Input required value={form.price_display ?? ""} onChange={(e) => set("price_display")(e.target.value)} placeholder="₹ 1.75 Cr*" className="mt-1" /></div>
            <div><Label>Possession</Label><Input value={form.possession ?? ""} onChange={(e) => set("possession")(e.target.value)} placeholder="Dec 2026" className="mt-1" /></div>
            
            <div className="sm:col-span-2">
              <Label>Cover Image (Upload or URL)*</Label>
              <div className="flex gap-2 mt-1">
                <Input required value={form.cover_image ?? ""} onChange={(e) => set("cover_image")(e.target.value)} placeholder="https://…" className="flex-1" />
                <div className="relative">
                  <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "cover_image")} className="absolute inset-0 opacity-0 cursor-pointer w-28" title="Upload Image" />
                  <Button type="button" variant="outline" className="w-28 pointer-events-none">Upload File</Button>
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <Label>Gallery Images (Upload or URLs comma-separated)</Label>
              <div className="flex gap-2 mt-1 items-start">
                <Textarea value={form.gallery as any ?? ""} onChange={(e) => set("gallery")(e.target.value)} rows={2} className="flex-1" />
                <div className="relative h-[54px]">
                  <Input type="file" accept="image/*" multiple onChange={(e) => handleFileUpload(e, "gallery")} className="absolute inset-0 opacity-0 cursor-pointer w-28 h-full" title="Upload Images" />
                  <Button type="button" variant="outline" className="w-28 h-[54px] pointer-events-none whitespace-normal leading-tight">Upload Files</Button>
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-2"><Label>Amenities (comma-separated)</Label><Textarea value={form.amenities as any ?? ""} onChange={(e) => set("amenities")(e.target.value)} rows={2} className="mt-1" /></div>
            <div className="sm:col-span-2"><Label>Highlights (comma-separated)</Label><Textarea value={form.highlights as any ?? ""} onChange={(e) => set("highlights")(e.target.value)} rows={2} className="mt-1" /></div>
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <Label>Description</Label>
                <Button type="button" variant="outline" size="sm" className="h-7 text-xs bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100 hover:text-purple-700" onClick={generateAI} disabled={isGenerating}>
                  <Sparkles className="size-3 mr-1" /> {isGenerating ? "Generating..." : "AI Auto-Fill"}
                </Button>
              </div>
              <Textarea rows={4} value={form.description ?? ""} onChange={(e) => set("description")(e.target.value)} />
            </div>
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
