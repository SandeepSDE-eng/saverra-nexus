import { ArrowRight } from "lucide-react";

const SHORTS_IDS = [
  "rLSMDfjwwzw",
  "crY1YXybuY4",
  "locZstmDpSE",
  "WjS0G4NzcdI",
  "BT-l0wU9HbY",
  "jkuMyjNm_gk"
];

export function PropertyTours() {
  return (
    <section className="bg-white py-24 border-b border-border/50 overflow-hidden">
      <div className="container-luxe">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Experience Saverra</p>
            <h2 className="mt-2 font-display text-4xl font-light tracking-wide text-primary sm:text-5xl">
              Virtual <span className="font-medium italic text-gold">Tours & Reels</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground leading-relaxed">
              Take a quick sneak peek into our luxury properties and project updates through our official short videos.
            </p>
          </div>
          <a
            href="https://www.youtube.com/@saverrarealty/shorts"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary transition-colors hover:text-gold"
          >
            Watch all on YouTube <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Horizontal scroll container for Reels */}
        <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {SHORTS_IDS.map((id, index) => (
            <div
              key={id}
              className="relative flex-none w-[280px] sm:w-[320px] aspect-[9/16] snap-center overflow-hidden rounded-2xl bg-black shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-luxury"
            >
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=0&controls=1&rel=0&showinfo=0&modestbranding=1`}
                title={`Property Tour ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
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
