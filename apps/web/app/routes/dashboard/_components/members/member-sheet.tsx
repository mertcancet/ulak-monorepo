import type { Role, WorkspaceMember } from "@cleon/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, X } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { usersApi } from "~/lib/users-api";

interface MemberSheetProps {
  member: WorkspaceMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
  availableRoles: Role[];
  canAddRole: boolean;
  canRemoveRole: boolean;
}

export default function MemberSheet({
  member,
  open,
  onOpenChange,
  workspaceId,
  availableRoles,
  canAddRole,
  canRemoveRole,
}: MemberSheetProps) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    void queryClient.invalidateQueries({
      queryKey: ["workspace-members", workspaceId],
    });
  };

  const { mutate: addRole, isPending: isAdding } = useMutation({
    mutationFn: ({ memberId, roleId }: { memberId: string; roleId: string }) =>
      usersApi.addMemberRoles(workspaceId, memberId, [roleId]),
    onSuccess: invalidate,
  });

  const { mutate: removeRole, isPending: isRemoving } = useMutation({
    mutationFn: ({ memberId, roleId }: { memberId: string; roleId: string }) =>
      usersApi.removeMemberRoles(workspaceId, memberId, [roleId]),
    onSuccess: invalidate,
  });

  if (!member) {
    return null;
  }

  const assignedRoleIds = new Set(member.roles.map(r => r.id));
  const unassignedRoles = availableRoles.filter(
    r => !assignedRoleIds.has(r.id),
  );
  const isMutating = isAdding || isRemoving;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col gap-0 p-0">
        <SheetHeader className="border-border border-b px-6 py-5">
          <SheetTitle className="text-base">Üye Detayları</SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
          {/* Member info */}
          <section className="border-border bg-secondary/30 flex flex-col gap-3 rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand/15 text-brand flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase">
                {(member.name ?? member.email).slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-foreground truncate text-sm font-semibold">
                  {member.name ?? member.email}
                </p>
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 truncate text-xs">
                  <Mail className="size-3" />
                  {member.email}
                </p>
              </div>
            </div>
          </section>

          {/* Current roles */}
          <section>
            <p className="text-foreground mb-3 text-sm font-semibold">
              Mevcut Roller
            </p>
            {member.roles.length === 0 ? (
              <p className="text-muted-foreground text-xs">Rol atanmamış</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {member.roles.map(role => (
                  <div key={role.id} className="flex items-center gap-1">
                    <Badge
                      variant="secondary"
                      className="border-border border capitalize"
                    >
                      {role.name}
                    </Badge>
                    {canRemoveRole && (
                      <button
                        type="button"
                        disabled={isMutating}
                        onClick={() =>
                          removeRole({ memberId: member.id, roleId: role.id })
                        }
                        className="text-muted-foreground hover:text-foreground disabled:opacity-40"
                        aria-label={`${role.name} rolünü kaldır`}
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Add role */}
          {canAddRole && unassignedRoles.length > 0 && (
            <section>
              <p className="text-foreground mb-3 text-sm font-semibold">
                Rol Ekle
              </p>
              <div className="flex flex-wrap gap-2">
                {unassignedRoles.map(role => (
                  <Button
                    key={role.id}
                    variant="outline"
                    size="sm"
                    disabled={isMutating}
                    onClick={() =>
                      addRole({ memberId: member.id, roleId: role.id })
                    }
                  >
                    + {role.name}
                  </Button>
                ))}
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
