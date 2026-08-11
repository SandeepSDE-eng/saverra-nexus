import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, MapPin, Calendar, CheckCircle2, IndianRupee, 
  Sparkles, ShieldCheck, Phone, MessageCircle, Download, Eye, 
  Building, Compass, Check
} from "lucide-react";
import { getProjectBySlugFn } from "@/api/projects";
import { getCarpetArea } from "@/lib/projectUtils";
import { ContactSection } from "@/components/site/ContactSection";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MOCK_PROJECTS } from "@/lib/mockProjects";
import { useState } from "react";
import { toast } from "sonner";
import { addInquiryFn } from "@/api/inquiries";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 text-center space-y-4">
      <p className="text-sm text-slate-600">{error.message}</p>
      <Button asChild className="rounded-xl bg-[#d4af37] text-slate-950 font-bold"><Link to="/projects">Return to Portfolio</Link></Button>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 text-center space-y-4">
      <span className="text-[#aa820a] text-xs font-bold uppercase tracking-widest">404</span>
      <h1 className="font-display text-4xl font-bold text-slate-900">Residence Not Found</h1>
      <Button asChild className="rounded-xl bg-[#d4af37] text-slate-950 font-bold"><Link to="/projects">Return to Portfolio</Link></Button>
    </div>
  ),
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: p, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      try {
        const response = await getProjectBySlugFn({ data: slug });
        if (!response.success || !response.data) throw new Error(response.error || "Not found");
        return response.data;
      } catch (error) {
        const mockP = MOCK_PROJECTS.find((m) => m.slug === slug);
        if (mockP) {
          return mockP;
        } else {
          throw notFound();
        }
      }
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="size-5 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin" />
          <span className="text-xs uppercase tracking-widest font-bold text-[#aa820a]">Loading Architectural Dossier…</span>
        </div>
      </div>
    );
  }

  if (!p) return null;

  const name = p.name || p.title || "Exclusive Residence";
  const priceDisplay = p.price_display || p.price_range || "On Request";
  const coverImage = p.cover_image || p.image_url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80";

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await addInquiryFn({
        data: {
          name: bookingForm.name,
          phone: bookingForm.phone,
          source: `Project Detail Page - ${name}`,
          message: `Requested VIP Private Viewing & Dossier for ${name}`,
        }
      });
      setIsSubmitting(false);
      if (response.success) {
        toast.success("Private viewing request submitted! A senior advisor will contact you shortly.");
        setBookingForm({ name: "", phone: "" });
      } else {
        toast.error("Submission failed. Please call +91 86918 66691.");
      }
    } catch (err) {
      setIsSubmitting(false);
      toast.error("Submission error. Please connect directly via WhatsApp.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-24">
      
      {/* Hero Cover Banner Header */}
      <div className="relative min-h-[55vh] flex flex-col justify-end overflow-hidden pb-12 pt-24 border-b border-slate-200 bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src={coverImage} 
            alt={name} 
            className="h-full w-full object-cover opacity-50 transition-transform duration-1000 hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-black/30" />
        </div>

        <div className="relative z-10 container-luxe text-left space-y-4">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37] hover:underline"
          >
            <ArrowLeft className="size-4" /> Back to Residences Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 border border-[#d4af37]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
              <Sparkles className="size-3" />
              {p.status?.toUpperCase() || "FLAGSHIP LAUNCH"}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-200 bg-black/60 px-3 py-1 rounded-full border border-white/10">
              <ShieldCheck className="size-3 text-[#d4af37]" /> MahaRERA Verified
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            {name}
          </h1>

          {p.tagline && (
            <p className="text-slate-200 text-base sm:text-xl italic font-light max-w-3xl">
              "{p.tagline}"
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-200 pt-1">
            <span className="flex items-center gap-1.5 bg-black/50 px-3.5 py-1.5 rounded-xl border border-white/10">
              <MapPin className="size-3.5 text-[#d4af37]" />
              {p.location || "Prime Location"}
            </span>
            <span className="flex items-center gap-1.5 bg-black/50 px-3.5 py-1.5 rounded-xl border border-white/10">
              <Building className="size-3.5 text-[#d4af37]" />
              {p.bhk_options || "Multiple Layouts"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Dossier Content (Light Theme) */}
      <div className="container-luxe py-12 relative z-20">
        
        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md shadow-slate-200/50 mb-12 text-left">
          <div className="space-y-1">
            <span className="block text-[10px] uppercase font-bold tracking-widest text-[#aa820a]">Configuration</span>
            <p className="font-display text-xl font-bold text-slate-900">{p.bhk_options ?? "On Request"}</p>
          </div>

          <div className="space-y-1">
            <span className="block text-[10px] uppercase font-bold tracking-widest text-[#aa820a]">Carpet Area</span>
            <p className="font-display text-xl font-bold text-slate-900">{getCarpetArea(p)}</p>
          </div>

          <div className="space-y-1">
            <span className="block text-[10px] uppercase font-bold tracking-widest text-[#aa820a]">Starting Investment</span>
            <p className="font-display text-xl font-bold text-[#d4af37]">{priceDisplay}</p>
          </div>

          <div className="space-y-1">
            <span className="block text-[10px] uppercase font-bold tracking-widest text-[#aa820a]">Target Possession</span>
            <p className="font-display text-xl font-bold text-slate-900">{p.possession ?? p.status ?? "Dec 2027"}</p>
          </div>
        </div>

        {/* 2-Column Main Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column — Detailed Content (8 Cols) */}
          <div className="lg:col-span-8 space-y-12 text-left">
            
            {/* Section Tab Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
              {[
                { id: "overview", label: "Overview & Story" },
                { id: "highlights", label: "Key Highlights" },
                { id: "amenities", label: "Amenities" },
                { id: "gallery", label: "Gallery Dossier" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#d4af37] text-slate-950 shadow-md shadow-[#d4af37]/20"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-[#d4af37]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-up">
                <h2 className="font-display text-3xl font-bold text-slate-900">
                  About <span className="text-[#d4af37]">{name}</span>
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                  {p.description || `Experience high-end luxury living at ${name}, located in the prestigious address of ${p.location}. Crafted for high-net-worth buyers, this landmark development pairs timeless architectural finishes with world-class wellness facilities.`}
                </p>
              </div>
            )}

            {/* Tab: Highlights */}
            {(activeTab === "overview" || activeTab === "highlights") && p.highlights?.length ? (
              <div className="space-y-6 animate-fade-up pt-4">
                <h3 className="font-display text-2xl font-bold text-slate-900">Architectural Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.highlights.map((h: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                      <div className="size-7 rounded-lg bg-amber-50 text-[#aa820a] flex items-center justify-center shrink-0 mt-0.5 border border-[#d4af37]/30">
                        <Check className="size-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-800">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Tab: Amenities */}
            {(activeTab === "overview" || activeTab === "amenities") && p.amenities?.length ? (
              <div className="space-y-6 animate-fade-up pt-4">
                <h3 className="font-display text-2xl font-bold text-slate-900">Curated Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {p.amenities.map((a: any, idx: number) => (
                    <span key={idx} className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <Sparkles className="size-3.5 text-[#d4af37]" />
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Tab: Gallery */}
            {(activeTab === "overview" || activeTab === "gallery") && p.gallery?.length ? (
              <div className="space-y-6 animate-fade-up pt-4">
                <h3 className="font-display text-2xl font-bold text-slate-900">Gallery & Visuals</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {p.gallery.map((rawUrl: any, i: number) => {
                    const g = typeof rawUrl === 'string' ? rawUrl.replace(/^["'{\[]+|["'}\]]+$/g, '') : '';
                    if (!g) return null;
                    return (
                      <Dialog key={i}>
                        <DialogTrigger asChild>
                          <div className="overflow-hidden rounded-2xl cursor-pointer group relative bg-white border border-slate-200 shadow-sm aspect-[4/3]">
                            <img 
                              src={g} 
                              alt={`Gallery image of ${name}`} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                              loading="lazy" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Eye className="size-6 text-white" />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl border-none bg-black/90 p-2 shadow-2xl">
                          <img src={g} alt="" className="mx-auto h-auto w-full max-h-[85vh] object-contain rounded-xl" />
                        </DialogContent>
                      </Dialog>
                    );
                  })}
                </div>
              </div>
            ) : null}

          </div>

          {/* Right Column — Sticky VIP Concierge Inquiry Light Card (4 Cols) */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 text-left space-y-6 shadow-xl shadow-slate-200/60">
              
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#aa820a] uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-[#d4af37]/30">
                  <ShieldCheck className="size-3" /> VIP Priority Access
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-900 pt-2">
                  Request Private Tour
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Connect with a senior SAVERRA advisor for confidential pricing & floorplans.
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 mb-1">Your Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm((s) => ({ ...s, name: e.target.value }))}
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs text-slate-900 focus:outline-none focus:border-[#d4af37] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 mb-1">Phone Number *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98xxx xxxxx"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm((s) => ({ ...s, phone: e.target.value }))}
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs text-slate-900 focus:outline-none focus:border-[#d4af37] focus:bg-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-md shadow-[#d4af37]/20 cursor-pointer"
                >
                  {isSubmitting ? "Submitting Request…" : "Book Site Inspection"}
                </Button>
              </form>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <a
                  href="tel:+918691866691"
                  className="w-full h-11 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:text-[#aa820a] hover:border-[#d4af37] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Phone className="size-3.5 text-[#d4af37]" />
                  <span>Call +91 86918 66691</span>
                </a>

                <a
                  href={`https://wa.me/918691866691?text=Hi%20Saverra%2C%20I%20am%20interested%20in%20${encodeURIComponent(name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-11 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-emerald-600 hover:bg-[#25D366]/25 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

            </div>
          </aside>

        </div>
      </div>

      <ContactSection />
    </div>
  );
}
