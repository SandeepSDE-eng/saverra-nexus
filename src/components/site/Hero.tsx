import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { SearchFilters } from "./SearchFilters";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85", // Dusk exterior, perfect contrast
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85", // Rich exterior
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2400&q=85", // Darker premium interior/exterior
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85", // Luxury interior
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[80vh] lg:min-h-[85vh] flex-col justify-between overflow-hidden">
      {/* Crossfading Background Carousel */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[15000ms] ease-out ${
                index === currentImage ? "scale-110" : "scale-100"
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          </div>
        ))}
      </div>

      <div className="container-luxe relative z-10 flex flex-1 flex-col items-center justify-center py-16 lg:py-20 text-center">
        {/* Glassmorphism Container */}
        <div className="animate-fade-up w-full max-w-3xl rounded-2xl border border-white/30 bg-white/10 p-8 backdrop-blur-xl shadow-2xl md:p-12">
          <div className="mb-4 inline-flex items-center justify-center gap-3">
            <div className="h-[1px] w-6 bg-gold/60"></div>
            <span className="text-[9px] font-medium tracking-[0.3em] text-white uppercase opacity-90 sm:text-[10px]">
              The Saverra Experience
            </span>
            <div className="h-[1px] w-6 bg-gold/60"></div>
          </div>
          
          <h1 className="font-display text-4xl font-light leading-[1.15] text-white sm:text-5xl lg:text-6xl tracking-wide">
            Unlocking The <br />
            <span className="text-gold italic font-medium">Extraordinary,</span> <br />
            Every Single Day.
          </h1>
          
          <p className="mx-auto mt-5 max-w-lg text-sm font-light leading-relaxed text-white/80 sm:text-base tracking-wide">
            Discover unparalleled luxury and timeless elegance. We curate India's most prestigious addresses for those who demand nothing but the best.
          </p>
          
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="gold" size="lg" className="w-full sm:w-auto rounded-sm px-8 tracking-widest text-[11px] uppercase transition-all hover:scale-105" asChild>
              <a href="#projects">Explore Portfolio</a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-sm border-white/50 bg-transparent px-8 text-white tracking-widest text-[11px] uppercase transition-all hover:bg-white hover:text-black" asChild>
              <a href="#contact">Private Viewing</a>
            </Button>
          </div>
        </div>

        {/* Carousel Indicators - Centered */}
        <div className="absolute bottom-24 lg:bottom-28 flex items-center justify-center gap-2.5">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-1 rounded-full transition-all duration-500 shadow-md ${
                index === currentImage ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Search filters overlap - anchored to bottom */}
      <div className="container-luxe relative z-20 pb-4 mt-auto hidden md:block">
        <SearchFilters />
      </div>
    </section>
  );
}
