import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, TrendingUp, Users, Target, MousePointerClick } from "lucide-react";

export const Route = createFileRoute("/admin/marketing")({ component: Marketing });

const CAMPAIGNS = [
  { id: 1, platform: "Meta Ads", name: "Ghatkopar Premium Leads", status: "Active", spend: "₹45,200", leads: 112, cpl: "₹403" },
  { id: 2, platform: "Meta Ads", name: "Retargeting - Site Visitors", status: "Active", spend: "₹12,500", leads: 34, cpl: "₹367" },
  { id: 3, platform: "Google Ads", name: "Search - Luxury Flats Mumbai", status: "Active", spend: "₹89,400", leads: 156, cpl: "₹573" },
  { id: 4, platform: "Google Ads", name: "Display - Brand Awareness", status: "Paused", spend: "₹15,000", leads: 12, cpl: "₹1,250" },
];

function Marketing() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Marketing & Ads</h1>
          <p className="text-muted-foreground mt-1">Track campaign performance and lead generation across platforms.</p>
        </div>
      </div>

      {/* Integration Guide */}
      <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold">🔌 Connect Ad Accounts (Integration)</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Currently, the data below is a placeholder preview. To automatically pull real <strong>Ad Spend</strong> and generate <strong>Live Leads</strong>, connect your ad accounts below.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg bg-blue-500/5">
            <h3 className="font-bold text-blue-600 mb-2">Meta Ads (Facebook & Instagram)</h3>
            <p className="text-xs text-muted-foreground mb-3">Copy this Webhook URL and paste it in your Facebook Developer Dashboard. Whenever someone fills your Lead Form on Facebook, it will instantly appear in your CRM.</p>
            <code className="text-xs bg-slate-900 text-green-400 p-2 rounded block select-all">
              https://api.saverrarealty.com/webhooks/meta-leads
            </code>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-orange-500/5">
            <h3 className="font-bold text-orange-600 mb-2">Google Ads</h3>
            <p className="text-xs text-muted-foreground mb-3">Enter your Google Ads API Developer Token. This allows the CRM to automatically sync your daily Ad Spend and Cost Per Lead (CPL).</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Paste Developer Token here..." className="flex-1 text-xs px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:border-primary" />
              <button className="bg-primary text-primary-foreground font-semibold text-xs px-4 rounded-md transition-opacity hover:opacity-90">Connect</button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Ad Spend (MTD)", value: "₹1,62,100", icon: TrendingUp, trend: "+12.5%" },
          { label: "Total Leads Generated", value: "314", icon: Users, trend: "+8.2%" },
          { label: "Average CPL", value: "₹516", icon: Target, trend: "-4.1%" },
          { label: "Overall Conversion Rate", value: "3.2%", icon: MousePointerClick, trend: "+0.5%" },
        ].map((kpi, i) => (
          <div key={i} className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-4">
              <p className="text-xs font-medium uppercase tracking-wider">{kpi.label}</p>
              <kpi.icon className="size-4" />
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">{kpi.value}</h3>
              <span className={`text-xs font-medium ${kpi.trend.startsWith('+') ? 'text-green-500' : 'text-green-500'}`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Campaigns */}
      <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border bg-muted/30 p-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold flex items-center gap-2">
            <BarChart3 className="size-5 text-primary" /> Active Campaigns
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Platform</th>
                <th className="px-6 py-4 font-medium">Campaign Name</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Spend</th>
                <th className="px-6 py-4 font-medium text-right">Leads</th>
                <th className="px-6 py-4 font-medium text-right">Cost per Lead</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {CAMPAIGNS.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold ${c.platform === 'Meta Ads' ? 'bg-blue-500/10 text-blue-600' : 'bg-orange-500/10 text-orange-600'}`}>
                      {c.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">{c.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${c.status === 'Active' ? 'text-green-600' : 'text-muted-foreground'}`}>
                      <span className={`size-1.5 rounded-full ${c.status === 'Active' ? 'bg-green-600' : 'bg-muted-foreground'}`}></span>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium">{c.spend}</td>
                  <td className="px-6 py-4 text-right font-medium">{c.leads}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">{c.cpl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
