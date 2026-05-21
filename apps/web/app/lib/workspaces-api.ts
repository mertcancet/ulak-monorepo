import type {
  Workspace,
  WorkspaceInsert,
  WorkspaceMember,
} from "@cleon/shared";
import { request } from "./fetcher";

export type CreateWorkspaceInput = Pick<WorkspaceInsert, "name">;

export const workspacesApi = {
  listWorkspaces: () => request<Workspace[]>("/workspaces"),

  listWorkspaceMembers: (workspaceId: string) =>
    request<WorkspaceMember[]>(`/workspaces/${workspaceId}/members`),

  createWorkspace: (body: CreateWorkspaceInput) =>
    request<{ id: string }>("/workspaces", {
      method: "POST",
      body,
    }),
};
