import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";

export function RentalUpdates() {
  const { data: rentals = [], isLoading } = useQuery({
    queryKey: ["site", "rental_updates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_updates")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) {
        console.warn("Supabase Error (using mock fallback):", error);
        return [
          { id: 1, title: "Example Luxury Flat", youtube_id: "rLSMDfjwwzw" }
        ];
      }
      return data;
    },
  });

  if (!isLoading && rentals.length === 0) {
    return null; // Hide section if there are no rental videos
  }

  return (
    <section className="bg-secondary/30 py-24 border-b border-border/50 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-luxe relative z-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <p className="eyebrow !text-red-500">Live Updates</p>
            </div>
            
            <h2 className="mt-4 font-display text-4xl font-light tracking-wide text-primary sm:text-5xl">
              Latest <span className="font-medium italic text-gold">Rentals</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground leading-relaxed">
              Explore our freshly listed premium rental properties. Quick sneak peeks straight from our consultants.
            </p>
          </div>
          <Link
            to="/#contact"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary transition-colors hover:text-gold"
          >
            Inquire Now <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Horizontal scroll container for Rental Reels */}
        <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {isLoading ? (
             <div className="flex gap-6 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex-none w-[280px] sm:w-[320px] aspect-[9/16] rounded-2xl bg-secondary/80"></div>
                ))}
             </div>
          ) : (
            rentals.map((rental) => (
              <div
                key={rental.id}
                className="group relative flex-none w-[280px] sm:w-[320px] aspect-[9/16] snap-center overflow-hidden rounded-2xl bg-black shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-luxury"
              >
                {/* Title Overlay */}
                <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                  <p className="text-white font-medium text-shadow-sm line-clamp-2">{rental.title}</p>
                </div>
                
                <iframe
                  src={`https://www.youtube.com/embed/${rental.youtube_id}?autoplay=0&controls=1&rel=0&showinfo=0&modestbranding=1`}
                  title={rental.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))
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
