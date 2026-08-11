import { useState } from "react";
import { MapPin, Plane, GraduationCap, Utensils, Building2, Car, Compass } from "lucide-react";

const LANDMARK_CATEGORIES = [
  {
    id: "hubs",
    name: "Business Districts",
    icon: Building2,
    landmarks: [
      { name: "Bandra Kurla Complex (BKC)", distance: "8 Mins Drive" },
      { name: "Lower Parel Financial Hub", distance: "12 Mins Drive" },
      { name: "Nariman Point", distance: "20 Mins Drive" },
      { name: "SEEPZ / MIDC Tech Zone", distance: "15 Mins Drive" }
    ]
  },
  {
    id: "transit",
    name: "Airports & Highways",
    icon: Plane,
    landmarks: [
      { name: "Chhatrapati Shivaji Int'l Airport (T2)", distance: "15 Mins Drive" },
      { name: "Bandra-Worli Sea Link", distance: "5 Mins Drive" },
      { name: "Coastal Road Expressway", distance: "4 Mins Drive" },
      { name: "Domestic Airport Terminal (T1)", distance: "18 Mins Drive" }
    ]
  },
  {
    id: "lifestyle",
    name: "Clubs & Fine Dining",
    icon: Utensils,
    landmarks: [
      { name: "The Bombay Gymkhana / Willingdon", distance: "15 Mins" },
      { name: "Soho House Mumbai", distance: "10 Mins" },
      { name: "Michelin-Star Dining Precinct", distance: "5 Mins" },
      { name: "Palladium & Luxury Malls", distance: "8 Mins" }
    ]
  },
  {
    id: "education",
    name: "Schools & Healthcare",
    icon: GraduationCap,
    landmarks: [
      { name: "Dhirubhai Ambani Int'l School", distance: "10 Mins" },
      { name: "American School of Bombay", distance: "12 Mins" },
      { name: "Sir H. N. Reliance Hospital", distance: "14 Mins" },
      { name: "Lilavati Hospital & Research Centre", distance: "8 Mins" }
    ]
  }
];

export function NeighborhoodExplorer() {
  const [activeCatId, setActiveCatId] = useState("hubs");
  const activeCategory = LANDMARK_CATEGORIES.find(c => c.id === activeCatId) || LANDMARK_CATEGORIES[0];

  return (
    <section className="py-24 bg-[#040e1d] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[140px] pointer-events-none" />

      <div className="container-luxe relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08182f] border border-[#d4af37]/30 text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
              <Compass className="size-3" /> UNRIVALED CONNECTIVITY
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Prime Location <span className="bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] bg-clip-text text-transparent">& Landmark Matrix</span>
            </h2>
            <p className="max-w-xl text-slate-300 text-sm sm:text-base font-light">
              Strategic proximity to Mumbai's premier financial corridors, elite social clubs, international airports, and world-class educational hubs.
            </p>
          </div>
        </div>

        {/* Category Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {LANDMARK_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCatId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCatId(cat.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-4 ${
                  isActive
                    ? "bg-[#08182f] border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                    : "bg-[#08182f]/50 border-white/10 hover:border-[#d4af37]/50 text-slate-300"
                }`}
              >
                <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${
                  isActive ? "bg-[#d4af37] text-slate-950" : "bg-black/40 text-[#d4af37]"
                }`}>
                  <Icon className="size-6" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold tracking-wide ${isActive ? "text-[#d4af37]" : "text-white"}`}>
                    {cat.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">4 Key Venues</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Landmark Distance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCategory.landmarks.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#08182f] border border-[#d4af37]/20 flex flex-col justify-between hover:border-[#d4af37] transition-all group"
            >
              <div className="flex items-start justify-between">
                <MapPin className="size-5 text-[#d4af37] group-hover:scale-110 transition-transform" />
                <span className="px-3 py-1 rounded-full bg-black/50 text-[10px] font-bold text-[#d4af37] uppercase tracking-wider border border-[#d4af37]/30">
                  {item.distance}
                </span>
              </div>

              <div className="mt-8 text-left space-y-1">
                <h5 className="font-display text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {item.name}
                </h5>
                <p className="text-xs text-slate-400 font-medium">Direct Corridor Connectivity</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
