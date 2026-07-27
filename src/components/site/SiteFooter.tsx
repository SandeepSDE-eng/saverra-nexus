import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/10 bg-[color:var(--navy-deep)] text-white/70">
      <div className="container-luxe grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="transition-transform duration-500 group-hover:scale-105">
              <Logo variant="light" className="h-24 md:h-28 aspect-[2/3]" />
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed max-w-sm text-white/80">
            SAVERRA is a premium real estate firm committed to delivering luxury homes, commercial spaces
            and villa plots in prime locations across India — with unmatched value.
          </p>
          <div className="mt-8 flex gap-3 text-white/90">
            <a href="https://www.facebook.com/SaverraRealty/" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[color:var(--navy-deep)] hover:-translate-y-1 shadow-sm">
              <Facebook className="size-4.5" />
            </a>
            <a href="https://www.instagram.com/saverrarealty/" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[color:var(--navy-deep)] hover:-translate-y-1 shadow-sm">
              <Instagram className="size-4.5" />
            </a>
            <a href="https://www.youtube.com/channel/UC4evOuC0SqWApu0cYg6tfWQ" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[color:var(--navy-deep)] hover:-translate-y-1 shadow-sm">
              <Youtube className="size-4.5" />
            </a>
            <a href="#" className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[color:var(--navy-deep)] hover:-translate-y-1 shadow-sm">
              <Linkedin className="size-4.5" />
            </a>
          </div>
        </div>

        <div className="lg:pl-8 pt-4">
          <h4 className="mb-6 font-display text-lg font-semibold tracking-wide text-white">Quick Links</h4>
          <ul className="space-y-3.5 text-sm">
            <li><Link to="/" className="transition-colors hover:text-gold font-medium">Home</Link></li>
            <li><a href="/#projects" className="transition-colors hover:text-gold font-medium">Projects</a></li>
            <li><Link to="/amenities" className="transition-colors hover:text-gold font-medium">Amenities</Link></li>
            <li><Link to="/neighborhood" className="transition-colors hover:text-gold font-medium">Neighborhood</Link></li>
            <li><Link to="/financing" className="transition-colors hover:text-gold font-medium">Financing</Link></li>
            <li><Link to="/faq" className="transition-colors hover:text-gold font-medium">FAQ</Link></li>
            <li><a href="/#contact" className="transition-colors hover:text-gold font-medium">Contact</a></li>
          </ul>
        </div>

        <div className="lg:pl-6 pt-4">
          <h4 className="mb-6 font-display text-lg font-semibold tracking-wide text-white">Top Cities</h4>
          <ul className="space-y-3.5 text-sm">
            {["Mumbai", "Bengaluru", "Gurugram", "Pune", "Hyderabad", "Chennai"].map((c) => (
              <li key={c}><a href="#projects" className="transition-colors hover:text-gold font-medium">{c}</a></li>
            ))}
          </ul>
        </div>

        <div className="pt-4">
          <h4 className="mb-6 font-display text-lg font-semibold tracking-wide text-white">Reach Us</h4>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-4 transition-colors hover:text-white group">
              <div className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 group-hover:bg-gold group-hover:text-[color:var(--navy-deep)] transition-all">
                <Phone className="size-4 text-gold group-hover:text-[color:var(--navy-deep)]" /> 
              </div>
              <span className="font-medium pt-1.5">+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-4 transition-colors hover:text-white group">
              <div className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 group-hover:bg-gold group-hover:text-[color:var(--navy-deep)] transition-all">
                <Mail className="size-4 text-gold group-hover:text-[color:var(--navy-deep)]" /> 
              </div>
              <span className="font-medium pt-1.5">info@saverra.com</span>
            </li>
            <li className="flex items-start gap-4 transition-colors leading-relaxed group">
              <div className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 group-hover:bg-gold group-hover:text-[color:var(--navy-deep)] transition-all">
                <MapPin className="size-4 text-gold group-hover:text-[color:var(--navy-deep)]" /> 
              </div>
              <span className="font-medium text-white/70 group-hover:text-white transition-colors pt-0.5">
                One45 Business Bay, 1205, Vallabh Baug Ln Ext, Ghatkopar East, Mumbai 400077
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-6 text-xs sm:flex-row text-white/50">
          <p className="font-medium">© {new Date().getFullYear()} SAVERRA Real Estate. All rights reserved.</p>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <p className="font-medium hover:text-white/80 transition-colors cursor-pointer">RERA Reg: P51900012345 · Privacy · Terms · Sitemap</p>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Developed by SandeepYadav</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
