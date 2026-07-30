import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getRentalsFn } from "@/api/rentals";

export function RentalUpdates() {
  const { data: rentals = [], isLoading } = useQuery({
    queryKey: ["site", "rental_updates"],
    queryFn: async () => {
      try {
        const response = await getRentalsFn();
        if (!response.success) throw new Error(response.error || "Failed to fetch rentals");
        return response.data;
      } catch (error: any) {
        console.warn("MySQL Fetch Error:", error);
        return [];
      }
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
            to="/social-wall"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary transition-colors hover:text-gold"
          >
            Explore Full Gallery <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 items max on Home page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {isLoading ? (
             <>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-full aspect-[9/16] rounded-2xl bg-secondary/80 animate-pulse"></div>
                ))}
             </>
          ) : (
            rentals.slice(0, 4).map((rental) => (
              <div
                key={rental.id}
                className="group relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-luxury"
              >
                {/* Title Overlay */}
                <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                  <p className="text-white font-medium text-shadow-sm line-clamp-2">{rental.title}</p>
                </div>
                
                <iframe
                  src={`https://www.youtube.com/embed/${rental.youtube_id}?autoplay=0&controls=1&rel=0&showinfo=0&modestbranding=1`}
                  title={rental.title}
                  className="absolute inset-0 h-full w-full border-0 object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
