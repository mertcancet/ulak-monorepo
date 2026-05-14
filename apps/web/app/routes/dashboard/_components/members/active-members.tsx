import { Mail, Shield, User } from "lucide-react";
import { Badge } from "~/components/ui/badge";

const roleBadge = (role: string) => {
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

export default function ActiveMembers({ members }: { members: any[] }) {
  return (
    <article className="border-border bg-background rounded-2xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground flex items-center gap-2 text-sm font-semibold">
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
  );
}
