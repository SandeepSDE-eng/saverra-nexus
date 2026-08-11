import { useState } from "react";
import { Search, MapPin, Building2, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroQuickFilter() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [budget, setBudget] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (propertyType !== "all") params.set("type", propertyType);
    if (budget !== "all") params.set("budget", budget);
    
    const queryString = params.toString();
    const targetUrl = queryString ? `/projects?${queryString}` : "/projects";
    
    if (typeof window !== "undefined") {
      window.location.href = targetUrl;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 relative z-30 animate-fade-up">
      <div className="rounded-2xl bg-[#08182f]/90 backdrop-blur-2xl border border-[#d4af37]/30 p-4 md:p-6 shadow-[0_25px_60px_-15px_rgba(4,14,29,0.7)] text-white">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {/* Location Selector */}
          <div className="relative flex items-center bg-black/40 rounded-xl px-4 py-3 border border-white/10 focus-within:border-[#d4af37] transition-all">
            <MapPin className="size-5 text-[#d4af37] shrink-0 mr-3" />
            <div className="flex-1 text-left">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Location / Hub</label>
              <input
                type="text"
                placeholder="e.g. Worli, Bandra, BKC"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-white focus:outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Property Type Selector */}
          <div className="relative flex items-center bg-black/40 rounded-xl px-4 py-3 border border-white/10 focus-within:border-[#d4af37] transition-all">
            <Building2 className="size-5 text-[#d4af37] shrink-0 mr-3" />
            <div className="flex-1 text-left">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Property Category</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer border-none [&>option]:bg-[#08182f] [&>option]:text-white"
              >
                <option value="all">All Residences</option>
                <option value="Penthouse">Sky Penthouses</option>
                <option value="Luxury Apartment">Luxury Apartments</option>
                <option value="Villa">Golf Villas & Estates</option>
                <option value="Commercial">Commercial Landmarks</option>
              </select>
            </div>
          </div>

          {/* Budget Range Selector */}
          <div className="relative flex items-center bg-black/40 rounded-xl px-4 py-3 border border-white/10 focus-within:border-[#d4af37] transition-all">
            <SlidersHorizontal className="size-5 text-[#d4af37] shrink-0 mr-3" />
            <div className="flex-1 text-left">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Price Bracket</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer border-none [&>option]:bg-[#08182f] [&>option]:text-white"
              >
                <option value="all">Any Budget</option>
                <option value="2-5">₹2 Cr – ₹5 Cr</option>
                <option value="5-10">₹5 Cr – ₹10 Cr</option>
                <option value="10-25">₹10 Cr – ₹25 Cr</option>
                <option value="25+">₹25 Cr+ Ultra Luxe</option>
              </select>
            </div>
          </div>

          {/* CTA Search Button */}
          <div>
            <Button
              type="submit"
              className="w-full h-[54px] rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Search className="size-4" />
              <span>Explore Portfolio</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
