import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Calendar, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/integrations/supabase/types";
import { ProjectModal } from "./ProjectModal";
import { getCarpetArea } from "@/lib/projectUtils";

type Project = Tables<"projects">;

const STATUS_LABEL: Record<string, string> = {
  "new-launch": "FLAGSHIP LAUNCH",
  "ultra-luxury": "ULTRA LUXURY",
  "premium": "PREMIUM ESTATE",
  "ready-to-move": "READY FOR OCCUPANCY",
  "upcoming": "EXCLUSIVE PREVIEW",
};

export function ProjectCard({ p, isFeatured = false }: { p: Project; isFeatured?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!p) return null;

  const statusKey = p.status || "premium";
  const statusDisplay = STATUS_LABEL[statusKey] || statusKey.toUpperCase();

  const optimizedImage = p.cover_image?.includes("unsplash.com") 
    ? p.cover_image.replace(/w=\d+/, "w=800")
    : (p.cover_image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80");

  const projectSlug = p.slug || p.id || "";

  return (
    <>
      <article 
        className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-[#08182f]/80 backdrop-blur-xl text-white shadow-[0_15px_40px_-15px_rgba(4,14,29,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37]/60 hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.25)] ${
          isFeatured ? "lg:col-span-2 lg:flex-row" : "h-full"
        }`}
      >
        {/* Card Media Section */}
        <div className={`relative overflow-hidden ${isFeatured ? "lg:w-1/2 min-h-[320px]" : "aspect-[16/10]"}`}>
          <img
            src={optimizedImage}
            alt={p.name || "Luxury Property"}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80";
            }}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08182f] via-transparent to-black/30" />

          {/* Status Badge */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#08182f]/90 border border-[#d4af37]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d4af37] backdrop-blur-md">
              <Sparkles className="size-3" />
              {statusDisplay}
            </span>
          </div>

          {/* Location Chip */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
              <MapPin className="size-3.5 text-[#d4af37]" />
              <span className="truncate">{p.location || "Prime Location"}</span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-display text-xl lg:text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors line-clamp-1" title={p.name}>
              {p.name || "Exclusive Luxury Estate"}
            </h3>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              {p.bhk_options || "Luxury Configurations Available"}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs">
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">Carpet Area</span>
              <span className="font-medium text-slate-200">{getCarpetArea(p)}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">Possession</span>
              <span className="font-medium text-slate-200 flex items-center gap-1">
                <Calendar className="size-3 text-[#d4af37]" />
                {p.possession || "Ready / On Notice"}
              </span>
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="mt-auto pt-2 flex items-center justify-between">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Investment From</span>
              <p className="font-display text-2xl font-bold text-[#d4af37]">
                {p.price_display ? p.price_display : "On Request"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-10 rounded-xl border-[#d4af37]/40 bg-transparent text-white hover:bg-[#d4af37] hover:text-slate-950 transition-all font-semibold text-xs px-3 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Quick View
              </Button>

              {projectSlug ? (
                <Button
                  asChild
                  size="sm"
                  className="h-10 w-10 p-0 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer"
                >
                  <Link to="/projects/$slug" params={{ slug: projectSlug }} title="View Full Details">
                    <ArrowUpRight className="size-5" />
                  </Link>
                </Button>
              ) : null}
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
