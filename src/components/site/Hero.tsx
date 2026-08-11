import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Compass, ShieldCheck, ChevronRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { HeroQuickFilter } from "./HeroQuickFilter";

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    tagline: "ARCHITECTURAL MASTERY",
    title1: "Curating India's Most",
    titleHighlight: "Prestigious Addresses",
    description: "Discover handcrafted luxury penthouses, sea-facing estates, and prime commercial hubs curated by Saverra Realty — Mumbai's premier real estate advisors.",
    badge: "Featured Collection",
    specs: "3 - 6 BHK • Sea View • Worli / Bandra",
    price: "₹8.5 Cr – ₹45 Cr"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    tagline: "SKYLINE LIVING",
    title1: "Unrivaled Elegance In",
    titleHighlight: "Prime Locations",
    description: "Experience ultra-spacious luxury apartments featuring private elevator lobbies, panoramic horizon terraces, and world-class concierge services.",
    badge: "Ready to Move",
    specs: "4 & 5 BHK Sky Mansions • BKC",
    price: "₹12 Cr – ₹38 Cr"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
    tagline: "EXECUTIVE PORTFOLIO",
    title1: "Commercial Hubs For",
    titleHighlight: "Visionary Enterprise",
    description: "Scale your business with landmark Grade-A commercial towers, modern tech parks, and prime retail avenues across top financial corridors.",
    badge: "Commercial Landmark",
    specs: "2,500 – 45,000 Sq Ft • Lower Parel",
    price: "₹15 Cr – ₹85 Cr"
  }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      setIsAnimating(false);
    }, 300);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#040e1d] text-white pt-24 pb-12">
      {/* Dynamic Ambient Glow & Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep Gradient Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0d284f] via-[#040e1d] to-[#020710]" />
        
        {/* Soft Metallic Gold Mesh Orbs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#d4af37]/10 blur-[130px] animate-pulse-glow" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] rounded-full bg-[#06152b]/60 blur-[100px]" />
        
        {/* Fine Architectural Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,175,55,0.8) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container-luxe relative z-10 my-auto py-8">
        {/* Asymmetrical Split Screen Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content - 7 Columns */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* VIP Eyebrow Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#08182f] border border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] animate-fade-up">
              <Sparkles className="size-3.5 text-[#d4af37] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#d4af37] uppercase">
                {currentSlide.tagline}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-[10px] text-slate-300 font-medium tracking-wider">SAVERRA BESPOKE REALTY</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                {currentSlide.title1} <br />
                <span className="bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#b88e14] bg-clip-text text-transparent italic font-normal">
                  {currentSlide.titleHighlight}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="max-w-xl text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              {currentSlide.description}
            </p>

            {/* CTA Buttons & Stats Badge */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                asChild
                className="h-14 px-8 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3 group"
              >
                <Link to="/projects">
                  <span>EXPLORE ESTATES</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-14 px-8 rounded-xl border-[#d4af37]/40 bg-[#08182f]/60 hover:bg-[#08182f] text-white hover:text-[#d4af37] text-xs uppercase tracking-widest transition-all backdrop-blur-md flex items-center justify-center gap-2 border"
              >
                <Link to="/private-viewing">
                  <ShieldCheck className="size-4 text-[#d4af37]" />
                  <span>Private VIP Tour</span>
                </Link>
              </Button>
            </div>

            {/* Quick Metrics Strip */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="font-display text-2xl font-bold text-[#d4af37]">₹1,200+ Cr</p>
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Portfolio Valued</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white">150+</p>
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Curated Luxury Units</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#d4af37]">12+ Yrs</p>
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Market Excellence</p>
              </div>
            </div>
          </div>

          {/* Right Visual Card Showcase Deck - 5 Columns */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame Line */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/10 blur-xl pointer-events-none" />

              {/* Main Card Container */}
              <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/30 bg-[#08182f]/80 backdrop-blur-xl shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] transition-all duration-500">
                {/* Image Aspect Box */}
                <div className="relative h-[340px] sm:h-[400px] overflow-hidden group cursor-pointer" onClick={handleNextSlide}>
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.titleHighlight}
                    className={`w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 ${
                      isAnimating ? "opacity-40 scale-95" : "opacity-100 scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040e1d] via-transparent to-black/20" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#08182f]/90 backdrop-blur-md border border-[#d4af37]/40 text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                      {currentSlide.badge}
                    </span>
                  </div>

                  {/* Play Interactive Preview Button */}
                  <div className="absolute bottom-4 right-4 size-12 rounded-full bg-[#d4af37] text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="size-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>

                {/* Card Specs Info Bar */}
                <div className="p-6 text-left space-y-3 bg-[#08182f]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium tracking-wide">
                      {currentSlide.specs}
                    </span>
                    <span className="font-display font-bold text-lg text-[#d4af37]">
                      {currentSlide.price}
                    </span>
                  </div>

                  {/* Slide Carousel Controls */}
                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <div className="flex items-center gap-2">
                      {HERO_SLIDES.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentIndex ? "w-8 bg-[#d4af37]" : "w-2 bg-white/30 hover:bg-white/60"
                          }`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNextSlide}
                      className="text-xs text-[#d4af37] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>Next Estate</span>
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Quick Filter Bar */}
        <HeroQuickFilter />
      </div>
    </section>
  );
}
