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
    <div className="bg-background animate-in fade-in relative flex h-screen flex-col overflow-hidden duration-500">
      <AgentHeader />

      <main className="flex flex-1 overflow-hidden p-4">
        <div className="border-border bg-card/30 flex flex-1 gap-4 overflow-hidden rounded-xl border p-3">
          {/* Left Column: Configuration Canvas */}
          <div className="flex min-w-100 flex-1 flex-col space-y-4">
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
