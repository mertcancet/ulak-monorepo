import { Trash2 } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export default function PendingInvites({
  pendingInvites,
  removeInvite,
}: {
  pendingInvites: any[];
  removeInvite: (id: string) => void;
}) {
  return (
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
              <Badge variant="secondary" className="border-border border">
                {invite.role}
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
