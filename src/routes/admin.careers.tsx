import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ExternalLink, Trash2, Mail, Phone, Briefcase } from "lucide-react";
import { getCareerApplicationsFn, updateCareerStatusFn, deleteCareerApplicationFn } from "@/api/misc";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/careers")({
  component: AdminCareers,
});

function AdminCareers() {
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["admin_careers"],
    queryFn: async () => {
      const response = await getCareerApplicationsFn();
      if (!response.success) {
        toast.error(response.error || "Failed to fetch applications.");
        return [];
      }
      return response.data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await updateCareerStatusFn({ data: { id, status } });
      if (!response.success) throw new Error(response.error);
    },
    onSuccess: () => {
      toast.success("Application status updated");
      queryClient.invalidateQueries({ queryKey: ["admin_careers"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  const deleteApplication = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteCareerApplicationFn({ data: id });
      if (!response.success) throw new Error(response.error);
    },
    onSuccess: () => {
      toast.success("Application deleted");
      queryClient.invalidateQueries({ queryKey: ["admin_careers"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete application");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-semibold tracking-tight text-[color:var(--navy-deep)]">Career Applications</h1>
        <p className="text-muted-foreground">Manage job applications submitted through the Careers page.</p>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Applicant</TableHead>
              <TableHead>Position & Exp</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Loading applications...
                </TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app: any) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="font-medium">{app.first_name} {app.last_name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium flex items-center gap-1.5"><Briefcase className="size-3 text-muted-foreground"/> {app.position}</div>
                    <div className="text-sm text-muted-foreground">{app.experience_years}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${app.email}`} className="text-sm flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Mail className="size-3 text-muted-foreground" /> {app.email}
                      </a>
                      <a href={`tel:${app.phone}`} className="text-sm flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Phone className="size-3 text-muted-foreground" /> {app.phone}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(app.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <select
                      className="text-sm border-none bg-transparent outline-none cursor-pointer p-1 rounded hover:bg-accent"
                      value={app.status || "new"}
                      onChange={(e) => updateStatus.mutate({ id: app.id, status: e.target.value })}
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-8 text-xs gap-1"
                      >
                        <a href={app.resume_url} target="_blank" rel="noreferrer">
                          Resume <ExternalLink className="size-3" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this application?")) {
                            deleteApplication.mutate(app.id);
                          }
                        }}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
