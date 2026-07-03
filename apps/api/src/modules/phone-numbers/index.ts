import {
  phoneNumberSelectSchema,
  phoneNumberUpdateSchema,
} from "@cleon/shared";
import { and, eq, getColumns, sql } from "drizzle-orm";
import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import { agents, phone_numbers, sip_trunks } from "~/db/schema";
import models from "~/plugins/models";
import problemDetails from "~/plugins/problem-details";
import { checkPermissions } from "~/shared/auth-helpers";
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
      async ({ session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "phone_number",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const { agentId, ...columns } = getColumns(phone_numbers);

        const agent_sq = db
          .select({
            agent: sql`JSON_BUILD_OBJECT(
              'id', ${agents.id},
              'name', ${agents.name}
            )`.as("agent"),
          })
          .from(agents)
          .where(eq(agents.id, phone_numbers.agentId))
          .as("agent_sq");

        return await db
          .select({
            ...columns,
            type: sip_trunks.type,
            agent: agent_sq.agent,
          })
          .from(phone_numbers)
          .innerJoin(sip_trunks, eq(sip_trunks.id, phone_numbers.sipTrunkId))
          .leftJoin(agents, eq(agents.id, phone_numbers.agentId))
          .leftJoinLateral(agent_sq, sql`true`)
          .where(eq(sip_trunks.workspaceId, workspaceId));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: {
          200: phoneNumberSelectSchema.array(),
          403: z.any(),
        },
      },
    )
    .patch(
      ":id",
      async ({ session, params, headers, body: payload, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "phone_number",
            workspaceId,
          },
          action: "update",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const [phoneNumber] = await db
          .select({ type: sip_trunks.type })
          .from(phone_numbers)
          .innerJoin(sip_trunks, eq(sip_trunks.id, phone_numbers.sipTrunkId))
          .where(eq(phone_numbers.id, params.id));

        if (!phoneNumber) return problem({ title: "Not Found" });

        if (payload.agentId && phoneNumber.type === "outbound")
          return problem({
            title: "Bad Request",
            detail: "Cannot set agentId for outbound numbers.",
          });

        await db
          .update(phone_numbers)
          .set(payload)
          .from(sip_trunks)
          .where(
            and(
              eq(phone_numbers.id, params.id),
              eq(sip_trunks.workspaceId, workspaceId),
            ),
          );
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: phoneNumberUpdateSchema,
      },
    );

export default phoneNumberModule;
