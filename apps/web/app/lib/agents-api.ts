import type { Agent, AgentInsert, AgentUpdate, Paginated } from "@cleon/shared";
import { request } from "./fetcher";

export const agentsApi = {
  listAgents: (page = 1, pageSize = 20) =>
    request<Paginated<Agent>>("/agents", {
      query: { page, pageSize },
    }),

  getAgent: (agentId: string) => request<Agent>(`/agents/${agentId}`),

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
