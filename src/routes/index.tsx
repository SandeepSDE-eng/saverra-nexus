import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { StatusStories } from "@/components/site/StatusStories";
import { DevelopersMarquee } from "@/components/site/DevelopersMarquee";
import { StatsBar } from "@/components/site/StatsBar";
import { FeaturedProjects } from "@/components/site/FeaturedProjects";
import { ArchitecturalShowcase } from "@/components/site/ArchitecturalShowcase";
import { NeighborhoodExplorer } from "@/components/site/NeighborhoodExplorer";
import { PropertyTours } from "@/components/site/PropertyTours";
import { RentalUpdates } from "@/components/site/RentalUpdates";
import { EmiCalculator } from "@/components/site/EmiCalculator";
import { Testimonials } from "@/components/site/Testimonials";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/")({ component: Home });

const SHOW_WEBSITE = true;

function Home() {
  if (!SHOW_WEBSITE) {
    return (
      <div className="min-h-screen bg-[#040e1d] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/10 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-8 max-w-2xl text-white">
          <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in">
            <div className="size-12 bg-gradient-to-tr from-[#f3e5ad] via-[#d4af37] to-[#aa820a] rounded-xl flex items-center justify-center shadow-lg shadow-[#d4af37]/20 text-slate-950 font-bold text-2xl font-display">
              S
            </div>
            <span className="font-display text-2xl font-bold tracking-widest text-white">
              SAVERRA
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            A New Era of <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] bg-clip-text text-transparent">
              Luxury Living
            </span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl font-light max-w-lg mx-auto">
            We are meticulously crafting our digital experience. Our luxury real estate portal will be launching soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#040e1d] text-white overflow-hidden">
      <Hero />
      <StatusStories />
      <DevelopersMarquee />
      <StatsBar />
      <FeaturedProjects limit={6} />
      <ArchitecturalShowcase />
      <NeighborhoodExplorer />
      <RentalUpdates />
      <PropertyTours />
      <EmiCalculator />
      <Testimonials />
      <ContactSection />
    </div>
  );
}
