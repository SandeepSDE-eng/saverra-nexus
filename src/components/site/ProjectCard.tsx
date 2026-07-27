import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Calendar, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/integrations/supabase/types";
import { ProjectModal } from "./ProjectModal";

type Project = Tables<"projects">;

const STATUS_LABEL: Record<string, string> = {
  "new-launch": "NEW LAUNCH",
  "ultra-luxury": "ULTRA LUXURY",
  "premium": "PREMIUM LIVING",
  "ready-to-move": "READY TO MOVE",
  "upcoming": "UPCOMING",
};

export function ProjectCard({ p }: { p: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Optimize Unsplash images for card view (600px width is enough for a card)
  const optimizedImage = p.cover_image?.includes("unsplash.com") 
    ? p.cover_image.replace(/w=\d+/, "w=600")
    : p.cover_image;

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-luxury">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={optimizedImage}
            alt={p.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[color:var(--navy-deep)] shadow-md">
            {STATUS_LABEL[p.status] ?? p.status}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-bold text-primary">{p.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3 text-gold" /> {p.location}
          </p>
          {p.bhk_options && (
            <p className="mt-2 text-xs text-foreground/70">{p.bhk_options}</p>
          )}
          <div className="mt-3 flex items-baseline gap-2">
            <IndianRupee className="size-4 text-gold" />
            <span className="font-display text-xl font-bold text-primary">{p.price_display.replace(/^₹\s*/, "")}</span>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Onwards</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>RERA: {p.rera_number ?? "—"}</span>
            {p.possession && <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> {p.possession}</span>}
          </div>
          <div className="mt-4 flex gap-2 pt-3">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link to="/projects/$slug" params={{ slug: p.slug }}>Full Details</Link>
            </Button>
            <Button variant="default" size="sm" className="flex-1" onClick={() => setIsModalOpen(true)}>
              Quick View
            </Button>
          </div>
        </div>
      </article>

      <ProjectModal 
        project={p} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
