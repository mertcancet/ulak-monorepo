import type {
  ResourceKind,
  ResourcePermission,
  RolePermissions,
} from "@cleon/shared";
import { and, eq } from "drizzle-orm";
import db from "~/db";
import { roles, user_roles, workspace_members, workspaces } from "~/db/schema";

export type CheckPermissionRequest<K extends ResourceKind = ResourceKind> = {
  user: { id: string };
  resource: { kind: K; workspaceId: string };
  action: ResourcePermission[K];
  targetAuthority?: RolePermissions | RolePermissions[];
};

export async function checkPermissions<K extends ResourceKind>(
  request: CheckPermissionRequest<K>,
) {
  const isOwner = await isWorkspaceOwner({
    userId: request.user.id,
    workspaceId: request.resource.workspaceId,
  });

  if (isOwner) return true;

  const roles = await fetchUserRoles({
    userId: request.user.id,
    workspaceId: request.resource.workspaceId,
  });

  const isAllowed = roles
    .flatMap(r => r.permissions)
    .some(r =>
      r[request.resource.kind]?.some(p => p === request.action || p === "*"),
    );

  if (request.targetAuthority) {
    const hasAuthority = hasAuthorityOver(
      roles.map(r => r.permissions),
      request.targetAuthority,
    );

    return isAllowed && hasAuthority;
  }

  return isAllowed;
}

type IsWorkspaceOwnerParams = {
  userId: string;
  workspaceId: string;
};

export async function isWorkspaceOwner({
  userId,
  workspaceId,
}: IsWorkspaceOwnerParams) {
  const [workspace] = await db
    .select({ ownerId: workspaces.ownerId })
    .from(workspaces)
    .where(eq(workspaces.id, workspaceId));

  return workspace?.ownerId === userId;
}

type IsWorkspaceMemberParams = IsWorkspaceOwnerParams;

export async function isWorkspaceMember({
  userId,
  workspaceId,
}: IsWorkspaceMemberParams) {
  const result = await db
    .select()
    .from(workspace_members)
    .where(
      and(
        eq(workspace_members.userId, userId),
        eq(workspace_members.workspaceId, workspaceId),
      ),
    );

  return result.length > 0;
}

export function hasAuthorityOver(
  source: RolePermissions | RolePermissions[],
  target: RolePermissions | RolePermissions[],
) {
  const sourceList = Array.isArray(source) ? source : [source];
  const targetList = Array.isArray(target) ? target : [target];

  for (const targetPermission of targetList) {
    for (const [resource, actions] of Object.entries(targetPermission)) {
      const kind = resource as ResourceKind;
      const sourceActions = sourceList.flatMap(s => s[kind] || []);

      if (sourceActions.includes("*")) continue;

      const hasUnauthorizedAction = actions.some(
        action => !sourceActions.includes(action),
      );

      if (hasUnauthorizedAction) return false;
    }
  }

  return true;
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
    .select({ permissions: roles.permissions })
    .from(user_roles)
    .innerJoin(roles, eq(user_roles.roleId, roles.id))
    .where(
      and(eq(user_roles.userId, userId), eq(roles.workspaceId, workspaceId)),
    );
}
