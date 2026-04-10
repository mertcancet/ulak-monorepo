// Agent feature types
export interface Agent {
  id: string;
  name: string;
  type: "sales" | "support" | "billing" | "technical";
  model: string;
  status: "active" | "idle" | "training" | "offline";
  totalCalls: number;
  successRate: number;
  createdAt: string;
}

export interface AgentConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  escalationThreshold: number;
}
