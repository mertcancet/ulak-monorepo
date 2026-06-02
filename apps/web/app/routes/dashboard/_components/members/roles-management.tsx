import type {
  ResourceKind,
  ResourcePermission,
  Role,
  RolePermissions,
} from "@cleon/shared";
import { standardPermissions } from "@cleon/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import {
  canCreateRole,
  canUpdateRole,
  canViewRole,
} from "~/lib/permission-helpers";
import { rolesApi } from "~/lib/roles-api";
import { useRoles } from "~/store/roles-store";

const resourceOrder: ResourceKind[] = [
  "workspace",
  "role",
  "agent",
  "tool",
  "invitation",
  "knowledge_base",
  "user",
];

const permissionOptions: {
  [K in ResourceKind]: readonly ResourcePermission[K][];
} = {
  workspace: ["view", "update", "*"],
  role: standardPermissions,
  agent: standardPermissions,
  tool: standardPermissions,
  invitation: standardPermissions,
  knowledge_base: standardPermissions,
  user: ["add-role", "remove-role", "*"],
};

const createDefaultPermissions = (): RolePermissions => ({
  workspace: ["view"],
  role: ["view"],
  agent: ["view"],
  tool: ["view"],
  invitation: ["view"],
  knowledge_base: ["view"],
  user: [],
});

const createPermissionMap = (
  rolePermissions: RolePermissions,
): RolePermissions => ({
  workspace: rolePermissions.workspace ?? [],
  role: rolePermissions.role ?? [],
  agent: rolePermissions.agent ?? [],
  tool: rolePermissions.tool ?? [],
  invitation: rolePermissions.invitation ?? [],
  knowledge_base: rolePermissions.knowledge_base ?? [],
  user: rolePermissions.user ?? [],
});

export default function RolesManagement({
  selectedWorkspaceId,
  roles,
}: {
  selectedWorkspaceId: string;
  roles: Role[];
}) {
  const queryClient = useQueryClient();
  const { permissions } = useRoles();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [nextPermissions, setNextPermissions] = useState<RolePermissions>(
    createDefaultPermissions(),
  );

  const { mutate: createRole, isPending: isCreateRolePending } = useMutation({
    mutationFn: (payload: {
      workspaceId: string;
      body: {
        name: string;
        description?: string;
        permissions: RolePermissions;
      };
    }) => rolesApi.createRole(payload.workspaceId, payload.body),
    onSuccess: (_data, payload) => {
      void queryClient.invalidateQueries({
        queryKey: ["roles", payload.workspaceId],
      });
      setIsSheetOpen(false);
      resetForm();
    },
  });

  const { mutate: updateRole, isPending: isUpdateRolePending } = useMutation({
    mutationFn: (payload: {
      workspaceId: string;
      roleId: string;
      body: {
        name: string;
        description?: string;
        permissions: RolePermissions;
      };
    }) =>
      rolesApi.updateRole(payload.workspaceId, payload.roleId, payload.body),
    onSuccess: (_data, payload) => {
      void queryClient.invalidateQueries({
        queryKey: ["roles", payload.workspaceId],
      });
      setIsSheetOpen(false);
      resetForm();
    },
  });

  const canSaveRole = roleName.trim().length >= 3 && selectedWorkspaceId !== "";
  const isEditingRole = editingRoleId !== null;
  const isSavePending = isCreateRolePending || isUpdateRolePending;
  const canViewRoles = canViewRole(permissions);
  const canCreateRoles = canCreateRole(permissions);
  const canUpdateRoles = canUpdateRole(permissions);
  const canSubmitRole = isEditingRole ? canUpdateRoles : canCreateRoles;

  const roleCountLabel = useMemo(() => {
    if (roles.length === 1) {
      return "1 rol";
    }

    return `${roles.length} rol`;
  }, [roles.length]);

  const resetForm = () => {
    setEditingRoleId(null);
    setRoleName("");
    setRoleDescription("");
    setNextPermissions(createDefaultPermissions());
  };

  const openCreateRoleSheet = () => {
    if (!canCreateRoles) {
      return;
    }

    resetForm();
    setIsSheetOpen(true);
  };

  const openEditRoleSheet = (role: Role) => {
    if (!canUpdateRoles) {
      return;
    }

    setEditingRoleId(role.id);
    setRoleName(role.name);
    setRoleDescription(role.description || "");
    setNextPermissions(createPermissionMap(role.permissions));
    setIsSheetOpen(true);
  };

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);

    if (!open) {
      resetForm();
    }
  };

  const togglePermission = <K extends ResourceKind>(
    resource: K,
    permission: ResourcePermission[K],
    checked: boolean,
  ) => {
    setNextPermissions(current => {
      const permissionMap = createPermissionMap(current);
      const currentSet = new Set<ResourcePermission[K]>(
        permissionMap[resource] as ResourcePermission[K][],
      );

      if (permission === "*") {
        if (checked) {
          currentSet.clear();
          currentSet.add(permission);
        } else {
          currentSet.delete(permission);
        }
      } else {
        if (checked) {
          currentSet.add(permission);
          currentSet.delete("*" as ResourcePermission[K]);
        } else {
          currentSet.delete(permission);
        }
      }

      return {
        ...permissionMap,
        [resource]: [...currentSet],
      };
    });
  };

  const saveRole = () => {
    if (!canSaveRole || !canSubmitRole) {
      return;
    }

    const normalizedDescription = roleDescription.trim();
    const body = {
      name: roleName.trim(),
      description:
        normalizedDescription.length > 0 ? normalizedDescription : undefined,
      permissions: nextPermissions,
    };

    if (editingRoleId) {
      updateRole({
        workspaceId: selectedWorkspaceId,
        roleId: editingRoleId,
        body,
      });

      return;
    }

    createRole({
      workspaceId: selectedWorkspaceId,
      body,
    });
  };

  if (!canViewRoles) {
    return null;
  }

  return (
    <section className="border-border bg-background rounded-2xl border p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-foreground flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="size-4" />
            Roller
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Workspace icin tanimli roller ve izinler.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {roleCountLabel}
          </Badge>
          <Button
            variant="outline"
            onClick={openCreateRoleSheet}
            disabled={selectedWorkspaceId === "" || !canCreateRoles}
          >
            <Plus className="size-4" />
            Add Role
          </Button>
        </div>
      </div>

      {roles.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Bu workspace icin kayitli rol bulunmuyor.
        </p>
      )}

      <div className="space-y-3">
        {roles.map(role => {
          const permissionMap = createPermissionMap(role.permissions);

          return (
            <button
              type="button"
              key={role.id}
              className="border-border bg-secondary/30 hover:bg-secondary/50 w-full rounded-xl border p-4 text-left transition-colors disabled:cursor-default disabled:opacity-100"
              onClick={() => openEditRoleSheet(role)}
              disabled={!canUpdateRoles}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    {role.name}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {role.description || "-"}
                  </p>
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                {resourceOrder.map(resource => (
                  <div
                    key={`${role.id}-${resource}`}
                    className="rounded-lg border p-2"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide">
                      {resource}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {permissionMap[resource]?.length === 0 && (
                        <Badge variant="secondary" className="text-[11px]">
                          -
                        </Badge>
                      )}
                      {permissionMap[resource]?.map(permission => (
                        <Badge
                          key={`${role.id}-${resource}-${permission}`}
                          variant="secondary"
                          className="text-[11px]"
                        >
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>{isEditingRole ? "Edit Role" : "Add Role"}</SheetTitle>
            <SheetDescription>
              {isEditingRole
                ? "Rol bilgilerini ve izinlerini guncelleyin."
                : "Rol adini girip resource bazinda permission secin."}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-4 pb-4">
            <div className="space-y-1.5">
              <label htmlFor="role-name" className="text-sm font-medium">
                Role Name
              </label>
              <input
                id="role-name"
                value={roleName}
                onChange={e => setRoleName(e.target.value)}
                placeholder="or. Agent Manager"
                className="border-border bg-background w-full rounded-lg border px-3 py-2 text-sm outline-none"
                disabled={!canSubmitRole}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="role-description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="role-description"
                value={roleDescription}
                onChange={e => setRoleDescription(e.target.value)}
                placeholder="or. Agent, tool ve invitation yonetimi icin rol"
                rows={3}
                className="border-border bg-background w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none"
                disabled={!canSubmitRole}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Permissions</p>

              {resourceOrder.map(resource => {
                const permissionMap = createPermissionMap(nextPermissions);
                const selectedPermissions = permissionMap[resource] ?? [];

                return (
                  <div
                    key={`create-${resource}`}
                    className="border-border rounded-lg border p-3"
                  >
                    <p className="text-foreground text-xs font-semibold uppercase tracking-wide">
                      {resource}
                    </p>

                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {permissionOptions[resource].map(permission => {
                        const checked = selectedPermissions.some(
                          p => p === permission || p === "*",
                        );

                        return (
                          <label
                            key={`toggle-${resource}-${permission}`}
                            className="flex items-center gap-2 text-xs"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              disabled={!canSubmitRole}
                              onChange={e =>
                                togglePermission(
                                  resource,
                                  permission,
                                  e.target.checked,
                                )
                              }
                            />
                            {permission}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <SheetFooter className="border-t">
            <Button
              variant="ghost"
              onClick={() => handleSheetOpenChange(false)}
            >
              Vazgec
            </Button>
            <Button
              onClick={saveRole}
              disabled={!canSaveRole || isSavePending || !canSubmitRole}
            >
              {isEditingRole ? "Role Guncelle" : "Role Kaydet"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  );
}
