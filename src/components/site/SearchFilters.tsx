import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CITIES = ["All Cities", "Mumbai", "Bengaluru", "Gurugram", "Pune", "Hyderabad", "Chennai"];
const TYPES = ["All Types", "Apartment", "Villa", "Commercial", "Plot", "Penthouse"];
const BUDGETS = ["All Budgets", "Under ₹1 Cr", "₹1 – 2 Cr", "₹2 – 5 Cr", "₹5 Cr+"];
const BHKS = ["Any BHK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
const POSSESSIONS = ["Any Possession", "Ready to Move", "2025", "2026", "2027+"];

export function SearchFilters() {
  const [mode, setMode] = useState<"standard" | "ai">("ai");
  const [aiQuery, setAiQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [values, setValues] = useState({
    city: CITIES[0], type: TYPES[0], budget: BUDGETS[0], bhk: BHKS[0], possession: POSSESSIONS[0],
  });

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAiSearch = () => {
    if (!aiQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      scrollToProjects();
    }, 1500);
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
    <div className="glass-card rounded-xl shadow-luxury overflow-hidden">
      <div className="flex border-b border-border/50 bg-muted/20">
        <button 
          onClick={() => setMode("ai")} 
          className={`flex-1 py-3 text-sm font-semibold transition-colors flex justify-center items-center gap-2 ${mode === "ai" ? "bg-purple-500/10 text-purple-600 border-b-2 border-purple-500" : "text-muted-foreground hover:bg-muted/50"}`}
        >
          <Sparkles className="size-4" /> AI Magic Search
        </button>
        <button 
          onClick={() => setMode("standard")} 
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${mode === "standard" ? "bg-background text-primary border-b-2 border-primary" : "text-muted-foreground hover:bg-muted/50"}`}
        >
          Standard Filters
        </button>
      </div>

      <div className="p-4 sm:p-6">
        {mode === "standard" ? (
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
        ) : (
          <div className="flex flex-col md:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground block mb-1.5 flex items-center gap-1.5"><Sparkles className="size-3 text-purple-500" /> Tell our AI what you want</label>
              <Input 
                value={aiQuery} 
                onChange={(e) => setAiQuery(e.target.value)} 
                placeholder="E.g., I want a 3BHK in Ghatkopar East under 3.5 Cr..." 
                className="h-12 bg-background border-purple-200 focus-visible:ring-purple-500 text-base"
                onKeyDown={(e) => e.key === "Enter" && handleAiSearch()}
              />
            </div>
            <Button
              onClick={handleAiSearch}
              disabled={isSearching || !aiQuery.trim()}
              className="h-12 w-full md:w-auto px-8 bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSearching ? (
                <><Sparkles className="size-4 animate-spin mr-2" /> Searching...</>
              ) : (
                <><Sparkles className="size-4 mr-2" /> Magic Search</>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
