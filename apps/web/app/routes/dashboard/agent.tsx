import React from "react";
import { AgentHeader } from "./_components/agent/agent-header";
import { QuickSelectToolbar } from "./_components/agent/quick-select-toolbar";
import { PromptEditor } from "./_components/agent/prompt-editor";
import { GreetingSection } from "./_components/agent/greeting-section";
import { ConfigSidebar } from "./_components/agent/config-sidebar";
import { TestingPanel } from "./_components/agent/testing-panel";
import { FooterStatusBar } from "./_components/agent/footer-status-bar";

/**
 * AgentConfigPage
 * Refactored implementation of the Agent Configuration Screen.
 * Decomposed into logical components for better maintainability.
 */
export default function AgentConfigPage() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden relative">
      <AgentHeader />

      <main className="flex-1 flex overflow-hidden p-4 gap-4 bg-mesh">
        {/* Left Column: Configuration Canvas */}
        <div className="flex-1 flex flex-col space-y-4 min-w-[400px]">
          <QuickSelectToolbar />
          <PromptEditor />
          <GreetingSection />
        </div>

        {/* Middle Column: Configuration Panel */}
        <ConfigSidebar />

        {/* Right Column: Testing Panel */}
        <TestingPanel />
      </main>

      <FooterStatusBar />
    </div>
  );
}
