import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type { Edge, Node } from "reactflow";
import { agentsApi } from "~/lib/agents-api";
import { useFlowStore } from "~/store/flow-store";
import { initialEdges, initialNodes } from "./_components/agent-flow/data";
import { FlowCanvas } from "./_components/agent-flow/flow-canvas";
import { FlowHeader } from "./_components/agent-flow/flow-header";
import { NodeLibrary } from "./_components/agent-flow/node-library";
import { SettingsPanel } from "./_components/agent-flow/settings-panel";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined",
    },
  ];
}

export function meta() {
  return [
    { title: "AI Conversation Flow Builder | CallingAI" },
    {
      name: "description",
      content: "Design complex AI conversation flows with ease.",
    },
  ];
}

export default function AgentFlowPage() {
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get("agentId");
  const [agentName, setAgentName] = useState("Agent");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { nodes, edges, setNodes, setEdges, setSelectedNodeId } =
    useFlowStore();

  const canSave = useMemo(
    () => !!agentId && !isLoading && !isSaving,
    [agentId, isLoading, isSaving],
  );

  useEffect(() => {
    let cancelled = false;

    const hydrateAgent = async () => {
      if (!agentId) {
        setErrorMessage("Agent secilmedi.");
        setIsLoading(false);
        setEdges(() => structuredClone(initialEdges));
        setNodes(() => structuredClone(initialNodes));
        setSelectedNodeId(null);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        const detail = await agentsApi.getAgent(agentId);

        if (cancelled) return;

        setAgentName(detail.name);

        const flowNodes =
          (detail.flow?.nodes as Node[] | undefined) ??
          structuredClone(initialNodes);
        const flowEdges =
          (detail.flow?.edges as Edge[] | undefined) ??
          structuredClone(initialEdges);

        setEdges(() => flowEdges);
        setNodes(() => flowNodes);
        setSelectedNodeId(null);
      } catch (error) {
        if (cancelled) return;

        setErrorMessage(
          error instanceof Error ? error.message : "Agent akisi alinamadi.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void hydrateAgent();

    return () => {
      cancelled = true;
    };
  }, [agentId, setEdges, setNodes, setSelectedNodeId]);

  const handleSave = async () => {
    if (!agentId || isSaving) return;

    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const serializedFlow = {
        nodes: structuredClone(nodes),
        edges: structuredClone(edges),
      };

      const updated = await agentsApi.updateAgent(agentId, {
        flow: serializedFlow,
      });

      setAgentName(updated.name);
      setSuccessMessage("Canvas kaydedildi.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Agent akisi kaydedilemedi.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden font-display animate-in fade-in duration-500">
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <>
        dangerouslySetInnerHTML={{
          __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `,
        }}
      />

      <FlowHeader
        agentId={agentId}
        agentName={agentName}
        onSave={handleSave}
        canSave={canSave}
        isSaving={isSaving}
      />

      {errorMessage && (
        <div className="mx-4 mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mx-4 mt-4 rounded-lg border border-success/30 bg-success/10 px-4 py-2 text-sm text-success dark:text-success">
          {successMessage}
        </div>
      )}

      <main className="flex-1 flex overflow-hidden">
        <NodeLibrary />
        <FlowCanvas />
        <SettingsPanel />
      </main>
    </div>
  );
}
