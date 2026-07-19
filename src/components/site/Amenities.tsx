import { Waves, Dumbbell, Trees, ShieldCheck, Baby, Zap, HeartHandshake, Gamepad2, LandPlot, Building2 } from "lucide-react";

const items = [
  { icon: Waves, name: "Swimming Pool" },
  { icon: Building2, name: "Club House" },
  { icon: Dumbbell, name: "Gymnasium" },
  { icon: Trees, name: "Landscaped Garden" },
  { icon: ShieldCheck, name: "24/7 Security" },
  { icon: Baby, name: "Kids Play Area" },
  { icon: Zap, name: "EV Charging" },
  { icon: HeartHandshake, name: "Yoga Deck" },
  { icon: Gamepad2, name: "Indoor Games" },
  { icon: LandPlot, name: "Multipurpose Hall" },
];

export function Amenities() {
  return (
    <section id="amenities" className="bg-secondary/50 py-20">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">World-Class Amenities</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-primary sm:text-5xl">
            A Lifestyle Beyond Compare
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Every SAVERRA residence is crafted with amenities that transform daily living into an experience.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {items.map((a) => (
            <div key={a.name} className="group flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-card">
              <div className="grid size-14 place-items-center rounded-full bg-primary/5 text-primary transition-colors group-hover:bg-gold group-hover:text-[color:var(--navy-deep)]">
                <a.icon className="size-6" />
              </div>
              <p className="text-xs font-semibold text-foreground/80">{a.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
