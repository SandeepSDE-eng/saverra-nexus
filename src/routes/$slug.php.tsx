import { createFileRoute, redirect } from "@tanstack/react-router";
import { MOCK_PROJECTS } from "@/lib/mockProjects";

export const Route = createFileRoute("/$slug/php")({
  beforeLoad: ({ params }) => {
    const rawSlug = (params.slug || "").toLowerCase().trim();

    // Map common legacy PHP page routes
    const PAGE_MAPPINGS: Record<string, string> = {
      about: "/about",
      contact: "/contact",
      services: "/services",
      privacy: "/privacy",
      terms: "/terms",
      careers: "/careers",
      "social-gallery": "/social-wall",
      "social-wall": "/social-wall",
      projects: "/projects",
      "other-projects": "/projects",
      financing: "/financing",
      amenities: "/amenities",
      faq: "/faq",
    };

    if (PAGE_MAPPINGS[rawSlug]) {
      throw redirect({ to: PAGE_MAPPINGS[rawSlug] });
    }

    // Check if rawSlug matches a project in mock data
    const matchedProject = MOCK_PROJECTS.find(
      (p) => p.slug.toLowerCase() === rawSlug || p.slug.toLowerCase().includes(rawSlug)
    );

    if (matchedProject) {
      throw redirect({
        to: "/projects/$slug",
        params: { slug: matchedProject.slug },
      });
    }

    // Fallback: If slug starts with 'f-residences' or 'rising-city'
    if (rawSlug.includes("f-residences")) {
      const fRes = MOCK_PROJECTS.find((p) => p.slug.includes("f-residences")) || MOCK_PROJECTS[0];
      throw redirect({
        to: "/projects/$slug",
        params: { slug: fRes.slug },
      });
    }

    if (rawSlug.includes("rising-city")) {
      const rising = MOCK_PROJECTS.find((p) => p.slug.includes("rising-city")) || MOCK_PROJECTS[0];
      throw redirect({
        to: "/projects/$slug",
        params: { slug: rising.slug },
      });
    }

    // Default redirect to projects listing page
    throw redirect({ to: "/projects" });
  },
  component: () => null,
});
