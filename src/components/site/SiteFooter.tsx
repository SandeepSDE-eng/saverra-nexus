import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-[#F8F9FA] text-muted-foreground">
      <div className="container-luxe grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="transition-transform duration-500 group-hover:scale-105">
              <Logo variant="dark" className="h-24 md:h-28 aspect-[2/3]" />
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed max-w-sm">
            SAVERRA is a premium real estate firm committed to delivering luxury homes, commercial spaces
            and villa plots in prime locations across India — with unmatched value.
          </p>
          <div className="mt-6 flex gap-3 text-foreground">
            <a href="https://www.facebook.com/SaverraRealty/" target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-border/80 bg-white transition-all duration-300 hover:border-[color:var(--navy-deep)] hover:bg-[color:var(--navy-deep)] hover:text-white hover:-translate-y-1 shadow-sm">
              <Facebook className="size-4" />
            </a>
            <a href="https://www.instagram.com/saverrarealty/" target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-border/80 bg-white transition-all duration-300 hover:border-[color:var(--navy-deep)] hover:bg-[color:var(--navy-deep)] hover:text-white hover:-translate-y-1 shadow-sm">
              <Instagram className="size-4" />
            </a>
            <a href="https://www.youtube.com/channel/UC4evOuC0SqWApu0cYg6tfWQ" target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-border/80 bg-white transition-all duration-300 hover:border-[color:var(--navy-deep)] hover:bg-[color:var(--navy-deep)] hover:text-white hover:-translate-y-1 shadow-sm">
              <Youtube className="size-4" />
            </a>
            <a href="#" className="grid size-9 place-items-center rounded-full border border-border/80 bg-white transition-all duration-300 hover:border-[color:var(--navy-deep)] hover:bg-[color:var(--navy-deep)] hover:text-white hover:-translate-y-1 shadow-sm">
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>

        <div className="lg:pl-6">
          <h4 className="mb-5 font-display text-base font-semibold tracking-wide text-[color:var(--navy-deep)]">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="transition-colors hover:text-[color:var(--navy-deep)] font-medium">Home</Link></li>
            <li><a href="/#projects" className="transition-colors hover:text-[color:var(--navy-deep)] font-medium">Projects</a></li>
            <li><Link to="/amenities" className="transition-colors hover:text-[color:var(--navy-deep)] font-medium">Amenities</Link></li>
            <li><Link to="/neighborhood" className="transition-colors hover:text-[color:var(--navy-deep)] font-medium">Neighborhood</Link></li>
            <li><Link to="/financing" className="transition-colors hover:text-[color:var(--navy-deep)] font-medium">Financing</Link></li>
            <li><Link to="/faq" className="transition-colors hover:text-[color:var(--navy-deep)] font-medium">FAQ</Link></li>
            <li><a href="/#contact" className="transition-colors hover:text-[color:var(--navy-deep)] font-medium">Contact</a></li>
          </ul>
        </div>

        <div className="lg:pl-4">
          <h4 className="mb-5 font-display text-base font-semibold tracking-wide text-[color:var(--navy-deep)]">Top Cities</h4>
          <ul className="space-y-2.5 text-sm">
            {["Mumbai", "Bengaluru", "Gurugram", "Pune", "Hyderabad", "Chennai"].map((c) => (
              <li key={c}><a href="#projects" className="transition-colors hover:text-[color:var(--navy-deep)] font-medium">{c}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-base font-semibold tracking-wide text-[color:var(--navy-deep)]">Reach Us</h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-3 transition-colors hover:text-[color:var(--navy-deep)] group">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold transition-transform group-hover:scale-110" /> 
              <span className="font-medium">+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-3 transition-colors hover:text-[color:var(--navy-deep)] group">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold transition-transform group-hover:scale-110" /> 
              <span className="font-medium">info@saverra.com</span>
            </li>
            <li className="flex items-start gap-3 transition-colors hover:text-[color:var(--navy-deep)] leading-relaxed group">
              <MapPin className="mt-1 size-5 shrink-0 text-gold transition-transform group-hover:scale-110" /> 
              <span className="font-medium text-muted-foreground group-hover:text-[color:var(--navy-deep)]">One45 Business Bay, 1205, Vallabh Baug Ln Ext, Ghatkopar East, Mumbai 400077</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 bg-[#F1F3F5]">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-4 text-xs sm:flex-row">
          <p className="font-medium">© {new Date().getFullYear()} SAVERRA Real Estate. All rights reserved.</p>
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <p className="font-medium">RERA Reg: P51900012345 · Privacy · Terms · Sitemap</p>
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest mt-0.5 font-bold">Developed by SandeepYadav</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
