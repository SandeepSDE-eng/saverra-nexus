import { createFileRoute } from "@tanstack/react-router";
import { FileText, AlertCircle, ShieldAlert, Gavel } from "lucide-react";

export const Route = createFileRoute("/terms")({ component: TermsConditions });

function TermsConditions() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-32">
      {/* Top Banner */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?auto=format&fit=crop&w=1600&q=75')] bg-cover bg-center opacity-10 filter grayscale"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl font-light tracking-wide mb-4">
            Terms & <span className="text-gold italic font-medium">Conditions</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light tracking-wide text-sm md:text-base">
            Please read these terms carefully before using our digital platform and services.
          </p>
        </div>
      </div>

      <div className="container-luxe max-w-4xl mx-auto -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-border/50 p-8 md:p-12 lg:p-16">
          <div className="prose prose-slate max-w-none text-muted-foreground space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="size-5 text-gold" />
                <h3 className="text-xl md:text-2xl font-display font-medium text-primary m-0">1. Acceptance of Terms</h3>
              </div>
              <p className="leading-relaxed">
                Welcome to Saverra Realty. By accessing, browsing, or using our website and services, you acknowledge that you have read, understood, and agree to comply with and be bound by these Terms & Conditions. If you disagree with any part of these terms, please do not use our website.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="size-5 text-gold" />
                <h3 className="text-xl md:text-2xl font-display font-medium text-primary m-0">2. Real Estate Information & Disclaimer</h3>
              </div>
              <p className="leading-relaxed">
                The property information, pricing, floor plans, and availability displayed on this website are indicative and subject to change without prior notice. All details provided are for informational purposes only and do not constitute a legal offer or a binding contract. 
              </p>
              <p className="leading-relaxed mt-2">
                While we strive to provide accurate and up-to-date information, Saverra Realty makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information, products, services, or related graphics contained on the website.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="size-5 text-gold" />
                <h3 className="text-xl md:text-2xl font-display font-medium text-primary m-0">3. Intellectual Property Rights</h3>
              </div>
              <p className="leading-relaxed">
                Unless otherwise stated, Saverra Realty and/or its licensors own the intellectual property rights in the website and all materials published on it, including but not limited to text, graphics, logos, images, and software. You may not reproduce, distribute, or create derivative works from our content without explicit written permission.
              </p>
            </section>

            <section className="bg-[#f8f9fa] p-6 rounded-xl border border-border mt-8">
              <h3 className="text-lg font-display font-medium text-primary mb-2">4. Limitation of Liability</h3>
              <p className="text-sm leading-relaxed mb-0">
                In no event will Saverra Realty, its directors, employees, or partners be liable for any direct, indirect, special, or consequential loss or damage arising out of or in connection with the use of this website, reliance on the information provided, or the inability to use our services.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
