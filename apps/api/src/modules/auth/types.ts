import { z } from "zod";

export const userMetadataSchema = z.object({
  onboarding_completed: z.boolean(),
});

export type UserMetadata = z.infer<typeof userMetadataSchema>;
