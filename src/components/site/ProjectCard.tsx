import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Calendar, ArrowUpRight, Sparkles, Building2 } from "lucide-react";
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
    ? p.cover_image.replace(/w=\d+/, "w=800")
    : (p.cover_image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80");

  const slug = p.slug || String(p.id);

  return (
    <>
      <article
        className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gold/30 bg-card shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-luxury ${
          isFeatured ? "lg:col-span-2 lg:flex-row" : "h-full"
        }`}
      >
        {/* Media Aspect Container */}
        <div className={`relative overflow-hidden ${isFeatured ? "lg:w-1/2 min-h-[320px]" : "aspect-[16/10]"}`}>
          <img
            src={optimizedImage}
            alt={p.name || "Real Estate Project"}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80";
            }}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Status Badge */}
          <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 border border-gold/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-md shadow-md">
              <Sparkles className="size-3 text-gold" />
              {statusDisplay}
            </span>
          </div>

          {/* Location Chip */}
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              <MapPin className="size-3.5 text-gold shrink-0" />
              <span className="truncate">{p.location || "Prime Address"}</span>
            </span>
          </div>
        </div>

        {/* Details Container */}
        <div className="flex flex-1 flex-col p-6 space-y-3.5 justify-between">
          <div className="space-y-1 text-left">
            <h3 className="font-display text-xl font-bold text-primary group-hover:text-gold transition-colors line-clamp-1" title={p.name}>
              {p.name || "Exclusive Project"}
            </h3>
            <p className="text-xs text-muted-foreground font-medium tracking-wide">
              {p.bhk_options || "Luxury Configurations Available"}
            </p>
          </div>

          {/* Specs Row */}
          <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-border/60 text-xs text-left">
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-gold">Carpet Area</span>
              <span className="font-medium text-foreground/80">{getCarpetArea(p)}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-gold">Possession</span>
              <span className="font-medium text-foreground/80 flex items-center gap-1">
                <Calendar className="size-3 text-gold shrink-0" />
                {p.possession || "Ready / On Request"}
              </span>
            </div>
          </div>

          {/* Price & Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Investment</span>
              <p className="font-display text-xl font-bold text-primary">
                {p.price_display ? p.price_display : "On Request"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3.5 rounded-lg border-border hover:border-gold text-xs font-semibold"
                onClick={() => setIsModalOpen(true)}
              >
                Quick View
              </Button>

              <Button
                asChild
                variant="gold"
                size="sm"
                className="h-9 px-3.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"
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
