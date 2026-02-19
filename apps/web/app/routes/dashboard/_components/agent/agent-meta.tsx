import React from "react";
import { AGENT_MOCK_DATA } from "./constants";

export const AgentMeta = () => {
  return (
    <div className="hidden md:flex items-center space-x-3 text-[11px] text-muted-foreground/70 border-l border-border pl-4">
      <span className="font-medium">Agent ID: {AGENT_MOCK_DATA.id}</span>
      <span className="text-muted-foreground/30">•</span>
      <span className="font-medium">Model: {AGENT_MOCK_DATA.model}</span>
      <span className="text-muted-foreground/30">•</span>
      <span className="font-medium">Gecikme: {AGENT_MOCK_DATA.latency}</span>
    </div>
  );
};
