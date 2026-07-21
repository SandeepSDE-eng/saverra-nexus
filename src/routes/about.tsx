import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Building2, Users, Trophy, Target } from "lucide-react";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-[color:var(--navy-deep)] px-4 py-20 text-white">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container-luxe relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium tracking-wide text-gold backdrop-blur-sm">
            <span className="size-2 rounded-full bg-gold"></span>
            A Legacy of Excellence
          </div>
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight md:text-7xl">
            Building More Than <br/><span className="text-gold">Homes</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80 md:text-xl">
            SAVERRA is a premium real estate firm delivering luxury homes, commercial spaces, and villa plots in India's most sought-after locations.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 z-20 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-card p-6 shadow-2xl md:grid-cols-4 md:p-8">
          {[
            { label: "Happy Families", value: "5000+" },
            { label: "Years of Trust", value: "20+" },
            { label: "Projects Delivered", value: "45+" },
            { label: "Cities Presence", value: "4" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container-luxe mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Our Journey Towards <span className="text-gold">Perfection</span>
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Since our inception, Saverra Realty has been synonymous with quality, commitment, and transparency. We don't just construct buildings; we curate lifestyles. Every project we undertake is a testament to our dedication to architectural brilliance and sustainable living.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Our team of visionary architects and experienced engineers work tirelessly to create spaces that resonate with modern aspirations while staying rooted in timeless elegance.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80" 
                  alt="Modern Architecture" 
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 hidden h-48 w-48 rounded-2xl border-8 border-background overflow-hidden md:block shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80" 
                  alt="Interior Detail" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted py-20 px-4">
        <div className="container-luxe mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-muted-foreground">The pillars that define our commitment to excellence.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { icon: Trophy, title: "Quality", desc: "Uncompromising standards in every detail." },
              { icon: Users, title: "Customer First", desc: "Your satisfaction is our primary goal." },
              { icon: Target, title: "Transparency", desc: "Clear communication at every step." },
              { icon: Building2, title: "Innovation", desc: "Embracing modern living solutions." },
            ].map((value, i) => (
              <div key={i} className="group rounded-2xl bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                  <value.icon className="size-7" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
