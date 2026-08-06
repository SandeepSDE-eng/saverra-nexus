import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ChevronsRight } from "lucide-react";

export const Route = createFileRoute("/services")({ component: Services });

const SERVICES_DATA = [
  {
    id: "residential",
    title: "RESIDENTIAL",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=75",
    reverse: false,
    points: [
      "Market Intelligence & Property Insights",
      "Buyer & Seller Advisory",
      "Investment Strategy & Portfolio Guidance",
      "Property Valuation & Pricing Advisory",
      "End-to-End Buying & Selling Assistance",
      "Leasing & Rental Advisory",
      "Negotiation & Deal Structuring",
      "Legal & Documentation Coordination",
      "Home Loan & Financial Assistance",
    ]
  },
  {
    id: "commercial",
    title: "COMMERCIAL",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=75",
    reverse: true,
    points: [
      "Market Intelligence & Competitive Analysis",
      "Go-to-Market Strategy",
      "Pricing Strategy",
      "Marketing Strategy",
      "Leasing Strategy",
      "Investment Advisory",
      "Occupier & Landlord Representation",
      "Transaction Management",
    ]
  },
  {
    id: "retail",
    title: "RETAIL",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=75",
    reverse: false,
    points: [
      "Catchment & Market Analysis",
      "Retail Location Advisory",
      "Tenant Mix Strategy",
      "Leasing Strategy & Execution",
      "Occupancy Planning",
      "Brand Positioning",
      "Lease Advisory & Negotiation",
      "Revenue Optimization",
    ]
  },
  {
    id: "land",
    title: "LAND",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=75",
    reverse: true,
    points: [
      "Land Acquisition & Disposition",
      "Highest & Best Use Analysis",
      "Joint Venture & Development Structuring",
      "Regulatory & Compliance Advisory",
      "Market Assessment & Valuation",
      "Strategic Land Banking",
    ]
  }
];

function Services() {
  useEffect(() => {
    // Handle initial hash on load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-32">
      
      {/* Top Navigation / Hero Banner */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden pb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?auto=format&fit=crop&w=1600&q=75')] bg-cover bg-center opacity-20 filter grayscale mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] to-transparent opacity-80"></div>
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-gold uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-gold animate-pulse"></span>
            Professional Services
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light tracking-wide mb-4">
            Our <span className="text-gold italic font-medium">Expertise</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto font-light tracking-wide text-sm md:text-lg">
            Comprehensive real estate solutions backed by decades of market intelligence.
          </p>
        </div>
      </div>

      <div className="container-luxe mx-auto max-w-6xl -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border/50 p-6 md:p-12 lg:p-16 mb-16 animate-fade-up">
          
          {/* Sticky Tab Navigation */}
          <div className="sticky top-[96px] sm:top-[136px] z-30 bg-white/95 backdrop-blur-md mb-12 py-4 border-b border-border/50 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16 transition-all">
            <ul className="flex items-center justify-center overflow-x-auto scrollbar-none text-xs md:text-sm font-medium tracking-widest uppercase gap-8 md:gap-16">
              {SERVICES_DATA.map(s => (
                <li key={s.id}>
                  <a 
                    href={`#${s.id}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(s.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', `#${s.id}`);
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors pb-2 border-b-2 border-transparent hover:border-gold whitespace-nowrap"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Content Sections */}
          <div className="space-y-32">
            {SERVICES_DATA.map((service, idx) => (
              <div 
                id={service.id} 
                key={service.id} 
                className={`flex flex-col gap-12 md:gap-16 items-center scroll-mt-48 ${service.reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 group relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg relative z-10">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-all duration-[10000ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  {/* Decorative offset box */}
                  <div className={`absolute top-6 ${service.reverse ? 'right-6' : 'left-6'} w-full h-full border-2 border-gold/30 rounded-xl z-0 bg-transparent transition-transform duration-700 group-hover:translate-x-3 group-hover:translate-y-3`}></div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h2 className="font-display text-3xl md:text-4xl font-light mb-8 text-primary tracking-wide flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-gold hidden sm:block"></span>
                    {service.title}
                  </h2>
                  <ul className="space-y-4">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-4 text-muted-foreground group/item">
                        <ChevronsRight className="size-4 text-gold mt-1 shrink-0 transition-transform group-hover/item:translate-x-1" />
                        <span className="text-[14px] md:text-[15px] font-medium tracking-wide transition-colors group-hover/item:text-primary">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
