import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = [
  { q: "Are SAVERRA properties RERA approved?", a: "Yes, every SAVERRA project is fully RERA registered. RERA numbers are displayed on every project page, and all documentation is verified by our in-house legal team." },
  { q: "How do I book a site visit?", a: "You can schedule a site visit by clicking the 'Schedule Site Visit' button on any page, filling out the contact form, or calling us directly at +91 98765 43210." },
  { q: "What documents are required for booking?", a: "Basic KYC documents (PAN, Aadhaar), 2 passport-size photos, and a signed booking form. For NRIs, an additional NRE/NRO account statement is required." },
  { q: "Do you provide home loan assistance?", a: "Yes. We are empanelled with 20+ leading banks and NBFCs and our team helps you get pre-approved home loans at the best interest rates." },
  { q: "Can I get a customized floor plan?", a: "Absolutely. For premium villas and penthouses, we offer bespoke customization for interiors, lighting, and layout." },
  { q: "What is the payment schedule?", a: "Standard construction-linked plan with milestone-based payments. Subvention schemes and flexible payment plans are also available." },
  { q: "Are there any hidden charges?", a: "No. SAVERRA follows a 100% transparent pricing policy — every charge, tax and stamp duty is disclosed upfront in the cost sheet." },
  { q: "Do you handle registration and legal work?", a: "Yes, our legal desk assists you end-to-end with agreement drafting, stamp duty, and sub-registrar registration." },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="container-luxe grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-2 font-display text-4xl font-light tracking-wide text-primary sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Answers to the questions our homebuyers ask most often. Can't find what you're looking for?
            <a href="#contact" className="ml-1 font-medium text-primary underline-offset-4 hover:underline">Get in touch</a>.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
