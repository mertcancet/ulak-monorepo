import { and, eq } from "drizzle-orm";
import { z } from "zod";
import db from "~/db";
import { roles, user_roles, workspaces } from "~/db/schema";

const permissions = [
  "view",
  "share",
  "invite",
  "create",
  "update",
  "delete",
  "*",
] as const;

type Permission = (typeof permissions)[number];
type ResourceKind = keyof z.infer<typeof rolePermissionSchema>;

export type ResourcePermission = {
  [kind in ResourceKind]?: Permission[];
};

const permissionSchema = z.enum(permissions).array().optional();

export const rolePermissionSchema = z.object({
  workspace: permissionSchema,
  role: permissionSchema,
  agent: permissionSchema,
  tool: permissionSchema,
});

export type CheckPermissionRequest =
  | {
      user: { id: string };
      resource: { kind: ResourceKind; workspaceId: string };
      action: Permission;
    }
  | {
      user: { id: string };
      resource: { workspaceId: string };
      actions: ResourcePermission;
    };

export async function checkPermissions(request: CheckPermissionRequest) {
  const isOwner = await isWorkspaceOwner({
    userId: request.user.id,
    workspaceId: request.resource.workspaceId,
  });

  if (isOwner) return true;

  const roles = await fetchUserRoles({
    userId: request.user.id,
    workspaceId: request.resource.workspaceId,
  });

  if ("actions" in request) {
    return hasAuthorityOver(
      roles.map(r => r.permissions),
      request.actions,
    );
  }

  const isAllowed = roles
    .flatMap(r => r.permissions)
    .some(
      r =>
        r[request.resource.kind]?.includes(request.action) ||
        r[request.resource.kind]?.includes("*"),
    );

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
    .select()
    .from(workspaces)
    .where(eq(workspaces.id, workspaceId));

  return workspace?.ownerId === userId;
}

export function hasAuthorityOver(
  source: ResourcePermission | ResourcePermission[],
  target: ResourcePermission,
) {
  const sourceList = Array.isArray(source) ? source : [source];

  for (const [resource, actions] of Object.entries(target)) {
    const kind = resource as ResourceKind;
    const sourceActions = sourceList.flatMap(s => s[kind] || []);

    if (sourceActions.includes("*")) continue;

    const hasUnauthorizedAction = actions.some(
      action => !sourceActions.includes(action),
    );

    if (hasUnauthorizedAction) return false;
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
