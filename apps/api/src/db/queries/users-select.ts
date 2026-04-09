import { count, desc, eq, sql } from "drizzle-orm";
import db from "~/db";
import { sessions, users } from "~/db/schema";

/**
 * SQL-select style examples with Drizzle.
 * These are composable and fully type-safe.
 */
export const usersSelect = {
  // select id, name, email from users order by created_at desc limit 50
  listBasic: async () =>
    db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(50),

  // select * from users where email = ? limit 1
  findByEmail: async (email: string) => {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user ?? null;
  },

  // select u.id, u.email, count(s.id) as session_count from users u left join sessions s ... group by u.id
  listWithSessionCount: async () =>
    db
      .select({
        userId: users.id,
        email: users.email,
        sessionCount: count(sessions.id),
      })
      .from(users)
      .leftJoin(sessions, eq(sessions.userId, users.id))
      .groupBy(users.id, users.email)
      .orderBy(desc(users.createdAt)),

  // custom sql fragment example
  listWithDomain: async () =>
    db
      .select({
        id: users.id,
        email: users.email,
        domain: sql<string>`split_part(${users.email}, '@', 2)`,
      })
      .from(users)
      .orderBy(desc(users.createdAt)),
};
