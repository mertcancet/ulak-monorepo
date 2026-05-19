import { z } from "zod";

export const invitationStatuses = [
  "pending",
  "accepted",
  "declined",
  "expired",
] as const;

const invitationStatusSchema = z.enum(invitationStatuses);

export const invitationSelectSchema = z.object({
  id: z.uuidv7(),
  workspaceId: z.uuidv7(),
  userId: z.uuidv7(),
  invitedBy: z.uuidv7(),
  roles: z.uuidv7().array(),
  status: invitationStatusSchema.default("pending"),
  createdAt: z.date(),
  expiresAt: z.date(),
});

export const invitationInsertSchema = invitationSelectSchema.pick({
  userId: true,
  roles: true,
});

export const invitationUpdateSchema = invitationSelectSchema.pick({
  roles: true,
});

export type Invitation = z.infer<typeof invitationSelectSchema>;
export type InvitationInsert = z.infer<typeof invitationInsertSchema>;
export type InvitationUpdate = z.infer<typeof invitationUpdateSchema>;
