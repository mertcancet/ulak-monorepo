import { z } from "zod";

const paginatedQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(20).optional().default(20),
});

export function paginatedResponse<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    data: schema,
    pagination: paginatedQuerySchema.extend({
      total: z.coerce.number(),
    }),
  });
}

export default paginatedQuerySchema;
