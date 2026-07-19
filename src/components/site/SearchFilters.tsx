import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CITIES = ["All Cities", "Mumbai", "Bengaluru", "Gurugram", "Pune", "Hyderabad", "Chennai"];
const TYPES = ["All Types", "Apartment", "Villa", "Commercial", "Plot", "Penthouse"];
const BUDGETS = ["All Budgets", "Under ₹1 Cr", "₹1 – 2 Cr", "₹2 – 5 Cr", "₹5 Cr+"];
const BHKS = ["Any BHK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
const POSSESSIONS = ["Any Possession", "Ready to Move", "2025", "2026", "2027+"];

export function SearchFilters() {
  const [values, setValues] = useState({
    city: CITIES[0], type: TYPES[0], budget: BUDGETS[0], bhk: BHKS[0], possession: POSSESSIONS[0],
  });

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const field = (label: string, list: string[], key: keyof typeof values) => (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</label>
      <Select value={values[key]} onValueChange={(v) => setValues((s) => ({ ...s, [key]: v }))}>
        <SelectTrigger className="h-11 border-border/70 bg-background text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {list.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="glass-card rounded-xl p-4 shadow-luxury sm:p-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        <div className="col-span-2 md:col-span-1">{field("City", CITIES, "city")}</div>
        <div className="col-span-2 md:col-span-1">{field("Property Type", TYPES, "type")}</div>
        <div className="col-span-2 md:col-span-1">{field("Budget", BUDGETS, "budget")}</div>
        <div>{field("BHK", BHKS, "bhk")}</div>
        <div>{field("Possession", POSSESSIONS, "possession")}</div>
        <Button
          onClick={scrollToProjects}
          className="mt-auto h-11 w-full"
          variant="navy"
        >
          <Search className="size-4" /> Search Properties
        </Button>
      </div>
    </div>
  );
}
