import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Bath, Bed, Phone, MessageSquare, MapPin, ChevronLeft, ChevronRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Tables } from "@/integrations/supabase/types";
import { getCarpetArea } from "@/lib/projectUtils";

type Project = Tables<"projects">;

function parseNumericPrice(priceStr?: string | null, fallbackPrice?: number | null): number {
  if (fallbackPrice && fallbackPrice > 0) return fallbackPrice;
  if (!priceStr) return 15000000;
  
  const clean = priceStr.toLowerCase().replace(/[^0-9.crlakh]/g, "");
  if (clean.includes("cr")) {
    const num = parseFloat(clean);
    if (!isNaN(num)) return Math.round(num * 10000000);
  }
  if (clean.includes("lakh")) {
    const num = parseFloat(clean);
    if (!isNaN(num)) return Math.round(num * 100000);
  }
  const digits = parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  return !isNaN(digits) && digits > 100000 ? digits : 15000000;
}

export function ProjectModal({ project, isOpen, onClose }: { project: Project, isOpen: boolean, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("Gallery");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // EMI State
  const initialPrice = useMemo(() => parseNumericPrice(project.price_display, project.price_numeric), [project]);
  const [price, setPrice] = useState(initialPrice);
  const [downPercent, setDownPercent] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);

  const downAmount = useMemo(() => Math.round((price * downPercent) / 100), [price, downPercent]);

  const { emi, totalPayable, totalInterest, principal } = useMemo(() => {
    const p = Math.max(price - downAmount, 0);
    const r = rate / 12 / 100;
    const n = years * 12;
    const computedEmi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = computedEmi * n;
    return { emi: computedEmi, totalPayable: total, totalInterest: Math.max(0, total - p), principal: p };
  }, [price, downAmount, rate, years]);

  const fmtCurrency = (n: number) => {
    if (isNaN(n)) return "₹ 0";
    if (n >= 10000000) {
      return `₹ ${(n / 10000000).toFixed(2)} Cr`;
    }
    if (n >= 100000) {
      return `₹ ${(n / 100000).toFixed(2)} Lakhs`;
    }
    return "₹ " + Math.round(n).toLocaleString("en-IN");
  };

  const galleryList: string[] = useMemo(() => {
    if (Array.isArray(project.gallery)) return project.gallery.filter(Boolean);
    if (typeof project.gallery === "string") {
      try {
        const parsed = JSON.parse(project.gallery);
        if (Array.isArray(parsed)) return parsed.filter(Boolean);
      } catch {
        // fallback
      }
    }
    return [project.cover_image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"];
  }, [project]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleCallAdvisor = () => {
    window.location.href = "tel:+918691866691";
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi Saverra Realty, I am interested in ${project.name} located at ${project.location}. Please share full pricing & availability details.`);
    window.open(`https://wa.me/918691866691?text=${text}`, "_blank");
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-3xl bg-card rounded-2xl overflow-hidden flex flex-col md:flex-row h-[88vh] md:h-[520px] shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full bg-muted/50 hover:bg-muted text-foreground transition"
          aria-label="Close dialog"
        >
          <X className="size-4" />
        </button>

        {/* Left Side - Image */}
        <div className="relative w-full md:w-[45%] h-56 md:h-full shrink-0">
          <img 
            src={project.cover_image || galleryList[0] || ""} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/90 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-block bg-gold text-[color:var(--navy-deep)] text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
              ✨ Premium Listing
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-white mb-1.5 line-clamp-1">{project.name}</h2>
            <p className="flex items-center gap-1.5 text-white/80 text-xs font-medium line-clamp-1">
              <MapPin className="size-3.5 text-gold shrink-0" />
              {project.location}
            </p>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-[55%] p-5 md:p-6 overflow-y-auto bg-card flex flex-col">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pr-8">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Starting</p>
              <p className="text-xl md:text-2xl text-primary font-display font-medium">{project.price_display}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium bg-secondary/50 px-3 py-1.5 rounded-lg">
              <span className="flex items-center gap-1.5"><Bed className="size-3.5" /> {project.min_bhk || 2} BHK</span>
              <span className="flex items-center gap-1.5"><Bath className="size-3.5" /> {Math.max(2, (project.min_bhk || 2) + 1)}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-muted p-1 rounded-lg mb-4 shrink-0">
            {["Overview", "Gallery", "Financing"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)} 
                className={`flex-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider py-2 rounded-md transition-colors ${activeTab === tab ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto mb-4 pr-2">
            {activeTab === "Gallery" && (() => {
              const img1 = galleryList[0] || project.cover_image || "";
              const img2 = galleryList[1] || img1;
              const img3 = galleryList[2] || img2;
              const totalCount = galleryList.length;
              const extraPhotosCount = Math.max(0, totalCount - 3);

              return (
                <div className="space-y-3 animate-fade-in">
                  <div className="grid grid-cols-2 gap-2">
                    <div 
                      className="relative rounded-xl overflow-hidden aspect-square group cursor-pointer"
                      onClick={() => setSelectedPhotoIndex(0)}
                    >
                      <img src={img1} alt={`${project.name} Gallery 1`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                      <div 
                        className="relative rounded-xl overflow-hidden group cursor-pointer"
                        onClick={() => setSelectedPhotoIndex(1 < totalCount ? 1 : 0)}
                      >
                        <img src={img2} alt={`${project.name} Gallery 2`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95" />
                      </div>
                      <div 
                        className="relative rounded-xl overflow-hidden group cursor-pointer"
                        onClick={() => setSelectedPhotoIndex(2 < totalCount ? 2 : 0)}
                      >
                        <img src={img3} alt={`${project.name} Gallery 3`} className="w-full h-full object-cover filter brightness-50 transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] bg-black/30 hover:bg-black/40 transition-colors">
                          <span className="text-white font-semibold text-xs sm:text-sm tracking-wide">
                            {extraPhotosCount > 0 ? `+${extraPhotosCount + 3} Photos` : "View All Photos"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center italic">
                    Click any photo to open full gallery viewer
                  </p>
                </div>
              );
            })()}

            {activeTab === "Overview" && (
              <div className="space-y-4 animate-fade-in text-muted-foreground text-sm leading-relaxed">
                <p>Welcome to {project.name}, a masterpiece of modern architecture situated in the heart of {project.location}. Experience unparalleled luxury with our exquisitely designed residences that offer breathtaking views and world-class amenities.</p>
                <p>Designed for those who seek the extraordinary, this project features state-of-the-art facilities including a temperature-controlled infinity pool, a fully equipped wellness center, and sprawling landscaped gardens.</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-muted/50 p-3 rounded-lg"><span className="block font-medium text-foreground mb-1">Configuration</span> {project.bhk_options || "2 & 3 BHK"}</div>
                  <div className="bg-muted/50 p-3 rounded-lg"><span className="block font-medium text-foreground mb-1">Carpet Area</span> {getCarpetArea(project)}</div>
                  <div className="bg-muted/50 p-3 rounded-lg"><span className="block font-medium text-foreground mb-1">Starting Price</span> {project.price_display}</div>
                  <div className="bg-muted/50 p-3 rounded-lg"><span className="block font-medium text-foreground mb-1">Possession</span> {project.possession || "Dec 2026"}</div>
                </div>
              </div>
            )}

            {activeTab === "Financing" && (
              <div className="space-y-4 animate-fade-in">
                {/* Dynamic EMI Calculator */}
                <div className="p-4 bg-muted/40 rounded-xl border border-border/70 space-y-3">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      <Calculator className="size-4 text-gold" /> Quick EMI Calculator
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">8.5% Rate</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[10px] uppercase text-muted-foreground">Property Price (₹)</Label>
                      <Input 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(Math.max(0, +e.target.value || 0))}
                        className="mt-1 h-8 text-xs font-semibold bg-background"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase text-muted-foreground">Down Payment ({downPercent}%)</Label>
                      <Input 
                        type="number" 
                        value={downPercent} 
                        onChange={(e) => setDownPercent(Math.min(90, Math.max(0, +e.target.value || 0)))}
                        className="mt-1 h-8 text-xs font-semibold bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[10px] uppercase text-muted-foreground">Interest Rate (% p.a.)</Label>
                      <Input 
                        type="number" 
                        step="0.1" 
                        value={rate} 
                        onChange={(e) => setRate(Math.max(0.1, +e.target.value || 0))}
                        className="mt-1 h-8 text-xs font-semibold bg-background"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] uppercase text-muted-foreground">Tenure (Years)</Label>
                      <Input 
                        type="number" 
                        value={years} 
                        onChange={(e) => setYears(Math.max(1, Math.min(30, +e.target.value || 0)))}
                        className="mt-1 h-8 text-xs font-semibold bg-background"
                      />
                    </div>
                  </div>

                  {/* Calculated Output Box */}
                  <div className="bg-[color:var(--navy-deep)] text-white p-3 rounded-lg flex flex-col gap-1.5 shadow-md mt-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[11px] uppercase tracking-wider text-white/70">Estimated EMI</span>
                      <span className="font-display text-xl font-bold text-gold">{fmtCurrency(emi)}<span className="text-xs font-normal text-white/70"> / mo</span></span>
                    </div>
                    <div className="border-t border-white/15 pt-1.5 grid grid-cols-2 gap-1 text-[11px] text-white/80">
                      <div>Principal: <span className="font-semibold text-white">{fmtCurrency(principal)}</span></div>
                      <div>Interest: <span className="font-semibold text-white">{fmtCurrency(totalInterest)}</span></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-medium text-xs text-foreground uppercase tracking-wider">Banking Partners</h4>
                  <div className="flex flex-wrap gap-2">
                    {["HDFC Bank", "SBI Bank", "ICICI Bank", "Axis Bank", "Kotak"].map(bank => (
                      <span key={bank} className="px-2.5 py-1 bg-muted rounded-md text-[11px] text-muted-foreground border border-border">{bank}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto shrink-0 pt-3 border-t border-border/40">
            <Button 
              onClick={handleCallAdvisor}
              className="flex-1 bg-[color:var(--navy-deep)] hover:bg-[color:var(--navy-deep)]/90 text-white h-11 shadow-sm font-medium" 
              size="default"
            >
              <Phone className="size-3.5 mr-2 text-gold" /> Call advisor
            </Button>
            <Button 
              onClick={handleWhatsApp}
              className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white h-11 shadow-sm font-medium" 
              size="default"
            >
              <MessageSquare className="size-3.5 mr-2" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Lightbox / Gallery Viewer Dialog */}
      {selectedPhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <button 
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute right-6 top-6 z-10 grid size-10 place-items-center rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="size-6" />
          </button>

          <div 
            className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            {galleryList.length > 1 && (
              <button
                onClick={() => setSelectedPhotoIndex((prev) => (prev === null || prev === 0 ? galleryList.length - 1 : prev - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-black/50 hover:bg-black/75 text-white transition z-10"
              >
                <ChevronLeft className="size-6" />
              </button>
            )}

            <img 
              src={galleryList[selectedPhotoIndex] || project.cover_image || ""} 
              alt={`${project.name} Photo ${selectedPhotoIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {galleryList.length > 1 && (
              <button
                onClick={() => setSelectedPhotoIndex((prev) => (prev === null || prev === galleryList.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-black/50 hover:bg-black/75 text-white transition z-10"
              >
                <ChevronRight className="size-6" />
              </button>
            )}
          </div>

          <div className="mt-4 text-white text-xs font-medium tracking-wider bg-black/40 px-4 py-1.5 rounded-full">
            Photo {selectedPhotoIndex + 1} of {galleryList.length} — {project.name}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
