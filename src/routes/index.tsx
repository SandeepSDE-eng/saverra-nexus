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

// 🚧 DEVELOPMENT MODE TOGGLE
// Set this to 'true' to SHOW the actual landing page.
// Set this to 'false' to HIDE the landing page and show a premium "Coming Soon" screen to the client.
const SHOW_WEBSITE = true;

function Home() {
  if (!SHOW_WEBSITE) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Elegant Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-8 max-w-2xl">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in">
            <div className="size-10 bg-gradient-to-tr from-primary to-primary/60 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-xl font-display">S</span>
            </div>
            <span className="font-display text-2xl font-bold tracking-wider text-white">
              SAVERRA
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A New Era of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Luxury Living
            </span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            We are meticulously crafting our digital experience. Our premium real estate portal is currently under development and will be launching soon.
          </p>
          
          <div className="pt-8 flex flex-col items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 text-primary text-sm font-medium tracking-widest uppercase">
              <span className="size-2 bg-primary rounded-full animate-pulse" />
              Development in Progress
            </div>
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          </div>
        </div>
      </div>
    );
  }

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
