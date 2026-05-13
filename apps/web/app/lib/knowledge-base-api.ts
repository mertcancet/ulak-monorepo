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

export const knowledgeBaseApi = {
  list: () => request<KnowledgeBase[]>("/knowledge-base"),

  create: (body: CreateKnowledgeBaseInput) =>
    request<{ id: string }>("/knowledge-base", {
      method: "POST",
      body,
    }),

  get: (id: string) => request<KnowledgeBase>(`/knowledge-base/${id}`),

  update: (id: string, body: UpdateKnowledgeBaseInput) =>
    request<void>(`/knowledge-base/${id}`, {
      method: "PATCH",
      body,
    }),

  delete: (id: string) =>
    request<void>(`/knowledge-base/${id}`, {
      method: "DELETE",
    }),
};
