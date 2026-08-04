import { useEffect, useState } from "react";
import { toast } from "sonner";
import { X, Download, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addInquiryFn } from "@/api/inquiries";

type Mode = "brochure" | "visit";

export function BookingModal({
  open, mode, onClose, projectName,
}: { open: boolean; mode: Mode; onClose: () => void; projectName?: string }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", date: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const isVisit = mode === "visit";
  const title = isVisit ? "Schedule a Site Visit" : "Download Project Brochure";
  const subtitle = isVisit
    ? "Pick a slot — a SAVERRA advisor will confirm within 30 minutes."
    : "Instant email delivery with pricing, floor plans and amenities.";

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || form.phone.length < 8) {
      toast.error("Please enter your name and a valid phone number.");
      return;
    }
    setSubmitting(true);
    const msg = isVisit
      ? `Site visit requested${form.date ? ` for ${form.date}` : ""}${projectName ? ` — ${projectName}` : ""}.`
      : `Brochure requested${projectName ? ` — ${projectName}` : ""}.`;
    const response = await addInquiryFn({ data: {
      name: form.name, phone: form.phone,
      email: form.email || undefined,
      city: form.city || undefined,
      source: isVisit ? "Site Visit" : "Brochure",
      message: msg,
    }});
    setSubmitting(false);
    if (!response.success) return toast.error("Something went wrong. Please try again.");
    toast.success(isVisit ? "Site visit request received!" : "Brochure is on its way to your inbox!");
    setForm({ name: "", phone: "", email: "", city: "", date: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[75] grid place-items-center bg-[color:var(--navy-deep)]/70 p-4 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-2xl">
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-foreground/10 text-foreground/70 hover:bg-foreground/20">
          <X className="size-4" />
        </button>

        <div className="bg-gradient-to-br from-[color:var(--navy-deep)] to-primary p-6 text-white">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
            {isVisit ? <CalendarCheck className="size-3" /> : <Download className="size-3" />}
            {isVisit ? "Site Visit" : "Brochure"}
          </div>
          <h3 className="mt-3 font-display text-2xl font-medium tracking-wide leading-tight">{title}</h3>
          <p className="mt-1 text-sm text-white/80">{subtitle}</p>
          {projectName && <p className="mt-2 text-xs uppercase tracking-wider text-gold">{projectName}</p>}
        </div>

        <form onSubmit={submit} className="space-y-3 p-6 pt-5">
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-xs">Full name*</Label><Input required value={form.name} onChange={set("name")} className="mt-1 h-11" /></div>
            <div><Label className="text-xs">Phone*</Label><Input required type="tel" value={form.phone} onChange={set("phone")} className="mt-1 h-11" /></div>
          </div>
          <div><Label className="text-xs">Email</Label><Input type="email" value={form.email} onChange={set("email")} className="mt-1 h-11" /></div>
          {isVisit ? (
            <div><Label className="text-xs">Preferred date</Label><Input type="date" value={form.date} onChange={set("date")} className="mt-1 h-11" /></div>
          ) : (
            <div><Label className="text-xs">Location</Label><Input value={form.city} onChange={set("city")} className="mt-1 h-11" /></div>
          )}
          <Button type="submit" variant="gold" size="lg" className="mt-2 w-full" disabled={submitting}>
            {submitting ? "Sending…" : isVisit ? "Confirm Site Visit" : "Send Brochure to Me"}
          </Button>
        </form>
      </div>
    </div>
  );
}
