import type { StatusMap } from "elysia";
import { z } from "zod";

type Title = keyof StatusMap | (string & {});

const badRequestSchema = z.object({
  title: z.string().transform(v => v as Title),
  detail: z.string().optional(),
  status: z.number().gt(99).lt(600),
  instance: z.string(),
  code: z.string().optional(),
  errors: z
    .object({
      path: z.string(),
      message: z.string(),
    })
    .array()
    .optional(),
});

export type BadRequest = z.infer<typeof badRequestSchema>;
