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
  { id: "under-construction", label: "Under Construction" },
];

export function FeaturedProjects({ limit, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: rawProjects = [], isLoading } = useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      try {
        const response = limit ? await getFeaturedProjectsFn() : await getProjectsFn();

        if (!response?.success || !Array.isArray(response?.data) || response.data.length === 0) {
          console.warn("Using mock data due to empty DB or fallback");
          return MOCK_PROJECTS.filter((p: any) => p && p.is_published !== false);
        }
        return response.data;
      } catch (error) {
        console.warn("MySQL/API Error (using fallback):", error);
        return MOCK_PROJECTS.filter((p: any) => p && p.is_published !== false);
      }
    },
  });

  const projects = Array.isArray(rawProjects) ? rawProjects.filter(Boolean) : [];

  // Filter projects by active tab
  const filteredProjects = projects.filter((p: any) => {
    if (!p) return false;
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
    <section id="projects" className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      <div className="container-luxe relative z-10">
        {showHeading && (
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <Sparkles className="size-3 text-gold" /> ARCHITECTURAL PORTFOLIO
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-light tracking-wide text-primary">
                  Curated <span className="font-medium italic text-gold">Developer Projects</span>
                </h2>
                <p className="max-w-2xl text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
                  Explore a hand-picked portfolio of premium residences, oceanfront penthouses, and commercial spaces from top reputed developers, expertly vetted by our advisors.
                </p>
              </div>

              {limit && (
                <Button
                  asChild
                  variant="outline"
                  className="h-11 px-6 rounded-xl border-border hover:border-gold text-xs font-bold uppercase tracking-widest transition-all shrink-0"
                >
                  <Link to="/projects" className="flex items-center gap-2">
                    <span>View All Projects</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>

            {/* Filter Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/50 no-scrollbar">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground font-bold shadow-md"
                      : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/60"
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
              <div key={i} className="h-96 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : displayedProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center space-y-4">
            <Building2 className="size-10 text-gold mx-auto opacity-70" />
            <p className="text-muted-foreground text-base font-medium">No properties found in this category.</p>
            <Button
              variant="outline"
              onClick={() => setActiveTab("all")}
              className="border-gold/40 text-primary hover:bg-gold hover:text-primary-foreground cursor-pointer"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Asymmetrical Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {displayedProjects.map((p: any, idx: number) => (
                <ProjectCard key={p?.id || idx} p={p} isFeatured={idx === 0 && activeTab === "all" && !limit} />
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
                  className="rounded-xl border-border hover:border-gold"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`size-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentPage === i + 1
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-card border border-border text-muted-foreground hover:border-gold"
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
                  className="rounded-xl border-border hover:border-gold"
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
