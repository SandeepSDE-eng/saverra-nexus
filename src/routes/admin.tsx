import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  LogOut,
  Webhook,
  BarChart3,
  Video,
  Palette,
  Briefcase,
  Share2,
  BookOpen,
  Menu,
  X,
  Layers,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  // Close mobile drawer on path change
  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

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
    { href: "/admin/ai-studio", label: "AI Video Studio", icon: Video },
    { href: "/admin/guide", label: "Website Guide & Manual", icon: BookOpen },
    { href: "/admin/themes", label: "Theme & Colors", icon: Palette },
    { href: "/admin/announcements", label: "Announcements", icon: Share2 },
    { href: "/admin/social", label: "Social Wall", icon: Share2 },
    { href: "/admin/rentals", label: "Rentals (Shorts)", icon: Video },
    { href: "/admin/projects", label: "Projects Catalog", icon: Building2 },
    { href: "/admin/floor-plans", label: "Floor Plans", icon: Layers },
    { href: "/admin/inquiries", label: "Inquiries & Leads", icon: MessageSquare },
    { href: "/admin/careers", label: "Careers Enquiries", icon: Briefcase },
    { href: "/admin/integrations", label: "Integrations", icon: Webhook },
    { href: "/admin/marketing", label: "Marketing Analytics", icon: BarChart3 },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return path === "/admin" || path === "/admin/";
    return path.startsWith(href);
  };

  const currentNav = nav.find((n) => isActive(n.href)) || nav[0];

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen bg-secondary/30 text-foreground flex-col md:flex-row">
      {/* Mobile Top Navigation Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-[color:var(--navy-deep)] px-4 py-3 text-white md:hidden shadow-md">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo hideText={true} variant="light" className="h-7 w-5" />
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">SAVERRA</div>
            <div className="text-[8px] tracking-[0.25em] text-gold uppercase font-semibold">Admin Panel</div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-white/20 text-white/90 text-[10px] px-2 py-0.5 max-w-[120px] truncate">
            {currentNav.label}
          </Badge>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white hover:bg-white/10 size-8"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative flex w-[280px] max-w-[85vw] flex-col bg-[color:var(--navy-deep)] text-white p-5 shadow-2xl z-50 h-full overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <Link to="/" className="flex items-center gap-2.5">
                <Logo hideText={true} variant="light" className="h-7 w-5" />
                <div>
                  <div className="font-display text-base font-bold">SAVERRA</div>
                  <div className="text-[8px] tracking-[0.25em] text-gold font-semibold">ADMIN PANEL</div>
                </div>
              </Link>
              <Button size="icon" variant="ghost" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white size-8">
                <X className="size-4" />
              </Button>
            </div>

            <div className="mb-4 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs text-white/90 border border-white/10">
              <LayoutDashboard className="size-3.5 text-gold shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {nav.map((n) => {
                const active = isActive(n.href);
                return (
                  <Link
                    key={n.href}
                    to={n.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                      active
                        ? "bg-gold text-[color:var(--navy-deep)] font-bold shadow-md"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <n.icon className="size-4 shrink-0" />
                      <span>{n.label}</span>
                    </div>
                    {active && <ChevronRight className="size-3.5" />}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-white/10 mt-4">
              <button
                onClick={signOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-red-300 hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="size-4" /> Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Sticky, Heights-adapted & Scrollable) */}
      <aside className="hidden md:flex md:w-[260px] md:flex-col md:sticky md:top-0 md:h-screen border-r border-border bg-[color:var(--navy-deep)] text-white shrink-0 overflow-hidden shadow-md">
        <div className="flex flex-col h-full p-4 justify-between overflow-y-auto">
          <div>
            {/* Logo Banner */}
            <Link to="/" className="flex items-center gap-3 px-2 py-1 mb-5">
              <Logo hideText={true} variant="light" className="h-8 w-6" />
              <div className="leading-tight">
                <div className="font-display text-lg font-bold tracking-tight text-white">SAVERRA</div>
                <div className="text-[9px] tracking-[0.28em] text-gold font-semibold">ADMIN PANEL</div>
              </div>
            </Link>

            {/* User Pill */}
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs text-white/90 border border-white/10">
              <LayoutDashboard className="size-3.5 text-gold shrink-0" />
              <span className="truncate font-medium">{user.email}</span>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-1">
              {nav.map((n) => {
                const active = isActive(n.href);
                return (
                  <Link
                    key={n.href}
                    to={n.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs md:text-sm font-medium transition-all ${
                      active
                        ? "bg-gold text-[color:var(--navy-deep)] font-bold shadow-md"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <n.icon className="size-4 shrink-0" />
                    <span className="truncate">{n.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Sign Out */}
          <div className="pt-4 border-t border-white/10 mt-4 shrink-0">
            <button
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-colors"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-x-auto p-4 sm:p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
