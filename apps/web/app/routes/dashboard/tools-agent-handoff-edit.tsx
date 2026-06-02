import type {
  AgentHandoffToolFormData,
  ToolItem,
  UpdateToolInput,
} from "@cleon/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Split } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { toolsApi } from "~/lib/tools-api";
import { useWorkspaceStore } from "~/store/workspace-store";
import DashboardHeader from "./_components/dashboard-header";
import {
  AgentHandoffToolForm,
  defaultAgentHandoffToolData,
} from "./_components/tools/agent-handoff-tool-form";

const toolNameRegex = /^[a-z][a-z0-9_-]*$/;
const uuidV7Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const toAgentHandoffFormData = (tool: ToolItem): AgentHandoffToolFormData => {
  if (tool.settings.type !== "AgentHandoff") {
    return defaultAgentHandoffToolData;
  }

  return {
    name: tool.name,
    description: tool.description,
    disallowInterruptions: tool.disallowInterruptions,
    destinationAgent: tool.settings.destination_agent,
    contextStrategy: tool.settings.context_strategy,
    contextMessageLimit: tool.settings.context_message_limit,
    handoffMessage: tool.settings.handoff_message ?? "",
  };
};

const toUpdateInput = (data: AgentHandoffToolFormData): UpdateToolInput => ({
  name: data.name,
  description: data.description,
  disallowInterruptions: data.disallowInterruptions,
  settings: {
    type: "AgentHandoff",
    destination_agent: data.destinationAgent,
    context_strategy: data.contextStrategy,
    context_message_limit: data.contextMessageLimit,
    handoff_message: data.handoffMessage,
  },
});

export default function ToolsAgentHandoffEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = useState<AgentHandoffToolFormData>(
    defaultAgentHandoffToolData,
  );
  const { selectedWorkspaceId } = useWorkspaceStore();

  const {
    data: tool,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tool", selectedWorkspaceId, id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Tool id gerekli");
      }
      return toolsApi.getTool(id);
    },
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (!tool || tool.settings.type !== "AgentHandoff") {
      return;
    }
    setData(toAgentHandoffFormData(tool));
  }, [tool]);

  const { mutate: updateTool, isPending } = useMutation({
    mutationFn: async (formData: AgentHandoffToolFormData) => {
      if (!id) {
        throw new Error("Tool id gerekli");
      }
      return toolsApi.updateTool(id, toUpdateInput(formData));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tools", selectedWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["tool", selectedWorkspaceId, id],
      });
      navigate("/dashboard/tools");
    },
  });

  const canSave =
    data.name.trim().length >= 3 &&
    toolNameRegex.test(data.name.trim()) &&
    data.destinationAgent.trim() !== "" &&
    uuidV7Regex.test(data.destinationAgent.trim());

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

  if (isError || !tool) {
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

  if (tool.settings.type !== "AgentHandoff") {
    return (
      <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
        <DashboardHeader>
          <h1 className="text-foreground font-display text-base font-semibold">
            Araç düzenle
          </h1>
        </DashboardHeader>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <p className="text-muted-foreground text-sm">
            Bu araç AgentHandoff türünde değil, uygun edit ekranına yönlendirin.
          </p>
          <Button asChild variant="outline">
            <Link to={`/dashboard/tools/${id}`}>Doğru edit ekranına git</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/tools"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-foreground font-display text-base font-semibold">
            Araç düzenle
          </h1>
          <span className="bg-secondary text-foreground flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium">
            <Split className="size-3.5" />
            Ajan Aktarımı
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/dashboard/tools">İptal</Link>
          </Button>
          <Button
            onClick={() => updateTool(data)}
            disabled={!canSave || isPending}
          >
            {isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        <div className="mx-auto w-full max-w-2xl">
          <AgentHandoffToolForm data={data} onChange={setData} />
        </div>
      </div>
    </div>
  );
}
