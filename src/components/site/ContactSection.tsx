import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Sparkles, ShieldCheck, ArrowRight, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addInquiryFn } from "@/api/inquiries";

const BUDGET_OPTIONS = [
  "₹1 Cr – ₹3 Cr",
  "₹3 Cr – ₹5 Cr",
  "₹5 Cr – ₹10 Cr",
  "₹10 Cr+ Ultra Luxe"
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", budget: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please provide your name and contact phone number.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await addInquiryFn({ data: {
        name: form.name, 
        phone: form.phone, 
        email: form.email || undefined,
        city: form.city || undefined,
        budget: form.budget || undefined,
        source: "Contact Concierge Section",
        message: form.message || undefined,
      }});
      setSubmitting(false);
      if (!response.success) {
        toast.error("Something went wrong. Please try again or reach out on WhatsApp.");
        return;
      }
      toast.success("Inquiry received! A senior SAVERRA advisor will connect with you within 24 hours.");
      setForm({ name: "", phone: "", email: "", city: "", budget: "", message: "" });
    } catch (err) {
      setSubmitting(false);
      toast.error("Network error. Please call +91 86918 66691 directly.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#040e1d] text-white relative overflow-hidden">
      {/* Ambient Metallic Mesh Orbs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#08182f] blur-[160px] pointer-events-none" />

      <div className="container-luxe relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column — Brand & Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08182f] border border-[#d4af37]/30 text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
                <Sparkles className="size-3.5" /> SAVERRA PRIVATE CONCIERGE
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Let's Elevate Your <br />
                <span className="bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] bg-clip-text text-transparent italic font-normal">
                  Real Estate Experience
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-md">
                Speak directly with senior real estate advisors. We guide you through inventory availability, confidential pre-launch pricing, and tailored mortgage structures.
              </p>
            </div>

            {/* SLA Trust Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#08182f] border border-[#d4af37]/30 text-xs text-slate-300">
              <div className="size-10 rounded-xl bg-black/40 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
                <Clock className="size-5" />
              </div>
              <div>
                <span className="block font-bold text-white uppercase tracking-wider text-[11px]">24-Hour SLA Advisory Guarantee</span>
                <span className="text-slate-400">All submissions are reviewed by senior partners in strict confidence.</span>
              </div>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4 pt-2">
              {[
                {
                  icon: Phone,
                  title: "Direct Advisory Helpline",
                  value: "+91 86918 66691 / +91 98765 43210",
                  href: "tel:+918691866691",
                  badge: "Call Now"
                },
                {
                  icon: MessageCircle,
                  title: "Instant WhatsApp Concierge",
                  value: "+91 86918 66691",
                  href: "https://wa.me/918691866691",
                  badge: "Live Chat"
                },
                {
                  icon: Mail,
                  title: "Official Correspondence",
                  value: "info@saverra.com",
                  href: "mailto:info@saverra.com",
                  badge: "Email"
                },
                {
                  icon: MapPin,
                  title: "Mumbai Headquarters",
                  value: "One45 Business Bay, 1205, Vallabh Baug Ln Ext, Ghatkopar East, Mumbai 400077",
                  href: "https://maps.google.com/?q=Ghatkopar+East+Mumbai",
                  badge: "HQ Visit"
                },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <a
                    key={i}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#08182f]/60 p-4 transition-all duration-300 hover:border-[#d4af37]/60 hover:bg-[#08182f] hover:-translate-y-1 group"
                  >
                    <div className="size-11 shrink-0 rounded-xl bg-black/50 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-slate-950 transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">
                        {c.title}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate block mt-0.5 group-hover:text-white">
                        {c.value}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-slate-400 group-hover:border-[#d4af37] group-hover:text-[#d4af37] shrink-0">
                      {c.badge}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column — Luxury Interactive Form Card (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#d4af37]/30 bg-[#08182f]/90 backdrop-blur-2xl p-6 sm:p-10 text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] space-y-6">
              
              <div className="space-y-1 border-b border-white/10 pb-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    Send Us A Message
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#d4af37] uppercase tracking-wider bg-black/40 px-3 py-1 rounded-full border border-[#d4af37]/30">
                    <ShieldCheck className="size-3" /> Confidential
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Fill in your preferences below to receive verified project deck & private viewing invitation.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">Full Name *</Label>
                    <Input
                      required
                      placeholder="e.g. Vikramaditya Sharma"
                      value={form.name}
                      onChange={set("name")}
                      className="h-12 rounded-xl bg-black/40 border-white/10 text-sm font-medium text-white placeholder:text-slate-500 focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">Contact Phone *</Label>
                    <Input
                      required
                      type="tel"
                      placeholder="+91 98xxx xxxxx"
                      value={form.phone}
                      onChange={set("phone")}
                      className="h-12 rounded-xl bg-black/40 border-white/10 text-sm font-medium text-white placeholder:text-slate-500 focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Email Address</Label>
                    <Input
                      type="email"
                      placeholder="vikram@company.com"
                      value={form.email}
                      onChange={set("email")}
                      className="h-12 rounded-xl bg-black/40 border-white/10 text-sm font-medium text-white placeholder:text-slate-500 focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Preferred Location / City</Label>
                    <Input
                      placeholder="e.g. Worli, Bandra, BKC"
                      value={form.city}
                      onChange={set("city")}
                      className="h-12 rounded-xl bg-black/40 border-white/10 text-sm font-medium text-white placeholder:text-slate-500 focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Budget Bracket Selector Pills */}
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">Target Budget Bracket</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setForm((s) => ({ ...s, budget: opt }))}
                        className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all border text-center cursor-pointer ${
                          form.budget === opt
                            ? "bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                            : "bg-black/40 text-slate-300 border-white/10 hover:border-[#d4af37]/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Specific Requirements / Message</Label>
                  <Textarea
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us your preferred configurations (e.g., 4 BHK Sky Villa with Private Deck)…"
                    className="rounded-xl bg-black/40 border-white/10 text-sm font-medium text-white placeholder:text-slate-500 focus:border-[#d4af37] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Send className="size-4" />
                  <span>{submitting ? "Transmitting Inquiry…" : "Submit Priority Inquiry"}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
                  🔒 Zero Spam Promise · Instant Callback by Certified Saverra Advisor
                </p>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
