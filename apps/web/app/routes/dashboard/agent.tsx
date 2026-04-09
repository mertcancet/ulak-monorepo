import { AgentHeader } from "./_components/agent/agent-header";
import { ConfigSidebar } from "./_components/agent/config-sidebar";
import { FooterStatusBar } from "./_components/agent/footer-status-bar";
import { GreetingSection } from "./_components/agent/greeting-section";
import { PromptEditor } from "./_components/agent/prompt-editor";
import { QuickSelectToolbar } from "./_components/agent/quick-select-toolbar";
import { TestingPanel } from "./_components/agent/testing-panel";

/**
 * AgentConfigPage
 * Refactored implementation of the Agent Configuration Screen.
 * Decomposed into logical components for better maintainability.
 */
export default function AgentConfigPage() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden relative animate-in fade-in duration-500">
      <AgentHeader />

      <main className="flex-1 flex overflow-hidden p-4">
        <div className="flex-1 flex overflow-hidden gap-4 rounded-xl border border-border bg-card/30 p-3">
          {/* Left Column: Configuration Canvas */}
          <div className="flex-1 flex flex-col space-y-4 min-w-100">
            <QuickSelectToolbar />
            <PromptEditor />
            <GreetingSection />
          </div>

          {/* Middle Column: Configuration Panel */}
          <ConfigSidebar />

          {/* Right Column: Testing Panel */}
          <TestingPanel />
        </div>
      </main>

      <FooterStatusBar />
    </div>
  );
}
