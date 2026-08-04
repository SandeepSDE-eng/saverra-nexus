import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Maximize2, Bath, Bed, Video, Phone, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/integrations/supabase/types";

type Project = Tables<"projects">;

export function ProjectModal({ project, isOpen, onClose }: { project: Project, isOpen: boolean, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("Gallery");

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-3xl bg-card rounded-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[480px] shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full bg-muted/50 hover:bg-muted text-foreground transition"
        >
          <X className="size-4" />
        </button>

        {/* Left Side - Image */}
        <div className="relative w-full md:w-[45%] h-64 md:h-full shrink-0">
          <img 
            src={project.cover_image || ""} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/90 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-block bg-gold text-[color:var(--navy-deep)] text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
              ✨ Premium Listing
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-white mb-1.5">{project.name}</h2>
            <p className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
              <MapPin className="size-3.5 text-gold" />
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
          <div className="flex bg-muted p-1 rounded-lg mb-5 shrink-0">
            {["Overview", "Gallery", "Financing", "Neighborhood"].map((tab) => (
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
          <div className="flex-1 overflow-y-auto mb-6 pr-2">
            {activeTab === "Gallery" && (
              <div className="grid grid-cols-2 gap-2 shrink-0 animate-fade-in">
                <div className="relative rounded-xl overflow-hidden aspect-square group">
                  <img src={project.cover_image || ""} alt="Gallery Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="grid grid-rows-2 gap-2">
                  <div className="relative rounded-xl overflow-hidden group">
                    <img src={project.cover_image || ""} alt="Gallery Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95" />
                  </div>
                  <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                    <img src={project.cover_image || ""} alt="Gallery More" className="w-full h-full object-cover filter brightness-50 transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-white font-medium tracking-wide">+12 Photos</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Overview" && (
              <div className="space-y-4 animate-fade-in text-muted-foreground text-sm leading-relaxed">
                <p>Welcome to {project.name}, a masterpiece of modern architecture situated in the heart of {project.location}. Experience unparalleled luxury with our exquisitely designed residences that offer breathtaking views and world-class amenities.</p>
                <p>Designed for those who seek the extraordinary, this project features state-of-the-art facilities including a temperature-controlled infinity pool, a fully equipped wellness center, and sprawling landscaped gardens.</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-muted/50 p-3 rounded-lg"><span className="block font-medium text-foreground mb-1">Status</span> {project.status}</div>
                  <div className="bg-muted/50 p-3 rounded-lg"><span className="block font-medium text-foreground mb-1">Carpet Area</span> {project.rera_number || "Applied"}</div>
                  <div className="bg-muted/50 p-3 rounded-lg"><span className="block font-medium text-foreground mb-1">Possession</span> {project.possession || "Dec 2026"}</div>
                  <div className="bg-muted/50 p-3 rounded-lg"><span className="block font-medium text-foreground mb-1">Total Area</span> 2.5 Acres</div>
                </div>
              </div>
            )}

            {activeTab === "Financing" && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 bg-muted/50 rounded-xl border border-border">
                  <h4 className="font-medium mb-2 text-foreground">Estimated EMI</h4>
                  <p className="text-2xl font-display text-primary font-bold">₹ 1.25 Lakhs <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
                  <p className="text-xs text-muted-foreground mt-2">Based on 20% down payment over 20 years at 8.5% interest rate.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-foreground">Banking Partners</h4>
                  <div className="flex gap-2">
                    {["HDFC", "SBI", "ICICI"].map(bank => (
                      <span key={bank} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground border border-border">{bank} Bank</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Neighborhood" && (
              <div className="space-y-4 animate-fade-in">
                <div className="aspect-video bg-muted rounded-xl relative overflow-hidden flex items-center justify-center border border-border">
                  <div 
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=Mumbai&zoom=14&size=600x300&sensor=false')" }}
                  ></div>
                  <span className="relative z-10 text-muted-foreground font-medium flex items-center gap-2"><MapPin className="size-4" /> View on Map</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Connectivity</h5>
                    <ul className="text-sm space-y-1 text-foreground/80">
                      <li>• Metro Station (2 min)</li>
                      <li>• Eastern Express (5 min)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Lifestyle</h5>
                    <ul className="text-sm space-y-1 text-foreground/80">
                      <li>• R City Mall (10 min)</li>
                      <li>• Phoenix Marketcity (15 min)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto shrink-0 pt-4 border-t border-border/40">
            <Button className="flex-1 bg-[color:var(--navy-deep)] hover:bg-[color:var(--navy-deep)]/90 h-11 shadow-sm" size="default">
              <Phone className="size-3.5 mr-2" /> Call advisor
            </Button>
            <Button className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white h-11 shadow-sm" size="default">
              <MessageSquare className="size-3.5 mr-2" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
