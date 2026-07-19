import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmiCalculator() {
  const [price, setPrice] = useState(10000000);
  const [down, setDown] = useState(2000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, totalPayable, totalInterest, principal } = useMemo(() => {
    const p = Math.max(price - down, 0);
    const r = rate / 12 / 100;
    const n = years * 12;
    const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return { emi, totalPayable: total, totalInterest: total - p, principal: p };
  }, [price, down, rate, years]);

  const fmt = (n: number) =>
    "₹ " + Math.round(n).toLocaleString("en-IN");

  return (
    <section id="emi" className="py-20">
      <div className="container-luxe">
        <div className="mb-10 text-center">
          <p className="eyebrow">Financing Made Simple</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-primary sm:text-5xl">
            EMI Calculator
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Plan your dream home purchase with ease.</p>
        </div>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-border/60 shadow-luxury md:grid-cols-5">
          <div className="space-y-5 bg-card p-8 md:col-span-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Property Price</Label>
              <Input type="number" value={price} onChange={(e) => setPrice(+e.target.value || 0)} className="mt-1 h-11 text-lg font-semibold" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Down Payment</Label>
              <Input type="number" value={down} onChange={(e) => setDown(+e.target.value || 0)} className="mt-1 h-11 text-lg font-semibold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Interest Rate (% p.a.)</Label>
                <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value || 0)} className="mt-1 h-11 text-lg font-semibold" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Loan Tenure (Years)</Label>
                <Input type="number" value={years} onChange={(e) => setYears(+e.target.value || 0)} className="mt-1 h-11 text-lg font-semibold" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 bg-[color:var(--navy-deep)] p-8 text-white md:col-span-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/60">Your EMI</p>
              <p className="font-display text-4xl font-bold text-gold">{fmt(emi)}<span className="text-base">/mo</span></p>
            </div>
            <div className="space-y-2 border-t border-white/15 pt-4 text-sm">
              <div className="flex justify-between"><span className="text-white/70">Principal</span><span className="font-semibold">{fmt(principal)}</span></div>
              <div className="flex justify-between"><span className="text-white/70">Total Interest</span><span className="font-semibold">{fmt(totalInterest)}</span></div>
              <div className="flex justify-between border-t border-white/10 pt-2"><span className="text-white/70">Total Payable</span><span className="font-semibold text-gold">{fmt(totalPayable)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
