import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-gold/20 bg-[color:var(--navy-deep)] text-white/85">
      <div className="container-luxe grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="transition-transform duration-500 group-hover:scale-105">
              <Logo variant="light" className="h-28 md:h-36 aspect-[2/3]" />
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-white/70 max-w-sm">
            SAVERRA is a premium real estate firm committed to delivering luxury homes, commercial spaces
            and villa plots in prime locations across India — with unmatched value.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="https://www.facebook.com/SaverraRealty/" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/20 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[color:var(--navy-deep)] hover:-translate-y-1">
              <Facebook className="size-4" />
            </a>
            <a href="https://www.instagram.com/saverrarealty/" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/20 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[color:var(--navy-deep)] hover:-translate-y-1">
              <Instagram className="size-4" />
            </a>
            <a href="https://www.youtube.com/channel/UC4evOuC0SqWApu0cYg6tfWQ" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/20 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[color:var(--navy-deep)] hover:-translate-y-1">
              <Youtube className="size-4" />
            </a>
            <a href="#" className="grid size-10 place-items-center rounded-full border border-white/20 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[color:var(--navy-deep)] hover:-translate-y-1">
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-6 font-display text-lg font-medium tracking-wide text-gold">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="text-white/70 transition-colors hover:text-white">Home</Link></li>
            <li><a href="/#projects" className="text-white/70 transition-colors hover:text-white">Projects</a></li>
            <li><Link to="/amenities" className="text-white/70 transition-colors hover:text-white">Amenities</Link></li>
            <li><Link to="/neighborhood" className="text-white/70 transition-colors hover:text-white">Neighborhood</Link></li>
            <li><Link to="/financing" className="text-white/70 transition-colors hover:text-white">Financing</Link></li>
            <li><Link to="/faq" className="text-white/70 transition-colors hover:text-white">FAQ</Link></li>
            <li><a href="/#contact" className="text-white/70 transition-colors hover:text-white">Contact</a></li>
            <li><Link to="/auth" className="text-white/70 transition-colors hover:text-white">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-display text-lg font-medium tracking-wide text-gold">Top Cities</h4>
          <ul className="space-y-3 text-sm">
            {["Mumbai", "Bengaluru", "Gurugram", "Pune", "Hyderabad", "Chennai", "Kolkata"].map((c) => (
              <li key={c}><a href="#projects" className="text-white/70 transition-colors hover:text-white">{c}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-display text-lg font-medium tracking-wide text-gold">Reach Us</h4>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-3 transition-colors hover:text-white">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" /> 
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-3 transition-colors hover:text-white">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" /> 
              <span>info@saverra.com</span>
            </li>
            <li className="flex items-start gap-3 transition-colors hover:text-white leading-relaxed">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold" /> 
              <span>One45 Business Bay, 1205, Vallabh Baug Ln Ext, Railway Police Colony, Ghatkopar East, Mumbai, Maharashtra 400077</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-5 text-xs text-white/55 sm:flex-row sm:gap-2">
          <p>© {new Date().getFullYear()} SAVERRA Real Estate. All rights reserved.</p>
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <p>RERA Reg: P51900012345 · Privacy · Terms · Sitemap</p>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Developed by SandeepYadav</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
