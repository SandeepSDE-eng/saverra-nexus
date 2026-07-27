import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Calendar, CheckCircle2, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
  const { data: p, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
      
      let projectData = data;

      if (error || !data) {
        // Fallback to mock data
        const mockP = MOCK_PROJECTS.find((m) => m.slug === slug);
        if (mockP) {
          projectData = mockP;
        } else {
          throw notFound();
        }
      }
      return projectData;
    },
  });

  if (isLoading) return <div className="grid min-h-screen place-items-center">Loading…</div>;
  if (!p) return null;

  // Map MOCK_PROJECTS fields to what the UI expects if they differ
  const name = p.name || p.title;
  const priceDisplay = p.price_display || p.price_range;
  const coverImage = p.cover_image || p.image_url;

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="relative">
          <img src={coverImage} alt={name} className="h-[60vh] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/95 via-[color:var(--navy-deep)]/40 to-transparent" />
          <div className="container-luxe absolute inset-x-0 bottom-0 pb-10 text-white">
            <Link to="/" className="mb-4 inline-flex items-center gap-1 text-xs text-white/80 hover:text-gold">
              <ArrowLeft className="size-3" /> Back to projects
            </Link>
            <p className="eyebrow text-gold">{p.category?.toUpperCase()}</p>
            <h1 className="mt-2 font-display text-5xl font-bold sm:text-6xl">{name}</h1>
            {p.tagline && <p className="mt-2 text-lg italic text-white/85">{p.tagline}</p>}
            <p className="mt-3 flex items-center gap-2 text-sm text-white/85"><MapPin className="size-4 text-gold" /> {p.location}</p>
          </div>
        </section>

        {/* Key facts */}
        <section className="container-luxe -mt-8 relative z-10">
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-border/60 bg-card p-6 shadow-luxury md:grid-cols-4">
            <Fact label="Starting Price" value={priceDisplay} icon={<IndianRupee className="size-4 text-gold" />} />
            <Fact label="Configuration" value={p.bhk_options ?? "—"} />
            <Fact label="Possession" value={p.status ?? p.possession ?? "—"} icon={<Calendar className="size-4 text-gold" />} />
            <Fact label="RERA" value={p.rera_number ?? "—"} />
          </div>
        </section>

        {/* Overview */}
        <section className="container-luxe grid gap-10 py-16 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="eyebrow">Overview</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary">About {name}</h2>
            <p className="mt-4 leading-relaxed text-foreground/80">{p.description}</p>

            {p.highlights?.length ? (
              <>
                <h3 className="mt-8 font-display text-xl font-bold text-primary">Highlights</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {p.amenities?.length ? (
              <>
                <h3 className="mt-8 font-display text-xl font-bold text-primary">Amenities</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.amenities.map((a) => (
                    <span key={a} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs">{a}</span>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <aside className="h-fit rounded-xl border border-border/60 bg-card p-6 shadow-sm">
            <p className="eyebrow">Enquire Now</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Get a call back from a SAVERRA advisor with pricing, availability and floor plans.
            </p>
            <Button variant="gold" size="lg" className="mt-4 w-full" asChild>
              <a href="#contact">Schedule Site Visit</a>
            </Button>
            <Button variant="outline" size="lg" className="mt-2 w-full" asChild>
              <a href="tel:+919876543210">Call +91 98765 43210</a>
            </Button>
          </aside>
        </section>

        {/* Gallery */}
        {p.gallery?.length ? (
          <section className="container-luxe pb-16">
            <p className="eyebrow">Gallery</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary">Life at {name}</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
              {p.gallery.map((g) => (
                <Dialog key={g}>
                  <DialogTrigger asChild>
                    <div className="overflow-hidden rounded-lg cursor-pointer group relative">
                      <img 
                        src={g} 
                        alt={`Gallery image of ${name}`} 
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        loading="lazy" 
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
                    <img src={g} alt="" className="mx-auto h-auto w-full max-h-[85vh] object-contain" />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </section>
        ) : null}

        <ContactSection />
      </main>
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
