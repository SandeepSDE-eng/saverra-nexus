import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Plus, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/rentals")({ component: AdminRentals });

function AdminRentals() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "rental_updates"],
    queryFn: async () => {
      const { data, error } = await supabase.from("rental_updates").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
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

      const { error } = await supabase.from("rental_updates").insert({ title, youtube_id: yId });
      if (error) throw error;
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
      const { error } = await supabase.from("rental_updates").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "rental_updates"] });
      toast.success("Rental deleted");
    },
  });

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
                <th className="px-4 py-3">Added On</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((i) => (
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
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(i.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <Button size="icon" variant="ghost" onClick={() => { if (confirm("Delete this rental video?")) del.mutate(i.id); }}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
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
    </div>
  );
}
