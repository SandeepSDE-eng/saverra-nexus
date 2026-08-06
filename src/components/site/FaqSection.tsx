import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = [
  { q: "How do I book a site visit?", a: "You can schedule a site visit by clicking the 'Schedule Site Visit' button on any page, filling out the contact form, or calling us directly at +91 98765 43210." },
  { q: "What documents are required for booking?", a: "Basic KYC documents (PAN, Aadhaar), 2 passport-size photos, and a signed booking form. For NRIs, an additional NRE/NRO account statement is required." },
  { q: "Do you provide home loan assistance?", a: "Yes. We are empanelled with 20+ leading banks and NBFCs and our team helps you get pre-approved home loans at the best interest rates." },
  { q: "What types of properties do you specialize in?", a: "We provide advisory and transaction services for residential, commercial, retail, office spaces, land, and investment properties." },
  { q: "Can you help identify high-growth investment opportunities?", a: "Yes. We leverage in-depth market insights and location analysis to recommend properties with strong growth potential and attractive long-term returns" },
  { q: "Why should I choose Saverra Realty?", a: "We combine market expertise, transparent advice, strong negotiation skills, and end-to-end support to ensure every real estate decision is informed, seamless, and rewarding" },
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
