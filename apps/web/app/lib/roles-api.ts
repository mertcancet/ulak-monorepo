import type {
  Role,
  RoleInsert,
  RolePermissions,
  RoleUpdate,
} from "@cleon/shared";
import { request } from "./fetcher";

export type { Role, RoleInsert, RoleUpdate };

export type UserRolePermissionsResponse = {
  permissions: RolePermissions;
};

export const rolesApi = {
  listRoles: (workspaceId: string) =>
    request<Role[]>("/roles", {
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),

  getUserPermissions: (workspaceId: string, userId: string) =>
    request<UserRolePermissionsResponse>(`/roles/${userId}`, {
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

  updateRole: (workspaceId: string, roleId: string, body: RoleUpdate) =>
    request<void>(`/roles/${roleId}`, {
      method: "PATCH",
      headers: {
        "cleon-workspace-id": workspaceId,
      },
      body,
    }),
};
