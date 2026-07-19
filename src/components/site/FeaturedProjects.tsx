import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="projects" className="py-20">
      <div className="container-luxe">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured Properties</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-primary sm:text-5xl">
              Curated Masterpieces
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              A hand-picked selection of our most sought-after residences and commercial addresses.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="#projects">View All Projects <ArrowRight className="size-4" /></a>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
