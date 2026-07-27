import { createFileRoute } from "@tanstack/react-router";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export const Route = createFileRoute("/privacy")({ component: PrivacyPolicy });

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-32">
      {/* Top Banner */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?auto=format&fit=crop&w=1600&q=75')] bg-cover bg-center opacity-10 filter grayscale"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl font-light tracking-wide mb-4">
            Privacy <span className="text-gold italic font-medium">Policy</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light tracking-wide text-sm md:text-base">
            Your trust is our top priority. Learn how we protect your personal information.
          </p>
        </div>
      </div>

      <div className="container-luxe max-w-4xl mx-auto -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-border/50 p-8 md:p-12 lg:p-16">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
            <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-gold">
              <Shield className="size-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Last Updated</p>
              <p className="font-medium text-primary">July 27, 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-muted-foreground space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="size-5 text-gold" />
                <h3 className="text-xl md:text-2xl font-display font-medium text-primary m-0">1. Information We Collect</h3>
              </div>
              <p className="leading-relaxed">
                At Saverra Realty, we collect information that you provide directly to us. This includes, but is not limited to, your name, email address, phone number, and any other details you choose to share when filling out inquiry forms, subscribing to our newsletters, or communicating with our consultants. We may also collect automated data such as IP addresses and browsing behavior to enhance your website experience.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="size-5 text-gold" />
                <h3 className="text-xl md:text-2xl font-display font-medium text-primary m-0">2. How We Use Your Information</h3>
              </div>
              <p className="leading-relaxed">
                The information we collect is strictly used to provide, maintain, and improve our luxury real estate services. Specifically, we use your data to:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Personalize your property recommendations based on your preferences.</li>
                <li>Communicate with you regarding site visits, new launches, and exclusive offers.</li>
                <li>Analyze website traffic and optimize our digital marketing efforts.</li>
                <li>Ensure compliance with RERA and other legal regulations.</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="size-5 text-gold" />
                <h3 className="text-xl md:text-2xl font-display font-medium text-primary m-0">3. Data Security</h3>
              </div>
              <p className="leading-relaxed">
                We implement state-of-the-art technical and organizational measures to maintain the safety of your personal information. Your data is stored on secure servers with restricted access. While we strive to use commercially acceptable means to protect your personal information, please note that no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="bg-[#f8f9fa] p-6 rounded-xl border border-border mt-8">
              <h3 className="text-lg font-display font-medium text-primary mb-2">4. Contact Us for Privacy Concerns</h3>
              <p className="text-sm leading-relaxed mb-0">
                If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please reach out to our compliance team at <strong>privacy@saverra.com</strong> or call us at <strong>+91 98765 43210</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
