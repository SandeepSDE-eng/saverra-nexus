import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, TrendingUp, Building, LineChart, Banknote } from "lucide-react";

export const Route = createFileRoute("/case-studies")({ component: CaseStudies });

const CASE_STUDIES = [
  {
    id: "project-revival",
    title: "Project Revival & Market Repositioning",
    location: "Mulund",
    size: "2.2 Acres Land Parcel",
    icon: Building,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    challenges: [
      "A weak historical track record",
      "Stalled construction",
      "Financial and sales constraints",
      "Low buyer confidence and project stagnation"
    ],
    strategy: [
      "Assure X – 360° integrated support model",
      "Financial structuring and cash flow management",
      "Construction revival and execution oversight",
      "Marketing and focused sales strategy"
    ],
    outcome: [
      "Secured the entire tower & reactivated stalled construction",
      "Assumed full responsibility of sales operations",
      "Restored market credibility & revived overall project momentum"
    ],
    footerHighlight: "Funding of ₹60 Crores enabled the developer to secure Full OD & CC approvals."
  },
  {
    id: "sales-acceleration",
    title: "Sales Acceleration in a Competitive Market",
    location: "Ghatkopar East",
    size: "2 Project Launches in a Competitive Micro-Market",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80",
    challenges: [
      "Simultaneous launch of 2 developments",
      "High competitive intensity affecting absorption velocity",
      "Reduced buyer confidence in a crowded market",
      "Pressure on pricing and positioning"
    ],
    strategy: [
      "A market-aligned and differentiated product strategy",
      "Introduction of compact, customisable apartments",
      "Channel Partner (CP) activation & high-impact sales campaign",
      "Offering fully furnished homes to enhance buyer appeal"
    ],
    outcome: [
      "Sold 60 apartments in 60 days",
      "Achieved 100% inventory sales within 18 months",
      "Project sold out 6 months before completion (Approx. 140 flats sold)",
      "Around 75,000 sq. ft. RERA carpet area transacted"
    ],
    footerHighlight: "Total transaction value of approx. ₹160 Crores."
  },
  {
    id: "funding-redevelopment",
    title: "Funding for Project Acquisition & Redevelopment",
    location: "Ghatkopar East",
    size: "Commercial Redevelopment",
    icon: Banknote,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    challenges: [
      "Originally a residential building with existing tenants",
      "Developer intent to redevelop into a premium commercial tower",
      "Requirement of significant upfront capital for tenant buyouts",
      "Legal, tenancy, and execution risks"
    ],
    strategy: [
      "Structured and deployed ₹45 Crores in funding",
      "Buyout of all tenant flats & 100% clearance of existing building",
      "Planning and design of the commercial tower",
      "Marketing, strategy, and sales launch"
    ],
    outcome: [
      "Smooth transition from residential to commercial",
      "Secured necessary approvals and clearances swiftly",
      "Launched premium commercial spaces ahead of schedule"
    ],
    footerHighlight: "Timely financial structuring unlocking redevelopment potential and transforming asset value."
  },
  {
    id: "early-monetization",
    title: "Early Monetization & Cash Flow Optimization",
    location: "Ghatkopar – Chembur Link Road",
    size: "Commercial Pre-Construction",
    icon: LineChart,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    challenges: [
      "Requirement for early-stage liquidity prior to demolition",
      "Need to reduce dependence on fragmented retail showroom sales",
      "Risk of delayed cash flow at the pre-construction stage"
    ],
    strategy: [
      "Bulk sale of approximately 38,500 sq. ft. commercial carpet area",
      "Targeting single institutional investor transactions",
      "Sale executed prior to demolition of existing structure"
    ],
    outcome: [
      "Immediate liquidity for the developer",
      "Eliminated burden of individual showroom sales",
      "Reduced financial risk at pre-construction stage",
      "Strengthened project credibility and execution focus"
    ],
    footerHighlight: "Transaction value of ₹150 Crores secured before demolition."
  }
];

function CaseStudies() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      {/* Hero Banner */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] to-transparent opacity-80"></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-gold uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-gold animate-pulse"></span>
            Proven Success
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light tracking-wide mb-4">
            Case <span className="text-gold italic font-medium">Studies</span>
          </h1>
        </div>
      </div>

      <div className="container-luxe max-w-6xl mx-auto -mt-16 relative z-20 space-y-24">
        {CASE_STUDIES.map((study, index) => (
          <div key={study.id} id={study.id} className="scroll-mt-32">
            <div className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-border/50 animate-fade-up group hover:shadow-2xl transition-all duration-500`}>
              
              {/* Image Side */}
              <div className="w-full lg:w-5/12 relative min-h-[300px] lg:min-h-[500px] overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <study.icon className="size-5 text-[color:var(--navy-deep)]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest text-gold font-bold">Location</p>
                    <p className="text-lg font-medium">{study.location}</p>
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="text-xs uppercase tracking-widest text-gold font-bold">Project Size</p>
                    <p className="text-lg font-medium">{study.size}</p>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-7/12 p-8 md:p-12 flex flex-col justify-between bg-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-light text-primary leading-tight mb-8">
                    {study.title.split('&')[0]} <span className="text-gold italic font-medium">&amp; {study.title.split('&')[1]}</span>
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <h3 className="flex items-center gap-2 font-display text-xl text-[color:var(--navy-deep)]">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Challenges
                      </h3>
                      <ul className="space-y-3">
                        {study.challenges.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm font-light leading-relaxed flex items-start gap-2">
                            <ChevronRight className="size-4 text-gold shrink-0 mt-0.5" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="flex items-center gap-2 font-display text-xl text-[color:var(--navy-deep)]">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Strategy
                      </h3>
                      <ul className="space-y-3">
                        {study.strategy.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm font-light leading-relaxed flex items-start gap-2">
                            <ChevronRight className="size-4 text-gold shrink-0 mt-0.5" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-border/50">
                    <h3 className="flex items-center gap-2 font-display text-xl text-[color:var(--navy-deep)]">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Outcome & Impact
                    </h3>
                    <ul className="space-y-3">
                      {study.outcome.map((item, i) => (
                        <li key={i} className="text-primary text-sm font-medium leading-relaxed flex items-start gap-2">
                          <ChevronRight className="size-4 text-gold shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 p-5 bg-[color:var(--navy-deep)] text-white rounded-xl border border-gold/20 shadow-inner">
                  <p className="text-sm md:text-base font-light tracking-wide text-center">
                    {study.footerHighlight.split('₹').map((part, i) => 
                      i === 0 ? part : <span key={i} className="text-gold font-bold">₹{part}</span>
                    )}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
