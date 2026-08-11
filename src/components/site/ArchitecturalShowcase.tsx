import { useState } from "react";
import { Layers, Compass, Eye, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const SHOWCASE_TABS = [
  {
    id: "penthouse",
    title: "Sky Penthouse Duplex",
    specs: "5 BHK • 6,500 Sq Ft • Triple Ceiling Height",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    features: ["Private Heated Infinity Pool", "Panoramic 270° Ocean View", "Private Elevator Access", "Italian Marble Flooring"]
  },
  {
    id: "mansion",
    title: "Seafront Ultra Estate",
    specs: "4 BHK • 4,200 Sq Ft • Wrap-around Deck",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    features: ["Double Height Grand Living", "German Smart Home Automation", "4 Covered Parking Bays", "Vastu Compliant Layout"]
  },
  {
    id: "commercial",
    title: "Grade-A Corporate Tower",
    specs: "Commercial • 12,000 Sq Ft • LEED Gold Certified",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    features: ["High-speed Destination Elevators", "24/7 Multi-tier Security", "Column-free Floorplate", "Prime Business Hub"]
  }
];

export function ArchitecturalShowcase() {
  const [activeTabId, setActiveTabId] = useState("penthouse");
  const activeTab = SHOWCASE_TABS.find(t => t.id === activeTabId) || SHOWCASE_TABS[0];

  return (
    <section className="py-24 bg-[#06152b] text-white relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-[130px] pointer-events-none" />

      <div className="container-luxe relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#08182f] border border-[#d4af37]/30 text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
            <Compass className="size-3.5" /> ARCHITECTURAL CRAFTSMANSHIP
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Spatial Precision & <span className="bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] bg-clip-text text-transparent">3D Floorplans</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            Every residence represented by Saverra is engineered to absolute architectural perfection — maximizing natural light, acoustic isolation, and regal spatial efficiency.
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {SHOWCASE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTabId === tab.id
                  ? "bg-[#d4af37] text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  : "bg-[#08182f] text-slate-300 border border-white/10 hover:border-[#d4af37]"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Main Showcase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#08182f] rounded-3xl p-6 lg:p-10 border border-[#d4af37]/30 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]">
          {/* Image Showcase - 7 Cols */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden min-h-[380px]">
            <img
              src={activeTab.image}
              alt={activeTab.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040e1d] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-[#d4af37]/40 text-xs font-semibold text-[#d4af37]">
                {activeTab.specs}
              </span>
              <Link
                to="/private-viewing"
                className="px-4 py-2 rounded-xl bg-[#d4af37] text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110"
              >
                <Eye className="size-4" />
                <span>360 Virtual Tour</span>
              </Link>
            </div>
          </div>

          {/* Details Column - 5 Cols */}
          <div className="lg:col-span-5 text-left space-y-6">
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-white">
              {activeTab.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              Designed by international architectural laureates, offering grand double-height foyers, customized layout partitions, and expansive outdoor living decks.
            </p>

            <div className="space-y-3 pt-2">
              {activeTab.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="size-4 text-[#d4af37] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-4">
              <Button
                asChild
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                <Link to="/private-viewing" className="flex items-center gap-2">
                  <span>Request Architectural Plan</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
