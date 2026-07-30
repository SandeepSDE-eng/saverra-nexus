import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Building2, MessageSquare, LogOut, Webhook, BarChart3, Video, Palette, Briefcase, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading) return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;
  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center p-6 text-center">
        <div>
          <p className="eyebrow">Access denied</p>
          <h1 className="mt-2 font-display text-3xl text-primary">You're signed in, but not an admin.</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in with <code>admin@saverra.com</code> to manage projects.</p>
          <Button className="mt-4" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/themes", label: "Theme & Colors", icon: Palette },
    { href: "/admin/social", label: "Social Wall", icon: Share2 },
    { href: "/admin/rentals", label: "Rentals (Shorts)", icon: Video },
    { href: "/admin/projects", label: "Projects", icon: Building2 },
    { href: "/admin/floor-plans", label: "Floor Plans", icon: Building2 },
    { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
    { href: "/admin/careers", label: "Careers Enquiries", icon: Briefcase },
    { href: "/admin/integrations", label: "Integrations", icon: Webhook },
    { href: "/admin/marketing", label: "Marketing", icon: BarChart3 },
  ];

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  return (
    <div className="grid min-h-screen bg-secondary/40 md:grid-cols-[260px_1fr]">
      <aside className="border-r border-border bg-[color:var(--navy-deep)] p-6 text-white md:sticky md:top-0 md:h-screen">
        <Link to="/" className="flex items-center gap-3">
          <Logo hideText={true} variant="light" className="h-8 w-6" />
          <div className="leading-tight">
            <div className="font-display text-lg font-bold">SAVERRA</div>
            <div className="text-[9px] tracking-[0.28em] text-white/60">ADMIN PANEL</div>
          </div>
        </Link>
        <nav className="mt-10 flex flex-col gap-1">
          <div className="mb-2 flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs text-white/70">
            <LayoutDashboard className="size-4 text-gold" />
            <span className="truncate">{user.email}</span>
          </div>
          {nav.map((n) => {
            const active = path.startsWith(n.href);
            return (
              <Link key={n.href} to={n.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${active ? "bg-gold text-[color:var(--navy-deep)] font-semibold" : "text-white/80 hover:bg-white/10"}`}>
                <n.icon className="size-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={signOut} className="mt-8 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/70 hover:bg-white/10">
          <LogOut className="size-4" /> Sign out
        </button>
      </aside>
      <main className="p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
