import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { toolsApi } from "~/lib/tools-api";
import { useWorkspaceStore } from "~/store/workspace-store";
import DashboardHeader from "./_components/dashboard-header";

export default function ToolsEditPage() {
  const { id } = useParams();
  const { selectedWorkspaceId } = useWorkspaceStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tool", selectedWorkspaceId, id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Tool id gerekli");
      }
      return toolsApi.getTool(id);
    },
    enabled: Boolean(id),
  });

  if (!id) {
    return (
      <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
        <DashboardHeader>
          <h1 className="text-foreground font-display text-base font-semibold">
            Araç düzenle
          </h1>
        </DashboardHeader>
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-destructive text-sm">Geçersiz araç kimliği.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
        <DashboardHeader>
          <h1 className="text-foreground font-display text-base font-semibold">
            Araç düzenle
          </h1>
        </DashboardHeader>
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-muted-foreground text-sm">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
        <DashboardHeader>
          <h1 className="text-foreground font-display text-base font-semibold">
            Araç düzenle
          </h1>
        </DashboardHeader>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <p className="text-destructive text-sm">
            Araç yüklenirken bir hata oluştu.
          </p>
          <Button asChild variant="outline">
            <Link to="/dashboard/tools">Araçlara dön</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (data.settings.type === "HTTP") {
    return <Navigate replace to={`/dashboard/tools/http/${id}/edit`} />;
  }

  if (data.settings.type === "EndCall") {
    return <Navigate replace to={`/dashboard/tools/end-call/${id}/edit`} />;
  }

  if (data.settings.type === "AgentHandoff") {
    return (
      <Navigate replace to={`/dashboard/tools/agent-handoff/${id}/edit`} />
    );
  }

  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <h1 className="text-foreground font-display text-base font-semibold">
          Araç düzenle
        </h1>
      </DashboardHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
        <p className="text-destructive text-sm">
          Bu araç türü için düzenleme ekranı bulunamadı.
        </p>
        <Button asChild variant="outline">
          <Link to="/dashboard/tools">Araçlara dön</Link>
        </Button>
      </div>
    </div>
  );
}
