import { z } from "zod";

export const knowledgeBaseTypeSchema = z.enum(["file", "text", "website"]);

export const knowledgeBaseSelectSchema = z.object({
  id: z.uuidv7(),
  workspaceId: z.uuidv7(),
  name: z.string().min(3),
  description: z.string().nullable(),
  type: knowledgeBaseTypeSchema,
  textContent: z.string().nullable(),
  websiteUrl: z.string().nullable(),
  fileName: z.string().nullable(),
  fileUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const knowledgeBaseBaseInputSchema = z.object({
  workspaceId: z.uuidv7(),
  name: z.string().min(3),
  description: z.string().optional(),
  type: knowledgeBaseTypeSchema,
  textContent: z.string().min(1).optional(),
  websiteUrl: z.url().optional(),
  fileName: z.string().min(1).optional(),
  fileUrl: z.url().optional(),
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
      code: "custom",
      path: ["textContent"],
      message: "textContent is required when type is 'text'",
    });
  }

  if (data.type === "website" && !data.websiteUrl) {
    ctx.addIssue({
      code: "custom",
      path: ["websiteUrl"],
      message: "websiteUrl is required when type is 'website'",
    });
  }

  if (data.type === "file") {
    if (!data.fileName) {
      ctx.addIssue({
        code: "custom",
        path: ["fileName"],
        message: "fileName is required when type is 'file'",
      });
    }

    if (!data.fileUrl) {
      ctx.addIssue({
        code: "custom",
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

export type KnowledgeBaseType = z.infer<typeof knowledgeBaseTypeSchema>;
export type KnowledgeBase = z.infer<typeof knowledgeBaseSelectSchema>;
export type CreateKnowledgeBaseInput = z.infer<
  typeof knowledgeBaseInsertSchema
>;
export type UpdateKnowledgeBaseInput = z.infer<
  typeof knowledgeBaseUpdateSchema
>;
