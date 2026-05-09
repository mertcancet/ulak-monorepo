const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export const DEFAULT_WORKSPACE_ID = "019ddf6a-0046-7ee7-9ec3-12fe24bc631c";

type ApiError = {
  title?: string;
  detail?: string;
};

import type {
  CreateKnowledgeBaseInput,
  KnowledgeBase,
  UpdateKnowledgeBaseInput,
} from "@cleon/shared";

const request = async <T>(
  path: string,
  workspaceId: string,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "cleon-workspace-id": workspaceId,
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

export const knowledgeBaseApi = {
  list: (workspaceId: string) =>
    request<KnowledgeBase[]>("/knowledge-base", workspaceId),

  create: (body: CreateKnowledgeBaseInput) =>
    request<{ id: string }>("/knowledge-base", body.workspaceId, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  get: (id: string, workspaceId: string) =>
    request<KnowledgeBase>(`/knowledge-base/${id}`, workspaceId),

  update: (id: string, body: UpdateKnowledgeBaseInput, workspaceId: string) =>
    request<void>(`/knowledge-base/${id}`, workspaceId, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: (id: string, workspaceId: string) =>
    request<void>(`/knowledge-base/${id}`, workspaceId, {
      method: "DELETE",
    }),
};
