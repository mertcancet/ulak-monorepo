import {
  agentInsertSchema,
  agentSelectSchema,
  agentUpdateSchema,
  toolsSelectSchema,
} from "@cleon/shared";
import { and, desc, eq, getColumns, ne, sql } from "drizzle-orm";
import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import { agent_tools, agents, tools } from "~/db/schema";
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

        const [data] = await db
          .insert(agents)
          .values({ ...body, workspaceId })
          .returning({ id: agents.id });

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

        const [agent] = await db.select().from(agents).where(eq(agents.id, id));

        if (!agent) return problem({ title: "Not Found", status: 404 });

        return agent;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: {
          200: agentSelectSchema,
          403: z.any(),
        },
      },
    )
    .patch(
      ":id",
      async ({ params: { id }, body, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

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

        await db.update(agents).set(body).where(eq(agents.id, id));
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
      ":id/tools",
      async ({ params: { id }, body, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];
        const toolIds = body.toolIds;

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

        const values = toolIds.map(toolId => ({ agentId: id, toolId }));

        await db.insert(agent_tools).values(values);
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: z.object({ toolIds: z.uuidv7().array() }),
      },
    )
    .post(
      "bootstrap",
      async ({ body, headers, problem }) => {
        const agentSecret = headers["cleon-agent-secret"];
        const { phoneNumber } = body;

        if (agentSecret !== env.CLEON_AGENT_SECRET)
          return problem({ title: "Forbidden", status: 403 });

        const [startAgent] = await db
          .select()
          .from(agents)
          .where(eq(agents.phoneNumber, phoneNumber));

        if (!startAgent) return problem({ title: "Not Found", status: 404 });

        const availableAgents = await db
          .select()
          .from(agents)
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
        body: z.object({ phoneNumber: z.string() }),
        response: {
          200: z.object({
            startAgent: agentSelectSchema,
            availableAgents: agentSelectSchema.array(),
            availableTools: toolsSelectSchema.array(),
          }),
          403: z.any(),
        },
      },
    );

export default agentsModule;
