import type { Workspace, WorkspaceInsert } from "@cleon/shared";
import { request } from "./fetcher";

export type CreateWorkspaceInput = Pick<WorkspaceInsert, "name">;

export const workspacesApi = {
  listWorkspaces: () => request<Workspace[]>("/workspaces"),

  createWorkspace: (body: CreateWorkspaceInput) =>
    request<{ id: string }>("/workspaces", {
      method: "POST",
      body,
    }),
};
