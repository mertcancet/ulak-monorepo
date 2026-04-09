import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const knowledgeSourceTypeEnum = pgEnum("knowledge_source_type", [
  "file",
  "text",
  "website",
]);

export const knowledgeSourceStatusEnum = pgEnum("knowledge_source_status", [
  "pending",
  "processing",
  "ready",
  "failed",
]);

export const businesses = pgTable(
  "businesses",
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    ownerUserId: uuid("owner_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [index().on(table.ownerUserId)],
);

export const knowledgeBases = pgTable(
  "knowledge_bases",
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true).notNull(),
    createdByUserId: uuid("created_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [
    index().on(table.businessId),
    index().on(table.createdByUserId),
    index().on(table.isActive),
  ],
);

export const knowledgeBaseSources = pgTable(
  "knowledge_base_sources",
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    knowledgeBaseId: uuid("knowledge_base_id")
      .notNull()
      .references(() => knowledgeBases.id, { onDelete: "cascade" }),
    sourceType: knowledgeSourceTypeEnum("source_type").notNull(),
    processingStatus: knowledgeSourceStatusEnum("processing_status")
      .default("pending")
      .notNull(),
    title: text("title").notNull(),
    content: text("content"),
    websiteUrl: text("website_url"),
    websiteCrawlDepth: integer("website_crawl_depth"),
    fileName: text("file_name"),
    fileMimeType: text("file_mime_type"),
    fileSizeBytes: bigint("file_size_bytes", { mode: "number" }),
    storagePath: text("storage_path"),
    checksum: text("checksum"),
    metadata: jsonb("metadata")
      .$type<Record<string, unknown>>()
      .default(sql`'{}'::jsonb`)
      .notNull(),
    errorMessage: text("error_message"),
    lastSyncedAt: timestamp("last_synced_at"),
    createdByUserId: uuid("created_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [
    index().on(table.businessId),
    index().on(table.knowledgeBaseId),
    index().on(table.sourceType),
    index().on(table.processingStatus),
    index().on(table.createdByUserId),
  ],
);

export const knowledgeBaseChunks = pgTable(
  "knowledge_base_chunks",
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    knowledgeBaseId: uuid("knowledge_base_id")
      .notNull()
      .references(() => knowledgeBases.id, { onDelete: "cascade" }),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => knowledgeBaseSources.id, { onDelete: "cascade" }),
    chunkIndex: integer("chunk_index").notNull(),
    content: text("content").notNull(),
    tokenCount: integer("token_count"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  table => [
    index().on(table.businessId),
    index().on(table.knowledgeBaseId),
    index().on(table.sourceId),
    uniqueIndex().on(table.sourceId, table.chunkIndex),
  ],
);

// export const knowledgeBaseRelations = defineRelationsPart(
//   {
//     users,
//     businesses,
//     // knowledgeBases,
//     // knowledgeBaseSources,
//     // knowledgeBaseChunks,
//   },
//   r => ({
//     users: {
//       businesses: r.many.businesses(),
//       // knowledgeBases: r.many.knowledgeBases(),
//       // knowledgeBaseSources: r.many.knowledgeBaseSources(),
//     },
//     businesses: {
//       owner: r.one.users({
//         from: r.businesses.ownerUserId,
//         to: r.users.id,
//       }),
//       // knowledgeBases: r.many.knowledgeBases(),
//       // knowledgeBaseSources: r.many.knowledgeBaseSources(),
//       // knowledgeBaseChunks: r.many.knowledgeBaseChunks(),
//     },
//     // knowledgeBases: {
//     //   business: r.one.businesses({
//     //     from: r.knowledgeBases.businessId,
//     //     to: r.businesses.id,
//     //   }),
//     //   createdBy: r.one.users({
//     //     from: r.knowledgeBases.createdByUserId,
//     //     to: r.users.id,
//     //   }),
//     //   sources: r.many.knowledgeBaseSources(),
//     //   chunks: r.many.knowledgeBaseChunks(),
//     // },
//     // knowledgeBaseSources: {
//     //   business: r.one.businesses({
//     //     from: r.knowledgeBaseSources.businessId,
//     //     to: r.businesses.id,
//     //   }),
//     //   knowledgeBase: r.one.knowledgeBases({
//     //     from: r.knowledgeBaseSources.knowledgeBaseId,
//     //     to: r.knowledgeBases.id,
//     //   }),
//     //   createdBy: r.one.users({
//     //     from: r.knowledgeBaseSources.createdByUserId,
//     //     to: r.users.id,
//     //   }),
//     //   chunks: r.many.knowledgeBaseChunks(),
//     // },
//     // knowledgeBaseChunks: {
//     //   business: r.one.businesses({
//     //     from: r.knowledgeBaseChunks.businessId,
//     //     to: r.businesses.id,
//     //   }),
//     //   knowledgeBase: r.one.knowledgeBases({
//     //     from: r.knowledgeBaseChunks.knowledgeBaseId,
//     //     to: r.knowledgeBases.id,
//     //   }),
//     //   source: r.one.knowledgeBaseSources({
//     //     from: r.knowledgeBaseChunks.sourceId,
//     //     to: r.knowledgeBaseSources.id,
//     //   }),
//     // },
//   }),
// );
