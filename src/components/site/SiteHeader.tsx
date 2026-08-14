import { Link } from "@tanstack/react-router";
import { Phone, Mail, Menu, X, Shield, ChevronDown } from "lucide-react";
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
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
  ];
  
  if (features.showAboutUs) {
    links.push({ href: "/about", label: "About Us" });
  }

  links.push(
    { href: "/careers", label: "Careers" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" }
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
            <a href="mailto:info@saverrarealty.com" className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-gold transition-colors">
              <Mail className="size-3.5 text-gold" /> info@saverrarealty.com
            </a>
            <span className="text-white/30">|</span>
            <a href="tel:+918691866691" className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-gold transition-colors font-medium">
              <Phone className="size-3.5 text-gold" /> +91 86918 66691
            </a>
          </div>
        </div>
      </div>
      <div className="container-luxe flex h-20 md:h-24 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-16 md:h-24 aspect-[2/3]" />
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
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg hover:bg-gold/10 focus:bg-gold/10 focus:text-primary py-2.5">
                  <Link to="/case-studies" className="font-medium">Case Studies</Link>
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
          className="grid size-10 place-items-center rounded-lg border border-border bg-card lg:hidden shadow-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-5 text-primary" /> : <Menu className="size-5 text-primary" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="container-luxe flex flex-col py-4 gap-1">
            {mainLinks.map((n) => (
              <Link
                key={n.href}
                to={n.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-lg text-sm font-semibold text-foreground/90 hover:bg-gold/10 hover:text-primary transition-colors flex items-center justify-between border-b border-border/30 last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-3 pb-1 flex flex-col gap-2.5">
              <Button className="w-full bg-gold text-white hover:bg-gold/90 shadow-md font-semibold py-5 rounded-xl" asChild>
                <Link to="/contact" onClick={() => setOpen(false)}>Schedule Site Visit</Link>
              </Button>
              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-muted-foreground">
                <a href="tel:+918691866691" className="flex items-center gap-1.5 hover:text-gold font-medium">
                  <Phone className="size-3.5 text-gold" /> +91 86918 66691
                </a>
                <span>•</span>
                <a href="mailto:info@saverrarealty.com" className="flex items-center gap-1.5 hover:text-gold font-medium">
                  <Mail className="size-3.5 text-gold" /> info@saverrarealty.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
