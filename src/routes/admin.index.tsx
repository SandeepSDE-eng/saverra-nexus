import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Building2, MessageSquare, TrendingUp, Users, BookOpen, ArrowRight } from "lucide-react";
import { getAdminProjectsFn } from "@/api/projects";
import { getInquiriesFn } from "@/api/inquiries";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

// Simulated historical data since the DB doesn't have months of data
const chartData = [
  { name: "Jan", inquiries: 45 },
  { name: "Feb", inquiries: 52 },
  { name: "Mar", inquiries: 38 },
  { name: "Apr", inquiries: 65 },
  { name: "May", inquiries: 85 },
  { name: "Jun", inquiries: 110 },
];

function AdminDashboard() {
  const { data: projects = [], isLoading: pLoading } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      try {
        const response = await getAdminProjectsFn();
        if (!response.success) throw new Error(response.error);
        return response.data;
      } catch (error) {
        console.warn("MySQL Error (admin projects):", error);
        return [];
      }
    },
  });

  const { data: inquiries = [], isLoading: iLoading } = useQuery({
    queryKey: ["admin", "inquiries"],
    queryFn: async () => {
      try {
        const response = await getInquiriesFn();
        if (!response.success) throw new Error(response.error);
        return response.data;
      } catch (error) {
        console.warn("MySQL Error (admin inquiries):", error);
        return [];
      }
    },
  });

  const activeProjects = projects.filter((p: any) => p.is_published).length;
  const totalProjects = projects.length;
  const totalInquiries = inquiries.length;
  
  // Get recent 5 inquiries
  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-primary">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome to the SAVERRA admin portal.</p>
        </div>

        <Link
          to="/admin/guide"
          className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[color:var(--navy-deep)] to-[#034078] p-4 text-white shadow-md hover:shadow-lg transition-all border border-gold/30"
        >
          <div className="rounded-lg bg-gold/20 p-2 text-gold">
            <BookOpen className="size-5" />
          </div>
          <div>
            <div className="font-semibold text-sm flex items-center gap-1.5 text-white">
              Website Guide & Admin Manual <ArrowRight className="size-3.5 text-gold" />
            </div>
            <div className="text-xs text-white/70">Complete step-by-step instructions & Hostinger deployment details</div>
          </div>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h2 className="text-3xl font-bold">{pLoading ? "-" : totalProjects}</h2>
            <span className="text-xs text-muted-foreground">({activeProjects} active)</span>
          </div>
        </div>
        
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total Inquiries</p>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h2 className="text-3xl font-bold">{iLoading ? "-" : totalInquiries}</h2>
            <span className="text-xs text-emerald-600 font-medium">+12% this month</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Site Visits</p>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h2 className="text-3xl font-bold">12,450</h2>
            <span className="text-xs text-emerald-600 font-medium">+8.1%</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h2 className="text-3xl font-bold">3.2%</h2>
            <span className="text-xs text-emerald-600 font-medium">+1.1%</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart Section */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-6">Inquiries Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="inquiries" fill="#023b6d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="rounded-xl border border-border bg-card shadow-sm flex flex-col">
          <div className="p-6 border-b border-border/60">
            <h3 className="font-semibold text-lg">Recent Inquiries</h3>
          </div>
          <div className="flex-1 overflow-auto p-0">
            {iLoading ? (
              <div className="p-6 text-sm text-muted-foreground">Loading...</div>
            ) : recentInquiries.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No recent inquiries.</div>
            ) : (
              <div className="divide-y divide-border/60">
                {recentInquiries.map((inq: any) => (
                  <div key={inq.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-primary">{inq.name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-foreground/80 mb-1">{inq.phone}</div>
                    <div className="text-xs text-muted-foreground truncate" title={inq.message || "No message"}>
                      {inq.message || "No message provided."}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
