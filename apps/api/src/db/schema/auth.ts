import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const sessions = pgTable(
  "sessions",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    token: text().notNull().unique(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  table => [index().on(table.userId)],
);

export const accounts = pgTable(
  "accounts",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    accountId: uuid().notNull(),
    providerId: text().notNull(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ withTimezone: true }),
    refreshTokenExpiresAt: timestamp({ withTimezone: true }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [index().on(table.userId)],
);

export const verifications = pgTable(
  "verifications",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [index().on(table.identifier)],
);
