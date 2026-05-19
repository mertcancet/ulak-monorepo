import { workspaceInsertSchema, workspaceSelectSchema } from "@cleon/shared";
import { desc, eq } from "drizzle-orm";
import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import { roles, user_roles, workspace_members, workspaces } from "~/db/schema";
import models from "~/plugins/models";
import type { ResourcePermission } from "~/shared/auth-helpers";
import authModule from "../auth";

const workspacesModule = () =>
  new Elysia({
    name: "workspaces",
    prefix: "/workspaces",
    tags: ["Workspaces"],
  })
    .use(models())
    .use(authModule())
    .get(
      "",
      async ({ session }) => {
        return await db
          .select({
            id: workspaces.id,
            name: workspaces.name,
            ownerId: workspaces.ownerId,
          })
          .from(workspaces)
          .innerJoin(
            workspace_members,
            eq(workspace_members.workspaceId, workspaces.id),
          )
          .where(eq(workspace_members.userId, session.userId))
          .orderBy(desc(workspaces.id));
      },
      {
        requireAuth: true,
        response: workspaceSelectSchema.array(),
      },
    )
    .post(
      "",
      async ({ body, session, problem }) => {
        return await db.transaction(async tx => {
          const [workspace] = await tx
            .insert(workspaces)
            .values({ ...body, ownerId: session.userId })
            .returning({ id: workspaces.id });

          if (!workspace) throw problem({ title: "Bad Request" });

          await tx.insert(workspace_members).values({
            userId: session.userId,
            workspaceId: workspace.id,
          });

          const defaultRoles = await tx
            .insert(roles)
            .values([
              {
                name: "Workspace Admin",
                workspaceId: workspace.id,
                permissions: {
                  agent: ["*"],
                  role: ["*"],
                  tool: ["*"],
                  workspace: ["update"],
                  invitation: ["view", "create", "delete", "update"],
                } satisfies ResourcePermission,
              },
              {
                name: "Member",
                workspaceId: workspace.id,
                permissions: {
                  agent: ["view"],
                  tool: ["view"],
                } satisfies ResourcePermission,
              },
            ])
            .returning({ id: roles.id });

          // TODO: Bu rolleri workspace owner a eklemeye gerek yok.
          await tx.insert(user_roles).values(
            defaultRoles.map(r => ({
              roleId: r.id,
              userId: session.userId,
            })),
          );

          return workspace;
        });
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: workspaceInsertSchema,
        response: {
          201: "created.response",
          400: z.any(),
        },
      },
    );
// .patch(
//   ":id",
//   async ({ params: { id }, body, session, headers, problem }) => {
//     const workspaceId = headers["cleon-workspace-id"];

//     const isAllowed = await checkPermissions({
//       user: {
//         id: session.userId,
//       },
//       resource: {
//         kind: "wo",
//         workspaceId,
//       },
//       action: "update",
//     });

//     if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

//     await db.update(agents).set(body).where(eq(agents.id, id));
//   },
//   {
//     requireAuth: true,
//     headers: "headers.workspaceId",
//     body: agentUpdateSchema,
//   },
// );

export default workspacesModule;
