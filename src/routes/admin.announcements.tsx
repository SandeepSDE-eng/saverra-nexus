import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Plus, Trash2, CheckCircle2, XCircle, Image as ImageIcon, Globe, MessageCircle 
} from "lucide-react";
import { 
  getAdminStatusesFn, addStatusFn, deleteStatusFn, toggleStatusFn,
  getAdminPopupsFn, addPopupFn, deletePopupFn, togglePopupFn
} from "@/api/announcements";

export const Route = createFileRoute("/admin/announcements")({
  component: AdminAnnouncements,
});

function AdminAnnouncements() {
  const [activeTab, setActiveTab] = useState<'statuses' | 'popups'>('statuses');
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="font-display text-3xl font-light text-primary">Announcements & Media</h1>
        <p className="text-muted-foreground mt-1">Manage WhatsApp-style Statuses and Global Website Popups.</p>
      </div>

      <div className="flex border-b border-border">
        <button 
          onClick={() => setActiveTab('statuses')}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors ${activeTab === 'statuses' ? 'border-b-2 border-gold text-primary' : 'text-muted-foreground hover:text-primary'}`}
        >
          <MessageCircle className="size-4" /> Statuses / Stories
        </button>
        <button 
          onClick={() => setActiveTab('popups')}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors ${activeTab === 'popups' ? 'border-b-2 border-gold text-primary' : 'text-muted-foreground hover:text-primary'}`}
        >
          <Globe className="size-4" /> Global Popups
        </button>
      </div>

      {activeTab === 'statuses' ? <StatusesManager /> : <PopupsManager />}
    </div>
  );
}

function StatusesManager() {
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");

  const { data: statuses, isLoading } = useQuery({
    queryKey: ["admin_statuses"],
    queryFn: async () => {
      const res = await getAdminStatusesFn();
      if (!res.success) throw new Error(res.error);
      return res.data;
    }
  });

  const addMutation = useMutation({
    mutationFn: async () => await addStatusFn({ data: { image_url: imageUrl, title } }),
    onSuccess: (res) => {
      if (res.success) {
        setImageUrl("");
        setTitle("");
        queryClient.invalidateQueries({ queryKey: ["admin_statuses"] });
      } else alert(res.error);
    }
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: number, is_active: boolean }) => await toggleStatusFn({ data: { id, is_active } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin_statuses"] })
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await deleteStatusFn({ data: id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin_statuses"] })
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <h2 className="font-medium text-lg mb-4 flex items-center gap-2">
          <Plus className="size-5 text-gold" /> Add New Status
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Image URL (Vertical/Story Format)</label>
            <input 
              value={imageUrl} 
              onChange={e => setImageUrl(e.target.value)} 
              placeholder="https://..." 
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:border-gold outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title / Caption (Optional)</label>
            <input 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g. Happy Diwali" 
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:border-gold outline-none"
            />
          </div>
        </div>
        <button 
          onClick={() => addMutation.mutate()} 
          disabled={!imageUrl || addMutation.isPending}
          className="mt-4 bg-[color:var(--navy-deep)] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-primary transition-colors disabled:opacity-50"
        >
          {addMutation.isPending ? "Adding..." : "Add Status"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground text-xs uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Image</th>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Active</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Loading...</td></tr> : null}
            {!isLoading && statuses?.length === 0 ? <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No statuses found.</td></tr> : null}
            {statuses?.map((s: any) => (
              <tr key={s.id} className="hover:bg-muted/30">
                <td className="px-6 py-4">
                  <div className="size-12 rounded-full overflow-hidden border-2 border-gold/50">
                    <img src={s.image_url} alt="Status" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{s.title || '-'}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleMutation.mutate({ id: s.id, is_active: !s.is_active })}
                    className="flex items-center gap-1.5 text-xs font-medium bg-white border border-border rounded-full px-3 py-1 shadow-sm hover:bg-muted transition-colors"
                  >
                    {s.is_active ? <CheckCircle2 className="size-3.5 text-green-500" /> : <XCircle className="size-3.5 text-muted-foreground" />}
                    {s.is_active ? 'Active' : 'Hidden'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => { if(confirm("Delete this status?")) deleteMutation.mutate(s.id) }}
                    className="text-red-500 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PopupsManager() {
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const { data: popups, isLoading } = useQuery({
    queryKey: ["admin_popups"],
    queryFn: async () => {
      const res = await getAdminPopupsFn();
      if (!res.success) throw new Error(res.error);
      return res.data;
    }
  });

  const addMutation = useMutation({
    mutationFn: async () => await addPopupFn({ data: { image_url: imageUrl, link_url: linkUrl, is_active: true } }),
    onSuccess: (res) => {
      if (res.success) {
        setImageUrl("");
        setLinkUrl("");
        queryClient.invalidateQueries({ queryKey: ["admin_popups"] });
      } else alert(res.error);
    }
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: number, is_active: boolean }) => await togglePopupFn({ data: { id, is_active } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin_popups"] })
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await deletePopupFn({ data: id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin_popups"] })
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <h2 className="font-medium text-lg mb-4 flex items-center gap-2">
          <Plus className="size-5 text-gold" /> Add New Global Popup
        </h2>
        <p className="text-sm text-muted-foreground mb-6">When you add a new popup, it automatically becomes the active one. Only one popup can be active at a time.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Popup Image URL (Square or Landscape)</label>
            <input 
              value={imageUrl} 
              onChange={e => setImageUrl(e.target.value)} 
              placeholder="https://..." 
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:border-gold outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Redirect Link (Optional)</label>
            <input 
              value={linkUrl} 
              onChange={e => setLinkUrl(e.target.value)} 
              placeholder="/contact or https://..." 
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:border-gold outline-none"
            />
          </div>
        </div>
        <button 
          onClick={() => addMutation.mutate()} 
          disabled={!imageUrl || addMutation.isPending}
          className="mt-4 bg-[color:var(--navy-deep)] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-primary transition-colors disabled:opacity-50"
        >
          {addMutation.isPending ? "Adding..." : "Add & Activate Popup"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground text-xs uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Image</th>
              <th className="px-6 py-4 font-medium">Link</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Loading...</td></tr> : null}
            {!isLoading && popups?.length === 0 ? <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No popups found.</td></tr> : null}
            {popups?.map((p: any) => (
              <tr key={p.id} className={`hover:bg-muted/30 ${p.is_active ? 'bg-gold/5' : ''}`}>
                <td className="px-6 py-4">
                  <div className="w-20 h-14 rounded-md overflow-hidden border border-border">
                    <img src={p.image_url} alt="Popup" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium max-w-[200px] truncate">{p.link_url || '-'}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleMutation.mutate({ id: p.id, is_active: !p.is_active })}
                    className={`flex items-center gap-1.5 text-xs font-medium border rounded-full px-3 py-1 shadow-sm transition-colors ${p.is_active ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-white border-border text-muted-foreground hover:bg-muted'}`}
                  >
                    {p.is_active ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
                    {p.is_active ? 'Live Now' : 'Disabled'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => { if(confirm("Delete this popup?")) deleteMutation.mutate(p.id) }}
                    className="text-red-500 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
