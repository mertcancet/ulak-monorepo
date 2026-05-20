import type { InvitationWithEmail } from "@cleon/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { invitationsApi } from "~/lib/invitations-api";

const statusVariantMap: Record<
  InvitationWithEmail["status"],
  "secondary" | "outline" | "destructive"
> = {
  pending: "secondary",
  accepted: "outline",
  declined: "destructive",
  expired: "destructive",
};

const statusLabelMap: Record<InvitationWithEmail["status"], string> = {
  pending: "Bekliyor",
  accepted: "Kabul edildi",
  declined: "Reddedildi",
  expired: "Süresi doldu",
};

export default function PendingInvites({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const queryClient = useQueryClient();

  const { data: invitations = [] } = useQuery({
    queryKey: ["invitations", workspaceId],
    queryFn: () => invitationsApi.listInvitations(workspaceId),
    enabled: workspaceId !== "",
  });

  const { mutate: removeInvite } = useMutation({
    mutationFn: (id: string) =>
      invitationsApi.deleteInvitation(workspaceId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations", workspaceId] });
    },
  });

  return (
    <article className="border-border bg-background rounded-2xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-sm font-semibold">
          Bekleyen Davetler
        </h2>
        <Badge variant="outline" className="text-xs">
          {invitations.length}
        </Badge>
      </div>

      {invitations.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Bekleyen davet bulunmuyor.
        </p>
      )}

      <div className="space-y-2">
        {invitations.map(invite => (
          <div
            key={invite.id}
            className="border-border bg-secondary/30 flex items-center justify-between gap-3 rounded-xl border p-3"
          >
            <div className="min-w-0">
              <p className="text-foreground truncate text-sm font-medium">
                {invite.email}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Gönderildi:{" "}
                {new Date(invite.createdAt).toLocaleDateString("tr-TR")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={statusVariantMap[invite.status]}
                className="border-border border"
              >
                {statusLabelMap[invite.status]}
              </Badge>
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
  );
}
