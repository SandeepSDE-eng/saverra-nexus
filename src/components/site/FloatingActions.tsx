import { useEffect, useState } from "react";
import { MessageCircle, Phone, CalendarCheck, ArrowUp, Download } from "lucide-react";
import { BookingModal } from "./BookingModal";

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
    { icon: MessageCircle, label: "WhatsApp", onClick: () => window.open("https://wa.me/919876543210", "_blank"), cls: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]" },
    { icon: Phone, label: "Call Now", onClick: () => (window.location.href = "tel:+919876543210"), cls: "hover:bg-primary hover:text-white hover:border-primary" },
    { icon: Download, label: "Brochure", onClick: () => setModal("brochure"), cls: "hover:bg-gold hover:text-white hover:border-gold" },
  ];

  return (
    <>
      <div className="pointer-events-none fixed bottom-[100px] right-4 z-40 flex flex-col items-end gap-2 sm:right-6">
        <div className="flex flex-col gap-2 rounded-full border border-white/10 bg-white/40 p-1.5 backdrop-blur-xl shadow-2xl pointer-events-auto">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={a.onClick}
              className={`group flex size-10 items-center justify-center rounded-full bg-white text-foreground/80 shadow-sm transition-all duration-300 border border-transparent ${a.cls}`}
              title={a.label}
              aria-label={a.label}
            >
              <a.icon className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
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
