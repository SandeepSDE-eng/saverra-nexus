import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@saverra.com");
  const [password, setPassword] = useState("Saverra@2026");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/projects" });
    });
  }, [navigate]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
    navigate({ to: "/admin/projects" });
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/admin/projects` },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created — signing you in…");
    // Auto-confirm is enabled, so sign in right away
    const { error: e2 } = await supabase.auth.signInWithPassword({ email, password });
    if (e2) return toast.error(e2.message);
    navigate({ to: "/admin/projects" });
  };

  return (
    <div className="grid min-h-screen bg-background md:grid-cols-2">
      <div className="relative hidden md:block">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--navy-deep)]/90 to-[color:var(--navy)]/70" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-3">
            <Logo variant="light" className="w-24 h-16 md:w-32 md:h-20" />
          </Link>
          <div>
            <p className="eyebrow text-gold">Admin Portal</p>
            <h1 className="mt-3 font-display text-4xl font-bold">Manage your entire portfolio in one place.</h1>
            <p className="mt-3 max-w-md text-sm text-white/75">Add, edit, and publish projects. Track inquiries. Curate testimonials. All from a single, secure dashboard.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center justify-center md:hidden">
            <Logo className="w-24 h-16" />
          </Link>
          <h2 className="font-display text-3xl font-bold text-primary">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your SAVERRA admin account.</p>

          <div className="mt-4 rounded-md border border-gold/40 bg-gold/10 p-3 text-xs">
            <p className="font-semibold text-primary">Demo credentials</p>
            <p className="mt-1 text-foreground/80">
              Email: <code className="rounded bg-background/60 px-1">admin@saverra.com</code><br />
              Password: <code className="rounded bg-background/60 px-1">Saverra@2026</code>
            </p>
            <p className="mt-1 text-muted-foreground">First time? Use the <b>Create account</b> tab with the same credentials.</p>
          </div>

          <Tabs defaultValue="signin" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={signIn} className="mt-4 space-y-3">
                <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 h-11" /></div>
                <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 h-11" /></div>
                <Button type="submit" variant="default" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Signing in…" : "Sign in"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={signUp} className="mt-4 space-y-3">
                <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 h-11" /></div>
                <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="mt-1 h-11" /></div>
                <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Creating…" : "Create account"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Using <code>admin@saverra.com</code> auto-grants admin access.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
