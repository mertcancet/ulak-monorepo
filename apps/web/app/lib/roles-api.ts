import type { Role } from "@cleon/shared";
import { DEFAULT_WORKSPACE_ID } from "./default-workspace-id";
import { request } from "./fetcher";

export const rolesApi = {
  listRoles: (workspaceId = DEFAULT_WORKSPACE_ID) =>
    request<Role[]>("/roles", {
      headers: {
        "cleon-workspace-id": workspaceId,
      },
    }),
};
