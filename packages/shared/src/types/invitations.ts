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
  workspaceName: z.string(),
  userId: z.uuidv7(),
  email: z.email(),
  invitedBy: z.object({
    name: z.string(),
    email: z.string(),
  }),
  roles: z.uuidv7().array(),
  status: invitationStatusSchema.default("pending"),
  createdAt: z.date(),
  expiresAt: z.date(),
});

export const invitationCreateSchema = z.object({
  email: z.email(),
  roles: z.uuidv7().array(),
});

export const invitationUpdateSchema = invitationSelectSchema.pick({
  roles: true,
});

export type Invitation = z.infer<typeof invitationSelectSchema>;
export type InvitationCreate = z.infer<typeof invitationCreateSchema>;
export type InvitationUpdate = z.infer<typeof invitationUpdateSchema>;
