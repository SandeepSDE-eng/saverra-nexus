import { Sparkles, ShieldCheck, Award, Handshake } from "lucide-react";

const BRANDS = [
  { name: "Avidahan Group", logo: "/logos/avidahan.webp", tier: "Tier-1 Partner" },
  { name: "Lodha Group", logo: "/logos/lodha.webp", tier: "Luxury Alliances" },
  { name: "Kalpataru Limited", logo: "/logos/kalptaru.webp", tier: "Prime Landmarked" },
  { name: "Silver Group", logo: "/logos/sliver-group-new.webp", tier: "Bespoke Builder" },
  { name: "Shubham Group", logo: "/logos/shubham.webp", tier: "Curated Estates" },
  { name: "Vardhman Group", logo: "/logos/vardhman-new.webp", tier: "Iconic Developer" },
  { name: "Rajshree Builders", logo: "/logos/rajshree-logo.webp", tier: "Heritage Partner" },
  { name: "Kabra Group", logo: "/logos/kabra-logo.webp", tier: "Urban Living" },
  { name: "Superb Realtors", logo: "/logos/superb-logo.webp", tier: "Commercial Hubs" },
  { name: "Integrated Spaces", logo: "/logos/integrated-logo.webp", tier: "Flagship Partner" },
];

export function DevelopersMarquee() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-200">
      <div className="container-luxe relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-[10px] font-bold uppercase tracking-widest text-[#aa820a]">
            <Handshake className="size-3.5 text-[#d4af37]" /> EMBLEM OF TRUST & SYNERGY
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Our Trusted <span className="text-[#d4af37] italic font-normal">Partner Developers</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Collaborating with India's most visionary real estate conglomerates to deliver landmark architectural legacies.
          </p>
        </div>

        {/* Dynamic Infinite Marquee Track with Crisp Light Cards */}
        <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <div className="flex w-max animate-marquee items-center gap-6 sm:gap-8">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <div
                key={i}
                className="group relative flex h-24 w-60 sm:w-64 items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:border-[#d4af37] hover:shadow-xl hover:shadow-[#d4af37]/15 shrink-0"
              >
                {/* Crisp Image Logo */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-16 w-auto max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Hide broken logo and display clean typography fallback badge
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.classList.remove('hidden');
                      fallback.classList.add('flex');
                    }
                  }}
                />

                {/* Clean Fallback Badge */}
                <div className="hidden flex-col items-center justify-center text-center space-y-1">
                  <span className="font-display text-sm font-bold tracking-wider text-slate-900">
                    {brand.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#aa820a] font-semibold">
                    {brand.tier}
                  </span>
                </div>

                {/* Subtle Gold Corner Accent */}
                <div className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-slate-200 group-hover:bg-[#d4af37] transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Metrics Strip */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto border-t border-slate-200 text-xs">
          <div className="flex items-center justify-center gap-2 text-slate-700">
            <ShieldCheck className="size-4 text-[#d4af37]" />
            <span className="font-semibold">100% MahaRERA Verified Developers</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-700">
            <Award className="size-4 text-[#d4af37]" />
            <span className="font-semibold">Tier-1 Direct Builder Pricing</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-700">
            <Sparkles className="size-4 text-[#d4af37]" />
            <span className="font-semibold">Pre-Launch Priority Allocation</span>
          </div>
        </div>

      </div>
    </section>
  );
}
