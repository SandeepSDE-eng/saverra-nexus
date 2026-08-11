import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useQuery } from "@tanstack/react-query";
import { getProjectsFn } from "@/api/projects";

export function SiteFooter() {
  const { data: projectsData } = useQuery({
    queryKey: ["footer_projects"],
    queryFn: async () => {
      try {
        const res = await getProjectsFn();
        if (res.success && res.data?.length > 0) return res.data;
        return [];
      } catch {
        return [];
      }
    }
  });

  const featuredProjectsList = projectsData && projectsData.length > 0 
    ? projectsData
        .filter((p: any) => p.is_published !== false)
        .sort((a: any, b: any) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
        .slice(0, 5)
        .map((p: any) => ({ name: p.title || p.name, slug: p.slug }))
    : [
        { name: "MICL Aaradhya OnePark", slug: "micl-aaradhya-onepark" },
        { name: "Shubham Elegance", slug: "shubham-elegance-ghatkopar" },
        { name: "Happy Home Heights", slug: "happy-home-heights" },
        { name: "Prajapati Heights", slug: "prajapati-heights-pant-nagar" },
        { name: "Adani Ten BKC", slug: "adani-ten-bkc" }
      ];

  return (
    <footer className="border-t border-[#d4af37]/20 bg-[#040e1d] text-slate-300 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#d4af37]/5 blur-[160px] pointer-events-none" />

      <div className="container-luxe grid grid-cols-1 gap-12 py-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-16 relative z-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <Link to="/" className="group inline-block">
            <Logo variant="light" className="h-32 md:h-40 aspect-[2/3] w-auto mx-auto lg:mx-0 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform group-hover:scale-105" />
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
            Mumbai's premier real estate advisory, curating landmark residential developments, luxury sea-facing sky penthouses, and executive commercial hubs.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a href="https://www.facebook.com/SaverraRealty/" target="_blank" rel="noreferrer" className="size-10 rounded-full border border-[#d4af37]/30 bg-[#08182f] flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-slate-950 transition-all shadow-md">
              <Facebook className="size-4" />
            </a>
            <a href="https://www.instagram.com/saverrarealty/" target="_blank" rel="noreferrer" className="size-10 rounded-full border border-[#d4af37]/30 bg-[#08182f] flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-slate-950 transition-all shadow-md">
              <Instagram className="size-4" />
            </a>
            <a href="https://www.youtube.com/channel/UC4evOuC0SqWApu0cYg6tfWQ" target="_blank" rel="noreferrer" className="size-10 rounded-full border border-[#d4af37]/30 bg-[#08182f] flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-slate-950 transition-all shadow-md">
              <Youtube className="size-4" />
            </a>
            <a href="#" className="size-10 rounded-full border border-[#d4af37]/30 bg-[#08182f] flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-slate-950 transition-all shadow-md">
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>

        <div className="lg:pl-8 space-y-5 text-left">
          <h4 className="font-display text-lg font-bold text-white tracking-wide border-b border-[#d4af37]/20 pb-3 inline-block">Navigation</h4>
          <ul className="space-y-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <li><Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link></li>
            <li><Link to="/projects" className="hover:text-[#d4af37] transition-colors">Residences Portfolio</Link></li>
            <li><Link to="/careers" className="hover:text-[#d4af37] transition-colors">Careers</Link></li>
            <li><Link to="/faq" className="hover:text-[#d4af37] transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-[#d4af37] transition-colors">Contact Concierge</Link></li>
          </ul>
        </div>

        <div className="lg:pl-4 space-y-5 text-left">
          <h4 className="font-display text-lg font-bold text-white tracking-wide border-b border-[#d4af37]/20 pb-3 inline-block">Featured Estates</h4>
          <ul className="space-y-3 text-xs font-semibold text-slate-300">
            {featuredProjectsList.map((project: any) => (
              <li key={project.name}>
                <Link to="/projects/$slug" params={{ slug: project.slug }} className="hover:text-[#d4af37] transition-colors truncate block">
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5 text-left">
          <h4 className="font-display text-lg font-bold text-white tracking-wide border-b border-[#d4af37]/20 pb-3 inline-block">Private Headquarters</h4>
          <ul className="space-y-4 text-xs font-medium text-slate-300">
            <li className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-[#08182f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                <Phone className="size-4" />
              </div>
              <a href="tel:+918691866691" className="hover:text-[#d4af37] transition-colors">+91 86918 66691</a>
            </li>
            <li className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-[#08182f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                <Mail className="size-4" />
              </div>
              <a href="mailto:info@saverra.com" className="hover:text-[#d4af37] transition-colors">info@saverra.com</a>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-9 rounded-xl bg-[#08182f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                <MapPin className="size-4" />
              </div>
              <span className="leading-relaxed">
                One45 Business Bay, 1205, Vallabh Baug Ln Ext, Ghatkopar East, Mumbai 400077
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/40 relative z-10">
        <div className="container-luxe py-5 text-[11px] flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
          <p className="font-medium">© {new Date().getFullYear()} SAVERRA REALTY. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 font-semibold uppercase tracking-wider text-[10px]">
            <span className="inline-flex items-center gap-1 text-[#d4af37]">
              <ShieldCheck className="size-3" /> MahaRERA Verified
            </span>
            <span>·</span>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
