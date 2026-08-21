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
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname.toLowerCase();
      if (pathname.endsWith(".php")) {
        const cleanName = pathname.replace(/^\/+|\.php$/g, "");
        if (cleanName === "about") {
          window.location.replace("/about");
          return;
        }
        if (cleanName === "contact") {
          window.location.replace("/contact");
          return;
        }
        if (cleanName === "social-gallery" || cleanName === "social-wall") {
          window.location.replace("/social-wall");
          return;
        }
        if (cleanName.includes("f-residences") || cleanName.includes("rising-city")) {
          window.location.replace("/projects");
          return;
        }
        window.location.replace("/projects");
      }
    }
  }, []);

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
      { title: "SAVERRA Realty — Best Property Consultant & Real Estate Agent in Ghatkopar East, Mumbai" },
      { name: "description", content: "SAVERRA Realty is the top RERA registered real estate consultant in Ghatkopar East, Mumbai. Buy luxury 1, 2, 3 BHK flats, commercial offices & premium properties in Ghatkopar, Chembur & Central Mumbai." },
      { name: "keywords", content: "Best Property Consultant in Ghatkopar East, Real Estate Agent in Ghatkopar East, Property Dealer Ghatkopar, Luxury Flats for Sale Ghatkopar East, Commercial Property Ghatkopar, RERA Registered Broker Ghatkopar, Real Estate Firm Mumbai, SAVERRA Realty" },
      { name: "author", content: "SAVERRA Realty" },
      { name: "geo.region", content: "IN-MH" },
      { name: "geo.placename", content: "Ghatkopar East, Mumbai" },
      { name: "geo.position", content: "19.0860;72.9090" },
      { name: "ICBM", content: "19.0860, 72.9090" },
      { name: "theme-color", content: "#0B3E78" },
      { property: "og:title", content: "SAVERRA Realty — Best Property Consultant & Real Estate Agent in Ghatkopar East" },
      { property: "og:description", content: "Top RERA registered real estate firm in Ghatkopar East, Mumbai. Premium residential flats, commercial properties, and luxury real estate advisory." },
      { property: "og:image", content: "https://saverrarealty.com/og-image.png" },
      { property: "og:url", content: "https://saverrarealty.com" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SAVERRA Realty — Best Property Consultant in Ghatkopar East" },
      { name: "twitter:description", content: "Top RERA registered real estate firm in Ghatkopar East, Mumbai." },
      { name: "twitter:image", content: "https://saverrarealty.com/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", href: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { rel: "icon", href: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { rel: "icon", href: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
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
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "SAVERRA Realty",
    "image": "https://saverrarealty.com/logo.png",
    "@id": "https://saverrarealty.com/#organization",
    "url": "https://saverrarealty.com",
    "telephone": "+918691866691",
    "email": "info@saverrarealty.com",
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "One45 Business Bay, 1205, Vallabh Baug Ln Ext",
      "addressLocality": "Ghatkopar East",
      "addressRegion": "Mumbai, Maharashtra",
      "postalCode": "400077",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0860,
      "longitude": 72.9090
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:30",
      "closes": "19:30"
    },
    "sameAs": [
      "https://www.facebook.com/SaverraRealty/",
      "https://www.instagram.com/saverrarealty/",
      "https://www.youtube.com/channel/UC4evOuC0SqWApu0cYg6tfWQ",
      "https://www.linkedin.com/in/nimesh-bhanushali-83671b54"
    ],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Ghatkopar East, Mumbai"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Chembur, Mumbai"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Vikhroli, Mumbai"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Central Suburbs Mumbai"
      }
    ]
  };

  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Projects",
        "url": "https://saverrarealty.com/projects"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Services",
        "url": "https://saverrarealty.com/services"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "About Us",
        "url": "https://saverrarealty.com/about"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Social Wall",
        "url": "https://saverrarealty.com/social-wall"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Careers",
        "url": "https://saverrarealty.com/careers"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 6,
        "name": "Contact Us",
        "url": "https://saverrarealty.com/contact"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
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
import { ContentProtection } from "@/components/common/ContentProtection";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouterState();
  const isAppRoute = !routerState.location.pathname.startsWith('/admin') && !routerState.location.pathname.startsWith('/auth');

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ContentProtection />
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
