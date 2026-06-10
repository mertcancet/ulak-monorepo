import type {
  Agent,
  AgentInsert,
  AgentUpdate,
  Paginated,
  ToolItem,
} from "@cleon/shared";
import { request } from "./fetcher";

type AgentDetail = Agent & {
  tools: Pick<ToolItem, "id" | "name" | "description">[];
};

export const agentsApi = {
  listAgents: (page = 1, pageSize = 20) =>
    request<Paginated<Agent>>("/agents", {
      query: { page, pageSize },
    }),

  getAgent: (agentId: string) => request<AgentDetail>(`/agents/${agentId}`),

  createAgent: (body: AgentInsert) =>
    request<Pick<Agent, "id">>("/agents", {
      method: "POST",
      body,
    }),

  updateAgent: (agentId: string, body: AgentUpdate) =>
    request<Agent>(`/agents/${agentId}`, {
      method: "PATCH",
      body,
    }),

  deleteAgent: (agentId: string) =>
    request<void>(`/agents/${agentId}`, {
      method: "DELETE",
    }),
};
