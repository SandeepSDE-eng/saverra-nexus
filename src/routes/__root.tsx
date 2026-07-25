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
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
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
  const [show, setShow] = useState(true);
  const [render, setRender] = useState(true);

  useEffect(() => {
    // Only show on home page and only once per session
    if (routerState.location.pathname === "/" && !sessionStorage.getItem("saverra_preloader_shown")) {
      setShow(true);
      setRender(true);
      sessionStorage.setItem("saverra_preloader_shown", "true");

      // Hide animation after 2.0s, unmount after 2.8s
      const timer1 = setTimeout(() => setShow(false), 2000);
      const timer2 = setTimeout(() => setRender(false), 2800);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    } else {
      setShow(false);
      setRender(false);
    }
  }, [routerState.location.pathname]);

  if (!render) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#f8fafc] transition-transform duration-[800ms] ease-in-out ${show ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="relative flex flex-col items-center justify-center">
        {/* Logo Mark */}
        <div className={`relative z-10 flex flex-col items-center justify-center transition-all duration-1000 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="mb-4">
            <svg
              viewBox="0 0 100 150"
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-28 md:w-24 md:h-36"
            >
              {/* Top half of S */}
              <path d="M 90,10 L 10,10 L 10,70 L 90,70" fill="none" stroke="#023b6d" strokeWidth="10" strokeLinejoin="miter" />
              <path d="M 35,20 L 35,60" fill="none" stroke="#023b6d" strokeWidth="10" />
              <path d="M 65,20 L 65,60" fill="none" stroke="#023b6d" strokeWidth="10" />
              {/* Bottom half of S */}
              <path d="M 10,70 L 90,70 L 90,140 L 10,140" fill="none" stroke="#023b6d" strokeWidth="10" strokeLinejoin="miter" />
              <path d="M 35,80 L 35,130" fill="none" stroke="#023b6d" strokeWidth="10" />
              <path d="M 65,80 L 65,130" fill="none" stroke="#023b6d" strokeWidth="10" />
            </svg>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#023b6d] tracking-[0.2em] mb-2">
            SAVERRA
          </h1>
          <p className="text-[#023b6d]/80 tracking-widest uppercase text-sm md:text-base font-medium">
            A Real Estate Firm
          </p>
        </div>
        
        {/* Loading Bar */}
        <div className="mt-12 w-48 h-[2px] bg-slate-200 rounded-full overflow-hidden">
           <div className={`h-full bg-gold transition-all duration-[2000ms] ease-out ${show ? 'w-full' : 'w-0'}`} />
        </div>
      </div>
    </div>
  );
}

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingActions } from "@/components/site/FloatingActions";
import { LeadPopup } from "@/components/site/LeadPopup";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouterState();
  const isAppRoute = !routerState.location.pathname.startsWith('/admin') && !routerState.location.pathname.startsWith('/auth');

  return (
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
        </div>
      ) : (
        <Outlet />
      )}
      <LiveChat />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
