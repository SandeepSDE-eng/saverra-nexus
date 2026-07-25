import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const REVIEWS = [
  { id: 1, name: "Nikita Wadhawana", city: "Mumbai", rating: 5, message: "I had an excellent experience working with Vijay Vishwakarma. He was highly professional, knowledgeable, and attentive to my requirements throughout the entire home-search process." },
  { id: 2, name: "Nitin", city: "Mumbai", rating: 5, message: "Had a great experience with Mr. Vijay while renting a flat for me. He helped me find a good deal that matched my requirements and made the entire process smooth and hassle-free." },
  { id: 3, name: "Aastha Dubey", city: "Mumbai", rating: 5, message: "We had a really great experience with this broker in Vidyavihar. They offered us an excellent deal and made the entire process smooth and stress-free." },
  { id: 4, name: "palak lalwani", city: "Mumbai", rating: 5, message: "Had a really good experience with Vijay. He helped me find the perfect house exactly as per my requirements and made the whole process super smooth and stress-free." },
  { id: 5, name: "oneando Delivery", city: "Mumbai", rating: 5, message: "We had an excellent experience with Tejas, Nimesh and Sumedh. Out of all the options out there, I would say they are the best in their job. They understood the requirement properly." },
  { id: 6, name: "Stuti Patel", city: "Mumbai", rating: 5, message: "Had a wonderful experience with Saverra Realty, especially Mr. Vijay. He was professional, responsive, and genuinely helpful throughout the process." },
  { id: 7, name: "Neha Kansara", city: "Mumbai", rating: 5, message: "Finding a flat in Mumbai can be stressful, but vijay ji made the process much easier. He showed relevant options, coordinated viewings efficiently, and was available." },
  { id: 8, name: "Mrunmayee Solanke", city: "Mumbai", rating: 5, message: "I came across Vijay from Saverra on 99acers. I told him my requirements, and he showed me the properties exactly what I wanted within my budget." },
  { id: 9, name: "Amisha Shirgave", city: "Mumbai", rating: 5, message: "Vijay went out of his way to help me and my flatmates set up the new house. Definitely a trust worthy and friendly agent to come across." },
  { id: 10, name: "Ankit Enterprise", city: "Mumbai", rating: 5, message: "We have bought a flat, sold one flat and given on rent one flat through saverra realty. They are the best in Ghatkopar Area and good knowledge of the area." },
  { id: 11, name: "brijesh chaurasia", city: "Mumbai", rating: 5, message: "Savera Realty did a good job in locating a customer for our apartment on rent. Their approach was very professional from customer search thru agreement registration." },
  { id: 12, name: "Vinit Nagda", city: "Mumbai", rating: 5, message: "Fantastic Service and Great Local Knowledge! I highly recommend Saverra Realty for anyone hunting for a flat in and around Mumbai." },
  { id: 13, name: "Rita Tiwari", city: "Mumbai", rating: 5, message: "Excellent services by them. Vijay brought client in less than 24 hours and the deal was finalised in a week. Registration work is completed very fast." },
  { id: 14, name: "ashti kothari", city: "Mumbai", rating: 5, message: "I rented a flat with Saverra Realty. The entire team, Tejas bhai, Nimesh bhai and Vijay were extremely prompt and professional in showing us options." },
  { id: 15, name: "Chandan Gokhru", city: "Mumbai", rating: 5, message: "Vijay Vishwakarma from Saverra Realty is a very good professional real estate broker. His understanding of the customers' requirements is really good." },
  { id: 16, name: "Kotnana Shyam Kiran", city: "Mumbai", rating: 5, message: "Appreciate Nimesh’s professionalism in understanding the requirements. He caters the best possible assets for you. I strongly suggest Nimesh to accompany in your home search." },
  { id: 17, name: "Milan Bavishi", city: "Mumbai", rating: 5, message: "If you're looking for a trustworthy and efficient real estate broker, we highly recommend Vijay from Saverra Realty!" },
  { id: 18, name: "sandeep yadav", city: "Mumbai", rating: 5, message: "I had an outstanding experience working with Vijay Vishkarma for my rental property search. His professionalism, attention to detail, and extensive knowledge." },
  { id: 19, name: "Hiral Sheth", city: "Mumbai", rating: 5, message: "One of the best experience I have till date of dealing with any real estate agent. Professional yet friendly and understanding. Special thanks to Mr Vijay." },
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
            What Our Customers Say
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
