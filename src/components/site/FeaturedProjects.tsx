import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Building2 } from "lucide-react";
import { getProjectsFn, getFeaturedProjectsFn } from "@/api/projects";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { MOCK_PROJECTS } from "@/lib/mockProjects";

const CATEGORY_TABS = [
  { id: "all", label: "All Residences" },
  { id: "ultra-luxury", label: "Sky Penthouses" },
  { id: "new-launch", label: "Flagship Launches" },
  { id: "ready-to-move", label: "Ready Occupancy" },
];

export function FeaturedProjects({ limit, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      try {
        const response = limit ? await getFeaturedProjectsFn() : await getProjectsFn();

        if (!response.success || !response.data || response.data.length === 0) {
          console.warn("Using mock data due to empty DB or old schema");
          return MOCK_PROJECTS.filter((p: any) => p.is_published !== false);
        }
        return response.data;
      } catch (error) {
        console.warn("MySQL Error (using fallback):", error);
        return MOCK_PROJECTS.filter((p: any) => p.is_published !== false);
      }
    },
  });

  // Filter projects by active tab
  const filteredProjects = projects.filter((p: any) => {
    if (activeTab === "all") return true;
    return p.status === activeTab;
  });

  let displayedProjects = filteredProjects;
  let totalPages = 1;

  if (limit) {
    displayedProjects = filteredProjects.slice(0, limit);
  } else {
    totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    displayedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }

  return (
    <section id="projects" className="py-24 bg-[#040e1d] text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#08182f] blur-[100px] pointer-events-none" />

      <div className="container-luxe relative z-10">
        {showHeading && (
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08182f] border border-[#d4af37]/30 text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
                  <Sparkles className="size-3" /> ARCHITECTURAL PORTFOLIO
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  Curated <span className="bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] bg-clip-text text-transparent">Landmark Residences</span>
                </h2>
                <p className="max-w-2xl text-slate-300 text-sm sm:text-base font-light">
                  Hand-picked luxury apartments, oceanfront penthouses, and prime commercial hubs expertly vetted for your lifestyle and portfolio goals.
                </p>
              </div>

              {limit && (
                <Button
                  asChild
                  className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] shrink-0"
                >
                  <Link to="/projects" className="flex items-center gap-2">
                    <span>View All Collections</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>

            {/* Filter Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#d4af37] text-slate-950 font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "bg-[#08182f]/60 text-slate-300 hover:bg-[#08182f] hover:text-white border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: limit || 6 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl bg-[#08182f]" />
            ))}
          </div>
        ) : displayedProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d4af37]/30 bg-[#08182f]/50 p-12 text-center space-y-4">
            <Building2 className="size-10 text-[#d4af37] mx-auto opacity-70" />
            <p className="text-slate-300 text-base font-medium">No properties found in this category.</p>
            <Button
              variant="outline"
              onClick={() => setActiveTab("all")}
              className="border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-slate-950"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Asymmetrical Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">
              {displayedProjects.map((p: any, idx: number) => (
                <ProjectCard key={p.id} p={p} isFeatured={idx === 0 && activeTab === "all" && !limit} />
              ))}
            </div>

            {/* Pagination Controls */}
            {!limit && totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border-[#d4af37]/30 bg-[#08182f] text-white hover:bg-[#d4af37] hover:text-slate-950"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`size-10 rounded-xl text-xs font-bold transition-all ${
                        currentPage === i + 1
                          ? "bg-[#d4af37] text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                          : "bg-[#08182f] border border-white/10 text-slate-300 hover:border-[#d4af37]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-xl border-[#d4af37]/30 bg-[#08182f] text-white hover:bg-[#d4af37] hover:text-slate-950"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
