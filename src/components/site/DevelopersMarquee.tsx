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
    <section className="py-20 bg-[#040e1d] text-white relative overflow-hidden border-y border-[#d4af37]/20">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#d4af37]/5 blur-[150px] pointer-events-none" />

      <div className="container-luxe relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08182f] border border-[#d4af37]/30 text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
            <Handshake className="size-3.5" /> EMBLEM OF TRUST & SYNERGY
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Our Prestigious <span className="bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] bg-clip-text text-transparent italic font-normal">Developer Alliances</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light">
            Partnering with India's most visionary real estate conglomerates to deliver landmark architectural legacies.
          </p>
        </div>

        {/* Dynamic Infinite Marquee Track with Glass Capsules */}
        <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <div className="flex w-max animate-marquee items-center gap-6 sm:gap-8">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <div
                key={i}
                className="group relative flex h-24 w-60 sm:w-64 items-center justify-center rounded-2xl border border-[#d4af37]/25 bg-[#08182f]/80 backdrop-blur-xl px-6 transition-all duration-500 hover:scale-105 hover:border-[#d4af37] hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)] shrink-0"
              >
                {/* Image Logo */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-14 w-auto max-w-[170px] object-contain filter brightness-110 contrast-105 drop-shadow-md transition-all duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Hide broken logo and display fallback text pill
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.classList.remove('hidden');
                      fallback.classList.add('flex');
                    }
                  }}
                />

                {/* Fallback Text Badge */}
                <div className="hidden flex-col items-center justify-center text-center space-y-1">
                  <div className="size-8 rounded-full bg-gradient-to-tr from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs font-display flex items-center justify-center shadow-md">
                    {brand.name.charAt(0)}
                  </div>
                  <span className="font-display text-sm font-bold tracking-wider text-white">
                    {brand.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#d4af37] font-semibold">
                    {brand.tier}
                  </span>
                </div>

                {/* Corner Gold Accent Line */}
                <div className="absolute top-2 right-2 size-1.5 rounded-full bg-[#d4af37]/40 group-hover:bg-[#d4af37] transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Metrics Strip */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto border-t border-white/10 text-xs">
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <ShieldCheck className="size-4 text-[#d4af37]" />
            <span className="font-semibold">100% MahaRERA Verified Developers</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <Award className="size-4 text-[#d4af37]" />
            <span className="font-semibold">Tier-1 Direct Builder Pricing</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <Sparkles className="size-4 text-[#d4af37]" />
            <span className="font-semibold">Pre-Launch Priority Allocation</span>
          </div>
        </div>

      </div>
    </section>
  );
}
