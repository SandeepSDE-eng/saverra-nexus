import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, DollarSign, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function EmiCalculator() {
  const [price, setPrice] = useState(25000000); // 2.5 Cr default
  const [down, setDown] = useState(5000000);    // 50 Lakh default
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, totalPayable, totalInterest, principal, expectedAppreciation } = useMemo(() => {
    const p = Math.max(price - down, 0);
    const r = rate / 12 / 100;
    const n = years * 12;
    const emiVal = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emiVal * n;
    
    // Estimate 5-Year Property Value at ~8% Annual CAGR
    const appreciation = price * Math.pow(1 + 0.08, 5);

    return { 
      emi: emiVal, 
      totalPayable: total, 
      totalInterest: Math.max(total - p, 0), 
      principal: p,
      expectedAppreciation
    };
  }, [price, down, rate, years]);

  const fmt = (n: number) =>
    "₹ " + Math.round(n).toLocaleString("en-IN");

  return (
    <section id="emi" className="py-24 bg-[#040e1d] text-white relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#d4af37]/5 blur-[150px] pointer-events-none" />

      <div className="container-luxe relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#08182f] border border-[#d4af37]/30 text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
            <Calculator className="size-3.5" /> WEALTH ADVISORY TOOLS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Portfolio Return & <span className="bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] bg-clip-text text-transparent">Mortgage Planner</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            Evaluate your investment leverage, monthly mortgage commitment, and projected capital appreciation across luxury Indian real estate.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-[#08182f]/80 backdrop-blur-xl shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] md:grid-cols-12">
          
          {/* Controls Column (7 Cols) */}
          <div className="p-8 lg:p-10 space-y-6 md:col-span-7 text-left border-b md:border-b-0 md:border-r border-white/10">
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label className="text-xs uppercase font-bold tracking-wider text-[#d4af37]">Estimated Property Value (INR)</Label>
                <span className="text-sm font-bold text-white">{fmt(price)}</span>
              </div>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(+e.target.value || 0)}
                className="h-12 bg-black/40 border-white/10 text-lg font-bold text-white focus:border-[#d4af37]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <Label className="text-xs uppercase font-bold tracking-wider text-[#d4af37]">Down Payment Amount</Label>
                <span className="text-sm font-bold text-slate-300">{fmt(down)}</span>
              </div>
              <Input
                type="number"
                value={down}
                onChange={(e) => setDown(+e.target.value || 0)}
                className="h-12 bg-black/40 border-white/10 text-lg font-bold text-white focus:border-[#d4af37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs uppercase font-bold tracking-wider text-[#d4af37]">Interest Rate (% p.a.)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(+e.target.value || 0)}
                  className="mt-1 h-12 bg-black/40 border-white/10 text-lg font-bold text-white focus:border-[#d4af37]"
                />
              </div>
              <div>
                <Label className="text-xs uppercase font-bold tracking-wider text-[#d4af37]">Tenure (Years)</Label>
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(+e.target.value || 0)}
                  className="mt-1 h-12 bg-black/40 border-white/10 text-lg font-bold text-white focus:border-[#d4af37]"
                />
              </div>
            </div>
          </div>

          {/* Results Column (5 Cols) */}
          <div className="p-8 lg:p-10 bg-gradient-to-br from-[#06152b] to-[#040e1d] flex flex-col justify-between space-y-6 md:col-span-5 text-left">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Monthly Mortgage Commitment</span>
                <p className="font-display text-4xl font-bold bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] bg-clip-text text-transparent mt-1">
                  {fmt(emi)}<span className="text-sm font-sans text-slate-300"> / mo</span>
                </p>
              </div>

              <div className="space-y-2.5 border-t border-white/10 pt-4 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Net Loan Principal</span>
                  <span className="font-bold text-white">{fmt(principal)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Interest Payable</span>
                  <span className="font-bold text-white">{fmt(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-slate-300 border-t border-white/10 pt-2">
                  <span>Total Outflow</span>
                  <span className="font-bold text-[#d4af37]">{fmt(totalPayable)}</span>
                </div>
              </div>

              {/* 5-Yr Appreciation Forecast Box */}
              <div className="p-4 rounded-xl bg-[#08182f] border border-[#d4af37]/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#d4af37] font-bold">
                  <TrendingUp className="size-4" />
                  <span>5-Yr Portfolio Forecast</span>
                </div>
                <p className="font-display text-xl font-bold text-white">{fmt(expectedAppreciation)}</p>
                <span className="block text-[10px] text-slate-400">Based on historical ~8% CAGR luxury appreciation</span>
              </div>
            </div>

            <Button
              asChild
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#f3e5ad] via-[#d4af37] to-[#aa820a] text-slate-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <Link to="/financing" className="flex items-center justify-center gap-2">
                <span>Apply For Luxury Mortgage</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
