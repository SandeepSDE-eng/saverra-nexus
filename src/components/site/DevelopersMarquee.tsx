const BRANDS = [
  { name: "Avidahan", logo: "/logos/avidahan.webp" },
  { name: "Lodha", logo: "/logos/lodha.webp" },
  { name: "Kalpataru", logo: "/logos/kalptaru.webp" },
  { name: "Silver Group", logo: "/logos/sliver-group-new.webp" },
  { name: "Shubham", logo: "/logos/shubham.webp" },
  { name: "Vardhman", logo: "/logos/vardhman-new.webp" },
  { name: "Rajshree", logo: "/logos/rajshree-logo.webp" },
  { name: "Kabra", logo: "/logos/kabra-logo.webp" },
  { name: "Superb", logo: "/logos/superb-logo.webp" },
  { name: "Integrated", logo: "/logos/integrated-logo.webp" },
];

export function DevelopersMarquee() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-12">
      <div className="container-luxe">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 h-px w-20 bg-gold/60" />
          <p className="font-display text-sm md:text-base font-semibold uppercase tracking-[0.28em] text-primary">
            Our Trusted Partner Developers
          </p>
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-24 pr-24">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div key={i} className="group relative flex h-24 w-56 items-center justify-center transition-all duration-500 hover:scale-105">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-20 w-auto max-w-[200px] object-contain drop-shadow-sm transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const span = e.currentTarget.nextElementSibling as HTMLElement;
                    if (span) {
                      span.classList.remove('hidden');
                      span.classList.add('flex');
                      span.parentElement?.classList.add('border', 'border-border/40', 'rounded-xl', 'bg-white', 'shadow-md');
                    }
                  }}
                />
                <span className="hidden h-full w-full items-center justify-center font-display text-lg md:text-xl font-bold tracking-widest text-primary transition-colors text-center leading-tight px-4">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
