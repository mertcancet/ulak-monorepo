import {
  agentInsertSchema,
  agentSelectSchema,
  agentUpdateSchema,
  toolsSelectSchema,
} from "@cleon/shared";
import { and, desc, eq, getColumns, ne, type SQL, sql } from "drizzle-orm";
import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import { agent_tools, agents, phone_numbers, tools } from "~/db/schema";
import models from "~/plugins/models";
import { checkPermissions } from "~/shared/auth-helpers";
import env from "~/shared/env";
import paginatedQuerySchema, {
  paginatedResponse,
} from "~/shared/paginated-query";
import authModule from "../auth";

const agentsModule = () =>
  new Elysia({
    name: "agents",
    prefix: "/agents",
    tags: ["Agents"],
  })
    .use(models())
    .use(authModule())
    .get(
      "",
      async ({ query, session, headers, problem }) => {
        const { page, pageSize } = query;
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "agent",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const data = await db
          .select({
            ...getColumns(agents),
            total: sql`count(*) over()`.mapWith(Number),
          })
          .from(agents)
          .where(eq(agents.workspaceId, workspaceId))
          .offset((page - 1) * pageSize)
          .limit(pageSize)
          .orderBy(desc(agents.id));

        const total = data?.[0]?.total || 0;

        return {
          data,
          pagination: {
            page,
            pageSize,
            total,
          },
        };
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        query: paginatedQuerySchema,
        response: {
          200: paginatedResponse(agentSelectSchema.array()),
          403: z.any(),
        },
      },
    )
    .post(
      "",
      async ({ body, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];
        const { toolIds, ...payload } = body;

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "agent",
            workspaceId,
          },
          action: "create",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const data = await db.transaction(async tx => {
          const [data] = await tx
            .insert(agents)
            .values({ ...payload, workspaceId })
            .returning({ id: agents.id });

          if (!data)
            throw problem({ title: "Internal Server Error", status: 500 });

          if (!toolIds || toolIds.length === 0) return data;

          const tools = toolIds.map(toolId => ({ agentId: data.id, toolId }));

          await tx.insert(agent_tools).values(tools);

          return data;
        });

        return data;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: agentInsertSchema,
        response: { 201: "created.response" },
      },
    )
    .get(
      ":id",
      async ({ params: { id }, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "agent",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const agentTools = db
          .select({
            tools: sql`JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', ${tools.id},
                'name', ${tools.name},
                'description', ${tools.description}
              )
            )`.as("tools"),
          })
          .from(agent_tools)
          .innerJoin(tools, eq(tools.id, agent_tools.toolId))
          .where(eq(agent_tools.agentId, agents.id))
          .as("agent_toolset");

        const [agent] = await db
          .select({
            ...getColumns(agents),
            tools: sql`COALESCE(${agentTools.tools}, '[]'::json)`.as("tools"),
          })
          .from(agents)
          .leftJoinLateral(agentTools, sql`true`)
          .where(eq(agents.id, id));

        if (!agent) return problem({ title: "Not Found", status: 404 });

        return agent;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: {
          200: agentSelectSchema.extend({
            tools: toolsSelectSchema
              .pick({
                id: true,
                name: true,
                description: true,
              })
              .array(),
          }),
          403: z.any(),
        },
      },
    )
    .patch(
      ":id",
      async ({ params, body, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];
        const { toolIds, ...payload } = body;

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "agent",
            workspaceId,
          },
          action: "update",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db.transaction(async tx => {
          await tx.update(agents).set(payload).where(eq(agents.id, params.id));

          if (!toolIds) return;

          await tx
            .delete(agent_tools)
            .where(eq(agent_tools.agentId, params.id));

          if (toolIds.length === 0) return;

          const tools = toolIds.map(toolId => ({ agentId: params.id, toolId }));

          await tx.insert(agent_tools).values(tools);
        });
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: agentUpdateSchema,
      },
    )
    .delete(
      ":id",
      async ({ params: { id }, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "agent",
            workspaceId,
          },
          action: "delete",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db.delete(agents).where(eq(agents.id, id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
      },
    )
    .post(
      "bootstrap",
      async ({ body: payload, headers, problem }) => {
        const agentSecret = headers["cleon-agent-secret"];

        if (agentSecret !== env.CLEON_AGENT_SECRET)
          return problem({ title: "Forbidden", status: 403 });

        let where: SQL = sql``;

        if (payload.type === "phone") {
          const [phoneNumber] = await db
            .select({ agentId: phone_numbers.agentId })
            .from(phone_numbers)
            .where(eq(phone_numbers.number, payload.phoneNumber));

          if (!phoneNumber)
            return problem({
              title: "Not Found",
              detail: "Phone number not found.",
              status: 404,
            });

          if (!phoneNumber.agentId)
            return problem({
              title: "Bad Request",
              detail: "Phone number is not assigned to any agent.",
            });

          where = eq(agents.id, phoneNumber.agentId);
        }

        if (payload.type === "agent") where = eq(agents.id, payload.agentId);

        const agentTools = db
          .select({ tools: sql`JSON_AGG(${agent_tools.toolId})`.as("tools") })
          .from(agent_tools)
          .where(eq(agent_tools.agentId, agents.id))
          .as("agent_toolset");

        const [startAgent] = await db
          .select({
            ...getColumns(agents),
            tools: sql`COALESCE(${agentTools.tools}, '[]'::json)`.as("tools"),
          })
          .from(agents)
          .leftJoinLateral(agentTools, sql`true`)
          .where(where);

        if (!startAgent) return problem({ title: "Not Found", status: 404 });

        const availableAgents = await db
          .select({
            ...getColumns(agents),
            tools: sql`COALESCE(${agentTools.tools}, '[]'::json)`.as("tools"),
          })
          .from(agents)
          .leftJoinLateral(agentTools, sql`true`)
          .where(
            and(
              eq(agents.workspaceId, startAgent.workspaceId),
              ne(agents.id, startAgent.id),
            ),
          );

        const availableTools = await db
          .select()
          .from(tools)
          .where(eq(tools.workspaceId, startAgent.workspaceId));

        return {
          startAgent,
          availableAgents,
          availableTools,
        };
      },
      {
        headers: "headers.cleonAgentSecret",
        body: z.discriminatedUnion("type", [
          z.object({
            type: z.literal("agent"),
            agentId: z.uuidv7(),
          }),
          z.object({
            type: z.literal("phone"),
            phoneNumber: z.e164(),
          }),
        ]),
        response: {
          200: z.object({
            startAgent: agentSelectSchema.extend({
              tools: z.uuidv7().array(),
            }),
            availableAgents: agentSelectSchema
              .extend({
                tools: z.uuidv7().array(),
              })
              .array(),
            availableTools: toolsSelectSchema.array(),
          }),
          403: z.any(),
        },
      },
    );

export default agentsModule;
