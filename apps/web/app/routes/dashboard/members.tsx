import { Mail, Shield, Trash2, User, UserPlus, Users } from "lucide-react";
import { useState } from "react";
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
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<MemberRole>("member");
  const [members] = useState<MemberItem[]>(initialMembers);
  const [pendingInvites, setPendingInvites] =
    useState<PendingInviteItem[]>(initialInvites);

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

  const handleInvite = () => {
    if (!canInvite) {
      return;
    }

    const newInvite: PendingInviteItem = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      role: inviteRole,
      invitedAt: "Şimdi",
    };

    setPendingInvites(current => [newInvite, ...current]);
    setInviteEmail("");
    setInviteRole("member");
  };

  const removeInvite = (id: string) => {
    setPendingInvites(current => current.filter(item => item.id !== id));
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

            <Button onClick={handleInvite} disabled={!canInvite}>
              Davet Et
            </Button>
          </div>

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
      </div>
    </div>
  );
}
