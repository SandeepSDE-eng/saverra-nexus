import { useState } from "react";
import { toast } from "sonner";
import { addInquiryFn } from "@/api/inquiries";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.phone) {
      toast.error("Please provide your name and phone number.");
      return;
    }
    setSubmitting(true);
    const response = await addInquiryFn({ data: {
      name: `${form.firstName} ${form.lastName}`.trim(),
      phone: form.phone,
      email: form.email || undefined,
      source: "Contact Page",
      message: form.message || undefined,
    }});
    setSubmitting(false);
    if (!response.success) return toast.error("Something went wrong. Please try again.");
    toast.success("Thanks! Our team will reach out within 24 hours.");
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Top Banner */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden pb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20 filter mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] to-transparent opacity-80"></div>
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <h1 className="font-display text-4xl md:text-6xl font-light tracking-wide mb-4">
            Get in <span className="text-gold italic font-medium">Touch</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto font-light tracking-wide text-sm md:text-lg">
            Connect with our expert advisors to find your perfect property.
          </p>
        </div>
      </div>

      <div className="container-luxe mx-auto max-w-6xl px-4 -mt-16 relative z-20">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden border border-border/50">
          
          {/* Contact Info Sidebar */}
          <div className="bg-[color:var(--navy-deep)] text-white p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
            
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-light mb-8">Contact Info</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="bg-white/10 p-4 rounded-full text-gold transition-colors group-hover:bg-gold group-hover:text-black">
                    <MapPin className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-white mb-1">Office</h3>
                    <p className="text-white/70 leading-relaxed font-light text-sm">
                      One45 Business Bay, 1205,<br />
                      Vallabh Baug Ln Ext,<br />
                      Ghatkopar East, Mumbai 400077
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-white/10 p-4 rounded-full text-gold transition-colors group-hover:bg-gold group-hover:text-black">
                    <Phone className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-white mb-1">Phone</h3>
                    <p className="text-white/70 leading-relaxed font-light text-sm">
                      <a href="tel:+918691866691" className="hover:text-gold transition-colors font-medium text-white">+91 86918 66691</a><br />
                      Mon-Sat, 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-white/10 p-4 rounded-full text-gold transition-colors group-hover:bg-gold group-hover:text-black">
                    <Mail className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-white mb-1">Email</h3>
                    <p className="text-white/70 leading-relaxed font-light text-sm">
                      <a href="mailto:info@saverrarealty.com" className="hover:text-gold transition-colors text-white font-medium">info@saverrarealty.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/10">
                <h3 className="font-medium text-sm uppercase tracking-widest text-white/50 mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/saverrarealty/" target="_blank" rel="noreferrer" title="Instagram" className="bg-white/10 p-3 rounded-full text-white hover:bg-gold hover:text-black transition-all hover:-translate-y-1">
                    <Instagram className="size-5" />
                  </a>
                  <a href="https://www.facebook.com/SaverraRealty/" target="_blank" rel="noreferrer" title="Facebook" className="bg-white/10 p-3 rounded-full text-white hover:bg-gold hover:text-black transition-all hover:-translate-y-1">
                    <Facebook className="size-5" />
                  </a>
                  <a href="https://www.youtube.com/channel/UC4evOuC0SqWApu0cYg6tfWQ" target="_blank" rel="noreferrer" title="YouTube" className="bg-white/10 p-3 rounded-full text-white hover:bg-gold hover:text-black transition-all hover:-translate-y-1">
                    <Youtube className="size-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/nimesh-bhanushali-83671b54" target="_blank" rel="noreferrer" title="LinkedIn" className="bg-white/10 p-3 rounded-full text-white hover:bg-gold hover:text-black transition-all hover:-translate-y-1">
                    <Linkedin className="size-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="p-10 md:p-14 bg-white flex flex-col">
            <h2 className="font-display text-3xl font-light text-primary mb-8">Send a Message</h2>
            <form onSubmit={onSubmit} className="space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">First Name</Label>
                  <Input required value={form.firstName} onChange={set("firstName")} placeholder="John" className="h-12 bg-muted/30 border-border/50 focus-visible:border-gold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Last Name</Label>
                  <Input value={form.lastName} onChange={set("lastName")} placeholder="Doe" className="h-12 bg-muted/30 border-border/50 focus-visible:border-gold" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Email</Label>
                  <Input type="email" value={form.email} onChange={set("email")} placeholder="john@example.com" className="h-12 bg-muted/30 border-border/50 focus-visible:border-gold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Phone</Label>
                  <Input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98xxx xxxxx" className="h-12 bg-muted/30 border-border/50 focus-visible:border-gold" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Message</Label>
                <Textarea value={form.message} onChange={set("message")} placeholder="How can we help you?" className="min-h-[140px] resize-none bg-muted/30 border-border/50 focus-visible:border-gold" />
              </div>
              <Button type="submit" variant="gold" className="w-full h-14 text-sm tracking-widest uppercase mt-4" disabled={submitting}>
                {submitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Full Width Map Section */}
      <div className="mt-20 w-full h-[50vh] min-h-[400px] grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.835154378873!2d72.9037233!3d19.0709951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c62b66289b4f%3A0xc3bba30a21f7ed50!2sOne45%20Business%20Bay!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Saverra Realty Location Map"
        ></iframe>
      </div>
    </div>
  );
}
