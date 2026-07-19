const BRANDS = ["SOBHA", "LODHA", "DLF", "GODREJ", "PRESTIGE", "BRIGADE", "SHAPOORJI", "OBEROI", "HIRANANDANI", "RAHEJA"];

export function DevelopersMarquee() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-10">
      <div className="container-luxe">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-2 h-px w-16 bg-gold/60" />
          <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Our Trusted Partner Developers
          </p>
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-14 pr-14">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <div key={i} className="font-display text-xl font-bold tracking-widest text-muted-foreground/70 transition-colors hover:text-primary">
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
