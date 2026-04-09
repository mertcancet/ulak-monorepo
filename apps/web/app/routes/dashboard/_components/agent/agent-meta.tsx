import { AGENT_MOCK_DATA } from "./constants";

export const AgentMeta = () => {
  return (
    <div className="text-muted-foreground/70 border-border hidden items-center space-x-3 border-l pl-4 text-[11px] md:flex">
      <span className="font-medium">Agent ID: {AGENT_MOCK_DATA.id}</span>
      <span className="text-muted-foreground/30">•</span>
      <span className="font-medium">Model: {AGENT_MOCK_DATA.model}</span>
      <span className="text-muted-foreground/30">•</span>
      <span className="font-medium">Gecikme: {AGENT_MOCK_DATA.latency}</span>
    </div>
  );
};
