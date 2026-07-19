import { useEffect, useState } from "react";
import { MessageCircle, Phone, CalendarCheck, ArrowUp, Download } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const actions = [
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/919876543210", cls: "bg-[#25D366]" },
    { icon: Phone, label: "Call Now", href: "tel:+919876543210", cls: "bg-primary" },
    { icon: CalendarCheck, label: "Book Site Visit", href: "#contact", cls: "bg-[color:var(--navy-deep)]" },
    { icon: Download, label: "Brochure", href: "#contact", cls: "bg-gold text-[color:var(--navy-deep)]" },
  ];

  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 sm:right-6">
      {actions.map((a) => (
        <a key={a.label} href={a.href}
          target={a.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className={`pointer-events-auto group flex items-center gap-2 rounded-full ${a.cls} text-white pl-3 pr-4 py-2.5 shadow-lg transition-all hover:scale-105`}
          aria-label={a.label}
        >
          <a.icon className="size-4" />
          <span className="hidden text-xs font-semibold sm:inline">{a.label}</span>
        </a>
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
  );
}
