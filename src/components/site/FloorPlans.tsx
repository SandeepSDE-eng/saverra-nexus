import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const PLANS = [
  { key: "1bhk", label: "1 BHK", area: "620 Sq.Ft", features: ["Living Room", "1 Bedroom", "Modular Kitchen", "Balcony"] },
  { key: "2bhk", label: "2 BHK", area: "850 Sq.Ft", features: ["Spacious Living Room", "2 Bedrooms", "Modular Kitchen", "2 Bathrooms", "Balcony"] },
  { key: "3bhk", label: "3 BHK", area: "1350 Sq.Ft", features: ["Grand Living Room", "3 Bedrooms", "Chef's Kitchen", "3 Bathrooms", "Utility"] },
  { key: "4bhk", label: "4 BHK", area: "2200 Sq.Ft", features: ["Duplex Layout", "4 Bedrooms", "Chef's Kitchen", "4 Bathrooms", "Sky Deck"] },
  { key: "pent", label: "Penthouse", area: "4500 Sq.Ft", features: ["Duplex", "5 Bedrooms", "Private Terrace Pool", "Wine Cellar", "Home Theatre"] },
];

export function FloorPlans() {
  return (
    <section id="floorplans" className="py-20">
      <div className="container-luxe">
        <div className="mb-10 text-center">
          <p className="eyebrow">Floor Plans</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-primary sm:text-5xl">
            Smartly Designed For Modern Living
          </h2>
        </div>
        <Tabs defaultValue="2bhk" className="w-full">
          <TabsList className="mx-auto mb-8 flex h-auto w-fit flex-wrap justify-center bg-secondary p-1">
            {PLANS.map((p) => (
              <TabsTrigger key={p.key} value={p.key} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {PLANS.map((p) => (
            <TabsContent key={p.key} value={p.key} className="grid gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-border/60 bg-card p-4">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                  alt={`${p.label} floor plan`}
                  className="aspect-[4/3] w-full rounded-lg object-cover opacity-90"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="eyebrow">{p.label} Premium</div>
                <h3 className="mt-2 font-display text-3xl font-bold text-primary">{p.area} Carpet Area</h3>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="grid size-6 place-items-center rounded-full bg-gold/20 text-[color:var(--gold-foreground)]">✓</span>
                      <span className="text-sm text-foreground/85">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex gap-3">
                  <Button variant="default"><a href="#contact">View Plan</a></Button>
                  <Button variant="outline"><Download className="size-4" /> Download PDF</Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
