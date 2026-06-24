import { useQuery } from "@tanstack/react-query";
import { Search, Wrench } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { toolsApi } from "~/lib/tools-api";
import { useRoles } from "~/store/roles-store";
import { useWorkspaceStore } from "~/store/workspace-store";
import DashboardHeader from "./_components/dashboard-header";

export default function ToolsPage() {
  const { selectedWorkspaceId } = useWorkspaceStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tools", selectedWorkspaceId],
    queryFn: async () => {
      return toolsApi.listTools();
    },
  });

  const tools = data?.data ?? [];
  const { permissions } = useRoles();
  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <h1 className="text-foreground font-display text-base font-semibold">
          Araçlar
        </h1>
        {permissions?.tool?.includes("*") ||
        permissions?.tool?.includes("create") ? (
          <Button asChild>
            <Link to="/dashboard/tools/new">Araç oluştur</Link>
          </Button>
        ) : null}
      </DashboardHeader>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="border-border bg-background flex h-9 items-center gap-2 rounded-lg border px-3">
            <Search className="text-muted-foreground size-3.5 shrink-0" />
            <input
              type="text"
              placeholder="Ara"
              className="text-foreground placeholder:text-muted-foreground w-40 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground text-sm">Yükleniyor...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-destructive text-sm">
              Araçlar yüklenirken bir hata oluştu.
            </p>
          </div>
        )}

        {!isLoading && !isError && tools.length === 0 && (
          <div className="border-border flex flex-1 flex-col items-center justify-center rounded-2xl border p-12">
            <div className="bg-secondary mb-4 flex size-14 items-center justify-center rounded-xl">
              <Wrench className="text-muted-foreground size-6" />
            </div>
            <p className="text-foreground text-sm font-medium">
              Henüz araç yok
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Görüşmelerinizde kullanmak için araç oluşturun
            </p>
          </div>
        )}

        {!isLoading && !isError && tools.length > 0 && (
          <div className="flex flex-col gap-2">
            {tools.map(tool => (
              <Link
                key={tool.id}
                to={
                  tool.settings.type === "HTTP"
                    ? `/dashboard/tools/http/${tool.id}/edit`
                    : tool.settings.type === "EndCall"
                      ? `/dashboard/tools/end-call/${tool.id}/edit`
                      : `/dashboard/tools/agent-handoff/${tool.id}/edit`
                }
                className="border-border bg-background hover:bg-secondary flex items-center gap-4 rounded-xl border p-4 transition-colors"
              >
                <div className="bg-secondary flex size-10 items-center justify-center rounded-lg">
                  <Wrench className="text-muted-foreground size-4" />
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                  <p className="text-foreground text-sm font-medium">
                    {tool.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {tool.description}
                  </p>
                </div>
                <span className="text-muted-foreground border-border rounded-md border px-2 py-0.5 text-xs">
                  {tool.settings.type === "HTTP"
                    ? "HTTP"
                    : tool.settings.type === "EndCall"
                      ? "Çağrıyı Sonlandır"
                      : "Ajan Aktarımı"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
