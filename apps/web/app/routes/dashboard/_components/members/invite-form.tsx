import { useMutation } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select } from "~/components/ui/select";
import { invitationsApi } from "~/lib/invitations-api";

export default function InviteForm({
  inviteEmail,
  inviteRole,
  roleOptions,
  canInvite,
  selectedWorkspaceId,
  setInviteEmail,
  setInviteRole,
  onSuccess,
}: {
  inviteEmail: string;
  inviteRole: string;
  roleOptions: { id: string; name: string }[];
  canInvite: boolean;
  selectedWorkspaceId: string;
  setInviteEmail: (email: string) => void;
  setInviteRole: (role: string) => void;
  onSuccess?: () => void;
}) {
  const { mutate: sendInvite, isPending } = useMutation({
    mutationFn: () =>
      invitationsApi.createInvitation(selectedWorkspaceId, {
        email: inviteEmail.trim().toLowerCase(),
        roles: [inviteRole],
      }),
    onSuccess: () => {
      setInviteEmail("");
      setInviteRole(roleOptions[0]?.id ?? "");
      onSuccess?.();
    },
  });

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
          onChange={e => setInviteRole(e.target.value)}
        >
          {roleOptions.length === 0 && <option value="">Rol bulunamadi</option>}
          {roleOptions.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </Select>
      </div>

      <Button
        onClick={() => sendInvite()}
        disabled={!canInvite || selectedWorkspaceId === "" || isPending}
      >
        {isPending ? "Gönderiliyor..." : "Davet Et"}
      </Button>
    </div>
  );
}
