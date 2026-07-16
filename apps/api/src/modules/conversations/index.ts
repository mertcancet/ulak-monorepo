import { conversationSelectSchema } from "@cleon/shared";
import { and, desc, eq, getColumns, inArray, sql } from "drizzle-orm";
import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import { agents, conversations } from "~/db/schema";
import models from "~/plugins/models";
import problemDetails from "~/plugins/problem-details";
import { checkPermissions } from "~/shared/auth-helpers";
import paginatedQuerySchema, {
  paginatedResponse,
} from "~/shared/paginated-query";
import authModule from "../auth";

const conversationModule = () =>
  new Elysia({
    name: "conversations",
    prefix: "/conversations",
    tags: ["Conversations"],
  })
    .use(models())
    .use(problemDetails())
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
            kind: "conversation",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const { agentId, ...columns } = getColumns(conversations);

        const data = await db
          .select({
            ...columns,
            agent: sql`JSON_BUILD_OBJECT(
              'id', ${agents.id},
              'name', ${agents.name}
            )
            `.as("agent"),
            total: sql`count(*) over()`.mapWith(Number),
          })
          .from(conversations)
          .innerJoin(agents, eq(conversations.agentId, agents.id))
          .where(eq(agents.workspaceId, workspaceId))
          .offset((page - 1) * pageSize)
          .limit(pageSize)
          .orderBy(desc(conversations.id));

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
          200: paginatedResponse(conversationSelectSchema.array()),
          403: z.any(),
        },
      },
    )
    .get(
      ":id",
      async ({ params, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "conversation",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const { agentId, ...columns } = getColumns(conversations);

        const [conversation] = await db
          .select({
            ...columns,
            agent: sql`JSON_BUILD_OBJECT(
              'id', ${agents.id},
              'name', ${agents.name}
            )
            `.as("agent"),
          })
          .from(conversations)
          .innerJoin(agents, eq(conversations.agentId, agents.id))
          .where(
            and(
              eq(conversations.id, params.id),
              eq(agents.workspaceId, workspaceId),
            ),
          );

        if (!conversation) return problem({ title: "Not Found", status: 404 });

        return conversation;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: {
          200: conversationSelectSchema,
          403: z.any(),
        },
      },
    )
    .delete(
      ":id",
      async ({ params, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "conversation",
            workspaceId,
          },
          action: "delete",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const agent_sq = db
          .select({ id: agents.id })
          .from(agents)
          .where(
            and(
              eq(agents.id, conversations.agentId),
              eq(agents.workspaceId, workspaceId),
            ),
          );

        const [conversation] = await db
          .delete(conversations)
          .where(
            and(
              eq(conversations.id, params.id),
              inArray(conversations.agentId, agent_sq),
            ),
          )
          .returning({ id: conversations.id });

        if (!conversation) return problem({ title: "Not Found", status: 404 });
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
      },
    );

export default conversationModule;
