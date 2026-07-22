import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Building2, Users, Trophy, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[color:var(--navy-deep)] px-4 py-20 text-white">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        
        <div className="container-luxe relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/40 px-5 py-2 text-xs font-semibold tracking-[0.25em] text-white uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-gold"></span>
            A Legacy of Excellence
          </div>
          <h1 className="mb-6 font-display text-5xl font-light leading-tight md:text-7xl drop-shadow-lg">
            Building More Than <br/><span className="text-gold italic font-medium">Homes</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-xl drop-shadow">
            SAVERRA is a premium real estate firm delivering luxury homes, commercial spaces, and villa plots in India's most sought-after locations.
          </p>
        </div>
      </section>

      {/* Stats Section - Floating */}
      <section className="relative -mt-16 z-20 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border shadow-2xl md:grid-cols-4">
          {[
            { label: "Happy Families", value: "5000+" },
            { label: "Years of Trust", value: "20+" },
            { label: "Projects Delivered", value: "45+" },
            { label: "Cities Presence", value: "4" },
          ].map((stat, i) => (
            <div key={i} className="bg-card p-8 text-center transition-colors hover:bg-muted/50">
              <div className="font-display text-4xl font-bold text-gold md:text-5xl">{stat.value}</div>
              <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4">
        <div className="container-luxe mx-auto max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div className="space-y-8">
              <div className="inline-block border-b border-gold pb-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Our Philosophy
              </div>
              <h2 className="font-display text-4xl font-light leading-[1.2] text-foreground md:text-5xl">
                Redefining the <span className="text-gold italic">Art of Living</span>
              </h2>
              <p className="text-base font-light leading-relaxed text-muted-foreground md:text-lg">
                Since our inception, Saverra Realty has been synonymous with quality, commitment, and transparency. We don't just construct buildings; we curate lifestyles. Every project we undertake is a testament to our dedication to architectural brilliance and sustainable living.
              </p>
              <p className="text-base font-light leading-relaxed text-muted-foreground md:text-lg">
                Our team of visionary architects and experienced engineers work tirelessly to create spaces that resonate with modern aspirations while staying rooted in timeless elegance.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80" 
                  alt="Modern Architecture" 
                  className="h-full w-full object-cover transition-transform duration-[10000ms] hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden h-64 w-64 rounded-sm border-[12px] border-background overflow-hidden md:block shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" 
                  alt="Interior Detail" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey (Timeline/Tree Diagram) */}
      <section className="bg-muted/30 py-24 px-4 overflow-hidden">
        <div className="container-luxe mx-auto max-w-5xl">
          <div className="mb-16 text-center space-y-4">
            <h2 className="font-display text-4xl font-light text-foreground md:text-5xl">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-light">Two decades of transforming skylines and delivering promises.</p>
          </div>
          
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-0">
              {[
                { year: "2004", title: "The Inception", desc: "Laying the foundation of Saverra with a vision to redefine luxury living and transparent real estate." },
                { year: "2010", title: "First Milestone", desc: "Delivered our first flagship luxury residential complex, setting a new benchmark for quality in the city." },
                { year: "2016", title: "National Expansion", desc: "Expanded our footprint across 4 major cities in India, launching commercial and villa projects." },
                { year: "2024", title: "The Future", desc: "Continuing the legacy with ultra-luxury penthouses, smart homes, and sustainable green living." },
              ].map((item, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gold border-4 border-background md:-translate-x-1/2 z-10 shadow-sm hidden md:block"></div>
                  
                  {/* Content Card */}
                  <div className="w-full md:w-1/2 p-6 md:p-12">
                    <div className={`group relative rounded-2xl bg-card p-8 shadow-lg transition-all hover:shadow-xl border border-border/50 hover:border-gold/30 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-gold/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 blur -z-10"></div>
                      <span className="inline-block mb-3 text-sm font-bold tracking-[0.2em] text-gold">{item.year}</span>
                      <h3 className="mb-3 font-display text-2xl font-bold">{item.title}</h3>
                      <p className="text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container-luxe mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Mission Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-10 shadow-lg transition-all hover:shadow-2xl">
              <div className="absolute top-0 left-0 h-1 w-full bg-gold transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
              <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Target className="size-8" />
              </div>
              <h3 className="mb-4 font-display text-3xl font-bold">Our Mission</h3>
              <p className="text-lg font-light leading-relaxed text-muted-foreground">
                To continuously elevate the standard of living by delivering world-class, sustainable, and innovative real estate projects. We strive to create unmatched value for our customers through absolute transparency, impeccable quality, and timely delivery.
              </p>
            </div>

            {/* Vision Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-10 shadow-lg transition-all hover:shadow-2xl">
              <div className="absolute top-0 left-0 h-1 w-full bg-gold transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
              <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Trophy className="size-8" />
              </div>
              <h3 className="mb-4 font-display text-3xl font-bold">Our Vision</h3>
              <p className="text-lg font-light leading-relaxed text-muted-foreground">
                To be India's most trusted and admired luxury real estate developer, recognized for shaping the skylines of tomorrow and crafting iconic destinations that inspire generations while fostering vibrant communities.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[color:var(--navy-deep)] py-24 px-4 text-white">
        <div className="container-luxe mx-auto max-w-6xl">
          <div className="mb-16 text-center space-y-4">
            <h2 className="font-display text-4xl font-light text-white md:text-5xl">Our Core Values</h2>
            <p className="text-white/60 max-w-2xl mx-auto font-light">The pillars that define our commitment to excellence.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { icon: Trophy, title: "Quality", desc: "Uncompromising standards in every single detail." },
              { icon: Users, title: "Customer First", desc: "Your satisfaction is our primary metric of success." },
              { icon: Target, title: "Transparency", desc: "Clear, honest communication at every step." },
              { icon: Building2, title: "Innovation", desc: "Embracing modern, sustainable living solutions." },
            ].map((value, i) => (
              <div key={i} className="group relative overflow-hidden rounded-sm border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-gold/50 hover:bg-white/10">
                <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-gold/20 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-black">
                  <value.icon className="size-8" />
                </div>
                <h3 className="mb-3 font-display text-xl font-medium tracking-wide">{value.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="container-luxe mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-light md:text-5xl mb-6">Ready to Find Your <span className="text-gold italic">Dream Home?</span></h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">Get in touch with our expert real estate advisors today and take the first step towards luxury living.</p>
          <Button size="xl" variant="gold" className="rounded-sm px-10 tracking-widest uppercase text-xs" asChild>
            <a href="/#contact">Contact Us <ArrowRight className="ml-2 size-4" /></a>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
