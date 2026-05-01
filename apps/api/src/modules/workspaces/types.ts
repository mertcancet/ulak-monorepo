import type { WorkspaceInput } from "@cleon/shared";
import { z } from "zod";

export const workspaceSchema = z.object({
  name: z.string().min(3),
});

export type { WorkspaceInput };
