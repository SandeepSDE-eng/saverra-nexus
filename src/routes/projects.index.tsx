import { createFileRoute } from "@tanstack/react-router";
import { FeaturedProjects } from "@/components/site/FeaturedProjects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Luxury Projects & Properties for Sale | Saverra Realty" },
      { name: "description", content: "Explore premium 1, 2 & 3 BHK luxury flats and commercial spaces in Ghatkopar East, Chembur, and Central Mumbai by Saverra Realty." },
      { property: "og:title", content: "Luxury Projects & Properties for Sale | Saverra Realty" },
      { property: "og:description", content: "Explore premium residential and commercial developments by Saverra Realty in Ghatkopar East & Mumbai." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Top Banner */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden pb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 filter mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] to-transparent opacity-80"></div>
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-gold uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-gold animate-pulse"></span>
            Our Portfolio
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light tracking-wide mb-4">
            Our <span className="text-gold italic font-medium">Projects</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto font-light tracking-wide text-sm md:text-lg">
            Explore our curated portfolio of exceptional properties across premium locations.
          </p>
        </div>
      </div>
      
      {/* Reusing the Featured Projects component for the list */}
      <div className="container-luxe max-w-7xl mx-auto -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border/50 p-6 md:p-10 mb-16 animate-fade-up">
          <FeaturedProjects showHeading={false} />
        </div>
      </div>
    </div>
  );
}
