import { sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().default(sql`uuidv7()`),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
