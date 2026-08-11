import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Calendar, ArrowUpRight, Sparkles, Building, ShieldCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/integrations/supabase/types";
import { ProjectModal } from "./ProjectModal";
import { getCarpetArea } from "@/lib/projectUtils";

type Project = Tables<"projects">;

const STATUS_LABEL: Record<string, string> = {
  "new-launch": "FLAGSHIP LAUNCH",
  "ultra-luxury": "ULTRA LUXURY",
  "premium": "PREMIUM LIVING",
  "ready-to-move": "READY TO MOVE",
  "upcoming": "UPCOMING PREVIEW",
  "under-construction": "UNDER CONSTRUCTION"
};

export function ProjectCard({ p, isFeatured = false }: { p: Project; isFeatured?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!p) return null;

  const statusKey = p.status || "premium";
  const statusDisplay = STATUS_LABEL[statusKey] || statusKey.toUpperCase();

  const optimizedImage = p.cover_image?.includes("unsplash.com") 
    ? p.cover_image.replace(/w=\d+/, "w=900")
    : (p.cover_image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80");

  const slug = p.slug || String(p.id);

  return (
    <>
      <article
        className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37] hover:shadow-2xl hover:shadow-[#d4af37]/15 ${
          isFeatured ? "lg:col-span-2 lg:flex-row" : "h-full"
        }`}
      >
        {/* Media Aspect Container */}
        <div className={`relative overflow-hidden ${isFeatured ? "lg:w-1/2 min-h-[360px]" : "aspect-[16/10]"}`}>
          <img
            src={optimizedImage}
            alt={p.name || "Real Estate Project"}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80";
            }}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

          {/* Status Badge */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/90 border border-[#d4af37]/50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d4af37] backdrop-blur-md shadow-md">
              <Sparkles className="size-3 text-[#d4af37]" />
              {statusDisplay}
            </span>
          </div>

          {/* RERA Badge */}
          <div className="absolute right-4 top-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 border border-white/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-200 backdrop-blur-md">
              <ShieldCheck className="size-3 text-[#d4af37]" /> MahaRERA Verified
            </span>
          </div>

          {/* Location Chip Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950/80 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md border border-white/10">
              <MapPin className="size-3.5 text-[#d4af37] shrink-0" />
              <span className="truncate">{p.location || "Prime Mumbai Address"}</span>
            </span>
          </div>
        </div>

        {/* Details Container */}
        <div className="flex flex-1 flex-col p-6 space-y-4 justify-between text-left">
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[#aa820a] transition-colors line-clamp-1" title={p.name}>
              {p.name || "Exclusive Residence"}
            </h3>
            <p className="text-xs text-slate-500 font-semibold tracking-wide flex items-center gap-1.5">
              <Building className="size-3.5 text-[#d4af37]" />
              {p.bhk_options || "Multiple Configurations Available"}
            </p>
          </div>

          {/* Specs Matrix Box */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs">
            <div className="space-y-0.5">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#aa820a]">Carpet Area</span>
              <span className="font-bold text-slate-900">{getCarpetArea(p)}</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#aa820a]">Possession</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Calendar className="size-3 text-[#d4af37] shrink-0" />
                {p.possession || p.status || "Ready / Dec 2028"}
              </span>
            </div>
          </div>

          {/* Investment Price & Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Starting Investment</span>
              <p className="font-display text-xl font-bold text-[#d4af37]">
                {p.price_display ? p.price_display : "On Request"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-3.5 rounded-xl border-slate-200 text-slate-700 hover:border-[#d4af37] hover:bg-amber-50 text-xs font-bold transition-all cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Eye className="size-3.5 text-[#d4af37] mr-1" />
                Quick View
              </Button>

              <Button
                asChild
                size="sm"
                className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-md shadow-[#d4af37]/20 hover:brightness-110 transition-all cursor-pointer"
              >
                <Link to="/projects/$slug" params={{ slug }}>
                  <span>Full Details</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {isModalOpen && (
        <ProjectModal
          project={p}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
