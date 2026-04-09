import { and, desc, eq, sql } from "drizzle-orm";
import Elysia, { t } from "elysia";
import db from "~/db";
import { agentFlows, agents } from "~/db/schema";
import auth from "~/lib/auth";
import { ensureDefaultAgentForUser } from "~/modules/agents/default-agent";

const idParamsSchema = t.Object({
  id: t.String({ minLength: 1 }),
});

const flowDocumentSchema = t.Object({
  nodes: t.Array(t.Any()),
  edges: t.Array(t.Any()),
  viewport: t.Optional(t.Any()),
  metadata: t.Optional(t.Any()),
});

const errorResponse = (statusCode: number, title: string, detail: string) => ({
  title,
  status: statusCode,
  detail,
});

const getOwnedAgent = async (ownerUserId: string, agentId: string) => {
  const [agent] = await db
    .select()
    .from(agents)
    .where(and(eq(agents.id, agentId), eq(agents.ownerUserId, ownerUserId)))
    .limit(1);

  return agent;
};

const getOwnedAgentWithFlow = async (ownerUserId: string, agentId: string) => {
  const [result] = await db
    .select({
      agent: agents,
      flow: agentFlows,
    })
    .from(agents)
    .leftJoin(agentFlows, eq(agentFlows.agentId, agents.id))
    .where(and(eq(agents.id, agentId), eq(agents.ownerUserId, ownerUserId)))
    .limit(1);

  return result;
};

const agentsModule = () =>
  new Elysia({
    name: "agents",
    prefix: "/agents",
    tags: ["Agents"],
  })
    .macro({
      requireSession: {
        async resolve({ request, status }) {
          const session = await auth.api.getSession({
            headers: request.headers,
          });

          if (!session) {
            return status(
              401,
              errorResponse(401, "Unauthorized", "Oturum bulunamadi."),
            );
          }

          return {
            userId: session.user.id,
          };
        },
      },
    })
    .get(
      "/",
      async ({ userId }) => {
        await ensureDefaultAgentForUser(userId);

        const rows = await db
          .select({
            agent: agents,
            flowId: agentFlows.id,
            flowVersion: agentFlows.version,
            flowUpdatedAt: agentFlows.updatedAt,
          })
          .from(agents)
          .leftJoin(agentFlows, eq(agentFlows.agentId, agents.id))
          .where(eq(agents.ownerUserId, userId))
          .orderBy(desc(agents.updatedAt));

        return rows.map(row => ({
          ...row.agent,
          hasFlow: !!row.flowId,
          flowVersion: row.flowVersion,
          flowUpdatedAt: row.flowUpdatedAt,
        }));
      },
      {
        requireSession: true,
      },
    )
    .post(
      "/",
      async ({ body, userId, status }) => {
        const created = await db.transaction(async tx => {
          const [agent] = await tx
            .insert(agents)
            .values({
              ownerUserId: userId,
              name: body.name,
              description: body.description,
              isActive: body.isActive ?? true,
            })
            .returning();

          const [flow] = await tx
            .insert(agentFlows)
            .values({
              ownerUserId: userId,
              agentId: agent.id,
              flow: body.flow,
            })
            .returning();

          return {
            ...agent,
            flow,
          };
        });

        return status(201, created);
      },
      {
        requireSession: true,
        body: t.Object({
          name: t.String({ minLength: 1 }),
          description: t.Optional(t.String()),
          isActive: t.Optional(t.Boolean()),
          flow: flowDocumentSchema,
        }),
      },
    )
    .get(
      "/:id",
      async ({ params, userId, status }) => {
        const result = await getOwnedAgentWithFlow(userId, params.id);

        if (!result?.agent) {
          return status(
            404,
            errorResponse(404, "Not Found", "Agent bulunamadi."),
          );
        }

        return {
          ...result.agent,
          flow: result.flow?.flow ?? null,
          flowVersion: result.flow?.version ?? null,
          flowUpdatedAt: result.flow?.updatedAt ?? null,
        };
      },
      {
        requireSession: true,
        params: idParamsSchema,
      },
    )
    .patch(
      "/:id",
      async ({ params, body, userId, status }) => {
        const agent = await getOwnedAgent(userId, params.id);

        if (!agent) {
          return status(
            404,
            errorResponse(404, "Not Found", "Agent bulunamadi."),
          );
        }

        if (
          body.name === undefined &&
          body.description === undefined &&
          body.isActive === undefined &&
          body.flow === undefined
        ) {
          return status(
            400,
            errorResponse(400, "Bad Request", "En az bir alan guncellenmeli."),
          );
        }

        const nextAgentUpdate: {
          name?: string;
          description?: string;
          isActive?: boolean;
        } = {};

        if (body.name !== undefined) {
          nextAgentUpdate.name = body.name;
        }

        if (body.description !== undefined) {
          nextAgentUpdate.description = body.description;
        }

        if (body.isActive !== undefined) {
          nextAgentUpdate.isActive = body.isActive;
        }

        if (Object.keys(nextAgentUpdate).length > 0) {
          await db
            .update(agents)
            .set(nextAgentUpdate)
            .where(eq(agents.id, agent.id));
        }

        if (body.flow !== undefined) {
          await db
            .insert(agentFlows)
            .values({
              ownerUserId: userId,
              agentId: agent.id,
              flow: body.flow,
            })
            .onConflictDoUpdate({
              target: agentFlows.agentId,
              set: {
                ownerUserId: userId,
                flow: body.flow,
                version: sql`${agentFlows.version} + 1`,
              },
            });
        }

        const updated = await getOwnedAgentWithFlow(userId, agent.id);

        return {
          ...updated?.agent,
          flow: updated?.flow?.flow ?? null,
          flowVersion: updated?.flow?.version ?? null,
          flowUpdatedAt: updated?.flow?.updatedAt ?? null,
        };
      },
      {
        requireSession: true,
        params: idParamsSchema,
        body: t.Object({
          name: t.Optional(t.String({ minLength: 1 })),
          description: t.Optional(t.String()),
          isActive: t.Optional(t.Boolean()),
          flow: t.Optional(flowDocumentSchema),
        }),
      },
    )
    .delete(
      "/:id",
      async ({ params, userId, status }) => {
        const [deletedAgent] = await db
          .delete(agents)
          .where(and(eq(agents.id, params.id), eq(agents.ownerUserId, userId)))
          .returning({ id: agents.id });

        if (!deletedAgent) {
          return status(
            404,
            errorResponse(404, "Not Found", "Agent bulunamadi."),
          );
        }

        return status(204);
      },
      {
        requireSession: true,
        params: idParamsSchema,
      },
    );

export default agentsModule;
