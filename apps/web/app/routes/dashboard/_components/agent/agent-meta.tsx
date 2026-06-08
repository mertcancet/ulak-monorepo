import { AGENT_MOCK_DATA } from "./constants";

interface AgentMetaProps {
  agentId?: string;
  model?: string;
}

export const AgentMeta = ({ agentId, model }: AgentMetaProps) => {
  return (
    <div className="text-muted-foreground/70 border-border hidden items-center space-x-3 border-l pl-4 text-[11px] md:flex">
      <span className="font-medium">
        Agent ID: {agentId ?? AGENT_MOCK_DATA.id}
      </span>
      <span className="text-muted-foreground/30">•</span>
      <span className="font-medium">
        Model: {model ?? AGENT_MOCK_DATA.model}
      </span>
    </div>
  );
};
