import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { SearchFilters } from "./SearchFilters";

export function Hero() {
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

          <div className="hidden lg:col-span-5 lg:block" />
        </div>

        {/* Search filters overlap */}
        <div className="container-luxe relative -mt-14 pb-2 md:-mt-16">
          <SearchFilters />
        </div>
      </div>
    </section>
  );
}
