import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Building2, LayoutGrid, List } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
    <section id="projects" className="py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="container-luxe relative z-10">
        {showHeading && (
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-[10px] font-bold uppercase tracking-widest text-[#aa820a]">
                  <Sparkles className="size-3.5 text-[#d4af37]" /> ARCHITECTURAL DOSSIER
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-wide text-slate-900">
                  Curated <span className="text-[#d4af37] italic font-normal">Developer Projects</span>
                </h2>
                <p className="max-w-2xl text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                  Explore a hand-picked portfolio of premium residences, oceanfront penthouses, and commercial spaces from top reputed developers, expertly vetted by our advisors.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* View Mode Toggle Controls */}
                <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "grid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                    title="Showcase Grid View"
                  >
                    <LayoutGrid className="size-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                    title="Dossier Suite View"
                  >
                    <List className="size-4" />
                  </button>
                </div>

                {limit && (
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 px-6 rounded-xl border-slate-300 bg-white hover:border-[#d4af37] text-xs font-bold uppercase tracking-widest transition-all shrink-0 text-slate-800 shadow-sm"
                  >
                    <Link to="/projects" className="flex items-center gap-2">
                      <span>View All Projects</span>
                      <ArrowRight className="size-4 text-[#d4af37]" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Filter Category Tabs */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#d4af37] text-slate-950 shadow-md shadow-[#d4af37]/20 font-bold"
                      : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200"
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
              <div key={i} className="h-96 animate-pulse rounded-3xl bg-slate-200" />
            ))}
          </div>
        ) : displayedProjects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4 shadow-sm">
            <Building2 className="size-10 text-[#d4af37] mx-auto opacity-80" />
            <p className="text-slate-600 text-base font-semibold">No properties found matching this category filter.</p>
            <Button
              variant="outline"
              onClick={() => setActiveTab("all")}
              className="border-slate-300 text-slate-800 hover:border-[#d4af37] cursor-pointer rounded-xl font-bold"
            >
              Reset Category Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Dynamic Layout Grid or List */}
            <div
              className={`grid gap-8 animate-fade-in ${
                viewMode === "list"
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {displayedProjects.map((p: any, idx: number) => (
                <ProjectCard
                  key={p?.id || idx}
                  p={p}
                  isFeatured={viewMode === "grid" && idx === 0 && activeTab === "all" && !limit}
                />
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
                  className="rounded-xl border-slate-300 hover:border-[#d4af37] bg-white text-slate-800"
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
                          ? "bg-[#d4af37] text-slate-950 shadow-md shadow-[#d4af37]/20"
                          : "bg-white border border-slate-200 text-slate-700 hover:border-[#d4af37]"
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
                  className="rounded-xl border-slate-300 hover:border-[#d4af37] bg-white text-slate-800"
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
