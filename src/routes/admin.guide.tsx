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
  FileText,
  FileCode,
  SlidersHorizontal,
  FolderGit2
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

export function AdminGuidePage() {
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

  const publicPages = [
    { name: "Home Page", path: "/", type: "Core Public", desc: "Hero slider, project filter, MICL/Lodha logos marquee, services, testimonials & booking CTA." },
    { name: "Projects Catalog", path: "/projects", type: "Catalog", desc: "Filterable property catalogue (Residential, Commercial, Luxury) with instant search." },
    { name: "Property Details", path: "/projects/$slug", type: "Dynamic", desc: "Full property specs, high-res Lightbox gallery, floor plans viewer, RERA info & brochure download." },
    { name: "About Us", path: "/about", type: "Corporate", desc: "Saverra Realty brand heritage, leadership vision, core values, and market milestones." },
    { name: "Services Advisory", path: "/services", type: "Advisory", desc: "Real estate consulting, NRI investment desk, legal advisory, and property management." },
    { name: "Home Financing", path: "/financing", type: "Financial", desc: "Home loan eligibility calculator, banking partner options, and instant consultation booking." },
    { name: "Careers & Jobs", path: "/careers", type: "Recruitment", desc: "Open corporate positions listing, job detail modals, and direct resume submission form." },
    { name: "Social Wall & Reels", path: "/social-wall", type: "Media", desc: "Property walkthrough video reels, Instagram/YouTube feeds, and rental highlights." },
    { name: "Private Viewing", path: "/private-viewing", type: "Lead Desk", desc: "VIP site visit booking desk, personalized viewing scheduler, and direct sales contact." },
    { name: "Contact Us", path: "/contact", type: "Contact Desk", desc: "General inquiry form, office address, phone desk, email contacts, and Google Maps location." },
    { name: "Terms of Service", path: "/terms", type: "Legal", desc: "Standard terms & conditions governing website usage and property advisory." },
    { name: "Privacy Policy", path: "/privacy", type: "Legal", desc: "Data protection guidelines, lead privacy terms, and cookie management policy." },
    { name: "Amenities Overview", path: "/amenities", type: "Informational", desc: "Luxury amenities catalog including swimming pool, clubhouse, EV charging & gym." },
    { name: "Frequently Asked Questions", path: "/faq", type: "Support", desc: "Common buyer questions regarding RERA, home loans, booking process, and site visits." },
    { name: "Neighborhood Guide", path: "/neighborhood", type: "Location", desc: "Location advantages, connectivity highlights, schools & hospital proximity guides." },
    { name: "Case Studies", path: "/case-studies", type: "Portfolio", desc: "Successful real estate advisory investments and client portfolio showcases." },
    { name: "Admin Portal Sign-In", path: "/auth", type: "Authentication", desc: "Secure portal login for admin staff (`admin@saverra.com`)." },
  ];

  const adminPages = [
    { name: "Admin Dashboard", path: "/admin", desc: "Central operational hub with metrics, inquiry trends, and quick access shortcuts." },
    { name: "Master System Manual", path: "/admin/guide", desc: "Complete documentation, Hostinger server deployment instructions, and page map." },
    { name: "Projects Management", path: "/admin/projects", desc: "Add, edit, or archive real estate listings, update prices, RERA IDs, and gallery photos." },
    { name: "Floor Plans Desk", path: "/admin/floor-plans", desc: "Manage 2BHK/3BHK unit layouts, floor plan diagrams, and architectural specs." },
    { name: "Inquiries & Leads Desk", path: "/admin/inquiries", desc: "Real-time leads repository from all contact forms with 1-click CSV export." },
    { name: "Theme & Branding", path: "/admin/themes", desc: "Customize primary colors, brand palettes, and partner developer logos (MICL, Lodha)." },
    { name: "Announcements Banner", path: "/admin/announcements", desc: "Publish top announcement bar alerts (e.g. Festival discounts, new project launches)." },
    { name: "Social Wall Reels", path: "/admin/social", desc: "Manage property walkthrough video reels and social media integrations." },
    { name: "Rental Shorts", path: "/admin/rentals", desc: "Publish short video shorts for rental properties and short-stay apartments." },
    { name: "Careers Applications", path: "/admin/careers", desc: "Review candidate job applications, contact details, and resume attachments." },
    { name: "Third-Party Integrations", path: "/admin/integrations", desc: "Manage CRM webhooks, WhatsApp API keys, and notification triggers." },
    { name: "Marketing Analytics", path: "/admin/marketing", desc: "Track campaign performance, conversion rates, and traffic sources." },
  ];

  const filteredPublicPages = publicPages.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdminPages = adminPages.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 print:p-0 print:space-y-4">
      {/* Sleek Compact Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[color:var(--navy-deep)] via-[#022c54] to-[#011c38] p-6 text-white shadow-lg border border-gold/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge className="bg-gold text-[color:var(--navy-deep)] font-semibold px-2.5 py-0.5 text-[11px] uppercase tracking-wide">
                Master Administration Manual
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white/90 text-[11px]">
                Hostinger Node 22 SSR
              </Badge>
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white">
              Saverra Realty — System Documentation & Operations Manual
            </h1>
            <p className="mt-1 text-xs md:text-sm text-white/80 max-w-3xl leading-relaxed">
              Comprehensive reference guide for managing website content, property catalogs, customer leads, and Hostinger server deployments.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 print:hidden">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs backdrop-blur-md"
            >
              <Printer className="mr-1.5 size-3.5" /> Export / Print PDF
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-gold hover:bg-gold/90 text-[color:var(--navy-deep)] font-semibold text-xs shadow-md"
            >
              <a href="https://saverrarealty.com" target="_blank" rel="noreferrer">
                Live Site <ExternalLink className="ml-1.5 size-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-gold/30 bg-gold/5 p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Total Pages</div>
            <div className="text-xl font-bold text-primary mt-0.5">29 Live Pages</div>
          </div>
          <div className="size-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center">
            <Layers className="size-5" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Public Routes</div>
            <div className="text-xl font-bold text-emerald-600 mt-0.5">17 Pages</div>
          </div>
          <div className="size-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Globe className="size-5" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Admin Control</div>
            <div className="text-xl font-bold text-blue-600 mt-0.5">12 Modules</div>
          </div>
          <div className="size-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="size-5" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Hosting Server</div>
            <div className="text-xl font-bold text-purple-600 mt-0.5">Hostinger VPS</div>
          </div>
          <div className="size-9 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
            <Server className="size-5" />
          </div>
        </div>
      </div>

      {/* Quick Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card border border-border p-3 rounded-lg shadow-sm print:hidden">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search documentation (e.g., Hostinger, Projects, Leads)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-xs h-8 bg-background"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground w-full sm:w-auto justify-end">
          <span className="flex items-center gap-1"><Zap className="size-3 text-gold" /> Zero-Downtime Deploy</span>
          <span className="flex items-center gap-1"><Database className="size-3 text-blue-500" /> MySQL DB</span>
          <span className="flex items-center gap-1"><FileCode className="size-3 text-emerald-500" /> TanStack Start Engine</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted/60 p-1 rounded-lg print:hidden">
          <TabsTrigger value="overview" className="gap-1.5 font-medium text-xs">
            <Globe className="size-3.5" /> 1. Page Map (29 Pages)
          </TabsTrigger>
          <TabsTrigger value="admin-manual" className="gap-1.5 font-medium text-xs">
            <Building2 className="size-3.5" /> 2. Admin Operations Guide
          </TabsTrigger>
          <TabsTrigger value="hostinger" className="gap-1.5 font-medium text-xs">
            <Server className="size-3.5" /> 3. Hostinger & Deployment
          </TabsTrigger>
          <TabsTrigger value="handover" className="gap-1.5 font-medium text-xs">
            <FileText className="size-3.5" /> 4. Client Handover Sheet
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: COMPLETE 29 PAGES BREAKDOWN */}
        <TabsContent value="overview" className="mt-5 space-y-6">
          {/* Section: Public Pages (17 Pages) */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <Globe className="size-4 text-emerald-600" /> Public Website Pages Catalog ({filteredPublicPages.length} of 17 Pages)
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Complete list of customer-facing pages accessible on SaverraRealty.com.
                </p>
              </div>
              <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 text-xs">
                17 Public Routes
              </Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPublicPages.map((page, idx) => (
                <div key={idx} className="rounded-lg border border-border/80 bg-secondary/15 p-3.5 space-y-2 hover:border-gold/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-xs text-primary flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      {page.name}
                    </div>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-mono">
                      {page.path}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    {page.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Admin Control Pages (12 Pages) */}
          <div className="rounded-xl border border-gold/30 bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <ShieldCheck className="size-4 text-gold" /> Admin Dashboard & Operations Control ({filteredAdminPages.length} of 12 Modules)
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Password-protected administrative control modules under `/admin`.
                </p>
              </div>
              <Badge className="bg-gold text-[color:var(--navy-deep)] text-xs font-semibold">
                12 Admin Modules
              </Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAdminPages.map((page, idx) => (
                <div key={idx} className="rounded-lg border border-border/80 bg-secondary/15 p-3.5 space-y-2 hover:border-gold/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-xs text-primary flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-gold" />
                      {page.name}
                    </div>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-mono text-muted-foreground">
                      {page.path}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    {page.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: ADMIN OPERATIONS MANUAL */}
        <TabsContent value="admin-manual" className="mt-5 space-y-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <Building2 className="size-4 text-gold" /> Admin Management Operations Guide
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Step-by-step procedures for managing listings, customer leads, branding, and media.
                </p>
              </div>
              <Button asChild size="sm" className="bg-primary text-white text-xs h-7">
                <Link to="/admin/projects">Go to Projects Panel <ChevronRight className="ml-1 size-3" /></Link>
              </Button>
            </div>

            <Accordion type="single" collapsible defaultValue="item-projects" className="w-full space-y-2.5">
              {/* Step 1: Project Management */}
              <AccordionItem value="item-projects" className="border border-border rounded-lg px-3.5 py-0 bg-secondary/10">
                <AccordionTrigger className="hover:no-underline font-semibold text-primary text-xs md:text-sm">
                  <span className="flex items-center gap-2 text-left">
                    <Building2 className="size-4 text-gold shrink-0" />
                    1. How to Add & Edit Property Listings (`/admin/projects`)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2.5 pb-4 space-y-2.5 text-xs text-foreground/90 leading-relaxed border-t border-border/60">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-gold text-[color:var(--navy-deep)] shrink-0 text-[10px]">Step 1</Badge>
                      <div>
                        <b>Access Projects Panel:</b> Navigate to <code>/admin/projects</code> or click <b>Projects</b> in the left sidebar menu.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-gold text-[color:var(--navy-deep)] shrink-0 text-[10px]">Step 2</Badge>
                      <div>
                        <b>Create New Property:</b> Click the blue <b>"+ Add Project"</b> button in the top right corner.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-gold text-[color:var(--navy-deep)] shrink-0 text-[10px]">Step 3</Badge>
                      <div>
                        <b>Fill Listing Metadata:</b>
                        <ul className="list-disc pl-4 mt-1 space-y-0.5 text-muted-foreground text-[11px]">
                          <li><b>Title:</b> Property name (e.g. "MICL Monteverde", "Saverra Emerald Heights").</li>
                          <li><b>Location:</b> Area & City (e.g. "Bandra West, Mumbai").</li>
                          <li><b>Category:</b> Select Residential, Commercial, or Luxury Villas.</li>
                          <li><b>Pricing:</b> (e.g. "₹1.85 Cr Onwards" or "Price on Request").</li>
                          <li><b>Status Flag:</b> Newly Launched / Under Construction / Ready to Move.</li>
                          <li><b>RERA Registration:</b> Official MahaRERA Number.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-gold text-[color:var(--navy-deep)] shrink-0 text-[10px]">Step 4</Badge>
                      <div>
                        <b>Upload Banner & Gallery Images:</b> Add primary cover image URL and comma-separated high-res gallery image URLs.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-gold text-[color:var(--navy-deep)] shrink-0 text-[10px]">Step 5</Badge>
                      <div>
                        <b>Save & Publish:</b> Upon clicking Save, the project instantly reflects live in the public property catalog (`/projects`).
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Step 2: Leads & Inquiries */}
              <AccordionItem value="item-inquiries" className="border border-border rounded-lg px-3.5 py-0 bg-secondary/10">
                <AccordionTrigger className="hover:no-underline font-semibold text-primary text-xs md:text-sm">
                  <span className="flex items-center gap-2 text-left">
                    <MessageSquare className="size-4 text-blue-600 shrink-0" />
                    2. Managing Customer Leads & Exporting CSV Reports (`/admin/inquiries`)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2.5 pb-4 space-y-2.5 text-xs text-foreground/90 leading-relaxed border-t border-border/60">
                  <p className="text-muted-foreground text-[11px]">
                    All client inquiries submitted via Contact Forms, Brochure Downloads, Booking Modals, or Site Visits are recorded in real-time.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-blue-600 text-white shrink-0 text-[10px]">Step 1</Badge>
                      <div>
                        Open <b>Inquiries</b> from the admin sidebar navigation menu.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-blue-600 text-white shrink-0 text-[10px]">Step 2</Badge>
                      <div>
                        Review lead name, phone number, email address, property interested, message, and timestamp.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-blue-600 text-white shrink-0 text-[10px]">Step 3</Badge>
                      <div>
                        <b>Export to CSV:</b> Click <code>Export CSV</code> to download the entire leads database into Excel format for your sales team.
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Step 3: Theme & Developer Logos */}
              <AccordionItem value="item-theme" className="border border-border rounded-lg px-3.5 py-0 bg-secondary/10">
                <AccordionTrigger className="hover:no-underline font-semibold text-primary text-xs md:text-sm">
                  <span className="flex items-center gap-2 text-left">
                    <Palette className="size-4 text-purple-600 shrink-0" />
                    3. Managing Developer Logos (MICL, Lodha, Godrej) & Theme Colors (`/admin/themes`)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2.5 pb-4 space-y-2.5 text-xs text-foreground/90 leading-relaxed border-t border-border/60">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-purple-600 text-white shrink-0 text-[10px]">Logos</Badge>
                      <div>
                        Partner developer logos (e.g. MICL, Lodha, Godrej, Oberoi) are located under <code>public/logos/micl-clean.png</code> and <code>public/logos/micl-official.png</code> with automatic build cache-busting.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-purple-600 text-white shrink-0 text-[10px]">Colors</Badge>
                      <div>
                        Customize website color palettes, Navy Deep background tones, and Gold accent highlights under <code>/admin/themes</code>.
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Step 4: Announcements & Social Wall */}
              <AccordionItem value="item-social" className="border border-border rounded-lg px-3.5 py-0 bg-secondary/10">
                <AccordionTrigger className="hover:no-underline font-semibold text-primary text-xs md:text-sm">
                  <span className="flex items-center gap-2 text-left">
                    <Share2 className="size-4 text-pink-600 shrink-0" />
                    4. Publishing Top Bar Announcements & Social Video Reels (`/admin/announcements`, `/admin/social`)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2.5 pb-4 space-y-2.5 text-xs text-foreground/90 leading-relaxed border-t border-border/60">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-pink-600 text-white shrink-0 text-[10px]">Announcements</Badge>
                      <div>
                        Publish site-wide alert banners (e.g., "🎉 Special Festival Offer: Book MICL Bandra & Receive Gold Voucher") via <code>/admin/announcements</code>.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 bg-card p-2.5 rounded-md border border-border">
                      <Badge className="bg-pink-600 text-white shrink-0 text-[10px]">Video Reels</Badge>
                      <div>
                        Add Instagram / YouTube Short video links under <code>/admin/social</code> to publish property walkthrough reels.
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        {/* TAB 3: HOSTINGER SERVER & DEPLOYMENT GUIDE */}
        <TabsContent value="hostinger" className="mt-5 space-y-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <Server className="size-4 text-gold" /> Hostinger Infrastructure & Zero-Downtime Deployment
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Production hosting environment, SSH credentials, file directory trees, and zero-downtime deployment execution.
                </p>
              </div>
              <Badge className="bg-blue-600 text-white text-xs font-semibold">
                Phusion Passenger Node 22
              </Badge>
            </div>

            {/* Server Specs Table */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Live Domain</div>
                <div className="mt-0.5 text-xs font-bold text-primary flex items-center gap-1">
                  <Globe className="size-3.5 text-gold" /> saverrarealty.com
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">SSL Active (HTTPS)</div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Hostinger IP</div>
                <div className="mt-0.5 text-xs font-bold text-primary flex items-center gap-1">
                  <Server className="size-3.5 text-blue-500" /> 145.223.17.106
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">SSH Port: 65002</div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Node.js Engine</div>
                <div className="mt-0.5 text-xs font-bold text-primary flex items-center gap-1">
                  <Zap className="size-3.5 text-emerald-500" /> Node.js 22.x SSR
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Passenger Server Engine</div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Database</div>
                <div className="mt-0.5 text-xs font-bold text-primary flex items-center gap-1">
                  <Database className="size-3.5 text-purple-500" /> MySQL / MariaDB
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">u278286324_saverra</div>
              </div>
            </div>

            {/* Terminal Commands */}
            <div className="space-y-4 pt-2">
              <h3 className="font-semibold text-xs text-primary flex items-center gap-1.5">
                <Terminal className="size-3.5 text-gold" /> Deployment Commands & Server Paths
              </h3>

              {/* Command 1 */}
              <div className="rounded-lg border border-border bg-[color:var(--navy-deep)] p-4 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-gold flex items-center gap-1.5">
                    <RefreshCw className="size-3" /> Execute Zero-Downtime Deployment
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard("python clean_and_deploy.py", "deploy-cmd")}
                    className="h-6 text-[10px] text-white/80 hover:text-white hover:bg-white/10 px-2"
                  >
                    {copiedId === "deploy-cmd" ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                    <span className="ml-1">{copiedId === "deploy-cmd" ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
                <pre className="font-mono text-[11px] bg-black/50 p-2.5 rounded text-emerald-400 border border-white/10">
                  python clean_and_deploy.py
                </pre>
                <p className="text-[11px] text-white/70">
                  Uploads local `.output` build to Hostinger server and executes atomic folder swap for 0ms downtime.
                </p>
              </div>

              {/* Command 2 */}
              <div className="rounded-lg border border-border bg-[color:var(--navy-deep)] p-4 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-gold flex items-center gap-1.5">
                    <Zap className="size-3" /> Restart Node.js Server
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard("touch /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp/restart.txt", "restart-cmd")}
                    className="h-6 text-[10px] text-white/80 hover:text-white hover:bg-white/10 px-2"
                  >
                    {copiedId === "restart-cmd" ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                    <span className="ml-1">{copiedId === "restart-cmd" ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
                <pre className="font-mono text-[11px] bg-black/50 p-2.5 rounded text-emerald-400 border border-white/10">
                  touch /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp/restart.txt
                </pre>
                <p className="text-[11px] text-white/70">
                  Triggers instant restart of Phusion Passenger application process on Hostinger.
                </p>
              </div>

              {/* Server File Tree */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-2">
                <h4 className="font-semibold text-xs text-primary">Hostinger Server Remote Directory Paths</h4>
                <div className="space-y-1.5 font-mono text-[11px] text-muted-foreground">
                  <div className="p-2 bg-muted/40 rounded border border-border/60">
                    <b className="text-primary">Public Web Root:</b> <code>/home/u278286324/domains/saverrarealty.com/public_html</code>
                  </div>
                  <div className="p-2 bg-muted/40 rounded border border-border/60">
                    <b className="text-primary">Node.js Server App:</b> <code>/home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs</code>
                  </div>
                  <div className="p-2 bg-muted/40 rounded border border-border/60">
                    <b className="text-primary">Node Executable:</b> <code>/opt/alt/alt-nodejs22/root/bin/node</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 4: CLIENT CHEAT SHEET */}
        <TabsContent value="handover" className="mt-5 space-y-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <FileText className="size-4 text-gold" /> Client Executive Handover Reference
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Executive reference guide formatted for non-technical stakeholders and client handovers.
                </p>
              </div>
              <Button onClick={handlePrint} size="sm" className="bg-gold text-[color:var(--navy-deep)] font-semibold text-xs h-7 print:hidden">
                <Printer className="mr-1 size-3" /> Print Document
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <h3 className="font-bold text-xs text-primary flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-emerald-600" /> Admin Portal Login
                </h3>
                <ol className="list-decimal pl-4 text-[11px] text-muted-foreground space-y-1 leading-relaxed">
                  <li>Open <b>https://saverrarealty.com/admin</b> in browser.</li>
                  <li>Sign in with admin credentials (<code>admin@saverra.com</code>).</li>
                  <li>Access full dashboard metrics, lead management, and property controls.</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <h3 className="font-bold text-xs text-primary flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-gold" /> Publishing New Properties
                </h3>
                <ol className="list-decimal pl-4 text-[11px] text-muted-foreground space-y-1 leading-relaxed">
                  <li>Select <b>Projects</b> from the left menu.</li>
                  <li>Click <b>"+ Add Project"</b> in top right.</li>
                  <li>Enter title, location, pricing, RERA number, banner URL, and click <b>Save</b>.</li>
                  <li>Property reflects live instantly on <b>/projects</b>.</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <h3 className="font-bold text-xs text-primary flex items-center gap-1.5">
                  <MessageSquare className="size-3.5 text-blue-600" /> Exporting Customer Leads
                </h3>
                <ol className="list-decimal pl-4 text-[11px] text-muted-foreground space-y-1 leading-relaxed">
                  <li>Navigate to <b>Inquiries</b> desk in admin sidebar.</li>
                  <li>View lead details, phone numbers, and property interest.</li>
                  <li>Click <b>"Export CSV"</b> to download Excel sheet for your sales team.</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg border border-gold/30 bg-gold/5 space-y-2">
                <h3 className="font-bold text-xs text-primary flex items-center gap-1.5">
                  <HelpCircle className="size-3.5 text-gold" /> Documentation & Support
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  For website maintenance, developer logo updates, or server deployments, refer to this documentation at any time.
                </p>
                <div className="pt-1 text-[11px] font-semibold text-primary">
                  Shareable Guide Link: <code className="bg-white/80 px-1.5 py-0.5 rounded border border-border">https://saverrarealty.com/admin/guide</code>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
