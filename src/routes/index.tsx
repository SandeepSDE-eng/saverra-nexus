import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import { DevelopersMarquee } from "@/components/site/DevelopersMarquee";
import { StatsBar } from "@/components/site/StatsBar";
import { FeaturedProjects } from "@/components/site/FeaturedProjects";
import { Amenities } from "@/components/site/Amenities";
import { FloorPlans } from "@/components/site/FloorPlans";
import { EmiCalculator } from "@/components/site/EmiCalculator";
import { Testimonials } from "@/components/site/Testimonials";
import { FaqSection } from "@/components/site/FaqSection";
import { ContactSection } from "@/components/site/ContactSection";
import { FloatingActions } from "@/components/site/FloatingActions";
import { LeadPopup } from "@/components/site/LeadPopup";
import { InteractiveMap } from "@/components/site/InteractiveMap";


export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <DevelopersMarquee />
        <StatsBar />
        <FeaturedProjects />
        <Amenities />
        <FloorPlans />
        <EmiCalculator />
        <InteractiveMap />
        <Testimonials />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingActions />
      <LeadPopup />
    </div>

  );
}
