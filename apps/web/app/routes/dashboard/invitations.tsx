import type { InvitationWithEmail } from "@cleon/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, XCircle } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { invitationsApi } from "~/lib/invitations-api";
import { workspacesApi } from "~/lib/workspaces-api";
import DashboardHeader from "./_components/dashboard-header";

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
  expired: "Suresi doldu",
};

export default function InvitationsPage() {
  const queryClient = useQueryClient();

  const { data: workspaces = [] } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => workspacesApi.listWorkspaces(),
  });

  const {
    data: invitations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invitations", "personal"],
    queryFn: () => invitationsApi.listInvitations("", "personal"),
  });

  const { mutate: acceptInvitation, isPending: isAccepting } = useMutation({
    mutationFn: (invitationId: string) =>
      invitationsApi.acceptInvitation(invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitations", "personal"],
      });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  const { mutate: declineInvitation, isPending: isDeclining } = useMutation({
    mutationFn: (invitationId: string) =>
      invitationsApi.declineInvitation(invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitations", "personal"],
      });
    },
  });

  const workspaceNameById = new Map(workspaces.map(w => [w.id, w.name]));

  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <div className="flex items-center gap-2">
          <h1 className="text-foreground font-display text-base font-semibold">
            Gelen Davetler
          </h1>
          <Badge variant="secondary" className="text-xs">
            {invitations.length}
          </Badge>
        </div>
      </DashboardHeader>

      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        <section className="border-border bg-background rounded-2xl border p-5">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Yukleniyor...</p>
          ) : error ? (
            <p className="text-destructive text-sm">
              {error instanceof Error ? error.message : "Bir hata olustu."}
            </p>
          ) : invitations.length === 0 ? (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Inbox className="size-4" />
              Bekleyen davet bulunmuyor.
            </div>
          ) : (
            <div className="space-y-3">
              {invitations.map(invitation => (
                <article
                  key={invitation.id}
                  className="border-border bg-secondary/30 flex flex-col gap-3 rounded-xl border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-foreground text-sm font-medium">
                        {workspaceNameById.get(invitation.workspaceId) ??
                          "Workspace"}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Davet tarihi:{" "}
                        {new Date(invitation.createdAt).toLocaleDateString(
                          "tr-TR",
                        )}
                      </p>
                    </div>
                    <Badge
                      variant={statusVariantMap[invitation.status]}
                      className="border-border border"
                    >
                      {statusLabelMap[invitation.status]}
                    </Badge>
                  </div>

                  {invitation.status === "pending" ? (
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => acceptInvitation(invitation.id)}
                        disabled={isAccepting || isDeclining}
                      >
                        Kabul Et
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => declineInvitation(invitation.id)}
                        disabled={isAccepting || isDeclining}
                        className="gap-1"
                      >
                        <XCircle className="size-4" />
                        Reddet
                      </Button>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
