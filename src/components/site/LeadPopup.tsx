import { useEffect, useState } from "react";
import { toast } from "sonner";
import { X, Sparkles, Phone as PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "saverra_lead_submitted_v1";
const SHOW_DELAY_MS = 7000;
const REPROMPT_MS = 25000;

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", budget: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "1") return;

    const first = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    // If the user closes without submitting, keep re-prompting.
    const interval = window.setInterval(() => {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
      setOpen(true);
    }, REPROMPT_MS + SHOW_DELAY_MS);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.trim().length < 8) {
      toast.error("Please enter your name and a valid phone number.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert({
      name: form.name,
      phone: form.phone,
      city: form.city || null,
      budget: form.budget || null,
      message: "Popup lead — requested callback",
    });
    setSubmitting(false);
    if (error) return toast.error("Something went wrong. Please try again.");
    localStorage.setItem(STORAGE_KEY, "1");
    toast.success("Thank you! A SAVERRA advisor will call you shortly.");
    setOpen(false);
  };

  const close = () => setOpen(false); // reopens automatically until submitted

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-[color:var(--navy-deep)]/70 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-2xl">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-foreground/10 text-foreground/70 transition hover:bg-foreground/20"
        >
          <X className="size-4" />
        </button>

        {/* Banner */}
        <div className="relative bg-gradient-to-br from-[color:var(--navy-deep)] to-primary p-6 pb-8 text-white">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
            <Sparkles className="size-3" /> Exclusive Offer
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">
            Get <span className="gold-text">Priority Access</span> to New Launches
          </h3>
          <p className="mt-1.5 text-sm text-white/80">
            Pre-launch pricing · Free site visit · Instant brochure — share your details.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 p-6 pt-5">
          <div>
            <Label className="text-xs">Full name*</Label>
            <Input required value={form.name} onChange={set("name")} className="mt-1 h-11" placeholder="Your name" />
          </div>
          <div>
            <Label className="text-xs">Phone number*</Label>
            <Input required type="tel" value={form.phone} onChange={set("phone")} className="mt-1 h-11" placeholder="+91 98xxx xxxxx" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">City</Label>
              <Input value={form.city} onChange={set("city")} className="mt-1 h-11" placeholder="Mumbai" />
            </div>
            <div>
              <Label className="text-xs">Budget</Label>
              <Input value={form.budget} onChange={set("budget")} className="mt-1 h-11" placeholder="₹1–2 Cr" />
            </div>
          </div>
          <Button type="submit" variant="gold" size="lg" className="mt-2 w-full" disabled={submitting}>
            {submitting ? "Sending…" : "Get Instant Callback"}
          </Button>
          <p className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-muted-foreground">
            <PhoneIcon className="size-3 text-gold" /> Or call us: +91 98765 43210
          </p>
        </form>
      </div>
    </div>
  );
}
