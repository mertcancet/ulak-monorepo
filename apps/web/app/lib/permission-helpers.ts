import type {
  ResourceKind,
  ResourcePermission,
  RolePermissions,
} from "@cleon/shared";

type PermissionsInput = RolePermissions | null | undefined;

type PermissionCheck = {
  resource: ResourceKind;
  action: string;
};

const hasAction = (
  actions: readonly string[] | undefined,
  action: string,
): boolean => {
  if (!actions?.length) {
    return false;
  }

  return actions.includes("*") || actions.includes(action);
};

export const hasPermission = <K extends ResourceKind>(
  permissions: PermissionsInput,
  resource: K,
  action: ResourcePermission[K] | undefined,
): boolean => {
  if (!action) {
    return false;
  }

  return hasAction(
    permissions?.[resource] as readonly string[] | undefined,
    action,
  );
};

export const hasAnyPermission = (
  permissions: PermissionsInput,
  checks: PermissionCheck[],
): boolean => {
  return checks.some(check =>
    hasAction(
      permissions?.[check.resource] as readonly string[] | undefined,
      check.action,
    ),
  );
};

export const hasAllPermissions = (
  permissions: PermissionsInput,
  checks: PermissionCheck[],
): boolean => {
  return checks.every(check =>
    hasAction(
      permissions?.[check.resource] as readonly string[] | undefined,
      check.action,
    ),
  );
};

export const isWorkspaceOwnerPermissions = (
  permissions: PermissionsInput,
): boolean => {
  const resources: ResourceKind[] = [
    "workspace",
    "role",
    "agent",
    "tool",
    "invitation",
    "knowledge_base",
    "user",
  ];

  return resources.every(resource =>
    hasAction(permissions?.[resource] as readonly string[] | undefined, "*"),
  );
};

export const canViewWorkspace = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "workspace", "view");

export const canUpdateWorkspace = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "workspace", "update");

export const canViewRole = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "role", "view");

export const canCreateRole = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "role", "create");

export const canUpdateRole = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "role", "update");

export const canDeleteRole = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "role", "delete");

export const canViewAgent = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "agent", "view");

export const canCreateAgent = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "agent", "create");

export const canUpdateAgent = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "agent", "update");

export const canDeleteAgent = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "agent", "delete");

export const canViewTool = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "tool", "view");

export const canCreateTool = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "tool", "create");

export const canUpdateTool = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "tool", "update");

export const canDeleteTool = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "tool", "delete");

export const canViewInvitation = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "invitation", "view");

export const canCreateInvitation = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "invitation", "create");

export const canUpdateInvitation = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "invitation", "update");

export const canDeleteInvitation = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "invitation", "delete");

export const canViewKnowledgeBase = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "knowledge_base", "view");

export const canCreateKnowledgeBase = (
  permissions: PermissionsInput,
): boolean => hasPermission(permissions, "knowledge_base", "create");

export const canUpdateKnowledgeBase = (
  permissions: PermissionsInput,
): boolean => hasPermission(permissions, "knowledge_base", "update");

export const canDeleteKnowledgeBase = (
  permissions: PermissionsInput,
): boolean => hasPermission(permissions, "knowledge_base", "delete");

export const canAddUserRole = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "user", "add-role");

export const canRemoveUserRole = (permissions: PermissionsInput): boolean =>
  hasPermission(permissions, "user", "remove-role");
