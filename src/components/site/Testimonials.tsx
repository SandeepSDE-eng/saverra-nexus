import { Star, ShieldCheck, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const REVIEWS = [
  { id: 1, name: "Nikita Wadhawana", city: "Mumbai", rating: 5, message: "I had an excellent experience working with Vijay Vishwakarma. He was highly professional, knowledgeable, and attentive to my requirements throughout the entire home-search process." },
  { id: 2, name: "Nitin", city: "Mumbai", rating: 5, message: "Had a great experience with Mr. Vijay while renting a flat for me. He helped me find a good deal that matched my requirements and made the entire process smooth and hassle-free." },
  { id: 3, name: "Aastha Dubey", city: "Mumbai", rating: 5, message: "We had a really great experience with this property consultant in Vidyavihar. They offered us an excellent deal and made the entire process smooth and stress-free." },
  { id: 4, name: "Prashant Kadam", city: "Mumbai", rating: 5, message: "Awesome deals you can get. Try out for best deals for purchasing flats in Ghatkopar East." },
  { id: 5, name: "Ajit Khusro", city: "Mumbai", rating: 5, message: "If you're looking for buying an apartment in Mumbai, I would highly recommend Saverra Realty. They really help in getting great deals." },
  { id: 6, name: "Poonam Mhatre", city: "Mumbai", rating: 5, message: "Excellent Service, trustworthy and knowledgeable. Fully satisfied." },
  { id: 7, name: "Rishabh Singh", city: "Mumbai", rating: 5, message: "Best Real estate consultancy firm in Ghatkopar East Mumbai. They deal with all premium residential apartments." },
  { id: 8, name: "Nitin Bhalerao", city: "Mumbai", rating: 5, message: "Great collection of properties. Friendly staff who genuinely care about finding you the right home." },
  { id: 9, name: "Chandan Gokhru", city: "Mumbai", rating: 5, message: "Vijay Vishwakarma from Saverra Realty is a very good professional real estate advisor. His understanding of the clients' requirements is really good." },
  { id: 10, name: "Jay Mehta", city: "Mumbai", rating: 5, message: "Thank you Saverra Owner Nimesh Ji and his team Vijay Ji, who have helped us to get our desired house with total transparency." }
];

export function Testimonials() {
  const data = REVIEWS;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(scrollNext, 4500);
    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  return (
    <section className="py-24 bg-[#06152b] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-[#d4af37]/5 blur-[130px] pointer-events-none" />

      <div className="container-luxe relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#08182f] border border-[#d4af37]/30 text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
            <ShieldCheck className="size-3.5" /> VERIFIED INVESTOR ENDORSEMENTS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Stories Of <span className="bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] bg-clip-text text-transparent">Trust & Satisfaction</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            Read authentic testimonials from homeowners, investors, and corporate leaders who entrusted Saverra with their most valued real estate acquisitions.
          </p>
        </div>

        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex touch-pan-y -ml-6">
            {data.map((t) => (
              <div key={t.id} className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-6">
                <div className="flex h-full flex-col rounded-3xl border border-[#d4af37]/20 bg-[#08182f]/80 p-8 backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(4,14,29,0.6)] transition-all hover:-translate-y-2 hover:border-[#d4af37]/60 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex text-[#d4af37] gap-1">
                      {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-[#d4af37] text-[#d4af37]" />
                      ))}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                      <ShieldCheck className="size-3 text-[#d4af37]" /> Verified Google Review
                    </span>
                  </div>

                  <p className="text-slate-200 text-sm leading-relaxed italic flex-1 relative z-10">
                    "{t.message}"
                  </p>

                  <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-4">
                    <div className="size-11 rounded-full bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] shrink-0">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <p className="font-display font-bold text-white text-base leading-tight group-hover:text-[#d4af37] transition-colors">
                        {t.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                        {t.city} • Verified Buyer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
