import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

import { features } from "@/config/features";

const getNavLinks = () => {
  const links = [
    { href: "/#home", label: "Home" },
  ];
  
  if (features.showAboutUs) {
    links.push({ href: "/about", label: "About Us" });
  }

  links.push(
    { href: "/#projects", label: "Projects" },
    { href: "/#amenities", label: "Amenities" },
    { href: "/#neighborhood", label: "Neighborhood" },
    { href: "/#emi", label: "Financing" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contact", label: "Contact" },
  );
  
  return links;
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-2xl shadow-sm">
      {/* announcement bar */}
      <div className="hidden bg-gradient-to-r from-[color:var(--navy-deep)] via-[#0a192f] to-[color:var(--navy-deep)] text-white sm:block border-b border-gold/20">
        <div className="container-luxe flex h-10 items-center justify-between text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-5 opacity-90">
            <span className="inline-flex items-center gap-1.5"><Shield className="size-3.5 text-gold" /> RERA Registered</span>
            <span className="hidden md:inline">Transparent Deals</span>
            <span className="hidden md:inline">Trusted by 5000+ Families</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone className="size-3.5 text-gold" /> +91 98765 43210
            </a>
            <a href="#contact" className="rounded bg-gradient-to-r from-gold to-yellow-600 px-4 py-1.5 font-bold text-[color:var(--navy-deep)] shadow-md transition-all hover:scale-105 hover:shadow-lg">
              Schedule Site Visit
            </a>
          </div>
        </div>
      </div>
      <div className="container-luxe flex h-24 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="text-[color:var(--navy-deep)] transition-transform duration-500 group-hover:scale-105">
            <Logo hideText={true} className="h-12 w-9" />
          </div>
          <div className="leading-[1.15] flex flex-col justify-center">
            <div className="font-display text-2xl font-semibold tracking-[0.2em] text-[color:var(--navy-deep)]">SAVERRA</div>
            <div className="text-[0.6rem] font-semibold tracking-[0.25em] text-muted-foreground uppercase">A Real Estate Firm</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {getNavLinks().map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative px-1 py-2 text-[13px] lg:text-[14px] font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {n.label}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button className="bg-[color:var(--navy-deep)] text-white hover:bg-primary shadow-luxury rounded-full px-6 transition-all duration-300 hover:scale-105" asChild>
            <a href="#contact">Download Brochure</a>
          </Button>
        </div>

        <button
          className="grid size-10 place-items-center rounded-md border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-luxe flex flex-col py-4">
            {getNavLinks().map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-foreground/80"
              >
                {n.label}
              </a>
            ))}
            <Button variant="gold" className="mt-3" asChild>
              <a href="#contact">Download Brochure</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
