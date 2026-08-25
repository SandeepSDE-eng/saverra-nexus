import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  MessageSquare,
  Server,
  Globe,
  Palette,
  Briefcase,
  Share2,
  Video,
  CheckCircle2,
  Copy,
  Check,
  Search,
  ExternalLink,
  Printer,
  ChevronRight,
  ShieldCheck,
  Zap,
  Terminal,
  Database,
  Layers,
  HelpCircle,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/guide")({
  component: AdminGuidePage,
});

function AdminGuidePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16 print:p-0 print:space-y-4">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[color:var(--navy-deep)] via-[#034078] to-[#001f3f] p-8 text-white shadow-xl border border-gold/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gold text-[color:var(--navy-deep)] font-semibold px-3 py-1 text-xs uppercase tracking-wider">
                Official Manual & Master Documentation
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white/90 text-xs">
                v2.5 Production Ready
              </Badge>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              Saverra Realty — Complete Admin & System Guide
            </h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
              Pura website management, Hostinger server deployment, project updates, lead handling, aur Client handover manual. Sub-kuch ek hi jagah step-by-step detailed format me.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 print:hidden">
            <Button
              onClick={handlePrint}
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md"
            >
              <Printer className="mr-2 size-4" /> Save / Print PDF
            </Button>
            <Button
              asChild
              className="bg-gold hover:bg-gold/90 text-[color:var(--navy-deep)] font-semibold shadow-lg"
            >
              <a href="https://saverrarealty.com" target="_blank" rel="noreferrer">
                Live Website <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border p-4 rounded-xl shadow-sm print:hidden">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search guides (e.g. Hostinger, Projects, Leads, MICL logo)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground w-full sm:w-auto justify-end">
          <span className="flex items-center gap-1.5"><Globe className="size-3.5 text-gold" /> Total Pages: <b>12+ Live Pages</b></span>
          <span className="flex items-center gap-1.5"><Server className="size-3.5 text-blue-500" /> Hostinger Node 22 SSR</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-emerald-500" /> Admin Auth Secured</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted/60 p-1.5 rounded-xl print:hidden">
          <TabsTrigger value="overview" className="gap-2 font-medium text-xs md:text-sm">
            <Globe className="size-4" /> Website Map & Features
          </TabsTrigger>
          <TabsTrigger value="admin-manual" className="gap-2 font-medium text-xs md:text-sm">
            <Building2 className="size-4" /> Admin Step-by-Step
          </TabsTrigger>
          <TabsTrigger value="hostinger" className="gap-2 font-medium text-xs md:text-sm">
            <Server className="size-4" /> Hostinger & Deploy
          </TabsTrigger>

          <TabsTrigger value="handover" className="gap-2 font-medium text-xs md:text-sm">
            <FileText className="size-4" /> Client Cheat Sheet
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: WEBSITE OVERVIEW */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                  <Globe className="size-5 text-gold" /> Complete Website Architecture & Pages Summary
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Website me dynamic pages, interactive modals, lead collection systems, aur catalog structure detail me list kiye gaye hain.
                </p>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 font-semibold border-emerald-500/20">
                100% Fully Functional
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Homepage */}
              <div className="rounded-lg border border-border/80 bg-secondary/20 p-5 space-y-3 hover:border-gold/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <Sparkles className="size-4 text-gold" /> Home Page (`/`)
                  </div>
                  <Badge variant="outline" className="text-[10px]">Public</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hero luxury slider, filterable project search, featured properties showcase, official developers marquee (MICL, Lodha, Godrej, Oberoi), core services, testimonials, & booking modal.
                </p>
                <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                  <b>Key Action:</b> Dynamic hero banner & instant lead generation modals.
                </div>
              </div>

              {/* Card 2: Projects Catalogue */}
              <div className="rounded-lg border border-border/80 bg-secondary/20 p-5 space-y-3 hover:border-gold/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <Building2 className="size-4 text-blue-600" /> Projects Catalog (`/projects`)
                  </div>
                  <Badge variant="outline" className="text-[10px]">Public Catalog</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Filterable real estate catalogue (All, Residential, Commercial, Luxury Villas), search bar by keyword & location, interactive project cards with status badges.
                </p>
                <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                  <b>Key Action:</b> Dynamic routing to individual property details page.
                </div>
              </div>

              {/* Card 3: Project Detail & Lightbox */}
              <div className="rounded-lg border border-border/80 bg-secondary/20 p-5 space-y-3 hover:border-gold/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <Layers className="size-4 text-purple-600" /> Property Detail Page (`/projects/$slug`)
                  </div>
                  <Badge variant="outline" className="text-[10px]">Dynamic Route</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Full project specs, high-res Lightbox image gallery, interactive Floor Plans selector, RERA number, Google location map, Brochure Download modal & Price Request form.
                </p>
                <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                  <b>Key Action:</b> Direct lead capture for specific property inquiries.
                </div>
              </div>

              {/* Card 4: Services & Financing */}
              <div className="rounded-lg border border-border/80 bg-secondary/20 p-5 space-y-3 hover:border-gold/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <Zap className="size-4 text-amber-500" /> Services & Financing (`/services`, `/financing`)
                  </div>
                  <Badge variant="outline" className="text-[10px]">Advisory</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Real Estate Consulting, NRI Investment desk, Home Loan Assistance calculator, Resale/Rental management, Legal & Documentation advisory services.
                </p>
                <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                  <b>Key Action:</b> Home loan eligibility & consultation request form.
                </div>
              </div>

              {/* Card 5: Careers */}
              <div className="rounded-lg border border-border/80 bg-secondary/20 p-5 space-y-3 hover:border-gold/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <Briefcase className="size-4 text-emerald-600" /> Careers & Jobs (`/careers`)
                  </div>
                  <Badge variant="outline" className="text-[10px]">Recruitment</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Open vacancies listing (Sales Manager, Real Estate Advisor, Marketing Executive), job application popups, direct resume upload & contact form.
                </p>
                <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                  <b>Key Action:</b> Submissions saved directly to Admin Careers database.
                </div>
              </div>

              {/* Card 6: Social Wall & Shorts */}
              <div className="rounded-lg border border-border/80 bg-secondary/20 p-5 space-y-3 hover:border-gold/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <Video className="size-4 text-pink-600" /> Social Wall & Reels (`/social-wall`)
                  </div>
                  <Badge variant="outline" className="text-[10px]">Media & Reels</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Property walkthrough videos, Instagram/YouTube Reels player, rental shorts showcase, site visit highlights, and social media feed integrations.
                </p>
                <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                  <b>Key Action:</b> Video popups & rental property inquiries.
                </div>
              </div>

              {/* Card 7: Private Viewing & Contact */}
              <div className="rounded-lg border border-border/80 bg-secondary/20 p-5 space-y-3 hover:border-gold/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <MessageSquare className="size-4 text-indigo-600" /> Contact & Site Visit (`/contact`, `/private-viewing`)
                  </div>
                  <Badge variant="outline" className="text-[10px]">Contact Desk</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  VIP Private Viewing scheduler, Site visit request form, Office address, phone numbers, email desk, and interactive embedded Google Map.
                </p>
                <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                  <b>Key Action:</b> Automated lead email & DB entry.
                </div>
              </div>

              {/* Card 8: Admin Dashboard */}
              <div className="rounded-lg border border-gold/40 bg-gold/5 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <ShieldCheck className="size-4 text-gold" /> Admin Portal (`/admin`)
                  </div>
                  <Badge className="bg-gold text-[color:var(--navy-deep)] text-[10px]">Protected</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Password protected operational dashboard to add/edit projects, view & export leads, customize theme colors, upload developer logos, and post announcements.
                </p>
                <div className="pt-2 border-t border-gold/20 text-[11px] text-primary font-medium">
                  <b>Access URL:</b> <code>https://saverrarealty.com/admin</code>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: ADMIN STEP-BY-STEP MANUAL */}
        <TabsContent value="admin-manual" className="mt-6 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                  <Building2 className="size-5 text-gold" /> Step-by-Step Admin Management Guide
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Har administrative module ko handle karne ka simple, user-friendly step-by-step tareeka yahan explain kiya gaya hai.
                </p>
              </div>
              <Button asChild size="sm" className="bg-primary text-white text-xs">
                <Link to="/admin/projects">Go to Projects Panel <ChevronRight className="ml-1 size-3" /></Link>
              </Button>
            </div>

            <Accordion type="single" collapsible defaultValue="item-projects" className="w-full space-y-3">
              {/* Accordion 1: How to Add / Edit Projects */}
              <AccordionItem value="item-projects" className="border border-border rounded-xl px-4 py-1 bg-secondary/10">
                <AccordionTrigger className="hover:no-underline font-semibold text-primary text-sm md:text-base">
                  <span className="flex items-center gap-2 text-left">
                    <Building2 className="size-5 text-gold shrink-0" />
                    1. Projects & Properties Manage Kaise Karein? (`/admin/projects`)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 pb-5 space-y-4 text-xs md:text-sm text-foreground/90 leading-relaxed border-t border-border/60">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-gold text-[color:var(--navy-deep)] mt-0.5 shrink-0">Step 1</Badge>
                      <div>
                        <b>Admin Portal Open Karein:</b> Dashboard me left menu se <code>Projects</code> option par click karein ya directly <code>/admin/projects</code> URL kholein.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-gold text-[color:var(--navy-deep)] mt-0.5 shrink-0">Step 2</Badge>
                      <div>
                        <b>New Property Add Karne Ke Liye:</b> Top right corner me blue <code>+ Add Project</code> button par click karein.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-gold text-[color:var(--navy-deep)] mt-0.5 shrink-0">Step 3</Badge>
                      <div>
                        <b>Project Details Fill Karein:</b>
                        <ul className="list-disc pl-5 mt-1.5 space-y-1 text-muted-foreground text-xs">
                          <li><b>Title:</b> Property name (e.g. "MICL Monteverde", "Saverra Emerald Heights").</li>
                          <li><b>Location:</b> Area/City (e.g. "Bandra West, Mumbai", "Thane West").</li>
                          <li><b>Category:</b> Select from Residential, Commercial, or Luxury.</li>
                          <li><b>Price:</b> (e.g. "₹1.85 Cr Onwards" or "Price on Request").</li>
                          <li><b>Status:</b> Newly Launched / Under Construction / Ready to Move.</li>
                          <li><b>RERA Number:</b> Official Maharashtra RERA ID.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-gold text-[color:var(--navy-deep)] mt-0.5 shrink-0">Step 4</Badge>
                      <div>
                        <b>Images & Gallery Upload:</b> Banner image URL add karein aur high-resolution gallery images URLs comma-separated enter karein. (Public images URL ya high quality property photos upload karein).
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-gold text-[color:var(--navy-deep)] mt-0.5 shrink-0">Step 5</Badge>
                      <div>
                        <b>Save / Publish:</b> Form Submit karte hi project website par live ho jayega aur `/projects` catalog me reflect karega!
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Accordion 2: Inquiries & Leads */}
              <AccordionItem value="item-inquiries" className="border border-border rounded-xl px-4 py-1 bg-secondary/10">
                <AccordionTrigger className="hover:no-underline font-semibold text-primary text-sm md:text-base">
                  <span className="flex items-center gap-2 text-left">
                    <MessageSquare className="size-5 text-blue-600 shrink-0" />
                    2. Customer Leads & Inquiries Handle Kaise Karein? (`/admin/inquiries`)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 pb-5 space-y-4 text-xs md:text-sm text-foreground/90 leading-relaxed border-t border-border/60">
                  <p className="text-muted-foreground">
                    Jab bhi koi customer website ke Contact Form, Brochure Download, Site Visit Booking, ya Price Request Form ko bharta hai, to uski saari details automatic database me save ho jaati hain.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-blue-600 text-white mt-0.5 shrink-0">Step 1</Badge>
                      <div>
                        Left sidebar me <b>"Inquiries"</b> par click karein.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-blue-600 text-white mt-0.5 shrink-0">Step 2</Badge>
                      <div>
                        Customer Name, Phone Number, Email, Interested Project, Message, aur Time Stamp verify karein.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-blue-600 text-white mt-0.5 shrink-0">Step 3</Badge>
                      <div>
                        <b>Export to CSV:</b> Apni sales team ko leads dene ke liye top right me <code>Export CSV</code> button par click karke complete lead sheet download kar sakte hain!
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Accordion 3: Theme & Developer Logos */}
              <AccordionItem value="item-theme" className="border border-border rounded-xl px-4 py-1 bg-secondary/10">
                <AccordionTrigger className="hover:no-underline font-semibold text-primary text-sm md:text-base">
                  <span className="flex items-center gap-2 text-left">
                    <Palette className="size-5 text-purple-600 shrink-0" />
                    3. Developer Logos (MICL, Lodha, Godrej) & Theme Colors Change Kaise Karein? (`/admin/themes`)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 pb-5 space-y-4 text-xs md:text-sm text-foreground/90 leading-relaxed border-t border-border/60">
                  <p className="text-muted-foreground">
                    Homepage marquee me official developer logos display hote hain (e.g. MICL logo, Lodha, Oberoi, Godrej, Hiranandani).
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-purple-600 text-white mt-0.5 shrink-0">Logos</Badge>
                      <div>
                        Official high-res transparent logos directory location: <code>public/logos/micl-clean.png</code>, <code>public/logos/micl-official.png</code>. Automatic cache-busting system build me included hai.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-purple-600 text-white mt-0.5 shrink-0">Colors</Badge>
                      <div>
                        <code>/admin/themes</code> page se website ke primary Navy Deep, Gold accents, aur theme settings customize kar sakte hain.
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Accordion 4: Announcements & Social Wall */}
              <AccordionItem value="item-social" className="border border-border rounded-xl px-4 py-1 bg-secondary/10">
                <AccordionTrigger className="hover:no-underline font-semibold text-primary text-sm md:text-base">
                  <span className="flex items-center gap-2 text-left">
                    <Share2 className="size-5 text-pink-600 shrink-0" />
                    4. Top Bar Announcements & Social Reels Manage Kaise Karein? (`/admin/announcements`, `/admin/social`)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 pb-5 space-y-4 text-xs md:text-sm text-foreground/90 leading-relaxed border-t border-border/60">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-pink-600 text-white mt-0.5 shrink-0">Announcements</Badge>
                      <div>
                        Top announcement banner message (e.g. "🎉 Special Festival Offer: Book MICL Bandra & Get ₹2 Lakh Gold Voucher") publish karne ke liye <code>/admin/announcements</code> me text fill karke toggle enable karein.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-card p-3 rounded-lg border border-border">
                      <Badge className="bg-pink-600 text-white mt-0.5 shrink-0">Reels & Videos</Badge>
                      <div>
                        Instagram / YouTube Shorts links add karke <code>/social-wall</code> par real estate property walkthrough reels publish kar sakte hain.
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        {/* TAB 3: HOSTINGER SERVER & DEPLOYMENT GUIDE */}
        <TabsContent value="hostinger" className="mt-6 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                  <Server className="size-5 text-gold" /> Hostinger Server Architecture & Zero-Downtime Deployment
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Website kis tarah Hostinger server par hosted hai, SSH details, database credentials, aur continuous deployment instructions yahan detailed hain.
                </p>
              </div>
              <Badge className="bg-blue-600 text-white font-semibold">
                Node 22 SSR + LiteSpeed
              </Badge>
            </div>

            {/* Technical Server Specs Table */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Domain</div>
                <div className="mt-1 text-sm font-bold text-primary flex items-center gap-1.5">
                  <Globe className="size-4 text-gold" /> saverrarealty.com
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">SSL Certificate Active (HTTPS)</div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hostinger Server IP</div>
                <div className="mt-1 text-sm font-bold text-primary flex items-center gap-1.5">
                  <Server className="size-4 text-blue-500" /> 145.223.17.106
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">SSH Port: 65002</div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Node.js Engine</div>
                <div className="mt-1 text-sm font-bold text-primary flex items-center gap-1.5">
                  <Zap className="size-4 text-emerald-500" /> Node.js 22.x SSR
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">Managed via Phusion Passenger</div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Database</div>
                <div className="mt-1 text-sm font-bold text-primary flex items-center gap-1.5">
                  <Database className="size-4 text-purple-500" /> MySQL / MariaDB
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">u278286324_saverra</div>
              </div>
            </div>

            {/* Quick Copyable Credentials & Commands */}
            <div className="space-y-6">
              <h3 className="font-semibold text-base text-primary flex items-center gap-2">
                <Terminal className="size-4 text-gold" /> Deployment Commands & Server Paths
              </h3>

              {/* Command Card 1: Deployment */}
              <div className="rounded-xl border border-border bg-[color:var(--navy-deep)] p-5 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gold flex items-center gap-2">
                    <RefreshCw className="size-3.5" /> Automatic Zero-Downtime Deployment Script
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard("python clean_and_deploy.py", "deploy-cmd")}
                    className="h-7 text-xs text-white/80 hover:text-white hover:bg-white/10"
                  >
                    {copiedId === "deploy-cmd" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                    <span className="ml-1.5">{copiedId === "deploy-cmd" ? "Copied" : "Copy Command"}</span>
                  </Button>
                </div>
                <pre className="font-mono text-xs bg-black/40 p-3 rounded-lg overflow-x-auto text-emerald-400 border border-white/10">
                  python clean_and_deploy.py
                </pre>
                <p className="text-xs text-white/70">
                  Yeh script local `.output` build directory ko Hostinger server ke nodejs_temp directory me upload karti hai aur atomic folder swap execute karti hai jisse zero downtime build upload hota hai.
                </p>
              </div>

              {/* Command Card 2: Server Restart */}
              <div className="rounded-xl border border-border bg-[color:var(--navy-deep)] p-5 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gold flex items-center gap-2">
                    <Zap className="size-3.5" /> Restart Node.js Server Command
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard("touch /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp/restart.txt", "restart-cmd")}
                    className="h-7 text-xs text-white/80 hover:text-white hover:bg-white/10"
                  >
                    {copiedId === "restart-cmd" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                    <span className="ml-1.5">{copiedId === "restart-cmd" ? "Copied" : "Copy Command"}</span>
                  </Button>
                </div>
                <pre className="font-mono text-xs bg-black/40 p-3 rounded-lg overflow-x-auto text-emerald-400 border border-white/10">
                  touch /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp/restart.txt
                </pre>
                <p className="text-xs text-white/70">
                  Hostinger Phusion Passenger app engine <code>restart.txt</code> file to touch karte hi node process safely restart kar deta hai.
                </p>
              </div>

              {/* Server File Directory Tree */}
              <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                <h4 className="font-semibold text-sm text-primary">Hostinger Remote Directory Paths</h4>
                <div className="space-y-2 font-mono text-xs text-muted-foreground">
                  <div className="p-2.5 bg-muted/40 rounded-md border border-border/60">
                    <b className="text-primary">Public Web Root:</b> <code>/home/u278286324/domains/saverrarealty.com/public_html</code>
                  </div>
                  <div className="p-2.5 bg-muted/40 rounded-md border border-border/60">
                    <b className="text-primary">Node.js Server App:</b> <code>/home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs</code>
                  </div>
                  <div className="p-2.5 bg-muted/40 rounded-md border border-border/60">
                    <b className="text-primary">Node Binary Path:</b> <code>/opt/alt/alt-nodejs22/root/bin/node</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 4: CLIENT CHEAT SHEET & HANDOVER */}
        <TabsContent value="handover" className="mt-6 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                  <FileText className="size-5 text-gold" /> Client Self-Serve Quick Reference Manual
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Yeh section client ko share karne ke liye optimized hai taki non-technical users bhi easily poori website manage kar sakein.
                </p>
              </div>
              <Button onClick={handlePrint} size="sm" className="bg-gold text-[color:var(--navy-deep)] font-semibold print:hidden">
                <Printer className="mr-1.5 size-4" /> Print / Share Link
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Box 1: How to Login */}
              <div className="p-5 rounded-xl border border-border bg-card space-y-3">
                <h3 className="font-bold text-base text-primary flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-600" /> Admin Portal Login Quick Steps
                </h3>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>Browser me URL type karein: <b>https://saverrarealty.com/admin</b></li>
                  <li>Sahi email address aur password se sign in karein.</li>
                  <li>Login complete hote hi aap Admin Dashboard page par pahunch jaayenge.</li>
                  <li>Kiski problem me <code>admin@saverra.com</code> admin access granted hai.</li>
                </ol>
              </div>

              {/* Box 2: How to Add Project */}
              <div className="p-5 rounded-xl border border-border bg-card space-y-3">
                <h3 className="font-bold text-base text-primary flex items-center gap-2">
                  <Building2 className="size-4 text-gold" /> Naya Project Ya Property Launch Karein
                </h3>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>Left Menu se <b>"Projects"</b> button dabayein.</li>
                  <li>Top right corner me <b>"+ Add Project"</b> button click karein.</li>
                  <li>Title, Location, Price, RERA, Banner Image fill karke <b>Save</b> karein.</li>
                  <li>Submitting ke instant baad website par project automatic live ho jaata hai!</li>
                </ol>
              </div>

              {/* Box 3: How to Download Leads */}
              <div className="p-5 rounded-xl border border-border bg-card space-y-3">
                <h3 className="font-bold text-base text-primary flex items-center gap-2">
                  <MessageSquare className="size-4 text-blue-600" /> Customer Leads Download Karein
                </h3>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>Left Menu se <b>"Inquiries"</b> page kholein.</li>
                  <li>Sabhie latest customer inquiries yahan date and time ke sath visible hoti hain.</li>
                  <li><b>"Export CSV"</b> button par click karke poore month ki leads Excel sheet me download kar sakte hain.</li>
                </ol>
              </div>

              {/* Box 4: Emergency Assistance */}
              <div className="p-5 rounded-xl border border-gold/40 bg-gold/5 space-y-3">
                <h3 className="font-bold text-base text-primary flex items-center gap-2">
                  <HelpCircle className="size-4 text-gold" /> Technical Support & Backup
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Yadi kisi tarah ka update failure, domain status inquiry, ya Hostinger account setup check karna ho to complete documentation link hamesha live admin panel me available rahega.
                </p>
                <div className="pt-2 text-xs font-semibold text-primary">
                  Direct Shareable Link: <code className="bg-white/80 px-2 py-1 rounded border border-border">https://saverrarealty.com/admin/guide</code>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
