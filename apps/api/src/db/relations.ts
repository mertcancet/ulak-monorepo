import { defineRelations } from "drizzle-orm";
import { accounts, sessions, users } from "~/db/schema";

const relations = defineRelations(
  {
    users,
    sessions,
    accounts,
  },
  r => ({
    users: {
      sessions: r.many.sessions(),
      accounts: r.many.accounts(),
    },
    sessions: {
      users: r.one.users({
        from: r.sessions.userId,
        to: r.users.id,
      }),
    },
    accounts: {
      users: r.one.users({
        from: r.accounts.userId,
        to: r.users.id,
      }),
    },
  }),
);

export default relations;
