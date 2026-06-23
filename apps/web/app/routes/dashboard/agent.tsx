import { useSession } from "@livekit/components-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TokenSource } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { AgentSessionProvider } from "~/components/agents-ui/agent-session-provider";
import { agentsApi } from "~/lib/agents-api";
import { toolsApi } from "~/lib/tools-api";
import { useWorkspaceStore } from "~/store/workspace-store";
import { AgentHeader } from "./_components/agent/agent-header";
import { FooterStatusBar } from "./_components/agent/footer-status-bar";
import { LivekitTestingPanel } from "./_components/agent/livekit-testing-panel";
import { PromptEditor } from "./_components/agent/prompt-editor";

/**
 * AgentConfigPage
 * Refactored implementation of the Agent Configuration Screen.
 * Decomposed into logical components for better maintainability.
 */
export default function AgentConfigPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);
  const [agentName, setAgentName] = useState("Yeni Agent");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [model, setModel] = useState("");
  const [systemInstructions, setSystemInstructions] = useState("");
  const [voice, setVoice] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [allowInterruptions, setAllowInterruptions] = useState(true);
  const [greetPrompt, setGreetPrompt] = useState("");
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);
  const { selectedWorkspaceId } = useWorkspaceStore();
  const agentId = searchParams.get("agentId") ?? "";

  const isDraftMode = useMemo(() => {
    const draft = searchParams.get("draft");
    return draft === "true" || !agentId;
  }, [agentId, searchParams]);

  const {
    data: agentDetail,
    isLoading: isAgentLoading,
    error: agentQueryError,
  } = useQuery({
    queryKey: ["agent", selectedWorkspaceId, agentId],
    queryFn: () => agentsApi.getAgent(agentId),
    enabled: !isDraftMode && Boolean(agentId),
  });

  const queryErrorMessage =
    agentQueryError instanceof Error ? agentQueryError.message : null;

  const {
    data: toolsResponse,
    isLoading: isToolsLoading,
    error: toolsQueryError,
  } = useQuery({
    queryKey: ["tools", selectedWorkspaceId, 1, 100],
    queryFn: () => toolsApi.listTools(1, 20),
  });

  const toolsErrorMessage =
    toolsQueryError instanceof Error ? toolsQueryError.message : null;

  const availableTools = toolsResponse?.data ?? [];

  useEffect(() => {
    if (!agentDetail) {
      if (isDraftMode) {
        setAgentName("Yeni Agent");
        setPhoneNumber("");
        setModel("");
        setSystemInstructions("");
        setVoice("");
        setApiKey("");
        setAllowInterruptions(true);
        setGreetPrompt("");
        setSelectedToolIds([]);
      }
      return;
    }

    setAgentName(agentDetail.name || "Yeni Agent");
    setPhoneNumber(agentDetail.phoneNumber ?? "");
    setModel(agentDetail.llm?.model ?? "");
    setSystemInstructions(agentDetail.instructions ?? "");
    setVoice(agentDetail.llm?.voice ?? "");
    setApiKey(agentDetail.llm?.api_key ?? "");
    setAllowInterruptions(agentDetail.allowInterruptions);
    setGreetPrompt(agentDetail.greetPrompt ?? "");
    setSelectedToolIds(agentDetail.tools?.map(tool => tool.id) ?? []);
  }, [agentDetail, isDraftMode]);

  const { mutateAsync: createAgent, isPending: isSaving } = useMutation({
    mutationFn: () =>
      agentsApi.createAgent({
        name: agentName,
        phoneNumber,
        llm: {
          provider: "google",
          model: "gemini-2.5-flash-native-audio-preview-12-2025",
          instructions: systemInstructions,
          is_realtime: true,
          voice: "Achernar",
          api_key: apiKey,
        },
        instructions: systemInstructions,
        allowInterruptions,
        greetPrompt,
        toolIds: selectedToolIds,
      }),
    onSuccess: async createdAgent => {
      await queryClient.invalidateQueries({
        queryKey: ["agents", selectedWorkspaceId, 1, 20],
      });
      navigate(`/dashboard/agent?agentId=${createdAgent.id}`, {
        replace: true,
      });
    },
  });

  const { mutateAsync: publishAgent, isPending: isPublishing } = useMutation({
    mutationFn: async () => {
      if (isDraftMode || !agentId || !agentDetail) {
        throw new Error("Yayinlamak icin once mevcut bir temsilci secilmeli.");
      }

      return agentsApi.updateAgent(agentId, {
        name: agentName,
        phoneNumber,
        llm: {
          provider: "google",
          model: "gemini-2.5-flash-native-audio-preview-12-2025",
          instructions: systemInstructions,
          is_realtime: true,
          voice: "Achernar",
          api_key: apiKey,
        },
        instructions: systemInstructions,
        allowInterruptions,
        greetPrompt,
        toolIds: selectedToolIds,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["agents", selectedWorkspaceId, 1, 20],
      });
      await queryClient.invalidateQueries({
        queryKey: ["agent", selectedWorkspaceId, agentId],
      });
      setPublishSuccess("Temsilci başarıyla yayınlandı.");
    },
  });

  const handleSave = async () => {
    if (!isDraftMode || isSaving) {
      return;
    }

    setSaveError(null);
    try {
      await createAgent();
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Temsilci kaydedilemedi.",
      );
    }
  };

  const handlePublish = async () => {
    setPublishError(null);
    setPublishSuccess(null);

    try {
      await publishAgent();
    } catch (error) {
      setPublishError(
        error instanceof Error ? error.message : "Temsilci yayinlanamadi.",
      );
    }
  };
  const _tokenSource = useMemo(() => {
    return TokenSource.custom(async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/livekit/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ agentId }),
      });

      const { token } = await res.json();
      return {
        serverUrl: import.meta.env.VITE_LIVEKIT_WS_URL,
        participantToken: token,
      };
    });
  }, [agentId]);

  const session = useSession(_tokenSource, {
    agentName: agentId || "preview-agent",
  });
  return (
    <AgentSessionProvider session={session}>
      <div className="bg-background animate-in fade-in relative flex h-screen flex-col overflow-hidden duration-500">
        <AgentHeader
          onSave={handleSave}
          isSaving={isSaving}
          isDraft={isDraftMode}
          title={isDraftMode ? `${agentName} (Taslak)` : agentName}
          onEditName={setAgentName}
          agentId={agentDetail?.id}
          model={model}
          onPublish={handlePublish}
          isPublishing={isPublishing}
          canPublish={!isDraftMode && !isAgentLoading && Boolean(agentId)}
        />

        {isDraftMode && (
          <div className="border-border bg-secondary/40 text-foreground mx-4 mt-3 rounded-xl border px-4 py-3 text-sm">
            Bu ekran taslak modunda. Temsilci, sadece <strong>Kaydet</strong>{" "}
            butonuna bastığınızda oluşturulur.
          </div>
        )}

        {saveError && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive mx-4 mt-3 rounded-xl border px-4 py-3 text-sm">
            {saveError}
          </div>
        )}

        {publishError && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive mx-4 mt-3 rounded-xl border px-4 py-3 text-sm">
            {publishError}
          </div>
        )}

        {publishSuccess && (
          <div className="border-success/30 bg-success/10 text-success mx-4 mt-3 rounded-xl border px-4 py-3 text-sm">
            {publishSuccess}
          </div>
        )}

        {queryErrorMessage && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive mx-4 mt-3 rounded-xl border px-4 py-3 text-sm">
            {queryErrorMessage}
          </div>
        )}

        {!isDraftMode && isAgentLoading && (
          <div className="border-border bg-secondary/40 text-muted-foreground mx-4 mt-3 rounded-xl border px-4 py-3 text-sm">
            Temsilci detayları yükleniyor...
          </div>
        )}

        <main className="flex flex-1 overflow-hidden p-4">
          <div className="border-border bg-card/30 flex flex-1 gap-4 overflow-hidden rounded-xl border p-3">
            {/* Left Column: Configuration Canvas */}
            <div className="flex min-w-100 flex-1 flex-col space-y-4">
              {/* <QuickSelectToolbar /> */}
              <PromptEditor
                name={agentName}
                onNameChange={setAgentName}
                phoneNumber={phoneNumber}
                onPhoneNumberChange={setPhoneNumber}
                model={model}
                onModelChange={setModel}
                voice={voice}
                onVoiceChange={setVoice}
                apiKey={apiKey}
                onApiKeyChange={setApiKey}
                allowInterruptions={allowInterruptions}
                onAllowInterruptionsChange={setAllowInterruptions}
                greetPrompt={greetPrompt}
                onGreetPromptChange={setGreetPrompt}
                tools={availableTools}
                selectedToolIds={selectedToolIds}
                onSelectedToolIdsChange={setSelectedToolIds}
                isToolsLoading={isToolsLoading}
                toolsErrorMessage={toolsErrorMessage}
                value={systemInstructions}
                onChange={setSystemInstructions}
              />
            </div>

            {/* Middle Column: Configuration Panel */}
            {/*
          <ConfigSidebar />
         */}

            {/* Right Column: Testing Panel */}
            {/* <TestingPanel agentId={agentId} /> */}
            <LivekitTestingPanel agentId={agentId} />
          </div>
        </main>

        <FooterStatusBar />
      </div>
    </AgentSessionProvider>
  );
}
