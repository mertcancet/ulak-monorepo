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

      <FlowHeader />

      <main className="flex-1 flex overflow-hidden">
        <NodeLibrary />
        <FlowCanvas />
        <SettingsPanel />
      </main>
    </div>
  );
}
