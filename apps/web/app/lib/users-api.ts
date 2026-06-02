import { request } from "./fetcher";

export const usersApi = {
  addMemberRoles: (workspaceId: string, userId: string, roleIds: string[]) =>
    request<void>(`/users/${userId}/roles`, {
      method: "POST",
      body: { roleIds },
      headers: { "cleon-workspace-id": workspaceId },
    }),

  removeMemberRoles: (workspaceId: string, userId: string, roleIds: string[]) =>
    request<void>(`/users/${userId}/roles`, {
      method: "DELETE",
      body: { roleIds },
      headers: { "cleon-workspace-id": workspaceId },
    }),
};
