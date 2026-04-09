const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type ApiError = {
  title?: string;
  detail?: string;
};

export type AgentFlowDocument = {
  nodes: unknown[];
  edges: unknown[];
  viewport?: unknown;
  metadata?: Record<string, unknown>;
};

export type AgentListItem = {
  id: string;
  ownerUserId: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  hasFlow: boolean;
  flowVersion: number | null;
  flowUpdatedAt: string | null;
};

export type AgentDetail = {
  id: string;
  ownerUserId: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  flow: AgentFlowDocument | null;
  flowVersion: number | null;
  flowUpdatedAt: string | null;
};

type CreateAgentInput = {
  name: string;
  description?: string;
  isActive?: boolean;
  flow: AgentFlowDocument;
};

type UpdateAgentInput = {
  name?: string;
  description?: string;
  isActive?: boolean;
  flow?: AgentFlowDocument;
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
  listAgents: () => request<AgentListItem[]>("/agents"),

  getAgent: (agentId: string) => request<AgentDetail>(`/agents/${agentId}`),

  createAgent: (body: CreateAgentInput) =>
    request<AgentDetail>("/agents", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateAgent: (agentId: string, body: UpdateAgentInput) =>
    request<AgentDetail>(`/agents/${agentId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteAgent: (agentId: string) =>
    request<void>(`/agents/${agentId}`, {
      method: "DELETE",
    }),
};
