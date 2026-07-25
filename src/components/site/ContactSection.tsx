import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", budget: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please provide your name and phone number.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert({
      name: form.name, phone: form.phone, email: form.email || null,
      city: form.city || null, budget: form.budget || null, message: form.message || null,
    });
    setSubmitting(false);
    if (error) return toast.error("Something went wrong. Please try again.");
    toast.success("Thanks! Our team will reach out within 24 hours.");
    setForm({ name: "", phone: "", email: "", city: "", budget: "", message: "" });
  };

  return (
    <section id="contact" className="bg-secondary/50 py-20">
      <div className="container-luxe grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="eyebrow">Get In Touch</p>
          <h2 className="mt-2 font-display text-4xl font-light tracking-wide text-primary sm:text-5xl">
            Let's help you find your dream home
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Speak with a SAVERRA advisor. We'll walk you through availability, pricing, and financing.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: Phone, label: "+91 98765 43210", href: "tel:+919876543210" },
              { icon: MessageCircle, label: "WhatsApp us", href: "https://wa.me/919876543210" },
              { icon: Mail, label: "info@saverra.com", href: "mailto:info@saverra.com" },
              { icon: MapPin, label: "One45 Business Bay, 1205, Vallabh Baug Ln Ext, Railway Police Colony, Ghatkopar East, Mumbai, Maharashtra 400077", href: "#" },
            ].map((c) => (
              <a key={c.label} href={c.href} className="flex items-center gap-4 rounded-lg border border-border/60 bg-card p-4 transition-colors hover:border-gold/60">
                <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/8 text-primary">
                  <c.icon className="size-5" />
                </div>
                <span className="text-sm font-medium text-foreground/85">{c.label}</span>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card lg:col-span-3 sm:p-8">
          <h3 className="font-display text-2xl font-medium tracking-wide text-primary">Send us a message</h3>
          <p className="mt-1 text-xs text-muted-foreground">All inquiries are handled within 24 hours by a senior advisor.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div><Label>Full name*</Label><Input required value={form.name} onChange={set("name")} className="mt-1 h-11" /></div>
            <div><Label>Phone*</Label><Input required type="tel" value={form.phone} onChange={set("phone")} className="mt-1 h-11" /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={set("email")} className="mt-1 h-11" /></div>
            <div><Label>Preferred city</Label><Input value={form.city} onChange={set("city")} className="mt-1 h-11" /></div>
            <div className="sm:col-span-2"><Label>Budget</Label><Input value={form.budget} onChange={set("budget")} placeholder="e.g. ₹1 – 2 Cr" className="mt-1 h-11" /></div>
            <div className="sm:col-span-2"><Label>Message</Label><Textarea rows={4} value={form.message} onChange={set("message")} className="mt-1" placeholder="Tell us what you're looking for…" /></div>
          </div>
          <Button type="submit" variant="gold" size="lg" className="mt-6 w-full" disabled={submitting}>
            {submitting ? "Sending…" : "Submit Inquiry"}
          </Button>
        </form>
      </div>
    </section>
  );
}
