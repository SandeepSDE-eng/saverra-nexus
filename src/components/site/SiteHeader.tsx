import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/#home", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#amenities", label: "Amenities" },
  { href: "/#neighborhood", label: "Neighborhood" },
  { href: "/#emi", label: "Financing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      {/* announcement bar */}
      <div className="hidden bg-[color:var(--navy-deep)] text-white sm:block">
        <div className="container-luxe flex h-9 items-center justify-between text-[11px]">
          <div className="flex items-center gap-4 opacity-90">
            <span className="inline-flex items-center gap-1.5"><Shield className="size-3 text-gold" /> RERA Registered</span>
            <span className="hidden md:inline">Transparent Deals</span>
            <span className="hidden md:inline">Trusted by 5000+ Families</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100">
              <Phone className="size-3" /> +91 98765 43210
            </a>
            <a href="#contact" className="rounded-sm bg-gold px-3 py-1 font-semibold text-[color:var(--navy-deep)] hover:brightness-110">
              Schedule Site Visit
            </a>
          </div>
        </div>
      </div>

      <div className="container-luxe flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-md bg-gradient-to-br from-primary to-[color:var(--navy-deep)] text-gold shadow-md">
            <span className="font-display text-lg font-bold">S</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl font-bold tracking-wide text-primary">SAVERRA</div>
            <div className="text-[9px] font-medium tracking-[0.28em] text-muted-foreground">A REAL ESTATE FIRM</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative text-[13px] font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="gold" size="default" asChild>
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
            {NAV.map((n) => (
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
