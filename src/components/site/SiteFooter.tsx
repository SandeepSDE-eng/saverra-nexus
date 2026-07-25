import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[color:var(--navy-deep)] text-white/85">
      <div className="container-luxe grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-4 group cursor-default">
            <div className="transition-transform duration-500 group-hover:scale-105">
              <Logo variant="light" className="h-14 md:h-16" />
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            SAVERRA is a premium real estate firm committed to delivering luxury homes, commercial spaces
            and villa plots in prime locations across India — with unmatched value.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid size-9 place-items-center rounded-md bg-white/10 transition hover:bg-gold hover:text-[color:var(--navy-deep)]">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-white/70 hover:text-gold">Home</Link></li>
            <li><a href="/#projects" className="text-white/70 hover:text-gold">Projects</a></li>
            <li><Link to="/amenities" className="text-white/70 hover:text-gold">Amenities</Link></li>
            <li><Link to="/neighborhood" className="text-white/70 hover:text-gold">Neighborhood</Link></li>
            <li><Link to="/financing" className="text-white/70 hover:text-gold">Financing</Link></li>
            <li><Link to="/faq" className="text-white/70 hover:text-gold">FAQ</Link></li>
            <li><a href="/#contact" className="text-white/70 hover:text-gold">Contact</a></li>
            <li><Link to="/auth" className="text-white/70 hover:text-gold">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold text-white">Top Cities</h4>
          <ul className="space-y-2 text-sm">
            {["Mumbai", "Bengaluru", "Gurugram", "Pune", "Hyderabad", "Chennai", "Kolkata"].map((c) => (
              <li key={c}><a href="#projects" className="text-white/70 hover:text-gold">{c}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold text-white">Reach Us</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-2"><Phone className="size-4 shrink-0 text-gold" /> +91 98765 43210</li>
            <li className="flex gap-2"><Mail className="size-4 shrink-0 text-gold" /> info@saverra.com</li>
            <li className="flex gap-2"><MapPin className="size-4 shrink-0 text-gold" /> SAVERRA, 4th Floor, Level 4, BKC, Bandra (E), Mumbai – 400051</li>
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
