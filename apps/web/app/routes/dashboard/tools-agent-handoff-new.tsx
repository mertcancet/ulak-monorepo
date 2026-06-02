import type { AgentHandoffToolFormData } from "@cleon/shared";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Split } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { toolsApi } from "~/lib/tools-api";
import DashboardHeader from "./_components/dashboard-header";
import {
  AgentHandoffToolForm,
  defaultAgentHandoffToolData,
} from "./_components/tools/agent-handoff-tool-form";

const toCreateInput = (data: AgentHandoffToolFormData) => ({
  name: data.name,
  description: data.description,
  disallowInterruptions: data.disallowInterruptions,
  settings: {
    type: "AgentHandoff" as const,
    destination_agent: data.destinationAgent,
    context_strategy: data.contextStrategy,
    context_message_limit: data.contextMessageLimit,
    handoff_message: data.handoffMessage,
  },
});

const toolNameRegex = /^[a-z][a-z0-9_-]*$/;
const uuidV7Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function ToolsAgentHandoffNewPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<AgentHandoffToolFormData>(
    defaultAgentHandoffToolData,
  );

  const canCreate =
    data.name.trim().length >= 3 &&
    toolNameRegex.test(data.name.trim()) &&
    data.destinationAgent.trim() !== "" &&
    uuidV7Regex.test(data.destinationAgent.trim());

  const { mutate: createTool, isPending } = useMutation({
    mutationFn: (formData: AgentHandoffToolFormData) =>
      toolsApi.createTool(toCreateInput(formData)),
    onSuccess: () => {
      navigate("/dashboard/tools");
    },
  });

  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/tools/new"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-foreground font-display text-base font-semibold">
            Yeni araç
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
            onClick={() => createTool(data)}
            disabled={!canCreate || isPending}
          >
            {isPending ? "Oluşturuluyor..." : "Oluştur"}
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
