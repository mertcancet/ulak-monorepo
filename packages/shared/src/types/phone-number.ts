import { z } from "zod";

export const phoneNumberSelectSchema = z.object({
  id: z.uuidv7(),
  sipTrunkId: z.uuidv7(),
  number: z.e164(),
  label: z.string().min(3).nullish(),
  type: z.literal(["inbound", "outbound"]),
  agent: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullish(),
});

export const phoneNumberUpdateSchema = phoneNumberSelectSchema
  .pick({
    label: true,
  })
  .extend({
    agentId: z.uuidv7().nullish(),
  });

export type PhoneNumber = z.infer<typeof phoneNumberSelectSchema>;
