import { z } from "zod";
import { phoneNumberSelectSchema } from "./phone-number";

const phoneNumberSchema = phoneNumberSelectSchema.pick({
  id: true,
  sipTrunkId: true,
  number: true,
});

export const sipTrunkTypes = ["inbound", "outbound"] as const;

const baseSchema = z.object({
  id: z.uuidv7(),
  workspaceId: z.uuidv7(),
  name: z.string(),
  lkTrunkId: z.string(),
  type: z.literal(sipTrunkTypes),
  username: z.string().min(3).nullish(),
  password: z.string().min(8).nullish(),
  createdAt: z.date(),
});

const inboundSchema = baseSchema.extend({
  type: z.literal("inbound"),
  phoneNumbers: phoneNumberSchema.array().meta({
    description: "Array of provider phone numbers associated with the trunk.",
  }),
  settings: z
    .object({
      allowedAddresses: z.xor([z.cidrv4(), z.ipv4()]).array().nullish().meta({
        description:
          "Allowed IP addresses for the sip trunk. Supports cidr notation. Required when username and password is empty.",
      }),
    })
    .nullish(),
});

const outboundSchema = baseSchema.extend({
  type: z.literal("outbound"),
  phoneNumbers: phoneNumberSchema.array().meta({
    description:
      "List of provider phone numbers associated with the trunk that can be used as a caller id.",
  }),
  settings: z.object({
    address: z.xor([z.ipv4(), z.hostname()]).meta({
      description:
        "Hostname or IP the SIP INVITE is sent to. This is not a SIP URI and shouldn't contain the sip: protocol.",
    }),
  }),
});

const inboundCreateSecurityCheck = z.superRefine<
  Partial<z.infer<typeof inboundCreateSchema>>
>(({ username, password, settings }, ctx) => {
  if (settings?.allowedAddresses && settings.allowedAddresses.length > 0)
    return;

  if (!username && !password)
    ctx.addIssue({
      code: "custom",
      path: ["username"],
      message:
        "username and password is required when allowedAddresses is null.",
    });

  if (username && !password)
    ctx.addIssue({
      code: "custom",
      path: ["password"],
      message: "password is required when allowedAddresses is null.",
    });

  if (password && !username)
    ctx.addIssue({
      code: "custom",
      path: ["username"],
      message: "username is required when allowedAddresses is null.",
    });
});

const inboundUpdateSecurityCheck = z.superRefine<
  Partial<z.infer<typeof inboundCreateSchema>>
>(({ username, password, settings }, ctx) => {
  if (settings?.allowedAddresses && settings.allowedAddresses.length > 0)
    return;

  if (username && !password)
    ctx.addIssue({
      code: "custom",
      path: ["password"],
      message: "password is required when allowedAddresses is null.",
    });

  if (password && !username)
    ctx.addIssue({
      code: "custom",
      path: ["username"],
      message: "username is required when allowedAddresses is null.",
    });
});

const inboundCreateSchema = inboundSchema
  .omit({
    id: true,
    lkTrunkId: true,
    createdAt: true,
    workspaceId: true,
  })
  .extend({
    phoneNumbers: z.e164().array().min(1).meta({
      description: "Array of provider phone numbers associated with the trunk.",
    }),
  });

const outboundCreateSchema = outboundSchema
  .omit({
    id: true,
    lkTrunkId: true,
    createdAt: true,
    workspaceId: true,
  })
  .extend({
    phoneNumbers: z.e164().array().min(1).meta({
      description:
        "List of provider phone numbers associated with the trunk that can be used as a caller id.",
    }),
  });

export const sipTrunkSelectSchema = z.discriminatedUnion("type", [
  inboundSchema,
  outboundSchema,
]);

export const sipTrunkCreateSchema = z.discriminatedUnion("type", [
  inboundCreateSchema.check(inboundCreateSecurityCheck),
  outboundCreateSchema,
]);

export const sipTrunkUpdateSchema = z.discriminatedUnion("type", [
  inboundCreateSchema
    .partial()
    .required({ type: true })
    .check(inboundUpdateSecurityCheck),
  outboundCreateSchema.partial().required({ type: true }),
]);

export type SipTrunk = z.infer<typeof sipTrunkSelectSchema>;
export type SipTrunkCreate = z.infer<typeof sipTrunkCreateSchema>;
export type SipTrunkUpdate = z.infer<typeof sipTrunkUpdateSchema>;

export type SipInboundSettings = { allowedAddresses?: string[] | null };
export type SipOutboundSettings = { address: string };
