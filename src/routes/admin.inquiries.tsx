import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { 
  Trash2, 
  Search, 
  Eye, 
  Phone, 
  Mail, 
  MessageCircle, 
  Download, 
  Copy, 
  Check, 
  Building, 
  Calendar, 
  User, 
  X,
  Sparkles,
  Inbox
} from "lucide-react";
import { toast } from "sonner";
import { getInquiriesFn, deleteInquiryFn } from "@/api/inquiries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/inquiries")({ component: AdminInquiries });

function AdminInquiries() {
  const qc = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "inquiries"],
    queryFn: async () => {
      const response = await getInquiriesFn();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });

  const del = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteInquiryFn({ data: id });
      if (!response.success) throw new Error(response.error);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "inquiries"] });
      toast.success("Inquiry deleted successfully");
      if (selectedInquiry) setSelectedInquiry(null);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to delete inquiry");
    }
  });

  // Filter inquiries based on search term
  const filteredData = data.filter((i: any) => {
    const term = searchTerm.toLowerCase();
    return (
      (i.name && i.name.toLowerCase().includes(term)) ||
      (i.phone && i.phone.toLowerCase().includes(term)) ||
      (i.email && i.email.toLowerCase().includes(term)) ||
      (i.city && i.city.toLowerCase().includes(term)) ||
      (i.budget && i.budget.toLowerCase().includes(term)) ||
      (i.message && i.message.toLowerCase().includes(term))
    );
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = () => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["ID", "Name", "Phone", "Email", "City", "Budget", "Message", "Received At"];
    const rows = data.map((i: any) => [
      i.id,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.city || '').replace(/"/g, '""')}"`,
      `"${(i.budget || '').replace(/"/g, '""')}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${new Date(i.created_at).toLocaleString()}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e: string[]) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Saverra_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV exported successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-gold">Lead Generation</span>
            <Badge variant="outline" className="border-gold/30 text-gold bg-gold/5 text-[10px]">
              {data.length} Total Received
            </Badge>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold text-foreground tracking-tight">Inquiries & Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage property leads, callback requests, and customer inquiries.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToCSV}
            className="flex items-center gap-2 text-xs h-9 border-border bg-card hover:bg-accent"
          >
            <Download className="size-3.5 text-primary" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, phone, email, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-8 text-sm h-10 bg-card border-border/80 shadow-xs focus-visible:ring-gold"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")} 
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Inquiries Table */}
      {isLoading ? (
        <div className="grid place-items-center py-20 text-muted-foreground">
          <div className="flex items-center gap-2 text-sm">
            <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Loading inquiries...
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <tr>
                  <th className="px-4 py-3 min-w-[160px]">Client Name</th>
                  <th className="px-4 py-3 min-w-[180px]">Contact Info</th>
                  <th className="px-4 py-3 min-w-[130px]">City / Budget</th>
                  <th className="px-4 py-3 min-w-[280px] max-w-[360px]">Message Preview</th>
                  <th className="px-4 py-3 min-w-[140px]">Received Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredData.map((i: any) => {
                  const cleanPhone = i.phone ? i.phone.replace(/[^0-9+]/g, '') : '';
                  const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+91${cleanPhone}`;

                  return (
                    <tr 
                      key={i.id} 
                      className="hover:bg-accent/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedInquiry(i)}
                    >
                      {/* Name */}
                      <td className="px-4 py-3.5 align-top">
                        <div className="flex items-center gap-2.5">
                          <div className="grid size-8 place-items-center rounded-full bg-gold/10 text-gold text-xs font-bold shrink-0 border border-gold/20">
                            {i.name ? i.name.substring(0, 1).toUpperCase() : "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                              {i.name || "Anonymous Lead"}
                            </p>
                            {i.source && (
                              <span className="text-[10px] text-muted-foreground/80 block mt-0.5">
                                Source: {i.source}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-4 py-3.5 align-top" onClick={(e) => e.stopPropagation()}>
                        <div className="space-y-1 text-xs">
                          {i.phone ? (
                            <a 
                              href={`tel:${i.phone}`} 
                              className="flex items-center gap-1.5 text-foreground hover:text-primary font-mono transition-colors"
                            >
                              <Phone className="size-3 text-gold shrink-0" />
                              <span>{i.phone}</span>
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                          {i.email && (
                            <a 
                              href={`mailto:${i.email}`} 
                              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground truncate max-w-[170px]"
                              title={i.email}
                            >
                              <Mail className="size-3 text-muted-foreground/70 shrink-0" />
                              <span className="truncate">{i.email}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* City / Budget */}
                      <td className="px-4 py-3.5 align-top">
                        <div className="flex flex-col items-start gap-1">
                          {i.city ? (
                            <Badge variant="outline" className="text-[11px] font-medium border-border bg-secondary/40 text-foreground px-2 py-0">
                              {i.city}
                            </Badge>
                          ) : null}
                          {i.budget ? (
                            <Badge variant="secondary" className="text-[11px] font-semibold bg-gold/15 text-gold border border-gold/30 px-2 py-0">
                              {i.budget}
                            </Badge>
                          ) : null}
                          {!i.city && !i.budget && (
                            <span className="text-xs text-muted-foreground/70">—</span>
                          )}
                        </div>
                      </td>

                      {/* Message Preview (Truncated line-clamp to prevent expanding table height) */}
                      <td className="px-4 py-3.5 align-top">
                        <p 
                          className="text-xs text-foreground/80 line-clamp-2 max-w-[340px] leading-relaxed"
                          title={i.message || ''}
                        >
                          {i.message || <span className="italic text-muted-foreground/60">No message text provided.</span>}
                        </p>
                      </td>

                      {/* Received Date */}
                      <td className="px-4 py-3.5 align-top text-xs text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3 text-muted-foreground/70 shrink-0" />
                          <span>{new Date(i.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground/60 mt-0.5 block pl-4">
                          {new Date(i.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 align-top text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => setSelectedInquiry(i)}
                            className="size-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                            title="View Full Inquiry"
                          >
                            <Eye className="size-4" />
                          </Button>
                          
                          {i.phone && (
                            <a
                              href={`https://wa.me/${cleanPhone}`}
                              target="_blank"
                              rel="noreferrer"
                              className="grid size-8 place-items-center rounded-md text-emerald-600 hover:bg-emerald-500/10 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="size-4" />
                            </a>
                          )}

                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => { 
                              if (confirm("Are you sure you want to delete this inquiry?")) {
                                del.mutate(i.id); 
                              }
                            }}
                            className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                        <div className="grid size-12 place-items-center rounded-full bg-secondary/80 text-muted-foreground mb-3">
                          <Inbox className="size-6" />
                        </div>
                        <p className="font-semibold text-foreground">No inquiries found</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {searchTerm ? `No results matching "${searchTerm}". Try a different keyword.` : "Your website hasn't received any leads yet."}
                        </p>
                        {searchTerm && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSearchTerm("")}
                            className="mt-3 text-xs h-8"
                          >
                            Clear Search Filter
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        {selectedInquiry && (
          <DialogContent className="max-w-xl border-border bg-card p-6 shadow-xl">
            <DialogHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-gold/40 text-gold bg-gold/5 text-xs px-2.5 py-0.5">
                  Lead #{selectedInquiry.id}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(selectedInquiry.created_at).toLocaleString()}
                </span>
              </div>
              <DialogTitle className="font-display text-2xl font-bold text-foreground mt-2">
                {selectedInquiry.name || "Anonymous Lead"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Inquiry details submitted via Saverra Realty website
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-secondary/30 p-3.5 rounded-lg border border-border/50 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Phone Number</span>
                  <div className="flex items-center gap-2 mt-1 font-mono text-foreground font-semibold">
                    <Phone className="size-3.5 text-gold shrink-0" />
                    <span>{selectedInquiry.phone || "Not provided"}</span>
                    {selectedInquiry.phone && (
                      <button 
                        onClick={() => copyToClipboard(selectedInquiry.phone, "Phone number")}
                        className="text-muted-foreground hover:text-foreground ml-auto"
                        title="Copy Phone"
                      >
                        {copiedId === "Phone number" ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Email Address</span>
                  <div className="flex items-center gap-2 mt-1 font-mono text-foreground">
                    <Mail className="size-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{selectedInquiry.email || "Not provided"}</span>
                    {selectedInquiry.email && (
                      <button 
                        onClick={() => copyToClipboard(selectedInquiry.email, "Email address")}
                        className="text-muted-foreground hover:text-foreground ml-auto"
                        title="Copy Email"
                      >
                        {copiedId === "Email address" ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                {selectedInquiry.city && (
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">City</span>
                    <p className="font-medium text-foreground mt-0.5">{selectedInquiry.city}</p>
                  </div>
                )}

                {selectedInquiry.budget && (
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Target Budget</span>
                    <p className="font-semibold text-gold mt-0.5">{selectedInquiry.budget}</p>
                  </div>
                )}
              </div>

              {/* Full Message Box */}
              <div>
                <span className="text-xs font-semibold text-foreground block mb-1.5">Client Message / Requirement:</span>
                <div className="bg-secondary/40 border border-border/60 rounded-lg p-4 text-xs text-foreground leading-relaxed max-h-[220px] overflow-y-auto whitespace-pre-wrap">
                  {selectedInquiry.message || <span className="italic text-muted-foreground">No message text submitted.</span>}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <DialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 border-t border-border">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => {
                  if (confirm("Delete this inquiry?")) {
                    del.mutate(selectedInquiry.id);
                  }
                }}
                className="text-xs h-9 w-full sm:w-auto"
              >
                <Trash2 className="size-3.5 mr-1.5" />
                Delete Inquiry
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {selectedInquiry.phone && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className="text-xs h-9 border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/10"
                  >
                    <a 
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9+]/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <MessageCircle className="size-3.5 mr-1.5 text-emerald-600" />
                      WhatsApp Client
                    </a>
                  </Button>
                )}

                {selectedInquiry.phone && (
                  <Button size="sm" asChild className="text-xs h-9 bg-primary text-primary-foreground">
                    <a href={`tel:${selectedInquiry.phone}`}>
                      <Phone className="size-3.5 mr-1.5" />
                      Call Lead
                    </a>
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

