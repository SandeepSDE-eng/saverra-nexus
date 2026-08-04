import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Plus, ExternalLink, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { getAdminRentalsFn, addRentalFn, deleteRentalFn, toggleRentalStatusFn, updateRentalFn } from "@/api/rentals";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/rentals")({ component: AdminRentals });

function AdminRentals() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [editingRental, setEditingRental] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editYoutubeLink, setEditYoutubeLink] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "rental_updates"],
    queryFn: async () => {
      try {
        const response = await getAdminRentalsFn();
        if (!response.success) throw new Error(response.error || "Failed to fetch rentals");
        return response.data;
      } catch (error: any) {
         console.warn("MySQL Fetch Error:", error);
         return [];
      }
    },
  });

  const extractYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : (url.length === 11 ? url : null);
  };

  const add = useMutation({
    mutationFn: async () => {
      const yId = extractYoutubeId(youtubeLink);
      if (!yId) throw new Error("Invalid YouTube Link or ID");
      if (!title.trim()) throw new Error("Title is required");

      const response = await addRentalFn({ data: { title, youtube_id: yId } });
      if (!response.success) throw new Error(response.error || "Failed to add rental");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "rental_updates"] });
      toast.success("Rental video added!");
      setTitle("");
      setYoutubeLink("");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const del = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteRentalFn({ data: id });
      if (!response.success) throw new Error(response.error || "Failed to delete rental");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "rental_updates"] });
      toast.success("Rental deleted");
    },
  });

  const toggleStatus = useMutation({
    mutationFn: async ({ id, is_active }: { id: number; is_active: boolean }) => {
      const response = await toggleRentalStatusFn({ data: { id, is_active } });
      if (!response.success) throw new Error(response.error || "Failed to update status");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "rental_updates"] });
      toast.success("Status updated!");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const update = useMutation({
    mutationFn: async () => {
      const yId = extractYoutubeId(editYoutubeLink);
      if (!yId) throw new Error("Invalid YouTube Link or ID");
      if (!editTitle.trim()) throw new Error("Title is required");

      const response = await updateRentalFn({ data: { id: editingRental.id, title: editTitle, youtube_id: yId } });
      if (!response.success) throw new Error(response.error || "Failed to update rental");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "rental_updates"] });
      toast.success("Rental video updated!");
      setIsEditDialogOpen(false);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const openEdit = (rental: any) => {
    setEditingRental(rental);
    setEditTitle(rental.title);
    setEditYoutubeLink(`https://youtube.com/shorts/${rental.youtube_id}`);
    setIsEditDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow">Content Management</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-primary">Rentals & Updates</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your quick property tour videos (YouTube Shorts).</p>
      </div>

      <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Add New Rental Video</h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Property Title</label>
            <Input placeholder="e.g. 2 BHK Fully Furnished in BKC..." value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-xs font-medium text-muted-foreground">YouTube Short Link</label>
            <Input placeholder="e.g. https://youtube.com/shorts/..." value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
          </div>
          <Button onClick={() => add.mutate()} disabled={add.isPending || !title || !youtubeLink}>
            <Plus className="mr-2 size-4" /> Add Video
          </Button>
        </div>
      </div>

      {isLoading ? <p className="text-muted-foreground">Loading…</p> : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/70 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Thumbnail</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">YouTube ID</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Added On</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i: any) => (
                <tr key={i.id} className="border-t border-border/70 align-middle">
                  <td className="px-4 py-3">
                    <img src={`https://i.ytimg.com/vi/${i.youtube_id}/hqdefault.jpg`} alt={i.title} className="h-16 w-12 object-cover rounded bg-secondary" />
                  </td>
                  <td className="px-4 py-3 font-semibold text-primary">{i.title}</td>
                  <td className="px-4 py-3">
                    <a href={`https://youtube.com/shorts/${i.youtube_id}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gold hover:underline">
                      {i.youtube_id} <ExternalLink className="size-3" />
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${i.is_active ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {i.is_active ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(i.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant={i.is_active ? "outline" : "default"} onClick={() => toggleStatus.mutate({ id: i.id, is_active: !i.is_active })}>
                        {i.is_active ? <EyeOff className="size-4 mr-1" /> : <Eye className="size-4 mr-1" />}
                        {i.is_active ? 'Hide' : 'Publish'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => openEdit(i)}>
                        Edit
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => { if (confirm("Delete this rental video?")) del.mutate(i.id); }}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No rental videos yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Rental Video</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="youtube">YouTube Short Link</Label>
              <Input
                id="youtube"
                value={editYoutubeLink}
                onChange={(e) => setEditYoutubeLink(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => update.mutate()} disabled={update.isPending || !editTitle || !editYoutubeLink}>
              {update.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
