import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "@/contexts/ThemeContext";
import { Palette, Check } from "lucide-react";

export const Route = createFileRoute("/admin/themes")({
  component: ThemeSettings,
});

function ThemeSettings() {
  const { activeTheme, setTheme, themes } = useTheme();

  return (
    <div className="animate-fade-in max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Theme & Colors</h1>
          <p className="mt-2 text-muted-foreground">
            Instantly change the website's color palette. The changes apply globally in real-time.
          </p>
        </div>
        <div className="grid size-12 place-items-center rounded-full bg-gold/10 text-gold">
          <Palette className="size-6" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => {
          const isActive = activeTheme.id === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className={`relative flex flex-col rounded-xl border p-5 text-left transition-all duration-300 hover:shadow-lg ${
                isActive 
                  ? "border-gold bg-gold/5 shadow-md scale-[1.02]" 
                  : "border-border bg-card hover:border-gold/50"
              }`}
            >
              {isActive && (
                <div className="absolute top-4 right-4 grid size-6 place-items-center rounded-full bg-gold text-[color:var(--navy-deep)]">
                  <Check className="size-3.5 stroke-[3]" />
                </div>
              )}
              
              <div className="flex gap-3 mb-4">
                <div 
                  className="size-12 rounded-full shadow-inner border border-black/10" 
                  style={{ backgroundColor: theme.primary }} 
                />
                <div 
                  className="size-12 rounded-full shadow-inner border border-black/10 -ml-6" 
                  style={{ backgroundColor: theme.accent }} 
                />
              </div>
              
              <h3 className="font-display text-lg font-semibold text-foreground">{theme.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{theme.description}</p>
            </button>
          );
        })}
      </div>
      
      <div className="mt-12 rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Live Preview Setup</h3>
        <p className="text-sm text-muted-foreground mb-6">
          The colors selected above instantly update the CSS variables <code>--navy-deep</code> and <code>--gold</code>.
          You can navigate to the public pages of the website to see the changes applied everywhere.
        </p>
        
        <div className="flex gap-4">
          <button className="rounded bg-[color:var(--navy-deep)] px-6 py-2.5 text-sm font-medium text-white transition-colors">
            Primary Button
          </button>
          <button className="rounded border border-[color:var(--navy-deep)] bg-transparent px-6 py-2.5 text-sm font-medium text-[color:var(--navy-deep)] transition-colors">
            Outline Button
          </button>
          <button className="rounded bg-gold px-6 py-2.5 text-sm font-medium text-[color:var(--navy-deep)] transition-colors">
            Accent Button
          </button>
        </div>
      </div>
    </div>
  );
}
