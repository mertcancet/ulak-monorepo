import { z } from "zod";
import type { AutocompleteString } from ".";

const titles = [
  "Bad Request",
  "Unauthorized",
  "Forbidden",
  "Not Found",
] as const;

const badRequestSchema = z.object({
  title: z
    .string()
    .transform(v => v as AutocompleteString<(typeof titles)[number]>),
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
