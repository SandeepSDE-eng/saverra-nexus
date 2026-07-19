import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[color:var(--navy-deep)] text-white/85">
      <div className="container-luxe grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-md bg-white/10 text-gold">
              <span className="font-display text-lg font-bold">S</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl font-bold tracking-wide text-white">SAVERRA</div>
              <div className="text-[9px] tracking-[0.28em] text-white/60">A REAL ESTATE FIRM</div>
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
            {["Home", "Projects", "Amenities", "Neighborhood", "Financing", "Blogs", "Contact"].map((l) => (
              <li key={l}><a href={`/#${l.toLowerCase()}`} className="text-white/70 hover:text-gold">{l}</a></li>
            ))}
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
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
          <p>© {new Date().getFullYear()} SAVERRA Real Estate. All rights reserved.</p>
          <p>RERA Reg: P51900012345 · Privacy · Terms · Sitemap</p>
        </div>
      </div>
    </footer>
  );
}
