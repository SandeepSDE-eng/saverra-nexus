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
    { icon: MessageCircle, label: "WhatsApp", onClick: () => window.open("https://wa.me/919876543210", "_blank"), cls: "bg-[#25D366] text-white" },
    { icon: Phone, label: "Call Now", onClick: () => (window.location.href = "tel:+919876543210"), cls: "bg-primary text-white" },
    { icon: CalendarCheck, label: "Book Site Visit", onClick: () => setModal("visit"), cls: "bg-[color:var(--navy-deep)] text-white" },
    { icon: Download, label: "Brochure", onClick: () => setModal("brochure"), cls: "bg-gold text-[color:var(--navy-deep)]" },
  ];

  return (
    <>
      <div className="pointer-events-none fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 sm:right-6">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className={`pointer-events-auto group flex items-center gap-2 rounded-full ${a.cls} pl-3 pr-4 py-2.5 shadow-lg transition-all hover:scale-105`}
            aria-label={a.label}
          >
            <a.icon className="size-4" />
            <span className="hidden text-xs font-semibold sm:inline">{a.label}</span>
          </button>
        ))}
        {show && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="pointer-events-auto grid size-11 place-items-center rounded-full bg-foreground/85 text-background shadow-lg transition hover:bg-primary"
            aria-label="Back to top"
          >
            <ArrowUp className="size-5" />
          </button>
        )}
      </div>

      <BookingModal open={modal !== null} mode={modal ?? "brochure"} onClose={() => setModal(null)} />
    </>
  );
}
