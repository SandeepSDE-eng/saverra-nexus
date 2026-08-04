import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const REVIEWS = [
  { id: 1, name: "Nikita Wadhawana", city: "Mumbai", rating: 5, message: "I had an excellent experience working with Vijay Vishwakarma. He was highly professional, knowledgeable, and attentive to my requirements throughout the entire home-search process." },
  { id: 2, name: "Nitin", city: "Mumbai", rating: 5, message: "Had a great experience with Mr. Vijay while renting a flat for me. He helped me find a good deal that matched my requirements and made the entire process smooth and hassle-free." },
  { id: 3, name: "Aastha Dubey", city: "Mumbai", rating: 5, message: "We had a really great experience with this property consultant in Vidyavihar. They offered us an excellent deal and made the entire process smooth and stress-free." },
  { id: 4, name: "Prashant Kadam", city: "Mumbai", rating: 5, message: "Awesome deals you can get. Try out for best deals for purchasing flats in Ghatkopar East." },
  { id: 5, name: "Ajit Khusro", city: "Mumbai", rating: 4, message: "If you're looking for buying an apartment in Mumbai, I would highly recommend Saverra Realty. They really help in getting great deals." },
  { id: 6, name: "Poonam Mhatre", city: "Mumbai", rating: 5, message: "Excellent Service, trustworthy and knowledgeable. Fully satisfied." },
  { id: 7, name: "Rishabh Singh", city: "Mumbai", rating: 5, message: "Best Real estate consultancy firm in Ghatkopar East Mumbai. They deal with all premium residential apartments." },
  { id: 8, name: "Nitin Bhalerao", city: "Mumbai", rating: 5, message: "Great collection of properties. Friendly staff who genuinely care about finding you the right home." },
  { id: 9, name: "Meera Nair", city: "Mumbai", rating: 4, message: "Very professional approach. They understood our requirements perfectly and showed exactly what we needed." },
  { id: 10, name: "Suresh Patil", city: "Mumbai", rating: 5, message: "Transparent dealings and very helpful throughout the registration process. Highly recommended." },
  { id: 11, name: "Anita Desai", city: "Mumbai", rating: 5, message: "Found our dream home through Saverra. The entire team was exceptional from start to finish." },
  { id: 12, name: "Karan Shah", city: "Mumbai", rating: 5, message: "Their knowledge of the Ghatkopar real estate market is unmatched. Great advisory services." },
  { id: 13, name: "Neha Gupta", city: "Mumbai", rating: 4, message: "Prompt responses and excellent property curation. Saved us a lot of time." },
  { id: 14, name: "Rakesh Sharma", city: "Mumbai", rating: 5, message: "Very reliable and trustworthy real estate advisors. I would definitely work with them again." },
  { id: 15, name: "Chandan Gokhru", city: "Mumbai", rating: 5, message: "Vijay Vishwakarma from Saverra Realty is a very good professional real estate advisor. His understanding of the clients' requirements is really good." },
  { id: 16, name: "Shweta Joshi", city: "Mumbai", rating: 5, message: "Excellent post-sales support as well. They really go the extra mile." },
  { id: 17, name: "Milan Bavishi", city: "Mumbai", rating: 5, message: "If you're looking for a trustworthy and efficient real estate consultant, we highly recommend Vijay from Saverra Realty!" },
  { id: 18, name: "sandeep yadav", city: "Mumbai", rating: 5, message: "I had an outstanding experience working with Vijay Vishkarma for my rental property search. His professionalism, attention to detail, and extensive knowledge." },
  { id: 19, name: "Hiral Sheth", city: "Mumbai", rating: 5, message: "One of the best experience I have till date of dealing with any real estate consultant. Professional yet friendly and understanding. Special thanks to Mr Vijay." },
  { id: 20, name: "Jay Mehta", city: "Mumbai", rating: 5, message: "Thank you Saverra Owner Nimesh Ji and his team Vijay Ji, who have helped us to get our desired house on rent with total transparency." }
];

export function Testimonials() {
  const data = REVIEWS;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(scrollNext, 4000); // 4 seconds delay
    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  return (
    <section className="bg-secondary/50 py-20 overflow-hidden">
      <div className="container-luxe">
        <div className="mb-10 text-center">
          <p className="eyebrow">Customer Stories</p>
          <h2 className="mt-2 font-display text-4xl font-light tracking-wide text-primary sm:text-5xl">
            What Our CLIENTS Say
          </h2>
        </div>
        
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex touch-pan-y -ml-4">
            {data.map((t) => (
              <div key={t.id} className="min-w-0 flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_28%] pl-4">
                <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-gold">
                      {Array.from({ length: t.rating ?? 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Review" className="h-5 opacity-90" />
                  </div>
                  <p className="mt-2 flex-1 text-sm italic leading-relaxed text-foreground/80">"{t.message}"</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <div className="grid size-10 place-items-center rounded-full bg-primary text-white font-bold shadow-inner">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-primary text-sm leading-tight">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.city}</p>
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
