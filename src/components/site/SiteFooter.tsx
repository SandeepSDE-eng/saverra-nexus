import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/10 bg-[color:var(--navy-deep)] text-white/70">
      <div className="container-luxe grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex justify-center w-full group cursor-default">
            <div className="transition-transform duration-500 group-hover:scale-105">
              <Logo variant="light" className="h-40 md:h-52 aspect-[2/3] w-auto mx-auto" />
            </div>
          </div>
          <div className="mt-10 flex justify-center lg:justify-start gap-4 text-white/90 w-full">
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
            <li><Link to="/careers" className="transition-colors hover:text-gold font-medium">Careers</Link></li>
            <li><Link to="/faq" className="transition-colors hover:text-gold font-medium">FAQ</Link></li>
            <li><a href="/contact" className="transition-colors hover:text-gold font-medium">Contact</a></li>
          </ul>
        </div>

        <div className="lg:pl-6 pt-4">
          <h4 className="mb-6 font-display text-lg font-semibold tracking-wide text-white">Featured Projects</h4>
          <ul className="space-y-3.5 text-sm">
            {["Drushti Sapphire", "Azure Sky Villa", "The Imperial", "Lodha Bellissimo", "Rustomjee Elements"].map((project) => (
              <li key={project}><a href="#projects" className="transition-colors hover:text-gold font-medium">{project}</a></li>
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
        <div className="container-luxe py-4 text-[11px] flex flex-col md:flex-row items-center justify-between gap-3 text-white/40">
          <p className="font-medium">© {new Date().getFullYear()} SAVERRA Real Estate. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2 font-medium">
            <span className="hover:text-white/80 transition-colors cursor-pointer">RERA Reg: P51900012345</span>
            <span>·</span>
            <Link to="/privacy" className="hover:text-white/80 transition-colors cursor-pointer">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-white/80 transition-colors cursor-pointer">Terms</Link>
            <span>·</span>
            <span className="hover:text-white/80 transition-colors cursor-pointer">Sitemap</span>
            <span>·</span>
            <span className="text-[10px] uppercase tracking-wider font-bold hover:text-white/80 transition-colors cursor-pointer">Developed by SandeepYadav</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
