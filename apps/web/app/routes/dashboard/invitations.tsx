import type { Invitation } from "@cleon/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Inbox, UserRound, XCircle } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { invitationsApi } from "~/lib/invitations-api";
import DashboardHeader from "./_components/dashboard-header";

const statusVariantMap: Record<
  Invitation["status"],
  "secondary" | "outline" | "destructive"
> = {
  pending: "secondary",
  accepted: "outline",
  declined: "destructive",
  expired: "destructive",
};

const statusLabelMap: Record<Invitation["status"], string> = {
  pending: "Bekliyor",
  accepted: "Kabul edildi",
  declined: "Reddedildi",
  expired: "Suresi doldu",
};

export default function InvitationsPage() {
  const queryClient = useQueryClient();

  const {
    data: invitations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invitations", "personal"],
    queryFn: () => invitationsApi.listInvitations(undefined, "personal"),
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
        <section className="border-border/70 bg-background/70 rounded-2xl border p-5 shadow-sm backdrop-blur-sm">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Yukleniyor...</p>
          ) : error ? (
            <p className="text-destructive text-sm">
              {error instanceof Error ? error.message : "Bir hata olustu."}
            </p>
          ) : invitations.length === 0 ? (
            <div className="text-muted-foreground flex items-center gap-2 rounded-xl border border-dashed px-4 py-6 text-sm">
              <Inbox className="size-4" />
              Bekleyen davet bulunmuyor.
            </div>
          ) : (
            <div className="space-y-4">
              {invitations.map(invitation => (
                <article
                  key={invitation.id}
                  className="border-border/80 bg-linear-to-br from-secondary/35 to-background flex flex-col gap-4 rounded-xl border p-4 shadow-sm transition-colors hover:from-secondary/45"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-3">
                      <p className="text-foreground text-sm font-semibold tracking-tight">
                        {invitation.workspaceName}
                      </p>

                      <div className="grid gap-2 text-xs sm:grid-cols-2">
                        <p className="text-muted-foreground bg-background/80 inline-flex items-center gap-1 rounded-md px-2 py-1">
                          <UserRound className="size-3" />
                          Davet eden: {invitation.invitedBy.name} (
                          {invitation.invitedBy.email})
                        </p>
                        <p className="text-muted-foreground bg-background/80 inline-flex items-center gap-1 rounded-md px-2 py-1">
                          <CalendarDays className="size-3" />
                          Davet:{" "}
                          {new Date(invitation.createdAt).toLocaleDateString(
                            "tr-TR",
                          )}
                        </p>
                        <p className="text-muted-foreground bg-background/80 inline-flex items-center gap-1 rounded-md px-2 py-1 sm:col-span-2">
                          <CalendarDays className="size-3" />
                          Son gecerlilik:{" "}
                          {new Date(invitation.expiresAt).toLocaleDateString(
                            "tr-TR",
                          )}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={statusVariantMap[invitation.status]}
                      className="border-border shrink-0 border"
                    >
                      {statusLabelMap[invitation.status]}
                    </Badge>
                  </div>

                  {invitation.status === "pending" ? (
                    <div className="flex items-center justify-end gap-2 border-t pt-3">
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
