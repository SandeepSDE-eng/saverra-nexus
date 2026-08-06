import { MapPin, Navigation } from "lucide-react";

const LOCATIONS = [
  { city: "Mumbai", area: "BKC · Bandra East", pin: "400051" },
  { city: "Bengaluru", area: "Whitefield · ORR", pin: "560066" },
  { city: "Gurugram", area: "Golf Course Road", pin: "122002" },
  { city: "Pune", area: "Baner · Hinjewadi", pin: "411045" },
];

export function InteractiveMap() {
  return (
    <section id="neighborhood" className="py-20">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Neighborhood</p>
          <h2 className="mt-2 font-display text-4xl font-light tracking-wide text-primary sm:text-5xl">
            Prime Locations, <span className="gold-text italic">Mapped</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Explore SAVERRA addresses across India's most sought-after neighborhoods.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-luxury lg:col-span-2">
            <iframe
              title="SAVERRA Office — BKC, Mumbai"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.8500%2C19.0550%2C72.8900%2C19.0800&layer=mapnik&marker=19.0680%2C72.8697"
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col gap-3">
            {LOCATIONS.map((l) => (
              <div key={l.city} className="group flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-gold/60 hover:shadow-card">
                <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/8 text-primary transition-colors group-hover:bg-gold group-hover:text-[color:var(--navy-deep)]">
                  <MapPin className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="font-display text-lg font-bold text-primary">{l.city}</p>
                  <p className="text-xs text-muted-foreground">{l.area}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">PIN {l.pin}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(l.area + " " + l.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 self-center rounded-md bg-secondary px-2.5 py-1.5 text-[11px] font-semibold text-primary transition hover:bg-gold hover:text-[color:var(--navy-deep)]"
                >
                  <Navigation className="size-3" /> Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
