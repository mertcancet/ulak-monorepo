import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select } from "~/components/ui/select";

type MemberRole = "member" | "admin";

export default function InviteForm({
  inviteEmail,
  inviteRole,
  canInvite,
  selectedWorkspaceId,
  setInviteEmail,
  setInviteRole,
  handleInvite,
}: {
  inviteEmail: string;
  inviteRole: MemberRole;
  canInvite: boolean;
  selectedWorkspaceId: string;
  setInviteEmail: (email: string) => void;
  setInviteRole: (role: MemberRole) => void;
  handleInvite: () => void;
}) {
  return (
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
  );
}
