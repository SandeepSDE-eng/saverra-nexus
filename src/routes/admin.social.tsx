import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ExternalLink, Plus, RefreshCw, Instagram, Youtube, Facebook } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/social")({
  component: AdminSocial,
});

type SocialPlatform = 'instagram' | 'youtube' | 'facebook';

interface SocialPost {
  id: string;
  platform: SocialPlatform;
  url: string;
  embed_id: string;
  title: string | null;
  status: string;
  created_at: string;
}

// Utility to extract embed IDs
const extractEmbedId = (url: string, platform: SocialPlatform): string | null => {
  try {
    if (platform === 'youtube') {
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
      return match ? match[1] : null;
    }
    if (platform === 'instagram') {
      // e.g. https://www.instagram.com/p/CXYZ12345/ or https://www.instagram.com/reel/CXYZ12345/
      const match = url.match(/(?:instagram\.com\/(?:p|reel|tv)\/)([^\/\?]+)/);
      return match ? match[1] : null;
    }
    if (platform === 'facebook') {
      // Facebook URLs are complex, we might just store the encoded URL
      return encodeURIComponent(url);
    }
    return null;
  } catch (e) {
    return null;
  }
};

const determinePlatform = (url: string): SocialPlatform | null => {
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
  return null;
};

function AdminSocial() {
  const queryClient = useQueryClient();
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin_social_posts"],
    queryFn: async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/admin/social-media`);
        if (!response.ok) throw new Error("Failed to fetch from MySQL");
        return await response.json() as SocialPost[];
      } catch (error) {
        console.warn("Backend error:", error);
        return [];
      }
    },
  });

  const addPost = useMutation({
    mutationFn: async () => {
      const platform = determinePlatform(newUrl);
      if (!platform) {
        throw new Error("Invalid URL. Only Instagram, YouTube, and Facebook are supported.");
      }
      
      const embedId = extractEmbedId(newUrl, platform);
      if (!embedId) {
        throw new Error(`Could not extract valid ID from the ${platform} URL.`);
      }

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/social-media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          url: newUrl,
          embed_id: embedId,
          title: newTitle || `${platform} Post`,
        }),
      });
      if (!response.ok) throw new Error("Failed to add post to MySQL");
    },
    onSuccess: () => {
      toast.success("Social post added successfully");
      setNewUrl("");
      setNewTitle("");
      queryClient.invalidateQueries({ queryKey: ["admin_social_posts"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add post");
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/social-media/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete post");
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["admin_social_posts"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete post");
    },
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="size-4 text-pink-600" />;
      case 'youtube': return <Youtube className="size-4 text-red-600" />;
      case 'facebook': return <Facebook className="size-4 text-blue-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold tracking-wide">Social Media Wall</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage Instagram Reels, YouTube Shorts, and Facebook posts for your gallery.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Plus className="size-5 text-gold" /> Add New Post
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Post URL (Instagram/YouTube/FB)</label>
            <Input 
              placeholder="e.g. https://www.instagram.com/reel/..." 
              value={newUrl} 
              onChange={(e) => setNewUrl(e.target.value)} 
            />
          </div>
          <div className="md:col-span-4 space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Title (Optional)</label>
            <Input 
              placeholder="e.g. Luxury Apartment Tour" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
            />
          </div>
          <div className="md:col-span-3">
            <Button 
              className="w-full bg-[color:var(--navy-deep)] text-white hover:bg-[color:var(--navy-light)]"
              onClick={() => addPost.mutate()} 
              disabled={addPost.isPending || !newUrl}
            >
              {addPost.isPending ? <RefreshCw className="size-4 animate-spin mr-2" /> : <Plus className="size-4 mr-2" />}
              Add Post
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 flex justify-center text-gold"><RefreshCw className="size-6 animate-spin" /></div>
        ) : posts && posts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">Platform</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Preview</th>
                  <th className="px-4 py-3">Date Added</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 capitalize font-medium">
                        {getPlatformIcon(post.platform)}
                        {post.platform}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{post.title}</td>
                    <td className="px-4 py-3">
                      <a href={post.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gold hover:underline text-xs">
                        View Post <ExternalLink className="size-3" />
                      </a>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive size-8"
                        onClick={() => {
                          if (window.confirm("Delete this post?")) {
                            deletePost.mutate(post.id);
                          }
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <Instagram className="size-12 mb-4 text-muted" />
            <p className="font-medium text-lg">No social posts found</p>
            <p className="text-sm mt-1">Add your first post above to show it on the gallery.</p>
          </div>
        )}
      </div>
    </div>
  );
}
