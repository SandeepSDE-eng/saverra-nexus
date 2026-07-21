import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link2, Webhook, Activity, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/integrations")({ component: Integrations });

const INITIAL_INTEGRATIONS = [
  { id: 1, platform: "99acres", active: true, leads: 145, lastSync: "10 mins ago", apiKey: "99A-XXXXXXXXXXXXXXXX", webhook: "https://api.saverrarealty.com/webhooks/99acres" },
  { id: 2, platform: "Housing.com", active: false, leads: 0, lastSync: "Never", apiKey: "", webhook: "https://api.saverrarealty.com/webhooks/housing" },
];

function Integrations() {
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);

  const toggleStatus = (id: number) => {
    setIntegrations(integrations.map(i => i.id === id ? { ...i, active: !i.active } : i));
    toast.success("Integration status updated successfully.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Integrations</h1>
        <p className="text-muted-foreground mt-1">Manage external property portals and webhook connections.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {integrations.map((integration) => (
          <div key={integration.id} className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`grid size-12 place-items-center rounded-lg ${integration.active ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                  <Link2 className="size-6" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold">{integration.platform}</h2>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    {integration.active ? <CheckCircle2 className="size-3 text-green-500" /> : <XCircle className="size-3 text-red-500" />}
                    {integration.active ? "Connected & Active" : "Disconnected"}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => toggleStatus(integration.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${integration.active ? 'bg-primary' : 'bg-muted-foreground/30'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${integration.active ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">API Key</Label>
                <Input value={integration.apiKey} placeholder="Enter API Key" className="mt-1 font-mono text-xs h-9" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground flex items-center gap-1.5"><Webhook className="size-3" /> Webhook URL (For receiving leads)</Label>
                <Input value={integration.webhook} readOnly className="mt-1 font-mono text-xs bg-muted/50 h-9" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 bg-secondary/30 rounded-lg p-3 border border-border/50">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Leads Synced</p>
                  <p className="font-semibold text-foreground text-lg">{integration.leads}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Activity className="size-3" /> Last Sync</p>
                  <p className="font-medium text-foreground text-sm mt-1">{integration.lastSync}</p>
                </div>
              </div>

              <Button variant={integration.active ? "outline" : "default"} className="w-full h-9 text-sm">
                {integration.active ? "Update Configuration" : "Connect Platform"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8">
        <h2 className="font-display text-2xl font-bold text-foreground">📤 Export Leads (External CRM)</h2>
        <p className="text-muted-foreground mt-1 mb-6">Send leads generated on this website instantly to an external CRM (Zoho, Salesforce, LeadSquared, etc.).</p>
        
        <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="grid size-12 place-items-center rounded-lg bg-blue-500/10 text-blue-600">
              <Webhook className="size-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">Outgoing Webhook</h3>
              <p className="text-xs text-muted-foreground">Automatically push new website leads to your CRM via POST request</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold">Your CRM's Webhook URL</Label>
              <Input placeholder="https://your-crm.com/api/webhooks/catch" className="mt-1 font-mono text-sm" />
              <p className="text-xs text-muted-foreground mt-1.5">Paste the Webhook URL provided by your external CRM or Zapier here.</p>
            </div>
            
            <div>
              <Label className="text-sm font-semibold">Authorization Token (Optional)</Label>
              <Input placeholder="Bearer Token or API Key" className="mt-1 font-mono text-sm" />
            </div>
            
            <div className="bg-secondary/30 p-4 rounded-lg border border-border/50 text-xs">
              <p className="font-semibold text-foreground mb-2">Payload Format (What we send to your CRM):</p>
              <pre className="font-mono bg-slate-900 text-green-400 p-3 rounded overflow-x-auto">
{`{
  "lead_source": "Saverra Website (Chatbot)",
  "name": "Sandeep Yadav",
  "phone": "+91 9876543210",
  "email": "sandeep@example.com",
  "project_interest": "Ghatkopar Premium",
  "timestamp": "2026-07-21T10:00:00Z"
}`}
              </pre>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => toast.info("Testing connection...")}>Test Connection</Button>
              <Button onClick={() => toast.success("Webhook saved!")}>Save Configuration</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
