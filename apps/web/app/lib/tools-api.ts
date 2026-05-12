import type {
  CreateToolInput,
  Paginated,
  ToolItem,
  UpdateToolInput,
} from "@cleon/shared";
import { request } from "./fetcher";

export const toolsApi = {
  listTools: (workspaceId: string, page = 1, pageSize = 20) =>
    request<Paginated<ToolItem>>("/tools", {
      query: { page, pageSize },
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  getTool: (workspaceId: string, id: string) =>
    request<ToolItem>(`/tools/${id}`, {
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  createTool: (workspaceId: string, body: CreateToolInput) =>
    request<{ id: string }>("/tools", {
      method: "POST",
      body,
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  updateTool: (workspaceId: string, id: string, body: UpdateToolInput) =>
    request<void>(`/tools/${id}`, {
      method: "PATCH",
      body,
      headers: {
        "cleon-workspace-id": workspaceId,
      },
      parseAs: "void",
    }),

  deleteTool: (workspaceId: string, id: string) =>
    request<void>(`/tools/${id}`, {
      method: "DELETE",
      headers: {
        "cleon-workspace-id": workspaceId,
      },
      parseAs: "void",
    }),
};
