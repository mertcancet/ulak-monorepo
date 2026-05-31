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

const agentHandoffTool = z.object({
  type: z.literal("AgentHandoff"),
  destination_agent: z.uuidv7().meta({ description: "Destination agent Id" }),
  context_strategy: z.literal(["all", "last_n", "none"]),
  context_message_limit: z.int().positive(),
  handoff_message: z.string().optional(),
});

export const toolSettingsSchema = z.discriminatedUnion("type", [
  httpTool,
  endCallTool,
  agentHandoffTool,
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
    })
    .meta({ description: "Tool name should be unique across workspaces." }),
  description: z.string(),
  disallowInterruptions: z.boolean().default(false),
  settings: toolSettingsSchema,
});

export const toolsInsertSchema = toolsSelectSchema.omit({
  id: true,
  workspaceId: true,
});

export const toolsUpdateSchema = toolsInsertSchema.partial();

const httpToolFormSchema = toolsSelectSchema
  .pick({ name: true, description: true, disallowInterruptions: true })
  .extend({
    ...httpTool.omit({ type: true }).shape,
  });

const endCallToolFormSchema = toolsSelectSchema
  .pick({ name: true, description: true, disallowInterruptions: true })
  .extend({
    endInstructions: endCallTool.shape.end_instructions,
  });

export type ToolItem = z.infer<typeof toolsSelectSchema>;
export type CreateToolInput = z.infer<typeof toolsInsertSchema>;
export type UpdateToolInput = z.infer<typeof toolsUpdateSchema>;
export type ToolSettings = z.infer<typeof toolSettingsSchema>;

export type EndCallToolSettings = Extract<ToolSettings, { type: "EndCall" }>;
export type HttpToolSettings = Extract<ToolSettings, { type: "HTTP" }>;

export type HttpToolFormData = z.infer<typeof httpToolFormSchema>;
export type EndCallToolFormData = z.infer<typeof endCallToolFormSchema>;
