import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LiveChat } from "@/components/site/LiveChat";
import { Logo } from "@/components/site/Logo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-5xl text-foreground">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please try again or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SAVERRA — Premium Homes, Prime Locations, Promising Futures" },
      { name: "description", content: "SAVERRA is a premium real estate firm delivering luxury homes, commercial spaces and villa plots in India's most sought-after locations. RERA registered, 5000+ happy families." },
      { name: "author", content: "SAVERRA" },
      { name: "theme-color", content: "#0B3E78" },
      { property: "og:title", content: "SAVERRA — Premium Homes, Prime Locations, Promising Futures" },
      { property: "og:description", content: "SAVERRA is a premium real estate firm delivering luxury homes, commercial spaces and villa plots in India's most sought-after locations. RERA registered, 5000+ happy families." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SAVERRA — Premium Homes, Prime Locations, Promising Futures" },
      { name: "twitter:description", content: "SAVERRA is a premium real estate firm delivering luxury homes, commercial spaces and villa plots in India's most sought-after locations. RERA registered, 5000+ happy families." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "https://www.saverrarealty.com/favicon/apple-touch-icon-57x57.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Preloader() {
  const routerState = useRouterState();
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let shouldShow = false;

    try {
      if (typeof window !== "undefined" && routerState.location.pathname === "/") {
        const key = "saverra_preloader_v3_shown";
        const hasShown = sessionStorage.getItem(key);
        if (!hasShown) {
          shouldShow = true;
          sessionStorage.setItem(key, "true");
        }
      }
    } catch (e) {
      console.warn("Storage check warning:", e);
      if (routerState.location.pathname === "/") {
        shouldShow = true;
      }
    }

    if (shouldShow) {
      setShow(true);
      setRender(true);

      const progressTimer = setTimeout(() => {
        setProgress(100);
      }, 50);

      const timer1 = setTimeout(() => {
        setShow(false);
      }, 1800);

      const timer2 = setTimeout(() => {
        setRender(false);
      }, 2300);

      return () => {
        clearTimeout(progressTimer);
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setShow(false);
      setRender(false);
    }
  }, [routerState.location.pathname]);

  if (!render) return null;

  return (
    <div
      onClick={() => { setShow(false); setRender(false); }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0a1424] transition-opacity duration-700 ease-in-out cursor-pointer ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center px-6 text-center">
        {/* Animated Logo */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2"
          }`}
        >
          <Logo variant="dark" className="h-44 sm:h-60 aspect-[2/3] drop-shadow-2xl" />
        </div>

        {/* Progress Bar Container */}
        <div className="mt-10 w-56 sm:w-72 h-[3px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-gold/80 via-gold to-gold/90 transition-all duration-[1700ms] ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gold/90 animate-pulse">
          SAVERRA REALTY
        </p>
      </div>
    </div>
  );
}

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingActions } from "@/components/site/FloatingActions";
import { LeadPopup } from "@/components/site/LeadPopup";
import { GlobalPopup } from "@/components/site/GlobalPopup";
import { ThemeProvider } from "@/contexts/ThemeContext";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouterState();
  const isAppRoute = !routerState.location.pathname.startsWith('/admin') && !routerState.location.pathname.startsWith('/auth');

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Preloader />
        {isAppRoute ? (
          <div className="min-h-screen bg-background flex flex-col">
            <SiteHeader />
            <main className="flex-1">
              <Outlet />
            </main>
            <SiteFooter />
            <FloatingActions />
            <LeadPopup />
            <GlobalPopup />
          </div>
        ) : (
          <Outlet />
        )}
        <LiveChat />
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
