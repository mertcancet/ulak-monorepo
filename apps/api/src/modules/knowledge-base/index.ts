import { desc, eq } from "drizzle-orm";
import Elysia from "elysia";
import z from "zod";
import db from "~/db";
import {
  knowledgeBase,
  knowledgeBaseInsertSchema,
  knowledgeBaseSelectSchema,
  knowledgeBaseUpdateSchema,
} from "~/db/schema";
import models from "~/plugins/models";
import authModule from "../auth";

const knowledgeBaseModule = () =>
  new Elysia({
    name: "knowledge-base",
    prefix: "/knowledge-base",
    tags: ["Knowledge Base"],
  })
    .use(models())
    .use(authModule())
    .get(
      "",
      async ({ headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        if (!workspaceId)
          return problem({
            title: "Workspace ID is required in header 'cleon-workspace-id'",
            status: 400,
          });

        const data = await db
          .select()
          .from(knowledgeBase)
          .where(eq(knowledgeBase.workspaceId, workspaceId))
          .orderBy(desc(knowledgeBase.createdAt));

        return data;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
      },
    )
    .post(
      "",
      async ({ headers, body, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        if (!workspaceId)
          return problem({
            title: "Workspace ID is required in header 'cleon-workspace-id'",
            status: 400,
          });

        const {
          name,
          type,
          description,
          textContent,
          websiteUrl,
          fileName,
          fileUrl,
        } = body;

        if (!name || !type)
          return problem({ title: "Name and type are required", status: 400 });

        const [data] = await db
          .insert(knowledgeBase)
          .values({
            name,
            type,
            description,
            textContent,
            websiteUrl,
            fileName,
            fileUrl,
            workspaceId,
          })
          .returning({ id: knowledgeBase.id });

        return data;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: knowledgeBaseInsertSchema,
        response: { 201: "created.response" },
      },
    )
    .get(
      ":id",
      async ({ params: { id }, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        if (!workspaceId)
          return problem({
            title: "Workspace ID is required in header 'cleon-workspace-id'",
            status: 400,
          });

        const [data] = await db
          .select()
          .from(knowledgeBase)
          .where(eq(knowledgeBase.id, id));

        if (!data)
          return problem({ title: "Knowledge Base not found", status: 404 });

        return data;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: { 200: knowledgeBaseSelectSchema, 403: z.any() },
      },
    )
    .patch(
      ":id",
      async ({ params: { id }, body, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        if (!workspaceId)
          return problem({
            title: "Workspace ID is required in header 'cleon-workspace-id'",
            status: 400,
          });

        await db
          .update(knowledgeBase)
          .set(body)
          .where(eq(knowledgeBase.id, id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: knowledgeBaseUpdateSchema,
      },
    )
    .delete(
      ":id",
      async ({ params: { id }, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        if (!workspaceId)
          return problem({
            title: "Workspace ID is required in header 'cleon-workspace-id'",
            status: 400,
          });

        await db.delete(knowledgeBase).where(eq(knowledgeBase.id, id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
      },
    );

export default knowledgeBaseModule;
