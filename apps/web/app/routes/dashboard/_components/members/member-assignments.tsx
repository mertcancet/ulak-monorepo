import { Badge } from "~/components/ui/badge";

interface MemberAssignmentItem {
  id: string;
  email: string;
  role: string;
  joinedAt: string;
  workspaceId: string;
  workspaceName: string;
}

export default function MemberAssignments({
  memberAssignments,
}: {
  memberAssignments: MemberAssignmentItem[];
}) {
  return (
    <section className="border-border bg-background rounded-2xl border p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-foreground text-sm font-semibold">
          Üye Atamaları (Workspace)
        </h2>
        <Badge variant="outline" className="text-xs">
          {memberAssignments.length} toplam
        </Badge>
      </div>

      {memberAssignments.length === 0 && (
        <p className="text-muted-foreground text-sm">Henüz üye ataması yok.</p>
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
              <Badge variant="secondary" className="border-border border">
                {member.role}
              </Badge>
              <Badge variant="secondary" className="text-[11px]">
                {member.workspaceName}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
