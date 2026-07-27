import { LineChart, Briefcase, Search, HeadphonesIcon, ShieldCheck, Handshake } from "lucide-react";

const items = [
  { icon: Briefcase, k: "Strategic", v: "Advisory" },
  { icon: Search, k: "Curated", v: "Portfolio" },
  { icon: LineChart, k: "Market", v: "Intelligence" },
  { icon: HeadphonesIcon, k: "End-to-End", v: "Support" },
  { icon: ShieldCheck, k: "Transparent", v: "Dealings" },
  { icon: Handshake, k: "Expert", v: "Negotiation" },
];

export function StatsBar() {
  return (
    <section className="relative overflow-hidden py-14">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80')" }}
      />
      <div className="container-luxe relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((it) => (
          <div key={it.v} className="group rounded-xl border border-border/60 bg-card p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-card">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-gold/15 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
              <it.icon className="size-5" />
            </div>
            <div className="mt-3 font-display text-xl font-bold text-primary">{it.k}</div>
            <div className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">{it.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
