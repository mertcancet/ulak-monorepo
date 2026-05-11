import { sql } from "drizzle-orm";
import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { type UserMetadata, userMetadataSchema } from "~/modules/auth/types";

export const users = pgTable("users", {
  id: uuid().primaryKey().default(sql`uuidv7()`),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
  metadata: jsonb().$type<UserMetadata>(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const userSelectSchema = createSelectSchema(users);

export const userInsertSchema = createInsertSchema(users, {
  metadata: userMetadataSchema,
}).omit({
  id: true,
  email: true,
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
});
