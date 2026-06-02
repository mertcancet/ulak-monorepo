import type { Role, WorkspaceMember } from "@cleon/shared";
import { useQuery } from "@tanstack/react-query";
import { Mail, Shield, User } from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";
import { workspacesApi } from "~/lib/workspaces-api";
import MemberSheet from "./member-sheet";

const SELECTED_WORKSPACE_OWNER_STORAGE_KEY = "selected-workspace-owner-id";

const getSelectedWorkspaceOwnerId = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(SELECTED_WORKSPACE_OWNER_STORAGE_KEY);
};

const hasAdminRole = (roles: WorkspaceMember["roles"]): boolean => {
  return roles.some(role => role.name.toLowerCase() === "admin");
};

const roleBadge = (roles: WorkspaceMember["roles"], isOwner: boolean) => {
  if (isOwner) {
    return (
      <Badge className="bg-brand/15 text-brand border border-transparent">
        Owner
      </Badge>
    );
  }

  if (hasAdminRole(roles)) {
    return (
      <Badge className="bg-brand/15 text-brand border border-transparent">
        Admin
      </Badge>
    );
  }

  if (roles.length > 0) {
    return (
      <Badge variant="secondary" className="border-border border capitalize">
        {roles[0]?.name}
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="border-border border">
      Member
    </Badge>
  );
};

const ActiveMembers = ({
  workspaceId,
  availableRoles,
  canAddRole,
  canRemoveRole,
}: {
  workspaceId: string;
  availableRoles: Role[];
  canAddRole: boolean;
  canRemoveRole: boolean;
}) => {
  const { data: session } = authClient.useSession();
  const selectedWorkspaceOwnerId = getSelectedWorkspaceOwnerId();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const { data: members = [] } = useQuery({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () => workspacesApi.listWorkspaceMembers(workspaceId),
    enabled: workspaceId !== "",
  });

  const selectedMember = members.find(m => m.id === selectedMemberId) ?? null;

  const sortedMembers = [...members].sort((a, b) => {
    const aIsCurrentUser = a.id === session?.user.id;
    const bIsCurrentUser = b.id === session?.user.id;

    if (aIsCurrentUser === bIsCurrentUser) {
      return 0;
    }

    return aIsCurrentUser ? -1 : 1;
  });

  return (
    <>
      <article className="border-border bg-background rounded-2xl border p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground flex items-center gap-2 text-sm font-semibold">
            Aktif Üyeler
          </h2>
        </div>

        <div className="space-y-2">
          {sortedMembers.map(member => {
            const roles = member.roles;
            const isOwner = member.id === selectedWorkspaceOwnerId;
            const isCurrentUser = member.id === session?.user.id;

            return (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedMemberId(member.id)}
                className={cn(
                  "bg-secondary/30 flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors hover:bg-secondary/60",
                  isCurrentUser ? "border-brand" : "border-border",
                )}
              >
                <div className="min-w-0">
                  <p className="text-foreground truncate text-sm font-medium">
                    {member.name ?? member.email}
                  </p>
                  <p className="text-muted-foreground mt-1 flex items-center gap-2 truncate text-xs">
                    <Mail className="size-3.5" />
                    {member.email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {roleBadge(roles, isOwner)}
                  {hasAdminRole(roles) ? (
                    <Shield className="text-brand size-4" />
                  ) : (
                    <User
                      className={cn(
                        "size-4",
                        isCurrentUser ? "text-brand" : "text-muted-foreground",
                      )}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </article>

      <MemberSheet
        member={selectedMember}
        open={selectedMember !== null}
        onOpenChange={open => {
          if (!open) {
            setSelectedMemberId(null);
          }
        }}
        workspaceId={workspaceId}
        availableRoles={availableRoles}
        canAddRole={canAddRole}
        canRemoveRole={canRemoveRole}
      />
    </>
  );
};

export default ActiveMembers;
