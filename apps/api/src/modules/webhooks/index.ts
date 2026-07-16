import dayjs from "dayjs";
import Elysia from "elysia";
import { WebhookReceiver } from "livekit-server-sdk";
import db from "~/db";
import { conversations } from "~/db/schema";
import models from "~/plugins/models";
import problemDetails from "~/plugins/problem-details";
import env from "~/shared/env";
import { webhookSchema } from "./types";

const receiver = new WebhookReceiver(
  env.LIVEKIT_API_KEY,
  env.LIVEKIT_API_SECRET,
);

const webhookModule = () =>
  new Elysia({
    name: "webhooks",
    prefix: "/webhooks",
    tags: ["Webhooks"],
  })
    .use(models())
    .use(problemDetails())
    .post(
      "livekit",
      async ({ request, body: payload, problem }) => {
        const rawBody = await request.text();

        if (payload.event !== "egress_ended")
          return problem({ title: "Bad Request" });

        await receiver.receive(rawBody, "Authorization", false);

        const fileOutput = payload.egressInfo.roomComposite.fileOutputs?.[0];

        if (!fileOutput)
          return problem({ title: "Bad Request", detail: "No file output." });

        const metadata = fileOutput.s3.metadata;

        const file = payload.egressInfo.fileResults?.[0];

        if (!file) return problem({ title: "Bad Request", detail: "No file." });

        await db.insert(conversations).values({
          agentId: metadata.agentId,
          startedAt: dayjs(Number(file.startedAt) / 1_000_000).toDate(),
          endedAt: dayjs(Number(file.endedAt) / 1_000_000).toDate(),
          duration: Number(file.duration) / 1_000_000_000,
          toNumber: metadata.callerPhone,
          fromNumber: metadata.agentPhone,
          file: {
            filename: file.filename,
            location: file.location,
            manifestLocation: payload.egressInfo.manifestLocation,
          },
        });
      },
      {
        body: webhookSchema,
        parse: "application/json",
      },
    );

export default webhookModule;
