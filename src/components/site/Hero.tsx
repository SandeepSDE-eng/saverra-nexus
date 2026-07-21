import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, MapPin } from "lucide-react";
import { SearchFilters } from "./SearchFilters";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const PREMIUM_PROJECTS = [
  { id: 1, name: "f Residences", location: "Ghatkopar East", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80" },
  { id: 2, name: "Spenta Alta Vista", location: "Chembur", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" },
  { id: 3, name: "Wadhwa Atmosphere", location: "Mulund West", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" },
  { id: 4, name: "Neelkanth Regent", location: "Ghatkopar East", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80" },
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(scrollNext, 3000);
    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative">
        {/* Backdrop image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=85')",
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--navy-deep)]/95 via-[color:var(--navy-deep)]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        <div className="container-luxe relative grid min-h-[86vh] grid-cols-1 items-center gap-10 py-20 lg:grid-cols-12">
          <div className="lg:col-span-7 animate-fade-up">
            <p className="eyebrow text-gold">Welcome to SAVERRA</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Unlocking The
              <span className="mt-2 block italic">
                <span className="gold-text">Extraordinary,</span>
              </span>
              Every Single Day.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/80">
              Premium Homes. Prime Locations. Promising Futures.
              <br className="hidden sm:block" />
              Curated luxury addresses across India's most sought-after neighborhoods.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="gold" size="xl" asChild>
                <a href="#projects">Explore Projects <ArrowRight className="size-4" /></a>
              </Button>
              <Button variant="heroGhost" size="xl" asChild>
                <a href="#contact"><CalendarCheck className="size-4" /> Schedule Site Visit</a>
              </Button>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 divide-x divide-white/15 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md">
              {[
                { k: "5000+", v: "Happy Families" },
                { k: "50+", v: "Projects" },
                { k: "100%", v: "RERA Approved" },
              ].map((s) => (
                <div key={s.k} className="p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gold">{s.k}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider text-white/70">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="h-full w-full flex flex-col justify-center animate-fade-left">
              <div className="mb-4 flex items-center justify-between text-white/80">
                <h3 className="text-sm font-semibold tracking-wide uppercase">Featured Premium Projects</h3>
                <div className="flex gap-2">
                  <div className="size-2 rounded-full bg-gold/40"></div>
                  <div className="size-2 rounded-full bg-gold"></div>
                  <div className="size-2 rounded-full bg-gold/40"></div>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-2xl" ref={emblaRef}>
                <div className="flex touch-pan-y">
                  {PREMIUM_PROJECTS.map((project) => (
                    <div key={project.id} className="min-w-0 flex-[0_0_100%] pl-4 first:pl-0">
                      <div className="group relative h-80 w-full overflow-hidden rounded-xl">
                        <img src={project.image} alt={project.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/90 via-[color:var(--navy-deep)]/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-5">
                          <h4 className="font-display text-2xl font-bold text-white">{project.name}</h4>
                          <p className="mt-1 flex items-center gap-1 text-sm text-gold">
                            <MapPin className="size-4" /> {project.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search filters overlap */}
        <div className="container-luxe relative -mt-14 pb-2 md:-mt-16">
          <SearchFilters />
        </div>
      </div>
    </section>
  );
}
