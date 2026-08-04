import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getInquiriesFn, deleteInquiryFn } from "@/api/inquiries";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/inquiries")({ component: AdminInquiries });

function AdminInquiries() {
  const qc = useQueryClient();
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
      toast.success("Inquiry deleted");
    },
  });

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow">Leads</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-primary">Inquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">{data.length} inquiries received.</p>
      </div>
      {isLoading ? <p className="text-muted-foreground">Loading…</p> : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/70 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">City / Budget</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((i: any) => (
                <tr key={i.id} className="border-t border-border/70 align-top">
                  <td className="px-4 py-3 font-semibold text-primary">{i.name}</td>
                  <td className="px-4 py-3"><a href={`tel:${i.phone}`} className="hover:underline">{i.phone}</a></td>
                  <td className="px-4 py-3 text-muted-foreground">{i.email ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{i.city ?? "—"}<br /><span className="text-xs">{i.budget ?? ""}</span></td>
                  <td className="px-4 py-3 max-w-sm text-foreground/80">{i.message ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(i.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Button size="icon" variant="ghost" onClick={() => { if (confirm("Delete this inquiry?")) del.mutate(i.id); }}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No inquiries yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
