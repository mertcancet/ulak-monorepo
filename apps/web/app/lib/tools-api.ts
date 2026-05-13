import type {
  CreateToolInput,
  Paginated,
  ToolItem,
  UpdateToolInput,
} from "@cleon/shared";
import { request } from "./fetcher";

export const toolsApi = {
  listTools: (page = 1, pageSize = 20) =>
    request<Paginated<ToolItem>>("/tools", {
      query: { page, pageSize },
    }),

  getTool: (id: string) => request<ToolItem>(`/tools/${id}`, {}),

  createTool: (body: CreateToolInput) =>
    request<{ id: string }>("/tools", {
      method: "POST",
      body,
    }),

  updateTool: (id: string, body: UpdateToolInput) =>
    request<void>(`/tools/${id}`, {
      method: "PATCH",
      body,

      parseAs: "void",
    }),

  deleteTool: (id: string) =>
    request<void>(`/tools/${id}`, {
      method: "DELETE",

      parseAs: "void",
    }),
};
