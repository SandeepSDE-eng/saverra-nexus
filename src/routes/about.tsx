import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Target, Trophy, Lightbulb, Users, ArrowRight, HeartHandshake, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      
      {/* Top Banner (Consistent with Privacy & Terms) */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden pb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] to-transparent opacity-80"></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-gold uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-gold animate-pulse"></span>
            Opening doors to your dreams
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light tracking-wide mb-4">
            Welcome to <span className="text-gold italic font-medium">Saverra</span>
          </h1>
        </div>
      </div>

      <div className="container-luxe max-w-6xl mx-auto -mt-16 relative z-20">
        
        {/* Main Introduction Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border/50 p-8 md:p-14 lg:p-16 mb-16 animate-fade-up transition-all hover:shadow-[0_20px_60px_-15px_rgba(201,168,106,0.15)]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-light text-primary leading-tight">
                Delivering Integrated Real Estate Services Built on <span className="font-medium italic text-gold">Insight & Foresight</span>
              </h2>
              <div className="w-16 h-1 bg-gold rounded-full"></div>
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                Our quality services include assistance in identifying customer needs, offering suitable products, arranging buyers or sellers, tenants or landlords, alongside expert negotiations, finalizing deals, and meticulous documentation.
              </p>
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                Our clients range from individual owners and buyers to major developers, investors, and corporate tenants. We pride ourselves on offering highly competitive rates and exceptional offers in the market.
              </p>
            </div>
            
            <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury Property Interior" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--navy-deep)]/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-white">
                  <p className="font-display text-xl mb-1">Our Motivation</p>
                  <p className="text-sm font-light text-white/80">Your absolute satisfaction drives our everyday endeavors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Philosophy Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: HeartHandshake,
              title: "Lifetime Relationships",
              desc: "Our aim is to optimize satisfactory services and build lifelong relationships with our customers and communities."
            },
            {
              icon: Lightbulb,
              title: "Innovative Concepts",
              desc: "We continuously bring new and innovative concepts to give our clients far more than just what they want."
            },
            {
              icon: ShieldCheck,
              title: "Ethical Business",
              desc: "We believe in conducting ourselves in an honest, ethical, and trustworthy manner, growing through creativity."
            }
          ].map((item, i) => (
            <div key={i} className="group bg-white rounded-2xl p-8 border border-border/60 shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 animate-fade-up" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-500">
                <item.icon className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Mission, Vision, Goals Section */}
        <div className="bg-[color:var(--navy-deep)] rounded-3xl overflow-hidden shadow-2xl animate-fade-up">
          <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Mission */}
            <div className="p-10 md:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Target className="size-10 text-gold mb-6 transition-transform duration-500 group-hover:scale-110" />
              <h3 className="font-display text-2xl font-light text-white mb-4">Our Mission</h3>
              <p className="text-white/70 font-light leading-relaxed">
                To identify and deliver suitable real estate products while ensuring honest negotiations, transparent documentation, and a seamless experience for every buyer, seller, tenant, and landlord.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-white/60 text-sm font-light"><CheckCircle2 className="size-4 text-gold" /> Client-centric approach</li>
                <li className="flex items-center gap-3 text-white/60 text-sm font-light"><CheckCircle2 className="size-4 text-gold" /> Honest negotiations</li>
                <li className="flex items-center gap-3 text-white/60 text-sm font-light"><CheckCircle2 className="size-4 text-gold" /> Transparent documentation</li>
              </ul>
            </div>

            {/* Vision */}
            <div className="p-10 md:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Trophy className="size-10 text-gold mb-6 transition-transform duration-500 group-hover:scale-110" />
              <h3 className="font-display text-2xl font-light text-white mb-4">Our Vision</h3>
              <p className="text-white/70 font-light leading-relaxed">
                To be the most trusted and innovative real estate consultancy, known for setting the benchmark in market insight, foresight, and building lifelong community relationships.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-white/60 text-sm font-light"><CheckCircle2 className="size-4 text-gold" /> Deep market insights</li>
                <li className="flex items-center gap-3 text-white/60 text-sm font-light"><CheckCircle2 className="size-4 text-gold" /> Lifelong relationships</li>
                <li className="flex items-center gap-3 text-white/60 text-sm font-light"><CheckCircle2 className="size-4 text-gold" /> Innovative thinking</li>
              </ul>
            </div>

            {/* Goals */}
            <div className="p-10 md:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-bl from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Users className="size-10 text-gold mb-6 transition-transform duration-500 group-hover:scale-110" />
              <h3 className="font-display text-2xl font-light text-white mb-4">Our Goals</h3>
              <p className="text-white/70 font-light leading-relaxed">
                To consistently exceed client expectations by offering highly competitive rates and delivering more than they anticipate, growing our network of individual and corporate investors.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-white/60 text-sm font-light"><CheckCircle2 className="size-4 text-gold" /> Exceeding expectations</li>
                <li className="flex items-center gap-3 text-white/60 text-sm font-light"><CheckCircle2 className="size-4 text-gold" /> Competitive market rates</li>
                <li className="flex items-center gap-3 text-white/60 text-sm font-light"><CheckCircle2 className="size-4 text-gold" /> Expanding investor network</li>
              </ul>
            </div>

          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="font-display text-3xl font-light text-primary mb-6">
            Ready to <span className="text-gold italic">Connect?</span>
          </h2>
          <Button variant="gold" size="xl" className="rounded-full px-8 tracking-widest uppercase text-xs shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all" asChild>
            <a href="/contact">Talk to an Expert <ArrowRight className="ml-2 size-4" /></a>
          </Button>
        </div>

      </div>
    </div>
  );
}
