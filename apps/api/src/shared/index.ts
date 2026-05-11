import type { z } from "zod";
import type { agentSelectSchema } from "~/db/schema";

export type Agent = z.infer<typeof agentSelectSchema>;
