import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type { Edge, Node } from "reactflow";
import { Button } from "~/components/ui/button";
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
  const [showNodeLibrary, setShowNodeLibrary] = useState(true);
  const [showSettingsPanel, setShowSettingsPanel] = useState(true);

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
    <div className="bg-background text-foreground font-display animate-in fade-in flex h-screen flex-col overflow-hidden duration-500">
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
        <div className="border-destructive/30 bg-destructive/5 text-destructive mx-4 mt-4 rounded-lg border px-4 py-2 text-sm">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="border-success/30 bg-success/10 text-success dark:text-success mx-4 mt-4 rounded-lg border px-4 py-2 text-sm">
          {successMessage}
        </div>
      )}

      <main className="flex flex-1 overflow-hidden">
        <div
          className={
            showNodeLibrary
              ? "relative h-full w-64 shrink-0 overflow-visible transition-[width] duration-300 ease-out"
              : "relative h-full w-0 shrink-0 overflow-visible transition-[width] duration-300 ease-out"
          }
        >
          <div className="h-full overflow-hidden">
            <div
              className={
                showNodeLibrary
                  ? "h-full translate-x-0 opacity-100 transition-all duration-300 ease-out"
                  : "pointer-events-none h-full -translate-x-4 opacity-0 transition-all duration-300 ease-out"
              }
            >
              <NodeLibrary />
            </div>
          </div>
          <div className="absolute top-2 -right-6 z-20 translate-x-1/2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowNodeLibrary(value => !value)}
              className="border-border bg-background hover:bg-secondary rounded-sm p-0 shadow-sm"
              title={showNodeLibrary ? "Kütüphaneyi Kapat" : "Kütüphaneyi Aç"}
            >
              {showNodeLibrary ? (
                <PanelLeftClose className="h-3 w-3" />
              ) : (
                <PanelLeftOpen className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
        <FlowCanvas />
        <div
          className={
            showSettingsPanel
              ? "relative h-full w-90 shrink-0 overflow-visible transition-[width] duration-300 ease-out"
              : "relative h-full w-0 shrink-0 overflow-visible transition-[width] duration-300 ease-out"
          }
        >
          <div className="absolute top-2 -left-6 z-20 -translate-x-1/2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowSettingsPanel(value => !value)}
              className="border-border bg-background hover:bg-secondary rounded-sm p-0 shadow-sm"
              title={showSettingsPanel ? "Ayarları Kapat" : "Ayarları Aç"}
            >
              {showSettingsPanel ? (
                <PanelRightClose className="h-3 w-3" />
              ) : (
                <PanelRightOpen className="h-3 w-3" />
              )}
            </Button>
          </div>
          <div className="h-full overflow-hidden">
            <div
              className={
                showSettingsPanel
                  ? "h-full translate-x-0 opacity-100 transition-all duration-300 ease-out"
                  : "pointer-events-none h-full translate-x-4 opacity-0 transition-all duration-300 ease-out"
              }
            >
              <SettingsPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
