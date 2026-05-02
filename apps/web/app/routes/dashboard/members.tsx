import {
  Briefcase,
  Building2,
  Mail,
  Plus,
  Shield,
  Trash2,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select } from "~/components/ui/select";
import DashboardHeader from "./_components/dashboard-header";

type MemberRole = "member" | "admin";

interface MemberItem {
  id: string;
  email: string;
  role: MemberRole;
  joinedAt: string;
}

interface PendingInviteItem {
  id: string;
  email: string;
  role: MemberRole;
  invitedAt: string;
}

interface OrganizationItem {
  id: string;
  name: string;
}

interface WorkspaceItem {
  id: string;
  organizationId: string;
  name: string;
}

interface MemberAssignmentItem extends MemberItem {
  workspaceId: string;
  workspaceName: string;
  organizationId: string;
  organizationName: string;
}

const initialOrganizations: OrganizationItem[] = [
  {
    id: "org-1",
    name: "CallingAI",
  },
  {
    id: "org-2",
    name: "Northwind",
  },
];

const initialWorkspaces: WorkspaceItem[] = [
  {
    id: "ws-1",
    organizationId: "org-1",
    name: "Main Workspace",
  },
  {
    id: "ws-2",
    organizationId: "org-1",
    name: "Sales Ops",
  },
  {
    id: "ws-3",
    organizationId: "org-2",
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

const initialInvitesByWorkspace: Record<string, PendingInviteItem[]> = {
  "ws-1": [
    {
      id: "i-1",
      email: "sales@example.com",
      role: "member",
      invitedAt: "Bugün",
    },
  ],
  "ws-2": [],
  "ws-3": [],
};

const workspaceFallbackMember: MemberItem = {
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

const initialInvites: PendingInviteItem[] = [
  {
    id: "i-1",
    email: "sales@example.com",
    role: "member",
    invitedAt: "Bugün",
  },
];

const roleBadge = (role: MemberRole) => {
  if (role === "admin") {
    return (
      <Badge className="bg-brand/15 text-brand border border-transparent">
        Admin
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="border-border border">
      Member
    </Badge>
  );
};

export default function MembersPage() {
  const [organizations, setOrganizations] =
    useState<OrganizationItem[]>(initialOrganizations);
  const [workspaces, setWorkspaces] =
    useState<WorkspaceItem[]>(initialWorkspaces);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>(
    initialOrganizations[0]?.id ?? "",
  );
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>(
    initialWorkspaces[0]?.id ?? "",
  );

  const [newOrganizationName, setNewOrganizationName] = useState("");
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const [membersByWorkspace, setMembersByWorkspace] = useState<
    Record<string, MemberItem[]>
  >(initialMembersByWorkspace);
  const [invitesByWorkspace, setInvitesByWorkspace] = useState<
    Record<string, PendingInviteItem[]>
  >(initialInvitesByWorkspace);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<MemberRole>("member");

  const organizationWorkspaces = useMemo(
    () =>
      workspaces.filter(
        workspace => workspace.organizationId === selectedOrganizationId,
      ),
    [selectedOrganizationId, workspaces],
  );

  useEffect(() => {
    if (
      organizationWorkspaces.length > 0 &&
      !organizationWorkspaces.some(ws => ws.id === selectedWorkspaceId)
    ) {
      setSelectedWorkspaceId(organizationWorkspaces[0]?.id ?? "");
    }

    if (organizationWorkspaces.length === 0) {
      setSelectedWorkspaceId("");
    }
  }, [organizationWorkspaces, selectedWorkspaceId]);

  const members = selectedWorkspaceId
    ? (membersByWorkspace[selectedWorkspaceId] ?? initialMembers)
    : [];

  const pendingInvites = selectedWorkspaceId
    ? (invitesByWorkspace[selectedWorkspaceId] ?? initialInvites)
    : [];

  const memberAssignments = useMemo<MemberAssignmentItem[]>(() => {
    return workspaces.flatMap(workspace => {
      const organization = organizations.find(
        item => item.id === workspace.organizationId,
      );
      const workspaceMembers = membersByWorkspace[workspace.id] ?? [];

      return workspaceMembers.map(member => ({
        ...member,
        workspaceId: workspace.id,
        workspaceName: workspace.name,
        organizationId: workspace.organizationId,
        organizationName: organization?.name ?? "Unknown Organization",
      }));
    });
  }, [membersByWorkspace, organizations, workspaces]);

  const normalizedEmail = inviteEmail.trim().toLowerCase();

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const hasDuplicate =
    members.some(member => member.email.toLowerCase() === normalizedEmail) ||
    pendingInvites.some(
      invite => invite.email.toLowerCase() === normalizedEmail,
    );

  const canInvite = isValidEmail(normalizedEmail) && !hasDuplicate;

  const canCreateOrganization = newOrganizationName.trim().length >= 3;

  const canCreateWorkspace =
    newWorkspaceName.trim().length >= 3 && selectedOrganizationId !== "";

  const handleCreateOrganization = () => {
    if (!canCreateOrganization) {
      return;
    }

    const newOrganization: OrganizationItem = {
      id: crypto.randomUUID(),
      name: newOrganizationName.trim(),
    };

    setOrganizations(current => [...current, newOrganization]);
    setSelectedOrganizationId(newOrganization.id);
    setNewOrganizationName("");
  };

  const handleCreateWorkspace = () => {
    if (!canCreateWorkspace) {
      return;
    }

    const newWorkspace: WorkspaceItem = {
      id: crypto.randomUUID(),
      organizationId: selectedOrganizationId,
      name: newWorkspaceName.trim(),
    };

    setWorkspaces(current => [...current, newWorkspace]);
    setMembersByWorkspace(current => ({
      ...current,
      [newWorkspace.id]: [
        {
          ...workspaceFallbackMember,
          id: crypto.randomUUID(),
        },
      ],
    }));
    setInvitesByWorkspace(current => ({
      ...current,
      [newWorkspace.id]: [],
    }));
    setSelectedWorkspaceId(newWorkspace.id);
    setNewWorkspaceName("");
  };

  const handleInvite = () => {
    if (!canInvite || !selectedWorkspaceId) {
      return;
    }

    const newInvite: PendingInviteItem = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      role: inviteRole,
      invitedAt: "Şimdi",
    };

    setInvitesByWorkspace(current => ({
      ...current,
      [selectedWorkspaceId]: [
        newInvite,
        ...(current[selectedWorkspaceId] ?? []),
      ],
    }));
    setInviteEmail("");
    setInviteRole("member");
  };

  const removeInvite = (id: string) => {
    if (!selectedWorkspaceId) {
      return;
    }

    setInvitesByWorkspace(current => ({
      ...current,
      [selectedWorkspaceId]: (current[selectedWorkspaceId] ?? []).filter(
        item => item.id !== id,
      ),
    }));
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
                Organization ve Workspace
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Üyeler ve davetler seçtiğiniz workspace kapsamında yönetilir.
              </p>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div className="border-border rounded-xl border p-3">
              <div className="mb-3 flex items-center gap-2">
                <Building2 className="text-muted-foreground size-4" />
                <p className="text-foreground text-sm font-medium">
                  Organization
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Select
                  value={selectedOrganizationId}
                  onChange={e => setSelectedOrganizationId(e.target.value)}
                >
                  {organizations.map(organization => (
                    <option key={organization.id} value={organization.id}>
                      {organization.name}
                    </option>
                  ))}
                </Select>

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Yeni organization adı"
                    value={newOrganizationName}
                    onChange={e => setNewOrganizationName(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    onClick={handleCreateOrganization}
                    disabled={!canCreateOrganization}
                  >
                    <Plus className="size-4" />
                    Ekle
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-border rounded-xl border p-3">
              <div className="mb-3 flex items-center gap-2">
                <Briefcase className="text-muted-foreground size-4" />
                <p className="text-foreground text-sm font-medium">Workspace</p>
              </div>
              <div className="flex flex-col gap-3">
                <Select
                  value={selectedWorkspaceId}
                  onChange={e => setSelectedWorkspaceId(e.target.value)}
                  disabled={organizationWorkspaces.length === 0}
                >
                  {organizationWorkspaces.length === 0 && (
                    <option value="">Workspace bulunamadı</option>
                  )}
                  {organizationWorkspaces.map(workspace => (
                    <option key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </option>
                  ))}
                </Select>

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Yeni workspace adı"
                    value={newWorkspaceName}
                    onChange={e => setNewWorkspaceName(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    onClick={handleCreateWorkspace}
                    disabled={!canCreateWorkspace}
                  >
                    <Plus className="size-4" />
                    Ekle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

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

          <div className="grid gap-3 md:grid-cols-[1fr_180px_auto] md:items-end">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="invite-email">Email</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="or. ekip@company.com"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="invite-role">Rol</Label>
              <Select
                id="invite-role"
                value={inviteRole}
                onChange={e => setInviteRole(e.target.value as MemberRole)}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </Select>
            </div>

            <Button
              onClick={handleInvite}
              disabled={!canInvite || selectedWorkspaceId === ""}
            >
              Davet Et
            </Button>
          </div>

          {selectedWorkspaceId === "" && (
            <p className="text-destructive mt-2 text-xs">
              Davet göndermek için önce bir workspace seçin.
            </p>
          )}

          {inviteEmail.trim() !== "" && !isValidEmail(normalizedEmail) && (
            <p className="text-destructive mt-2 text-xs">
              Geçerli bir email adresi girin.
            </p>
          )}

          {isValidEmail(normalizedEmail) && hasDuplicate && (
            <p className="text-destructive mt-2 text-xs">
              Bu email zaten ekipte veya bekleyen davetlerde mevcut.
            </p>
          )}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="border-border bg-background rounded-2xl border p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-foreground flex items-center gap-2 text-sm font-semibold">
                <Users className="size-4" />
                Aktif Üyeler
              </h2>
            </div>

            <div className="space-y-2">
              {members.map(member => (
                <div
                  key={member.id}
                  className="border-border bg-secondary/30 flex items-center justify-between gap-3 rounded-xl border p-3"
                >
                  <div className="min-w-0">
                    <p className="text-foreground flex items-center gap-2 truncate text-sm font-medium">
                      <Mail className="text-muted-foreground size-3.5" />
                      {member.email}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Katılım: {member.joinedAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {roleBadge(member.role)}
                    {member.role === "admin" ? (
                      <Shield className="text-brand size-4" />
                    ) : (
                      <User className="text-muted-foreground size-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="border-border bg-background rounded-2xl border p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-foreground text-sm font-semibold">
                Bekleyen Davetler
              </h2>
              <Badge variant="outline" className="text-xs">
                {pendingInvites.length}
              </Badge>
            </div>

            {pendingInvites.length === 0 && (
              <p className="text-muted-foreground text-sm">
                Bekleyen davet bulunmuyor.
              </p>
            )}

            <div className="space-y-2">
              {pendingInvites.map(invite => (
                <div
                  key={invite.id}
                  className="border-border bg-secondary/30 flex items-center justify-between gap-3 rounded-xl border p-3"
                >
                  <div className="min-w-0">
                    <p className="text-foreground truncate text-sm font-medium">
                      {invite.email}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Gönderildi: {invite.invitedAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {roleBadge(invite.role)}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInvite(invite.id)}
                      aria-label="Davet iptal et"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="border-border bg-background rounded-2xl border p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-foreground text-sm font-semibold">
              Üye Atamaları (Organization / Workspace)
            </h2>
            <Badge variant="outline" className="text-xs">
              {memberAssignments.length} toplam
            </Badge>
          </div>

          {memberAssignments.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Henüz üye ataması yok.
            </p>
          )}

          <div className="space-y-2">
            {memberAssignments.map(member => (
              <div
                key={`${member.workspaceId}-${member.id}`}
                className="border-border bg-secondary/30 flex items-center justify-between gap-3 rounded-xl border p-3"
              >
                <div className="min-w-0">
                  <p className="text-foreground truncate text-sm font-medium">
                    {member.email}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Katılım: {member.joinedAt}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {roleBadge(member.role)}
                  <Badge variant="outline" className="text-[11px]">
                    {member.organizationName}
                  </Badge>
                  <Badge variant="secondary" className="text-[11px]">
                    {member.workspaceName}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
