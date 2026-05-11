import { Ajv } from "ajv";
import { z } from "zod";

const httpTool = z.object({
  type: z.literal("HTTP"),
  url: z.url(),
  method: z.literal(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  headers: z.record(z.string(), z.string()).optional(),
  timeout: z.number().gt(0).default(10).optional(),
  max_retry: z.number().gte(0).default(0).optional(),
  parameters: z.record(z.string(), z.unknown()).refine(
    params => {
      const ajv = new Ajv();

      try {
        ajv.compile(params);
        return true;
      } catch {
        return false;
      }
    },
    { error: "Must be a valid json schema." },
  ),
  body_type: z.literal(["json", "form-data"]),
  body: z.string().optional(),
  query_params: z.record(z.string(), z.string()).optional(),
  follow_redirects: z.boolean().default(false).optional(),
  error_message: z.string(),
  success_message: z.string().optional(),
});

const endCallTool = z.object({
  type: z.literal("EndCall"),
  end_instructions: z.string().optional(),
});

export const toolSettingsSchema = z.discriminatedUnion("type", [
  httpTool,
  endCallTool,
]);

export const toolsSelectSchema = z.object({
  id: z.uuidv7(),
  workspaceId: z.uuidv7(),
  name: z
    .string()
    .min(3)
    .regex(/^[a-z][a-z0-9_-]*$/, {
      message:
        "Tool name should only contain alphanumeric characters, underscores and hyphens.",
    }),
  description: z.string(),
  disallowInterruptions: z.boolean().default(false),
  settings: toolSettingsSchema,
});

export const toolsInsertSchema = toolsSelectSchema.omit({
  id: true,
  workspaceId: true,
});

export const toolsUpdateSchema = toolsInsertSchema.partial();

export type ToolSettings = z.infer<typeof toolSettingsSchema>;
