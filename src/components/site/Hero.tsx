import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, Sparkles, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { HeroQuickFilter } from "./HeroQuickFilter";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=75",
    category: "ULTRA LUXURY HIGH-RISE",
    tagline: "MICL Aaradhya OnePark",
    title1: "Your Trusted Partner For",
    titleHighlight: "Real Estate Portfolio",
    description: "Discover curated luxury penthouses, oceanfront villas, and prime commercial landmarks across Mumbai. Backed by over a decade of uncompromised integrity and advisory mastery.",
    location: "60ft Road, Ghatkopar East",
    price: "₹2.80 Cr Onwards"
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=75",
    category: "SIGNATURE PODIUM LIVING",
    tagline: "Adani The Views",
    title1: "Curating India's Most",
    titleHighlight: "Prestigious Addresses",
    description: "Explore our hand-picked collection of luxury apartments, sea-facing estates, and sky villas crafted for those who demand absolute distinction.",
    location: "Pant Nagar, Ghatkopar East",
    price: "₹1.99 Cr Onwards"
  },
  {
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=75",
    category: "MODERN TWIN-TOWER LANDMARK",
    tagline: "Orient Odyssey",
    title1: "Seamless Commercial &",
    titleHighlight: "Residential Advisory",
    description: "Find the perfect premium office space or luxury home to scale your enterprise and elevate your lifestyle in Mumbai's prime hubs.",
    location: "Ghatkopar East, Mumbai",
    price: "₹1.91 Cr Onwards"
  },
  {
    image: "https://images.unsplash.com/photo-1613490900233-141c5560d75d?auto=format&fit=crop&w=1600&q=75",
    category: "PREMIUM SKYLINE TOWERS",
    tagline: "9 Anemone Heights",
    title1: "Let's Elevate Your",
    titleHighlight: "Real Estate Experience",
    description: "With over a decade of market leadership, we ensure your property buying journey is smooth, transparent, and completely stress-free.",
    location: "90 Feet Rd, Ghatkopar East",
    price: "₹1.85 Cr Onwards"
  }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section id="home" className="relative flex min-h-[85vh] lg:min-h-[90vh] flex-col justify-between overflow-hidden">
      {/* Crossfading Background Carousel */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[15000ms] ease-out ${
                index === currentIndex ? "scale-110" : "scale-100"
              }`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            {/* Darker overlay to make text pop */}
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#023b6d]/80 via-transparent to-black/40 mix-blend-multiply"></div>
          </div>
        ))}
      </div>

      <div className="container-luxe relative z-10 flex flex-1 flex-col items-center justify-center py-16 lg:py-20 text-center">
        {/* Glassmorphism Container with backdrop blur & dark background */}
        <div 
          key={currentIndex} 
          className="animate-fade-up w-full max-w-3xl rounded-3xl border border-white/20 bg-black/50 p-8 backdrop-blur-2xl shadow-2xl md:p-12 text-white"
        >
          {/* Category Tag & Tagline */}
          <div className="mb-4 inline-flex items-center justify-center gap-3">
            <div className="h-[1px] w-6 bg-[#d4af37]"></div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#d4af37] uppercase sm:text-[11px] drop-shadow-md flex items-center gap-1.5">
              <Sparkles className="size-3 text-[#d4af37]" />
              {currentSlide.category} • {currentSlide.tagline}
            </span>
            <div className="h-[1px] w-6 bg-[#d4af37]"></div>
          </div>
          
          {/* Main Title */}
          <h1 className="font-display text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl tracking-wide drop-shadow-lg">
            {currentSlide.title1} <br />
            <span className="text-[#d4af37] italic font-bold">{currentSlide.titleHighlight}</span>
          </h1>
          
          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl text-sm font-medium leading-relaxed text-white/90 sm:text-base tracking-wide drop-shadow-md">
            {currentSlide.description}
          </p>

          {/* Featured Location & Price Highlight */}
          <div className="mt-4 inline-flex items-center justify-center gap-4 text-xs font-semibold text-slate-200 bg-white/10 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5 text-[#d4af37]" /> {currentSlide.location}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-[#d4af37] font-bold">{currentSlide.price}</span>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              variant="gold" 
              size="lg" 
              className="w-full sm:w-auto rounded-xl px-8 tracking-widest text-[11px] uppercase font-bold transition-all hover:scale-105 shadow-lg shadow-[#d4af37]/30 flex items-center justify-center gap-2" 
              asChild
            >
              <Link to="/projects">
                <span>EXPLORE PORTFOLIO</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto rounded-xl border-white/40 bg-transparent px-8 text-white tracking-widest text-[11px] uppercase font-bold transition-all hover:bg-white hover:text-black flex items-center justify-center gap-2" 
              asChild
            >
              <Link to="/private-viewing">
                <CalendarCheck className="size-4 text-[#d4af37]" />
                <span>Private Viewing</span>
              </Link>
            </Button>
          </div>

          {/* Key Trust Stats Bar */}
          <div className="mt-8 pt-6 grid grid-cols-3 gap-4 border-t border-white/15 text-center">
            <div className="space-y-1">
              <span className="font-display text-xl sm:text-2xl font-bold text-white">₹1,200+ Cr</span>
              <span className="block text-[9px] uppercase font-bold tracking-widest text-[#d4af37]">Portfolio Advisory</span>
            </div>
            <div className="space-y-1">
              <span className="font-display text-xl sm:text-2xl font-bold text-white">15+ Years</span>
              <span className="block text-[9px] uppercase font-bold tracking-widest text-[#d4af37]">Market Mastery</span>
            </div>
            <div className="space-y-1">
              <span className="font-display text-xl sm:text-2xl font-bold text-white">450+</span>
              <span className="block text-[9px] uppercase font-bold tracking-widest text-[#d4af37]">HNI Closings</span>
            </div>
          </div>
        </div>

        {/* Carousel Indicators & Controls */}
        <div className="mt-6 relative z-20 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="size-8 rounded-full border-white/30 bg-black/40 text-white hover:bg-white hover:text-black transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 shadow-md cursor-pointer ${
                  index === currentIndex ? "w-8 bg-[#d4af37]" : "w-2 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="size-8 rounded-full border-white/30 bg-black/40 text-white hover:bg-white hover:text-black transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {/* Embedded Quick Search Filter Bar */}
        <HeroQuickFilter />
      </div>
    </section>
  );
}
