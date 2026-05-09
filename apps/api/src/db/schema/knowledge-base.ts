import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";
import { workspaces } from "./workspaces";

// --- END TYPE EXPORTS ---

export const knowledgeBaseTypeEnum = pgEnum("knowledge_base_type", [
  "file",
  "text",
  "website",
]);

export const knowledgeBase = pgTable("knowledge_base", {
  id: uuid().primaryKey().default(sql`uuidv7()`),
  workspaceId: uuid()
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),

  name: text().notNull(),
  description: text(),
  type: knowledgeBaseTypeEnum().notNull(),
  textContent: text(),
  websiteUrl: text(),
  fileName: text(),
  fileUrl: text(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const knowledgeBaseSelectSchema = createSelectSchema(knowledgeBase);

const knowledgeBaseBaseInputSchema = createInsertSchema(knowledgeBase, {
  name: z.string().min(3),
  workspaceId: z.uuidv7(),
  type: z.enum(["file", "text", "website"]),
  textContent: z.string().min(1).optional(),
  websiteUrl: z.url().optional(),
  fileName: z.string().min(1).optional(),
  fileUrl: z.url().optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const addTypeSpecificValidation = (
  data: {
    type?: "file" | "text" | "website";
    textContent?: string | null;
    websiteUrl?: string | null;
    fileName?: string | null;
    fileUrl?: string | null;
  },
  ctx: z.RefinementCtx,
): void => {
  if (!data.type) {
    return;
  }

  if (data.type === "text" && !data.textContent) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["textContent"],
      message: "textContent is required when type is 'text'",
    });
  }

  if (data.type === "website" && !data.websiteUrl) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["websiteUrl"],
      message: "websiteUrl is required when type is 'website'",
    });
  }

  if (data.type === "file") {
    if (!data.fileName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fileName"],
        message: "fileName is required when type is 'file'",
      });
    }

    if (!data.fileUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fileUrl"],
        message: "fileUrl is required when type is 'file'",
      });
    }
  }
};

export const knowledgeBaseInsertSchema =
  knowledgeBaseBaseInputSchema.superRefine((data, ctx) => {
    addTypeSpecificValidation(data, ctx);
  });

export const knowledgeBaseUpdateSchema = knowledgeBaseBaseInputSchema
  .partial()
  .omit({
    workspaceId: true,
  })
  .superRefine((data, ctx) => {
    addTypeSpecificValidation(data, ctx);
  });

export type KnowledgeBase = z.infer<typeof knowledgeBaseSelectSchema>;
