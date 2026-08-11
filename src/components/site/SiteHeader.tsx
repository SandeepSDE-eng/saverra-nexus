import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Shield, ChevronDown, Sparkles } from "lucide-react";
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
    { href: "/contact", label: "Contact" },
  );
  
  return links;
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const mainLinks = getMainLinks();

  return (
    <header className="sticky top-0 z-50 border-b border-[#d4af37]/20 bg-[#040e1d]/90 backdrop-blur-2xl text-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* Top Announcement Bar */}
      <div className="hidden bg-gradient-to-r from-[#06152b] via-[#0b254a] to-[#06152b] text-slate-200 sm:block border-b border-[#d4af37]/20">
        <div className="container-luxe flex h-9 items-center justify-between text-[11px] font-medium tracking-wider">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-[#d4af37] font-semibold">
              <Shield className="size-3.5" /> MahaRERA Verified Portfolio
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">Bespoke Real Estate Advisory</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+918691866691" className="inline-flex items-center gap-1.5 hover:text-[#d4af37] transition-colors">
              <Phone className="size-3 text-[#d4af37]" /> +91 86918 66691
            </a>
            <span className="text-white/20">|</span>
            <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 hover:text-[#d4af37] transition-colors">
              <Phone className="size-3 text-[#d4af37]" /> +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container-luxe flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo className="h-14 md:h-16 aspect-[2/3] filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          <Link to="/" className="group relative py-1 text-xs font-semibold uppercase tracking-widest text-slate-200 transition-colors hover:text-[#d4af37]">
            Home
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#f3e5ad] to-[#d4af37] transition-all duration-300 group-hover:w-full" />
          </Link>

          {features.showAboutUs && (
            <DropdownMenu>
              <DropdownMenuTrigger className="group relative flex items-center gap-1 py-1 text-xs font-semibold uppercase tracking-widest text-slate-200 transition-colors hover:text-[#d4af37] outline-none cursor-pointer">
                About Saverra <ChevronDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180 text-[#d4af37]" />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#f3e5ad] to-[#d4af37] transition-all duration-300 group-data-[state=open]:w-full group-hover:w-full" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-52 bg-[#08182f] border border-[#d4af37]/30 shadow-2xl rounded-xl p-2 text-white animate-in fade-in zoom-in-95">
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg hover:bg-[#d4af37]/15 focus:bg-[#d4af37]/15 py-2.5 px-3">
                  <Link to="/about" className="text-xs font-semibold uppercase tracking-wider text-slate-200">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg hover:bg-[#d4af37]/15 focus:bg-[#d4af37]/15 py-2.5 px-3">
                  <Link to="/careers" className="text-xs font-semibold uppercase tracking-wider text-slate-200">Careers</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Link to="/projects" className="group relative py-1 text-xs font-semibold uppercase tracking-widest text-slate-200 transition-colors hover:text-[#d4af37]">
            Residences
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#f3e5ad] to-[#d4af37] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link to="/case-studies" className="group relative py-1 text-xs font-semibold uppercase tracking-widest text-slate-200 transition-colors hover:text-[#d4af37]">
            Case Studies
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#f3e5ad] to-[#d4af37] transition-all duration-300 group-hover:w-full" />
          </Link>
          
          <Link to="/services" className="group relative py-1 text-xs font-semibold uppercase tracking-widest text-slate-200 transition-colors hover:text-[#d4af37]">
            Advisory Services
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#f3e5ad] to-[#d4af37] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link to="/contact" className="group relative py-1 text-xs font-semibold uppercase tracking-widest text-slate-200 transition-colors hover:text-[#d4af37]">
            Contact
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#f3e5ad] to-[#d4af37] transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            className="h-11 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] px-6"
          >
            <Link to="/private-viewing" className="flex items-center gap-2">
              <Sparkles className="size-3.5" />
              <span>Book VIP Concierge</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="grid size-11 place-items-center rounded-xl border border-[#d4af37]/30 bg-[#08182f] text-[#d4af37] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-[#d4af37]/20 bg-[#040e1d] text-white lg:hidden animate-fade-in">
          <div className="container-luxe flex flex-col py-6 space-y-2">
            {mainLinks.map((n) => (
              <Link
                key={n.href}
                to={n.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3 text-sm font-semibold uppercase tracking-widest text-slate-200 hover:text-[#d4af37] border-b border-white/5 last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button
                asChild
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs uppercase tracking-widest"
              >
                <Link to="/private-viewing" onClick={() => setOpen(false)}>Book VIP Concierge</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
