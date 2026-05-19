import {
  invitationInsertSchema,
  invitationSelectSchema,
  invitationUpdateSchema,
} from "@cleon/shared";
import dayjs from "dayjs";
import { and, eq, inArray } from "drizzle-orm";
import Elysia from "elysia";
import { render } from "jsx-email";
import { z } from "zod";
import db from "~/db";
import {
  invitations,
  roles,
  user_roles,
  users,
  workspace_members,
  workspaces,
} from "~/db/schema";
import { WorkspaceInviteEmail } from "~/emails";
import models from "~/plugins/models";
import { checkPermissions } from "~/shared/auth-helpers";
import { emailService } from "~/shared/email-service";
import env from "~/shared/env";
import authModule from "../auth";

const invitationsModule = () =>
  new Elysia({
    name: "invitations",
    prefix: "/invitations",
    tags: ["Invitations"],
  })
    .use(models())
    .use(authModule())
    .model({
      "invitation.id": z.object({ invitationId: z.string() }),
    })
    .get(
      "",
      async ({ headers, session, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "invitation",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        return await db
          .select()
          .from(invitations)
          .where(eq(invitations.workspaceId, workspaceId));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: {
          200: invitationSelectSchema.array(),
          403: z.any(),
        },
      },
    )
    .post(
      "",
      async ({ headers, session, user, body, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const { userId, roles: roleIds } = body;

        const [member] = await db
          .select()
          .from(workspace_members)
          .where(
            and(
              eq(workspace_members.userId, userId),
              eq(workspace_members.workspaceId, workspaceId),
            ),
          );

        if (member) {
          return problem({
            title: "Bad Request",
            code: "invitations.membership_exists",
          });
        }

        const targetRoles = await db
          .select()
          .from(roles)
          .where(inArray(roles.id, roleIds));

        const targetAuthority = targetRoles.map(r => r.permissions);

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "invitation",
            workspaceId,
          },
          action: "create",
          targetAuthority,
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const [data] = await db
          .insert(invitations)
          .values({
            ...body,
            workspaceId,
            status: "pending",
            invitedBy: session.userId,
            expiresAt: dayjs().add(48, "hours").toDate(),
          })
          .returning({ id: invitations.id });

        const inviteURL = `${env.FRONTEND_URL}/workspaces`;

        const invitedUser = db
          .select({
            email: users.email,
            emailVerified: users.emailVerified,
          })
          .from(users)
          .where(eq(users.id, userId))
          .as("invited_user");

        const [result] = await db
          .select({
            workspace: workspaces.name,
            email: invitedUser.email,
            emailVerified: invitedUser.emailVerified,
          })
          .from(workspaces)
          .where(eq(workspaces.id, workspaceId))
          .crossJoin(invitedUser);

        if (!result)
          throw problem({ title: "Internal Server Error", status: 500 });

        const { workspace, email, emailVerified } = result;

        if (emailVerified) {
          const html = await render(
            <WorkspaceInviteEmail
              workspace={workspace}
              inviteURL={inviteURL}
              invitedBy={{
                email: user.email,
                name: user.name,
              }}
            />,
          );

          void emailService.send({
            subject: `You've been invited to join ${workspace}`,
            to: email,
            html,
          });
        }

        return data;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: invitationInsertSchema,
        response: {
          201: "created.response",
          403: z.any(),
        },
      },
    )
    .patch(
      ":id",
      async ({ headers, session, params, body, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];
        const { id } = params;
        const { roles: roleIds } = body;

        const targetRoles = await db
          .select()
          .from(roles)
          .where(
            and(inArray(roles.id, roleIds), eq(roles.workspaceId, workspaceId)),
          );

        const targetAuthority = targetRoles.map(r => r.permissions);

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "invitation",
            workspaceId,
          },
          action: "update",
          targetAuthority,
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db.update(invitations).set(body).where(eq(invitations.id, id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: invitationUpdateSchema,
      },
    )
    .post(
      "accept",
      async ({ session, body, problem }) => {
        const { invitationId } = body;

        const [invitation] = await db
          .select()
          .from(invitations)
          .where(
            and(
              eq(invitations.id, invitationId),
              eq(invitations.userId, session.userId),
            ),
          );

        if (!invitation || invitation.status !== "pending")
          return problem({ title: "Bad Request" });

        if (invitation.expiresAt.getTime() < Date.now())
          return problem({
            title: "Bad Request",
            code: "invitations.expired",
          });

        await db.transaction(async tx => {
          await tx
            .update(invitations)
            .set({ status: "accepted" })
            .where(eq(invitations.id, invitationId));

          await tx.insert(workspace_members).values({
            userId: invitation.userId,
            workspaceId: invitation.workspaceId,
          });

          await tx.insert(user_roles).values(
            invitation.roles.map(roleId => ({
              roleId,
              userId: invitation.userId,
            })),
          );
        });
      },
      {
        requireAuth: true,
        body: "invitation.id",
      },
    )

    .post(
      "decline",
      async ({ session, body, problem }) => {
        const { invitationId } = body;

        const [invitation] = await db
          .select()
          .from(invitations)
          .where(
            and(
              eq(invitations.id, invitationId),
              eq(invitations.userId, session.userId),
            ),
          );

        if (!invitation || invitation.status !== "pending")
          return problem({ title: "Bad Request" });

        if (invitation.expiresAt.getTime() < Date.now())
          return problem({
            title: "Bad Request",
            code: "invitations.expired",
          });

        await db
          .update(invitations)
          .set({ status: "declined" })
          .where(eq(invitations.id, invitationId));

        // TODO: Email notifications
      },
      {
        requireAuth: true,
        body: "invitation.id",
      },
    );

export default invitationsModule;
