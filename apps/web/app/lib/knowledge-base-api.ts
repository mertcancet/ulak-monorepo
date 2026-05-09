import type {
  CreateKnowledgeBaseInput,
  KnowledgeBase,
  UpdateKnowledgeBaseInput,
} from "@cleon/shared";
import { request } from "./fetcher";

export type {
  CreateKnowledgeBaseInput,
  KnowledgeBase,
  UpdateKnowledgeBaseInput,
};
export { DEFAULT_WORKSPACE_ID } from "./default-workspace-id";

export const knowledgeBaseApi = {
  list: (workspaceId: string) =>
    request<KnowledgeBase[]>("/knowledge-base", {
      headers: { "cleon-workspace-id": workspaceId },
    }),

  create: (body: CreateKnowledgeBaseInput) =>
    request<{ id: string }>("/knowledge-base", {
      method: "POST",
      body,
      headers: { "cleon-workspace-id": body.workspaceId },
    }),

  get: (id: string, workspaceId: string) =>
    request<KnowledgeBase>(`/knowledge-base/${id}`, {
      headers: { "cleon-workspace-id": workspaceId },
    }),

  update: (id: string, body: UpdateKnowledgeBaseInput, workspaceId: string) =>
    request<void>(`/knowledge-base/${id}`, {
      method: "PATCH",
      body,
      headers: { "cleon-workspace-id": workspaceId },
    }),

  delete: (id: string, workspaceId: string) =>
    request<void>(`/knowledge-base/${id}`, {
      method: "DELETE",
      headers: { "cleon-workspace-id": workspaceId },
    }),
};
