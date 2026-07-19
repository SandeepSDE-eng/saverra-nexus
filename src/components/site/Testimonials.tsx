import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function Testimonials() {
  const { data = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").eq("is_published", true);
      if (error) throw error;
      return data;
    },
  });

  if (data.length === 0) return null;

  return (
    <section className="bg-secondary/50 py-20">
      <div className="container-luxe">
        <div className="mb-10 text-center">
          <p className="eyebrow">Customer Stories</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-primary sm:text-5xl">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.map((t) => (
            <div key={t.id} className="flex flex-col rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="flex text-gold">
                {Array.from({ length: t.rating ?? 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <p className="mt-4 flex-1 text-sm italic leading-relaxed text-foreground/80">"{t.message}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                {t.avatar_url && <img src={t.avatar_url} alt={t.name} className="size-11 rounded-full object-cover" />}
                <div>
                  <p className="font-semibold text-primary">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
