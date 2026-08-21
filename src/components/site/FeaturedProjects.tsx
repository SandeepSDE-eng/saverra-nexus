import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getProjectsFn, getFeaturedProjectsFn } from "@/api/projects";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { MOCK_PROJECTS } from "@/lib/mockProjects";

export function FeaturedProjects({ limit, showHeading = true }: { limit?: number, showHeading?: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      try {
        const response = limit 
          ? await getFeaturedProjectsFn()
          : await getProjectsFn();
          
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

  // Calculate displayed projects
  let displayedProjects = projects;
  let totalPages = 1;

  if (limit) {
    displayedProjects = projects.slice(0, limit);
  } else {
    totalPages = Math.ceil(projects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    displayedProjects = projects.slice(startIndex, startIndex + itemsPerPage);
  }

  return (
    <section id="projects" className="py-20">
      <div className="container-luxe">
        {showHeading && (
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Exclusive Recommendations</p>
              <h2 className="mt-2 font-display text-4xl font-light tracking-wide text-primary sm:text-5xl">
                Curated Developer Projects
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
                Explore a hand-picked portfolio of premium residences and commercial spaces from top reputed developers, expertly vetted by our advisors for your lifestyle and investment goals.
              </p>
            </div>
            {limit && (
              <Button variant="outline" asChild>
                <Link to="/projects">View All Projects <ArrowRight className="size-4" /></Link>
              </Button>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: limit || 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No projects yet. Add your first project from the admin panel.</p>
            <Button variant="gold" className="mt-4" asChild>
              <Link to="/admin/projects">Go to Admin</Link>
            </Button>
          </div>
        ) : (
          <>
            <div 
              className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-6 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 animate-fade-in"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {displayedProjects.map((p: any) => (
                <div key={p.id} className="w-[85vw] sm:w-full flex-none snap-center">
                  <ProjectCard p={p} />
                </div>
              ))}
            </div>

            <style dangerouslySetInnerHTML={{__html: `
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}} />
            
            {/* Pagination Controls */}
            {!limit && totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`size-8 rounded-md text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
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
