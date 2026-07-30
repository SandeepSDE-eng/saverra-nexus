import { ArrowRight, Instagram, Youtube, Facebook } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export function PropertyTours() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["home_social_posts"],
    queryFn: async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/social-media`);
        if (!response.ok) throw new Error("Failed to fetch from MySQL");
        const data = await response.json();
        return data.slice(0, 4); // Limit to 4 items
      } catch (error) {
        console.warn("Backend error:", error);
        return [];
      }
    },
  });

  return (
    <section className="bg-white py-24 border-b border-border/50 overflow-hidden">
      <div className="container-luxe">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Connect With Us</p>
            <h2 className="mt-2 font-display text-4xl font-light tracking-wide text-primary sm:text-5xl">
              Saverra <span className="font-medium italic text-gold">Social Wall</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground leading-relaxed">
              Experience our latest property tours, market insights, and exclusive behind-the-scenes content across Instagram, YouTube, and Facebook.
            </p>
          </div>
          <Link
            to="/social-wall"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary transition-colors hover:text-gold"
          >
            Explore Full Gallery <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Horizontal scroll container for Media */}
        <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {isLoading ? (
            // Skeleton loader
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-none w-[280px] sm:w-[320px] aspect-[9/16] snap-center rounded-[2rem] bg-muted animate-pulse"></div>
            ))
          ) : posts && posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="group relative flex-none w-[280px] sm:w-[320px] aspect-[9/16] snap-center overflow-hidden rounded-[2rem] bg-black shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-4 border-white"
              >
                {post.platform === 'youtube' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${post.embed_id}?autoplay=0&controls=1&rel=0&showinfo=0&modestbranding=1`}
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : post.platform === 'instagram' ? (
                  <iframe
                    src={`https://www.instagram.com/p/${post.embed_id}/embed/captioned`}
                    className="absolute inset-0 h-full w-full border-0"
                    scrolling="no"
                    loading="lazy"
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                    <Facebook className="size-12 text-blue-500 mb-4" />
                    <a href={post.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-sm font-medium">
                      View Facebook Post
                    </a>
                  </div>
                )}
                
                {post.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md">
                      {post.title}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="w-full text-center py-20 bg-muted/30 rounded-3xl">
              <p className="text-muted-foreground font-medium">No recent social media posts to show.</p>
            </div>
          )}
        </div>
        
        {/* Hide webkit scrollbar in a style tag */}
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </section>
  );
}
