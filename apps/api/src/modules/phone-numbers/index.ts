import { phoneNumberSchema } from "@cleon/shared";
import { eq, getColumns } from "drizzle-orm";
import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import { phone_numbers, sip_trunks } from "~/db/schema";
import models from "~/plugins/models";
import problemDetails from "~/plugins/problem-details";
import authModule from "../auth";

const phoneNumberModule = () =>
  new Elysia({
    name: "phone-numbers",
    prefix: "/phone-numbers",
    tags: ["Phone Numbers"],
  })
    .use(models())
    .use(authModule())
    .use(problemDetails())
    .get(
      "",
      async ({ headers }) => {
        const workspaceId = headers["cleon-workspace-id"];

        return await db
          .select({ ...getColumns(phone_numbers) })
          .from(phone_numbers)
          .innerJoin(sip_trunks, eq(sip_trunks.id, phone_numbers.sipTrunkId))
          .where(eq(sip_trunks.workspaceId, workspaceId));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: {
          200: phoneNumberSchema.array(),
          403: z.any(),
        },
      },
    );

export default phoneNumberModule;
