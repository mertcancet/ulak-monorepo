import type {
  AgentDetail,
  AgentListItem,
  CreateAgentInput,
  Paginated,
  UpdateAgentInput,
} from "@cleon/shared";
import { DEFAULT_WORKSPACE_ID } from "./default-workspace-id";
import { request } from "./fetcher";

export type {
  AgentDetail,
  AgentListItem,
  CreateAgentInput,
  Paginated,
  UpdateAgentInput,
};

export const agentsApi = {
  listAgents: (workspaceId = DEFAULT_WORKSPACE_ID, page = 1, pageSize = 20) =>
    request<Paginated<AgentListItem>>("/agents", {
      query: { page, pageSize },
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  getAgent: (agentId: string, workspaceId = DEFAULT_WORKSPACE_ID) =>
    request<AgentDetail>(`/agents/${agentId}`, {
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  createAgent: (body: CreateAgentInput, workspaceId = body.workspaceId) =>
    request<AgentDetail>("/agents", {
      method: "POST",
      body,
      headers: {
        "cleon-workspace-id": workspaceId || DEFAULT_WORKSPACE_ID,
      },
    }),

  updateAgent: (
    agentId: string,
    body: UpdateAgentInput,
    workspaceId = DEFAULT_WORKSPACE_ID,
  ) =>
    request<AgentDetail>(`/agents/${agentId}`, {
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
