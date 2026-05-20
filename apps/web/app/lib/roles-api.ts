import type { Role, RoleInsert } from "@cleon/shared";
import { request } from "./fetcher";

export type { Role, RoleInsert };

export const rolesApi = {
  listRoles: (workspaceId: string) =>
    request<Role[]>("/roles", {
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  createRole: (workspaceId: string, body: RoleInsert) =>
    request<{ id: string }>("/roles", {
      method: "POST",
      headers: {
        "cleon-workspace-id": workspaceId,
      },
      body,
    }),
};
