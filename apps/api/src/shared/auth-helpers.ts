import { and, eq } from "drizzle-orm";
import db from "~/db";
import { role_permissions, roles, user_roles } from "~/db/schema";

type Permission = "view" | "share" | "create" | "update" | "delete" | "*";
type ResourceKind = "agent" | "tool";

export type RolePermission = {
  [kind in ResourceKind]?: Permission[];
};

export type CheckPermissionRequest = {
  user: { id: string };
  resource: { kind: ResourceKind; workspaceId: string };
  action: Permission;
};

export async function checkPermissions(request: CheckPermissionRequest) {
  const roles = await fetchUserRoles({
    userId: request.user.id,
    workspaceId: request.resource.workspaceId,
  });

  const isAllowed = roles
    .flatMap(r => r.permissions)
    .some(
      r =>
        r[request.resource.kind]?.includes(request.action) ||
        r[request.resource.kind]?.includes("*"),
    );

  return isAllowed;
}

type FetchUserRolesParams = {
  userId: string;
  workspaceId: string;
};

export async function fetchUserRoles({
  userId,
  workspaceId,
}: FetchUserRolesParams) {
  return await db
    .select({ permissions: role_permissions.permissions })
    .from(user_roles)
    .innerJoin(roles, eq(user_roles.roleId, roles.id))
    .innerJoin(role_permissions, eq(role_permissions.id, roles.id))
    .where(
      and(eq(user_roles.userId, userId), eq(roles.workspaceId, workspaceId)),
    );
}
