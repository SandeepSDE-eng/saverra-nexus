import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, Sparkles, ChevronLeft, ChevronRight, MapPin, Building } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { HeroQuickFilter } from "./HeroQuickFilter";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    category: "SKY PENTHOUSES",
    title: "Worli Sea Link Penthouse",
    location: "Worli, South Mumbai",
    price: "₹18.5 Cr Onwards",
    tagline: "Ultra-Luxe Duplex Residences",
  },
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    category: "SIGNATURE VILLAS",
    title: "Bandra Sea Face Estates",
    location: "Bandstand, Bandra West",
    price: "₹24.0 Cr Onwards",
    tagline: "Exclusive Private Oceanfront Sanctuaries",
  },
  {
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    category: "COMMERCIAL LANDMARKS",
    title: "One45 Business Bay Towers",
    location: "BKC & Ghatkopar East, Mumbai",
    price: "₹6.8 Cr Onwards",
    tagline: "Grade-A Corporate Headquarters & Retail",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    category: "PREMIUM TOWNSHIPS",
    title: "Hiranandani Horizon Chembur",
    location: "Central Avenue, Chembur",
    price: "₹2.65 Cr Onwards",
    tagline: "Sprawling 2, 3 & 4 BHK Luxury Residences",
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section id="home" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 overflow-hidden border-b border-slate-200">
      
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#d4af37]/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-slate-200/60 blur-[140px] pointer-events-none" />

      <div className="container-luxe relative z-10 space-y-12">
        
        {/* Asymmetrical 2-Column Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center text-left">
          
          {/* Left Column — Core Brand Copy & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 animate-fade-up">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-[10px] font-bold uppercase tracking-widest text-[#aa820a]">
                <Sparkles className="size-3.5 text-[#d4af37]" /> SAVERRA LUXURY REAL ESTATE ADVISORS
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Your Trusted Partner For <br />
                <span className="text-[#d4af37] italic font-normal">
                  Real Estate Portfolio
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                Discover curated luxury penthouses, oceanfront villas, and prime commercial landmarks across Mumbai. Backed by over a decade of uncompromised integrity and advisory mastery.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                asChild
                className="h-14 px-8 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Link to="/projects">
                  <span>Explore Portfolio</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-14 px-8 rounded-xl border-slate-300 bg-white text-slate-800 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 hover:border-[#d4af37] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Link to="/private-viewing">
                  <CalendarCheck className="size-4 text-[#d4af37]" />
                  <span>Book Private Viewing</span>
                </Link>
              </Button>
            </div>

            {/* Key Trust Stats Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/90 text-left">
              <div className="space-y-1">
                <span className="font-display text-2xl sm:text-3xl font-bold text-slate-900">₹1,200+ Cr</span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#aa820a]">Portfolio Advisory</span>
              </div>
              <div className="space-y-1">
                <span className="font-display text-2xl sm:text-3xl font-bold text-slate-900">15+ Years</span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#aa820a]">Market Mastery</span>
              </div>
              <div className="space-y-1">
                <span className="font-display text-2xl sm:text-3xl font-bold text-slate-900">450+</span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#aa820a]">HNI Closings</span>
              </div>
            </div>

          </div>

          {/* Right Column — Interactive Architectural Slide Showcase Deck (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="rounded-3xl bg-white border border-slate-200 p-3.5 shadow-2xl shadow-slate-200/80 relative space-y-4 group"
            >
              {/* Slide Media Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 border border-[#d4af37]/50 text-[10px] font-bold uppercase tracking-wider text-[#d4af37] backdrop-blur-md">
                    <Sparkles className="size-3" />
                    {slide.category}
                  </span>
                </div>

                {/* Overlay Project Details */}
                <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                  <h3 className="font-display text-xl font-bold text-white drop-shadow-md">
                    {slide.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-200 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5 text-[#d4af37]" /> {slide.location}
                    </span>
                    <span className="font-bold text-[#d4af37]">{slide.price}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Controller Strip */}
              <div className="flex items-center justify-between px-3 py-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <span className="text-[#aa820a]">0{currentIndex + 1}</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-400">0{HERO_SLIDES.length}</span>
                </div>

                {/* Progress Bar Indicators */}
                <div className="flex items-center gap-1.5">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                        idx === currentIndex ? "w-7 bg-[#d4af37]" : "w-2 bg-slate-200 hover:bg-slate-400"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Prev & Next Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrev}
                    className="size-8 rounded-xl border-slate-200 hover:border-[#d4af37] text-slate-700 hover:bg-amber-50"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    className="size-8 rounded-xl border-slate-200 hover:border-[#d4af37] text-slate-700 hover:bg-amber-50"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Embedded Quick Search Filter Bar */}
        <HeroQuickFilter />

      </div>
    </section>
  );
}
