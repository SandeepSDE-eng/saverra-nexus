import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Shield, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { features } from "@/config/features";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getMainLinks = () => {
  const links = [
    { href: "/", label: "Home" },
  ];
  
  if (features.showAboutUs) {
    links.push({ href: "/about", label: "About Us" });
  }

  links.push(
    { href: "/case-studies", label: "Case Studies" },
    { href: "/careers", label: "Careers" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/#contact", label: "Contact" },
  );
  
  return links;
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const mainLinks = getMainLinks();

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-2xl shadow-sm">
      {/* announcement bar */}
      <div className="hidden bg-gradient-to-r from-[color:var(--navy-deep)] via-[#0a192f] to-[color:var(--navy-deep)] text-white sm:block border-b border-gold/20">
        <div className="container-luxe flex h-10 items-center justify-between text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-5 opacity-90">
            <span className="inline-flex items-center gap-1.5"><Shield className="size-3.5 text-gold" /> RERA Registered</span>
            <span className="hidden md:inline">Transparent Deals</span>
            <span className="hidden md:inline">Trusted by 500+ Families</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+918691866691" className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone className="size-3.5 text-gold" /> +91 86918 66691
            </a>
            <span className="text-white/30">|</span>
            <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone className="size-3.5 text-gold" /> +91 98765 43210
            </a>
          </div>
        </div>
      </div>
      <div className="container-luxe flex h-24 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-20 md:h-24 aspect-[2/3]" />
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex z-50">
          <Link to="/" className="group relative px-1 py-2 text-[13px] lg:text-[14px] font-medium text-foreground/80 transition-colors hover:text-primary">
            Home
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {features.showAboutUs && (
            <DropdownMenu>
              <DropdownMenuTrigger className="group relative flex items-center gap-1 px-1 py-2 text-[13px] lg:text-[14px] font-medium text-foreground/80 transition-colors hover:text-primary outline-none">
                Overview <ChevronDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180" />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-data-[state=open]:w-full group-hover:w-full"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-white border-border/50 shadow-xl rounded-xl p-2 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95">
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg hover:bg-gold/10 focus:bg-gold/10 focus:text-primary py-2.5">
                  <Link to="/about" className="font-medium">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg hover:bg-gold/10 focus:bg-gold/10 focus:text-primary py-2.5">
                  <Link to="/careers" className="font-medium">Careers</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Link to="/projects" className="group relative px-1 py-2 text-[13px] lg:text-[14px] font-medium text-foreground/80 transition-colors hover:text-primary">
            Projects
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link to="/services" className="group relative px-1 py-2 text-[13px] lg:text-[14px] font-medium text-foreground/80 transition-colors hover:text-primary">
            Services
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/contact" className="group relative px-1 py-2 text-[13px] lg:text-[14px] font-medium text-foreground/80 transition-colors hover:text-primary">
            Contact
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button className="bg-[color:var(--navy-deep)] text-white hover:bg-primary shadow-luxury rounded-full px-6 transition-all duration-300 hover:scale-105" asChild>
            <Link to="/contact">Schedule Site Visit</Link>
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
            {mainLinks.map((n) => (
              <a
                key={n.href}
                href={n.href === '/#contact' ? '/contact' : n.href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 text-base font-medium text-foreground/80 border-b border-border/40 last:border-0"
              >
                {n.label}
              </a>
            ))}
            <Button variant="gold" className="mt-4" asChild>
              <Link to="/contact">Schedule Site Visit</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
