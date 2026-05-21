import { useMutation } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { invitationsApi } from "~/lib/invitations-api";

export default function InviteForm({
  inviteEmail,
  inviteRoles,
  roleOptions,
  canInvite,
  selectedWorkspaceId,
  setInviteEmail,
  setInviteRoles,
  onSuccess,
}: {
  inviteEmail: string;
  inviteRoles: string[];
  roleOptions: { id: string; name: string }[];
  canInvite: boolean;
  selectedWorkspaceId: string;
  setInviteEmail: (email: string) => void;
  setInviteRoles: (roles: string[]) => void;
  onSuccess?: () => void;
}) {
  const selectedRoleNames = roleOptions
    .filter(role => inviteRoles.includes(role.id))
    .map(role => role.name);

  const selectedRolesLabel =
    selectedRoleNames.length > 0 ? selectedRoleNames.join(", ") : "Rol secin";

  const { mutate: sendInvite, isPending } = useMutation({
    mutationFn: () =>
      invitationsApi.createInvitation(selectedWorkspaceId, {
        email: inviteEmail.trim().toLowerCase(),
        roles: inviteRoles,
      }),
    onSuccess: () => {
      setInviteEmail("");
      setInviteRoles([]);
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
        <Label htmlFor="invite-role">Roller</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              id="invite-role"
              type="button"
              variant="outline"
              className="h-9 w-full justify-between overflow-hidden"
              disabled={roleOptions.length === 0}
            >
              <span className="truncate text-left">{selectedRolesLabel}</span>
              <ChevronDown className="text-muted-foreground size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-55">
            {roleOptions.length === 0 && (
              <p className="text-muted-foreground px-2 py-1 text-sm">
                Rol bulunamadi
              </p>
            )}

            {roleOptions.map(role => {
              const isChecked = inviteRoles.includes(role.id);

              return (
                <DropdownMenuCheckboxItem
                  key={role.id}
                  checked={isChecked}
                  onSelect={event => {
                    event.preventDefault();
                  }}
                  onCheckedChange={checked => {
                    if (checked) {
                      setInviteRoles([...inviteRoles, role.id]);
                      return;
                    }

                    setInviteRoles(
                      inviteRoles.filter(roleId => roleId !== role.id),
                    );
                  }}
                >
                  {role.name}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
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
