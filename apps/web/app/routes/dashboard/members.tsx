import { useMutation, useQuery } from "@tanstack/react-query";
import { Building2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { rolesApi } from "~/lib/roles-api";
import { workspacesApi } from "~/lib/workspaces-api";
import { useWorkspaceStore } from "~/store/workspace-store";
import DashboardHeader from "./_components/dashboard-header";
import ActiveMembers from "./_components/members/active-members";
import InviteForm from "./_components/members/invite-form";
import MemberAssignments from "./_components/members/member-assignments";
import PendingInvites from "./_components/members/pending-invites";
import RolesManagement from "./_components/members/roles-management";
import WorkspaceSelector from "./_components/members/workspace-selector";

interface MemberItem {
  id: string;
  email: string;
  role: string;
  joinedAt: string;
}

interface WorkspaceItem {
  id: string;
  name: string;
}

interface MemberAssignmentItem extends MemberItem {
  workspaceId: string;
  workspaceName: string;
}

const initialWorkspaces: WorkspaceItem[] = [
  {
    id: "ws-1",
    name: "Main Workspace",
  },
  {
    id: "ws-2",
    name: "Sales Ops",
  },
  {
    id: "ws-3",
    name: "Support",
  },
];

const initialMembersByWorkspace: Record<string, MemberItem[]> = {
  "ws-1": [
    {
      id: "m-1",
      email: "owner@callingai.com",
      role: "admin",
      joinedAt: "2 Mayıs 2026",
    },
    {
      id: "m-2",
      email: "ops@callingai.com",
      role: "member",
      joinedAt: "28 Nisan 2026",
    },
  ],
  "ws-2": [
    {
      id: "m-3",
      email: "saleslead@callingai.com",
      role: "admin",
      joinedAt: "20 Nisan 2026",
    },
  ],
  "ws-3": [
    {
      id: "m-4",
      email: "support@northwind.com",
      role: "member",
      joinedAt: "30 Nisan 2026",
    },
  ],
};

const _workspaceFallbackMember: MemberItem = {
  id: "m-default",
  email: "owner@example.com",
  role: "admin",
  joinedAt: "Bugün",
};

const initialMembers: MemberItem[] = [
  {
    id: "m-1",
    email: "owner@callingai.com",
    role: "admin",
    joinedAt: "2 Mayıs 2026",
  },
  {
    id: "m-2",
    email: "ops@callingai.com",
    role: "member",
    joinedAt: "28 Nisan 2026",
  },
];

export default function MembersPage() {
  const [_workspaces, _setWorkspaces] =
    useState<WorkspaceItem[]>(initialWorkspaces);
  const selectedWorkspaceId = useWorkspaceStore(
    state => state.selectedWorkspaceId,
  );
  const { setSelectedWorkspaceId } = useWorkspaceStore();

  const { data: workspacesData, refetch } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => workspacesApi.listWorkspaces(),
  });

  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const [membersByWorkspace, _setMembersByWorkspace] = useState<
    Record<string, MemberItem[]>
  >(initialMembersByWorkspace);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");

  const { data: workspaceRoles = [] } = useQuery({
    queryKey: ["roles", selectedWorkspaceId],
    queryFn: () => rolesApi.listRoles(selectedWorkspaceId ?? ""),
    enabled: (selectedWorkspaceId ?? "") !== "",
  });

  useEffect(() => {
    if (workspaceRoles.length === 0) {
      setInviteRole("");
      return;
    }

    const roleIds = workspaceRoles.map(r => r.id);
    if (inviteRole === "" || !roleIds.includes(inviteRole)) {
      setInviteRole(workspaceRoles[0]?.id ?? "");
    }
  }, [inviteRole, workspaceRoles]);

  const members = selectedWorkspaceId
    ? (membersByWorkspace[selectedWorkspaceId] ?? initialMembers)
    : [];

  const memberAssignments: MemberAssignmentItem[] = _workspaces.flatMap(
    workspace => {
      const workspaceMembers = membersByWorkspace[workspace.id] ?? [];
      return workspaceMembers.map(member => ({
        ...member,
        workspaceId: workspace.id,
        workspaceName: workspace.name,
      }));
    },
  );

  const normalizedEmail = inviteEmail.trim().toLowerCase();

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const hasDuplicate = members.some(
    member => member.email.toLowerCase() === normalizedEmail,
  );

  const canInvite =
    isValidEmail(normalizedEmail) && !hasDuplicate && inviteRole !== "";

  const canCreateWorkspace = newWorkspaceName.trim().length >= 3;

  const { mutate: createWorkspace } = useMutation({
    mutationFn: (name: string) => workspacesApi.createWorkspace({ name }),
    onSuccess: (data, _workspaceName) => {
      refetch().then(() => {
        setSelectedWorkspaceId(data.id);
      });
      setNewWorkspaceName("");
    },
  });

  const handleCreateWorkspace = () => {
    if (!canCreateWorkspace) {
      return;
    }

    createWorkspace(newWorkspaceName.trim());
  };

  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <div className="flex items-center gap-2">
          <h1 className="text-foreground font-display text-base font-semibold">
            Üye Yönetimi
          </h1>
          <Badge variant="secondary" className="text-xs">
            {members.length} aktif üye
          </Badge>
        </div>
      </DashboardHeader>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
        <section className="border-border bg-background rounded-2xl border p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-foreground flex items-center gap-2 text-sm font-semibold">
                <Building2 className="size-4" />
                Workspace
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Üyeler ve davetler seçtiğiniz workspace kapsamında yönetilir.
              </p>
            </div>
          </div>

          <WorkspaceSelector
            selectedWorkspaceId={selectedWorkspaceId ?? ""}
            workspacesData={workspacesData || []}
            newWorkspaceName={newWorkspaceName}
            canCreateWorkspace={canCreateWorkspace}
            handleCreateWorkspace={handleCreateWorkspace}
            setSelectedWorkspaceId={setSelectedWorkspaceId}
            setNewWorkspaceName={setNewWorkspaceName}
          />
        </section>

        <Tabs defaultValue="members" className="flex-1">
          <TabsList>
            <TabsTrigger value="members" className="gap-2">
              <UserPlus className="size-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="mt-6 space-y-6">
            <section className="border-border bg-background rounded-2xl border p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-foreground flex items-center gap-2 text-sm font-semibold">
                    <UserPlus className="size-4" />
                    Davet Gönder
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Email ile ekip üyesi davet edin ve rol atayın.
                  </p>
                </div>
              </div>

              <InviteForm
                inviteEmail={inviteEmail}
                inviteRole={inviteRole}
                roleOptions={workspaceRoles}
                canInvite={canInvite}
                selectedWorkspaceId={selectedWorkspaceId ?? ""}
                setInviteEmail={setInviteEmail}
                setInviteRole={setInviteRole}
              />
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <ActiveMembers members={members} />
              <PendingInvites workspaceId={selectedWorkspaceId ?? ""} />
            </section>

            <MemberAssignments memberAssignments={memberAssignments} />
          </TabsContent>

          <TabsContent value="roles" className="mt-6">
            <RolesManagement
              selectedWorkspaceId={selectedWorkspaceId ?? ""}
              roles={workspaceRoles}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
