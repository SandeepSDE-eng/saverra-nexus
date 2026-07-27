import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, Sparkles, Building, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/private-viewing")({
  component: PrivateViewing,
});

function PrivateViewing() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Top Banner */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden pb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577983177682-140b016d9bba?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30 filter mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/80 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-up max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-gold uppercase backdrop-blur-md">
            <Sparkles className="size-3" /> Exclusive Service
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6">
            Book a <span className="text-gold italic font-medium">Private</span> Viewing
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto font-light tracking-wide text-sm md:text-lg leading-relaxed">
            Experience our premium properties in person. Schedule a confidential consultation and exclusive site visit with our senior real estate advisors.
          </p>
        </div>
      </div>

      <div className="container-luxe mx-auto max-w-6xl px-4 -mt-20 relative z-20">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-0 bg-card rounded-2xl shadow-2xl overflow-hidden border border-border/50">
          
          {/* Booking Form */}
          <div className="p-8 md:p-14 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="font-display text-3xl font-light text-primary mb-3">Request an Appointment</h2>
              <p className="text-muted-foreground text-sm font-medium">Your details are kept strictly confidential.</p>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Full Name *</Label>
                  <Input placeholder="John Doe" className="h-12 bg-secondary/30 border-border/50 focus-visible:border-gold" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Phone Number *</Label>
                  <Input type="tel" placeholder="+91 98xxx xxxxx" className="h-12 bg-secondary/30 border-border/50 focus-visible:border-gold" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Preferred Date</Label>
                  <Input type="date" className="h-12 bg-secondary/30 border-border/50 focus-visible:border-gold text-foreground/80" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Interest / Budget</Label>
                  <Input placeholder="e.g. 3 BHK in Ghatkopar, ₹3-4 Cr" className="h-12 bg-secondary/30 border-border/50 focus-visible:border-gold" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Specific Requirements</Label>
                <Textarea placeholder="Any specific projects or requirements you have in mind?" className="min-h-[120px] resize-none bg-secondary/30 border-border/50 focus-visible:border-gold" />
              </div>
              
              <Button variant="gold" className="w-full h-14 text-sm tracking-widest uppercase mt-4 shadow-lg shadow-gold/20">
                Confirm Request
              </Button>
            </form>
          </div>

          {/* Premium Info Sidebar */}
          <div className="bg-[color:var(--navy-deep)] text-white p-8 md:p-14 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
            
            <div className="relative z-10">
              <h3 className="font-display text-2xl font-light mb-8 italic">The Saverra Advantage</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="mt-1 bg-white/10 p-3 rounded-full text-gold">
                    <Briefcase className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-white mb-2">Expert Consultancy</h4>
                    <p className="text-white/70 leading-relaxed font-light text-sm">
                      Our senior advisors provide tailored insights and market analysis to help you make informed investment decisions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="mt-1 bg-white/10 p-3 rounded-full text-gold">
                    <Building className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-white mb-2">Exclusive Access</h4>
                    <p className="text-white/70 leading-relaxed font-light text-sm">
                      Get priority access to off-market luxury listings and pre-launch premium projects before they hit the market.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="mt-1 bg-white/10 p-3 rounded-full text-gold">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-white mb-2">Dedicated Time</h4>
                    <p className="text-white/70 leading-relaxed font-light text-sm">
                      Enjoy a distraction-free, personalized site tour with dedicated attention to your unique lifestyle requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                <p className="text-sm font-light text-white/80 leading-relaxed">
                  "Our goal is not just to show you a property, but to guide you towards a lifestyle that defines your success."
                </p>
                <p className="mt-3 text-gold text-xs font-bold tracking-widest uppercase">— Saverra Realty</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
