import type {
  AgentDetail,
  AgentListItem,
  CreateAgentInput,
  Paginated,
  UpdateAgentInput,
} from "@cleon/shared";

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const DEFAULT_WORKSPACE_ID = "019ddf6a-0046-7ee7-9ec3-12fe24bc631c";

type ApiError = {
  title?: string;
  detail?: string;
};

export type {
  AgentDetail,
  AgentListItem,
  CreateAgentInput,
  Paginated,
  UpdateAgentInput,
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T | ApiError) : null;

  if (!response.ok) {
    const errorMessage =
      (data as ApiError | null)?.detail ??
      (data as ApiError | null)?.title ??
      "Istek basarisiz oldu.";

    throw new Error(errorMessage);
  }

  return data as T;
};

export const agentsApi = {
  listAgents: (workspaceId = DEFAULT_WORKSPACE_ID, page = 1, pageSize = 20) =>
    request<Paginated<AgentListItem>>(
      `/agents?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          "cleon-workspace-id": workspaceId,
        },
      },
    ),

  getAgent: (agentId: string, workspaceId = DEFAULT_WORKSPACE_ID) =>
    request<AgentDetail>(`/agents/${agentId}`, {
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  createAgent: (body: CreateAgentInput, workspaceId = body.workspaceId) =>
    request<AgentDetail>("/agents", {
      method: "POST",
      body: JSON.stringify(body),
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
      body: JSON.stringify(body),
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
