import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, CheckCircle2, IndianRupee, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getProjectBySlugFn } from "@/api/projects";
import { getCarpetArea } from "@/lib/projectUtils";
import { ContactSection } from "@/components/site/ContactSection";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <Button asChild className="mt-4"><Link to="/">Return home</Link></Button>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-2 font-display text-3xl text-primary">Project not found</h1>
        <Button asChild className="mt-4"><Link to="/">Back to home</Link></Button>
      </div>
    </div>
  ),
});

import { MOCK_PROJECTS } from "@/lib/mockProjects";

function ProjectDetail() {
  const { slug } = Route.useParams();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: p, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      try {
        const response = await getProjectBySlugFn({ data: slug });
        if (!response.success || !response.data) throw new Error(response.error || "Not found");
        return response.data;
      } catch (error) {
        // Fallback to mock data if DB has old schema (missing name) or error
        const mockP = MOCK_PROJECTS.find((m) => m.slug === slug);
        if (mockP) {
          return mockP;
        } else {
          throw notFound();
        }
      }
    },
  });

  if (isLoading) return <div className="grid min-h-screen place-items-center">Loading…</div>;
  if (!p) return null;

  // Map MOCK_PROJECTS fields to what the UI expects if they differ
  const name = p.name || p.title;
  const priceDisplay = p.price_display || p.price_range;
  const coverImage = p.cover_image || p.image_url;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      
      {/* Hero Banner */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[50vh] min-h-[400px] flex flex-col justify-center overflow-hidden pb-12">
        <div className="absolute inset-0">
          <img src={coverImage} alt={name} className="h-full w-full object-cover opacity-30 filter mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/60 to-transparent opacity-90" />
        </div>
        <div className="relative z-10 container-luxe pt-10 animate-fade-up">
          <Link to="/projects" className="mb-6 inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-gold transition-colors font-medium">
            <ArrowLeft className="size-3.5" /> Back to projects
          </Link>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-gold uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-gold animate-pulse"></span>
            {p.category?.toUpperCase() || "PREMIUM PROJECT"}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light tracking-wide mb-3">{name}</h1>
          {p.tagline && <p className="text-white/85 text-lg md:text-xl italic font-light tracking-wide max-w-3xl mb-4">{p.tagline}</p>}
          <p className="flex items-center gap-2 text-sm text-white/90 font-medium">
            <MapPin className="size-4 text-gold" /> {p.location}
          </p>
        </div>
      </div>

      {/* Main Content Area in Overlapping Card */}
      <div className="container-luxe max-w-6xl mx-auto -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border/50 p-6 md:p-12 mb-16 animate-fade-up">
          
          {/* Key facts - Chronology: 1. Configuration, 2. Carpet Area, 3. Starting Price, 4. Possession */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 bg-[#f8f9fa] rounded-2xl p-6 md:p-8 border border-border/50 shadow-inner mb-12">
            <Fact label="Configuration" value={p.bhk_options ?? "—"} />
            <Fact label="Carpet Area" value={getCarpetArea(p)} />
            <Fact label="Starting Price" value={priceDisplay} icon={<IndianRupee className="size-4 text-gold" />} />
            <Fact label="Possession" value={p.status ?? p.possession ?? "—"} icon={<Calendar className="size-4 text-gold" />} />
          </div>

          {/* Overview */}
          <div className="grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-3xl font-light mb-6 text-primary">About {name}</h2>
                <p className="leading-relaxed text-muted-foreground whitespace-pre-line text-sm md:text-base">
                  {p.description}
                </p>
              </div>

              {p.highlights?.length ? (
                <div>
                  <h3 className="font-display text-2xl font-light mb-6 text-primary">Project Highlights</h3>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {p.highlights.map((h: any) => (
                      <li key={h} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold mt-0.5">
                          <CheckCircle2 className="size-3.5" />
                        </div>
                        <span className="text-sm text-foreground/80">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {p.amenities?.length ? (
                <div>
                  <h3 className="font-display text-2xl font-light mb-6 text-primary">Amenities</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {p.amenities.map((a: any) => (
                      <span key={a} className="rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-secondary">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="h-fit rounded-2xl border border-border/50 bg-[#f8f9fa] p-8 shadow-inner sticky top-28">
              <h3 className="font-display text-2xl font-light mb-2 text-primary">Enquire Now</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Get a call back from a SAVERRA advisor with pricing, availability and floor plans.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-[color:var(--navy-deep)] hover:bg-[color:var(--navy-deep)]/90 text-white h-12 text-base tracking-wide" asChild>
                  <a href="#contact">Schedule Site Visit</a>
                </Button>
                <Button variant="outline" className="w-full h-12 text-base tracking-wide bg-white border-border/50 hover:bg-secondary" asChild>
                  <a href="tel:+918691866691">Call +91 86918 66691</a>
                </Button>
              </div>
            </aside>
          </div>

          {/* Gallery */}
          {p.gallery?.length ? (
            <div className="mt-16 pt-12 border-t border-border/40">
              <h2 className="font-display text-3xl font-light mb-8 text-primary">Life at {name}</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {p.gallery.map((rawUrl: any, i: number) => {
                  const g = typeof rawUrl === 'string' ? rawUrl.replace(/^["'{\[]+|["'}\]]+$/g, '') : '';
                  if (!g) return null;
                  return (
                    <div key={g + i} className="overflow-hidden rounded-xl cursor-pointer group relative bg-secondary" onClick={() => setLightboxIndex(i)}>
                      <img 
                        src={g} 
                        alt={`Gallery image of ${name}`} 
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        loading="lazy" 
                        onError={(e) => {
                          // Hide broken images completely rather than showing alt text
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-[color:var(--navy-deep)]/0 transition-colors duration-500 group-hover:bg-[color:var(--navy-deep)]/20 mix-blend-overlay" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
                    </div>
                  )
                })}
              </div>
            </div>
          ) : null}

          {/* Lightbox */}
          {lightboxIndex !== null && p.gallery && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95">
              <button 
                className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full"
                onClick={() => setLightboxIndex(null)}
              >
                <X className="size-6" />
              </button>
              
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full"
                onClick={() => setLightboxIndex(prev => prev !== null ? (prev === 0 ? p.gallery.length - 1 : prev - 1) : null)}
              >
                <ChevronLeft className="size-8" />
              </button>

              <img 
                src={typeof p.gallery[lightboxIndex] === 'string' ? p.gallery[lightboxIndex].replace(/^["'{\[]+|["'}\]]+$/g, '') : ''} 
                alt="Gallery preview" 
                className="max-h-[90vh] max-w-[90vw] object-contain select-none"
              />

              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full"
                onClick={() => setLightboxIndex(prev => prev !== null ? (prev === p.gallery.length - 1 ? 0 : prev + 1) : null)}
              >
                <ChevronRight className="size-8" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-3 py-1 rounded-full">
                {lightboxIndex + 1} / {p.gallery.length}
              </div>
            </div>
          )}

        </div>
      </div>

      <ContactSection />
    </div>
  );
}

function Fact({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1.5 inline-flex items-center gap-1.5 font-display text-lg font-bold text-primary">
        {icon}{value}
      </p>
    </div>
  );
}
