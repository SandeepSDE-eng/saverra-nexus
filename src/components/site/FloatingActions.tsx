import { useEffect, useState } from "react";
import { Phone, ArrowUp, Download } from "lucide-react";
import { BookingModal } from "./BookingModal";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState<null | "brochure" | "visit">(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const openBrochure = () => setModal("brochure");
    const openVisit = () => setModal("visit");
    window.addEventListener("saverra:brochure", openBrochure);
    window.addEventListener("saverra:visit", openVisit);
    return () => {
      window.removeEventListener("saverra:brochure", openBrochure);
      window.removeEventListener("saverra:visit", openVisit);
    };
  }, []);

  const actions = [
    { icon: WhatsAppIcon, label: "WhatsApp", onClick: () => window.open("https://wa.me/919876543210", "_blank"), cls: "bg-[#25D366] text-white border-[#25D366] hover:bg-[#20bd5a]" },
    { icon: Phone, label: "Call Now", onClick: () => (window.location.href = "tel:+919876543210"), cls: "bg-primary text-white border-primary hover:bg-primary/90" },
    { icon: Download, label: "Brochure", onClick: () => setModal("brochure"), cls: "bg-gold text-white border-gold hover:bg-gold/90" },
  ];

  return (
    <>
      <div className="pointer-events-none fixed bottom-[100px] right-4 z-40 flex flex-col items-end gap-2 sm:right-6">
        <div className="flex flex-col gap-3 rounded-full border border-white/20 bg-white/30 p-2 backdrop-blur-xl shadow-2xl pointer-events-auto">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={a.onClick}
              className={`group flex size-12 items-center justify-center rounded-full shadow-md transition-all duration-300 border border-transparent ${a.cls}`}
              title={a.label}
              aria-label={a.label}
            >
              <a.icon className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            </button>
          ))}
        </div>
        
        {/* Scroll to Top */}
        <div className={`transition-all duration-500 ${show ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-2 grid size-10 place-items-center rounded-full bg-[color:var(--navy-deep)] text-white shadow-lg transition-transform hover:scale-105"
            aria-label="Back to top"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>

      <BookingModal open={modal !== null} mode={modal ?? "brochure"} onClose={() => setModal(null)} />
    </>
  );
}
