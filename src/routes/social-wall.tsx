import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Instagram, Youtube, Facebook, Play, Sparkles } from "lucide-react";
import { getSocialPostsFn } from "@/api/social";
import { getRentalsFn } from "@/api/rentals";
import { StatusStories } from "@/components/site/StatusStories";

export const Route = createFileRoute("/social-wall")({
  component: SocialWall,
});

type Platform = 'all' | 'instagram' | 'youtube' | 'facebook';

function SocialWall() {
  const [activeTab, setActiveTab] = useState<Platform>('all');

  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["public_social_posts"],
    queryFn: async () => {
      try {
        const response = await getSocialPostsFn();
        if (!response.success) throw new Error(response.error || "Failed to fetch from MySQL");
        return response.data;
      } catch (error) {
        console.warn("Backend error:", error);
        return [];
      }
    },
  });

  const { data: rentalsData, isLoading: isLoadingRentals } = useQuery({
    queryKey: ["site", "rental_updates"],
    queryFn: async () => {
      try {
        const response = await getRentalsFn();
        if (!response.success) throw new Error(response.error || "Failed to fetch rentals");
        return response.data;
      } catch (error) {
        console.warn("Rentals fetch error:", error);
        return [];
      }
    },
  });

  const isLoading = isLoadingPosts || isLoadingRentals;

  const combinedPosts = [
    ...(postsData || []),
    ...(rentalsData || []).map((r: any) => ({
      id: `rental_${r.id}` as any, // Cast to any to bypass strict type checking for union
      platform: 'youtube' as const,
      url: `https://youtube.com/shorts/${r.youtube_id}`,
      embed_id: r.youtube_id,
      title: r.title,
      is_active: r.is_active,
      created_at: r.created_at
    }))
  ].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

  const filteredPosts = combinedPosts.filter(post => activeTab === 'all' || post.platform === activeTab);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Top Banner */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden pb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 filter mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-up max-w-4xl mx-auto">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-gold uppercase backdrop-blur-md">
            <Sparkles className="size-3" /> Digital Presence
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-4">
            Social <span className="text-gold italic font-medium">Gallery</span>
          </h1>
          <p className="text-white/80 max-w-xl mx-auto font-light tracking-wide text-sm leading-relaxed">
            Explore our curated digital portfolio of property tours, expert insights, and luxury living showcases across all our social platforms.
          </p>
        </div>
      </div>

      <div className="container-luxe mx-auto max-w-7xl px-4 -mt-8 relative z-20">
        
        <div className="mb-8 rounded-2xl overflow-hidden bg-white shadow-lg border border-border/50">
          <StatusStories />
        </div>

        {/* Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === 'all' ? 'bg-gold text-[color:var(--navy-deep)] shadow-lg shadow-gold/20' : 'bg-white text-muted-foreground hover:bg-muted shadow-sm'}`}
          >
            All Media
          </button>
          <button 
            onClick={() => setActiveTab('instagram')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === 'instagram' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'bg-white text-muted-foreground hover:bg-pink-50 shadow-sm hover:text-pink-600'}`}
          >
            <Instagram className="size-3.5" /> Instagram
          </button>
          <button 
            onClick={() => setActiveTab('youtube')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === 'youtube' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-white text-muted-foreground hover:bg-red-50 shadow-sm hover:text-red-600'}`}
          >
            <Youtube className="size-3.5" /> YouTube
          </button>
          <button 
            onClick={() => setActiveTab('facebook')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === 'facebook' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white text-muted-foreground hover:bg-blue-50 shadow-sm hover:text-blue-600'}`}
          >
            <Facebook className="size-3.5" /> Facebook
          </button>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="aspect-[9/16] bg-muted animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 border border-border/50 aspect-[9/16] flex flex-col">
                
                <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
                  {post.platform === 'youtube' ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${post.embed_id}?modestbranding=1&rel=0`}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : post.platform === 'instagram' ? (
                     <iframe
                      src={`https://www.instagram.com/p/${post.embed_id}/embed/captioned`}
                      className="w-full h-full border-0"
                      scrolling="no"
                      loading="lazy"
                    ></iframe>
                  ) : (
                    <div className="text-white text-center p-6">
                      <Facebook className="size-12 text-blue-500 mx-auto mb-4" />
                      <a href={post.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-sm break-all">
                        View Post on Facebook
                      </a>
                    </div>
                  )}
                  
                  {/* Overlay for non-iframe interaction catch (optional depending on UX) */}
                  {/* <a href={post.url} target="_blank" rel="noreferrer" className="absolute inset-0 z-10 hidden group-hover:block bg-black/10"></a> */}
                </div>
                
                {post.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-12 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md">
                      {post.title}
                    </p>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 z-20">
                  {post.platform === 'instagram' && <div className="bg-pink-600/90 p-2 rounded-full text-white shadow-lg backdrop-blur-sm"><Instagram className="size-4" /></div>}
                  {post.platform === 'youtube' && <div className="bg-red-600/90 p-2 rounded-full text-white shadow-lg backdrop-blur-sm"><Youtube className="size-4" /></div>}
                  {post.platform === 'facebook' && <div className="bg-blue-600/90 p-2 rounded-full text-white shadow-lg backdrop-blur-sm"><Facebook className="size-4" /></div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-border/50">
            <Play className="size-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-primary">No Media Found</h3>
            <p className="text-muted-foreground mt-2">Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
