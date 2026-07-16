import { z } from "zod";

const shared = z.object({
  id: z.uuid(),
  createdAt: z.string(),
});

const egressInfo = z.object({
  egress_id: z.string(),
  roomComposite: z.object({
    roomName: z.string(),
    fileOutputs: z
      .object({
        filepath: z.string(),
        s3: z.object({
          endpoint: z.string(),
          bucket: z.string(),
          forcePathStyle: z.boolean(),
          metadata: z.object({
            agentId: z.uuidv7(),
            agentPhone: z.string(),
            callerPhone: z.string(),
          }),
        }),
      })
      .array(),
  }),
  fileResults: z
    .object({
      filename: z.string(),
      startedAt: z.string(),
      endedAt: z.string(),
      duration: z.string(),
      size: z.string(),
      location: z.url(),
    })
    .array(),
  manifestLocation: z.url(),
});

const egressEnded = shared.extend({
  event: z.literal("egress_ended"),
  egressInfo,
});

export const webhookSchema = z.discriminatedUnion("event", [egressEnded]);
