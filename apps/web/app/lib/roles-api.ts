import type { Role } from "@cleon/shared";
import { request } from "./fetcher";

export const rolesApi = {
  listRoles: () => request<Role[]>("/roles", {}),
};
