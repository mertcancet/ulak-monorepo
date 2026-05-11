import type { StatusMap } from "elysia";
import { z } from "zod";

const badRequestSchema = z.object({
  title: z.string().transform(v => v as keyof StatusMap),
  detail: z.string().optional(),
  status: z.number().gt(99).lt(600),
  instance: z.string(),
  errors: z
    .object({
      path: z.string(),
      message: z.string(),
    })
    .array()
    .optional(),
});

export type BadRequest = z.infer<typeof badRequestSchema>;
