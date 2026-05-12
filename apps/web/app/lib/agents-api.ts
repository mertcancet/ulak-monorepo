import type { Agent, AgentInsert, AgentUpdate, Paginated } from "@cleon/shared";
import { DEFAULT_WORKSPACE_ID } from "./default-workspace-id";
import { request } from "./fetcher";

export const agentsApi = {
  listAgents: (workspaceId = DEFAULT_WORKSPACE_ID, page = 1, pageSize = 20) =>
    request<Paginated<Agent>>("/agents", {
      query: { page, pageSize },
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  getAgent: (agentId: string, workspaceId = DEFAULT_WORKSPACE_ID) =>
    request<Agent>(`/agents/${agentId}`, {
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  createAgent: (body: AgentInsert, workspaceId = DEFAULT_WORKSPACE_ID) =>
    request<Pick<Agent, "id">>("/agents", {
      method: "POST",
      body,
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  updateAgent: (
    agentId: string,
    body: AgentUpdate,
    workspaceId = DEFAULT_WORKSPACE_ID,
  ) =>
    request<Agent>(`/agents/${agentId}`, {
      method: "PATCH",
      body,
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  deleteAgent: (agentId: string, workspaceId = DEFAULT_WORKSPACE_ID) =>
    request<void>(`/agents/${agentId}`, {
      method: "DELETE",
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),
};
