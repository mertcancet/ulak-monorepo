import { jwt } from "@elysia/jwt";
import dayjs from "dayjs";
import Elysia from "elysia";
import db from "~/db";
import { conversations } from "~/db/schema";
import models from "~/plugins/models";
import problemDetails from "~/plugins/problem-details";
import env from "~/shared/env";
import { webhookSchema } from "./types";

const webhookModule = () =>
  new Elysia({
    name: "webhooks",
    prefix: "/webhooks",
    tags: ["Webhooks"],
  })
    .use(models())
    .use(problemDetails())
    .use(
      jwt({
        name: "jwt",
        secret: env.LIVEKIT_API_SECRET,
      }),
    )
    .post(
      "livekit",
      async ({ headers, body: payload, problem, jwt }) => {
        const token = await jwt.verify(headers.authorization);

        if (!token) return problem({ title: "Forbidden", status: 403 });

        if (payload.event !== "egress_ended")
          return problem({ title: "Bad Request" });

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
        headers: "headers.authorization",
        parse: "application/json",
      },
    );

export default webhookModule;
