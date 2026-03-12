import { and, desc, eq, ne } from "drizzle-orm";
import Elysia, { t } from "elysia";
import db from "~/db";
import { businesses, knowledgeBaseSources, knowledgeBases } from "~/db/schema";
import auth from "~/lib/auth";

type SourceType = "file" | "text" | "website";

type SourcePayload = {
  sourceType?: SourceType;
  content?: string | null;
  websiteUrl?: string | null;
  fileName?: string | null;
  storagePath?: string | null;
};

const sourceTypeSchema = t.Union([
  t.Literal("file"),
  t.Literal("text"),
  t.Literal("website"),
]);

const sourceStatusSchema = t.Union([
  t.Literal("pending"),
  t.Literal("processing"),
  t.Literal("ready"),
  t.Literal("failed"),
]);

const idParamsSchema = t.Object({
  id: t.String({ minLength: 1 }),
});

const businessIdParamsSchema = t.Object({
  businessId: t.String({ minLength: 1 }),
});

const sourceIdParamsSchema = t.Object({
  sourceId: t.String({ minLength: 1 }),
});

const errorResponse = (statusCode: number, title: string, detail: string) => ({
  title,
  status: statusCode,
  detail,
});

const validateSourcePayload = (payload: SourcePayload) => {
  if (payload.sourceType === "text" && !payload.content?.trim()) {
    return "Text kaynagi icin content zorunludur.";
  }

  if (payload.sourceType === "website" && !payload.websiteUrl?.trim()) {
    return "Website kaynagi icin websiteUrl zorunludur.";
  }

  if (payload.sourceType === "file") {
    const hasFileName = !!payload.fileName?.trim();
    const hasStoragePath = !!payload.storagePath?.trim();

    if (!hasFileName || !hasStoragePath) {
      return "File kaynagi icin fileName ve storagePath zorunludur.";
    }
  }

  return null;
};

const getOwnedBusiness = async (ownerUserId: string, businessId: string) => {
  const [business] = await db
    .select()
    .from(businesses)
    .where(
      and(
        eq(businesses.id, businessId),
        eq(businesses.ownerUserId, ownerUserId),
      ),
    )
    .limit(1);

  return business;
};

const getOwnedKnowledgeBase = async (
  ownerUserId: string,
  knowledgeBaseId: string,
) => {
  const [result] = await db
    .select({
      knowledgeBase: knowledgeBases,
    })
    .from(knowledgeBases)
    .innerJoin(businesses, eq(knowledgeBases.businessId, businesses.id))
    .where(
      and(
        eq(knowledgeBases.id, knowledgeBaseId),
        eq(businesses.ownerUserId, ownerUserId),
      ),
    )
    .limit(1);

  return result?.knowledgeBase;
};

const getOwnedSource = async (ownerUserId: string, sourceId: string) => {
  const [result] = await db
    .select({
      source: knowledgeBaseSources,
    })
    .from(knowledgeBaseSources)
    .innerJoin(
      knowledgeBases,
      eq(knowledgeBaseSources.knowledgeBaseId, knowledgeBases.id),
    )
    .innerJoin(businesses, eq(knowledgeBases.businessId, businesses.id))
    .where(
      and(
        eq(knowledgeBaseSources.id, sourceId),
        eq(businesses.ownerUserId, ownerUserId),
      ),
    )
    .limit(1);

  return result?.source;
};

const knowledgeBaseModule = () =>
  new Elysia({
    name: "knowledge-base",
    prefix: "/knowledge-base",
    tags: ["Knowledge Base"],
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
      "/businesses",
      async ({ userId }) => {
        return db
          .select()
          .from(businesses)
          .where(eq(businesses.ownerUserId, userId))
          .orderBy(desc(businesses.createdAt));
      },
      {
        requireSession: true,
      },
    )
    .post(
      "/businesses",
      async ({ body, userId, status }) => {
        const [existingBusiness] = await db
          .select({ id: businesses.id })
          .from(businesses)
          .where(eq(businesses.slug, body.slug))
          .limit(1);

        if (existingBusiness) {
          return status(
            409,
            errorResponse(409, "Conflict", "Bu slug zaten kullaniliyor."),
          );
        }

        const [createdBusiness] = await db
          .insert(businesses)
          .values({
            name: body.name,
            slug: body.slug,
            ownerUserId: userId,
          })
          .returning();

        return status(201, createdBusiness);
      },
      {
        requireSession: true,
        body: t.Object({
          name: t.String({ minLength: 1 }),
          slug: t.String({ minLength: 1 }),
        }),
      },
    )
    .get(
      "/businesses/:businessId",
      async ({ params, userId, status }) => {
        const business = await getOwnedBusiness(userId, params.businessId);

        if (!business) {
          return status(
            404,
            errorResponse(404, "Not Found", "Business bulunamadi."),
          );
        }

        return business;
      },
      {
        requireSession: true,
        params: businessIdParamsSchema,
      },
    )
    .patch(
      "/businesses/:businessId",
      async ({ params, body, userId, status }) => {
        const business = await getOwnedBusiness(userId, params.businessId);

        if (!business) {
          return status(
            404,
            errorResponse(404, "Not Found", "Business bulunamadi."),
          );
        }

        if (!body.name && !body.slug) {
          return status(
            400,
            errorResponse(400, "Bad Request", "En az bir alan guncellenmeli."),
          );
        }

        if (body.slug) {
          const [existingSlug] = await db
            .select({ id: businesses.id })
            .from(businesses)
            .where(
              and(
                eq(businesses.slug, body.slug),
                ne(businesses.id, business.id),
              ),
            )
            .limit(1);

          if (existingSlug) {
            return status(
              409,
              errorResponse(409, "Conflict", "Bu slug zaten kullaniliyor."),
            );
          }
        }

        const [updatedBusiness] = await db
          .update(businesses)
          .set({
            name: body.name,
            slug: body.slug,
          })
          .where(eq(businesses.id, business.id))
          .returning();

        return updatedBusiness;
      },
      {
        requireSession: true,
        params: businessIdParamsSchema,
        body: t.Object({
          name: t.Optional(t.String({ minLength: 1 })),
          slug: t.Optional(t.String({ minLength: 1 })),
        }),
      },
    )
    .delete(
      "/businesses/:businessId",
      async ({ params, userId, status }) => {
        const business = await getOwnedBusiness(userId, params.businessId);

        if (!business) {
          return status(
            404,
            errorResponse(404, "Not Found", "Business bulunamadi."),
          );
        }

        await db.delete(businesses).where(eq(businesses.id, business.id));

        return status(204);
      },
      {
        requireSession: true,
        params: businessIdParamsSchema,
      },
    )
    .get(
      "/businesses/:businessId/knowledge-bases",
      async ({ params, userId, status }) => {
        const business = await getOwnedBusiness(userId, params.businessId);

        if (!business) {
          return status(
            404,
            errorResponse(404, "Not Found", "Business bulunamadi."),
          );
        }

        return db
          .select()
          .from(knowledgeBases)
          .where(eq(knowledgeBases.businessId, business.id))
          .orderBy(desc(knowledgeBases.createdAt));
      },
      {
        requireSession: true,
        params: businessIdParamsSchema,
      },
    )
    .post(
      "/businesses/:businessId/knowledge-bases",
      async ({ params, body, userId, status }) => {
        const business = await getOwnedBusiness(userId, params.businessId);

        if (!business) {
          return status(
            404,
            errorResponse(404, "Not Found", "Business bulunamadi."),
          );
        }

        const [knowledgeBase] = await db
          .insert(knowledgeBases)
          .values({
            businessId: business.id,
            name: body.name,
            description: body.description,
            isActive: body.isActive ?? true,
            createdByUserId: userId,
          })
          .returning();

        return status(201, knowledgeBase);
      },
      {
        requireSession: true,
        params: businessIdParamsSchema,
        body: t.Object({
          name: t.String({ minLength: 1 }),
          description: t.Optional(t.String()),
          isActive: t.Optional(t.Boolean()),
        }),
      },
    )
    .get(
      "/knowledge-bases/:id",
      async ({ params, userId, status }) => {
        const knowledgeBase = await getOwnedKnowledgeBase(userId, params.id);

        if (!knowledgeBase) {
          return status(
            404,
            errorResponse(404, "Not Found", "Knowledge base bulunamadi."),
          );
        }

        return knowledgeBase;
      },
      {
        requireSession: true,
        params: idParamsSchema,
      },
    )
    .patch(
      "/knowledge-bases/:id",
      async ({ params, body, userId, status }) => {
        const knowledgeBase = await getOwnedKnowledgeBase(userId, params.id);

        if (!knowledgeBase) {
          return status(
            404,
            errorResponse(404, "Not Found", "Knowledge base bulunamadi."),
          );
        }

        if (
          body.name === undefined &&
          body.description === undefined &&
          body.isActive === undefined
        ) {
          return status(
            400,
            errorResponse(400, "Bad Request", "En az bir alan guncellenmeli."),
          );
        }

        const [updatedKnowledgeBase] = await db
          .update(knowledgeBases)
          .set({
            name: body.name,
            description: body.description,
            isActive: body.isActive,
          })
          .where(eq(knowledgeBases.id, knowledgeBase.id))
          .returning();

        return updatedKnowledgeBase;
      },
      {
        requireSession: true,
        params: idParamsSchema,
        body: t.Object({
          name: t.Optional(t.String({ minLength: 1 })),
          description: t.Optional(t.String()),
          isActive: t.Optional(t.Boolean()),
        }),
      },
    )
    .delete(
      "/knowledge-bases/:id",
      async ({ params, userId, status }) => {
        const knowledgeBase = await getOwnedKnowledgeBase(userId, params.id);

        if (!knowledgeBase) {
          return status(
            404,
            errorResponse(404, "Not Found", "Knowledge base bulunamadi."),
          );
        }

        await db
          .delete(knowledgeBases)
          .where(eq(knowledgeBases.id, knowledgeBase.id));

        return status(204);
      },
      {
        requireSession: true,
        params: idParamsSchema,
      },
    )
    .get(
      "/knowledge-bases/:id/sources",
      async ({ params, userId, status }) => {
        const knowledgeBase = await getOwnedKnowledgeBase(userId, params.id);

        if (!knowledgeBase) {
          return status(
            404,
            errorResponse(404, "Not Found", "Knowledge base bulunamadi."),
          );
        }

        return db
          .select()
          .from(knowledgeBaseSources)
          .where(eq(knowledgeBaseSources.knowledgeBaseId, knowledgeBase.id))
          .orderBy(desc(knowledgeBaseSources.createdAt));
      },
      {
        requireSession: true,
        params: idParamsSchema,
      },
    )
    .post(
      "/knowledge-bases/:id/sources",
      async ({ params, body, userId, status }) => {
        const knowledgeBase = await getOwnedKnowledgeBase(userId, params.id);

        if (!knowledgeBase) {
          return status(
            404,
            errorResponse(404, "Not Found", "Knowledge base bulunamadi."),
          );
        }

        const sourceValidationError = validateSourcePayload(body);

        if (sourceValidationError) {
          return status(
            400,
            errorResponse(400, "Bad Request", sourceValidationError),
          );
        }

        const [source] = await db
          .insert(knowledgeBaseSources)
          .values({
            businessId: knowledgeBase.businessId,
            knowledgeBaseId: knowledgeBase.id,
            sourceType: body.sourceType,
            processingStatus: body.processingStatus ?? "pending",
            title: body.title,
            content: body.content,
            websiteUrl: body.websiteUrl,
            websiteCrawlDepth: body.websiteCrawlDepth,
            fileName: body.fileName,
            fileMimeType: body.fileMimeType,
            fileSizeBytes: body.fileSizeBytes,
            storagePath: body.storagePath,
            checksum: body.checksum,
            metadata: body.metadata,
            lastSyncedAt: body.lastSyncedAt,
            createdByUserId: userId,
          })
          .returning();

        return status(201, source);
      },
      {
        requireSession: true,
        params: idParamsSchema,
        body: t.Object({
          title: t.String({ minLength: 1 }),
          sourceType: sourceTypeSchema,
          processingStatus: t.Optional(sourceStatusSchema),
          content: t.Optional(t.Nullable(t.String())),
          websiteUrl: t.Optional(t.Nullable(t.String())),
          websiteCrawlDepth: t.Optional(t.Nullable(t.Number())),
          fileName: t.Optional(t.Nullable(t.String())),
          fileMimeType: t.Optional(t.Nullable(t.String())),
          fileSizeBytes: t.Optional(t.Nullable(t.Number())),
          storagePath: t.Optional(t.Nullable(t.String())),
          checksum: t.Optional(t.Nullable(t.String())),
          metadata: t.Optional(t.Any()),
          lastSyncedAt: t.Optional(t.Nullable(t.Date())),
        }),
      },
    )
    .get(
      "/sources/:sourceId",
      async ({ params, userId, status }) => {
        const source = await getOwnedSource(userId, params.sourceId);

        if (!source) {
          return status(
            404,
            errorResponse(404, "Not Found", "Source bulunamadi."),
          );
        }

        return source;
      },
      {
        requireSession: true,
        params: sourceIdParamsSchema,
      },
    )
    .patch(
      "/sources/:sourceId",
      async ({ params, body, userId, status }) => {
        const source = await getOwnedSource(userId, params.sourceId);

        if (!source) {
          return status(
            404,
            errorResponse(404, "Not Found", "Source bulunamadi."),
          );
        }

        if (Object.keys(body).length === 0) {
          return status(
            400,
            errorResponse(400, "Bad Request", "En az bir alan guncellenmeli."),
          );
        }

        const nextPayload: SourcePayload = {
          sourceType: body.sourceType ?? source.sourceType,
          content: body.content === undefined ? source.content : body.content,
          websiteUrl:
            body.websiteUrl === undefined ? source.websiteUrl : body.websiteUrl,
          fileName:
            body.fileName === undefined ? source.fileName : body.fileName,
          storagePath:
            body.storagePath === undefined
              ? source.storagePath
              : body.storagePath,
        };

        const sourceValidationError = validateSourcePayload(nextPayload);

        if (sourceValidationError) {
          return status(
            400,
            errorResponse(400, "Bad Request", sourceValidationError),
          );
        }

        const [updatedSource] = await db
          .update(knowledgeBaseSources)
          .set({
            sourceType: body.sourceType,
            processingStatus: body.processingStatus,
            title: body.title,
            content: body.content,
            websiteUrl: body.websiteUrl,
            websiteCrawlDepth: body.websiteCrawlDepth,
            fileName: body.fileName,
            fileMimeType: body.fileMimeType,
            fileSizeBytes: body.fileSizeBytes,
            storagePath: body.storagePath,
            checksum: body.checksum,
            metadata: body.metadata,
            errorMessage: body.errorMessage,
            lastSyncedAt: body.lastSyncedAt,
          })
          .where(eq(knowledgeBaseSources.id, source.id))
          .returning();

        return updatedSource;
      },
      {
        requireSession: true,
        params: sourceIdParamsSchema,
        body: t.Object({
          title: t.Optional(t.String({ minLength: 1 })),
          sourceType: t.Optional(sourceTypeSchema),
          processingStatus: t.Optional(sourceStatusSchema),
          content: t.Optional(t.Nullable(t.String())),
          websiteUrl: t.Optional(t.Nullable(t.String())),
          websiteCrawlDepth: t.Optional(t.Nullable(t.Number())),
          fileName: t.Optional(t.Nullable(t.String())),
          fileMimeType: t.Optional(t.Nullable(t.String())),
          fileSizeBytes: t.Optional(t.Nullable(t.Number())),
          storagePath: t.Optional(t.Nullable(t.String())),
          checksum: t.Optional(t.Nullable(t.String())),
          metadata: t.Optional(t.Any()),
          errorMessage: t.Optional(t.Nullable(t.String())),
          lastSyncedAt: t.Optional(t.Nullable(t.Date())),
        }),
      },
    )
    .delete(
      "/sources/:sourceId",
      async ({ params, userId, status }) => {
        const source = await getOwnedSource(userId, params.sourceId);

        if (!source) {
          return status(
            404,
            errorResponse(404, "Not Found", "Source bulunamadi."),
          );
        }

        await db
          .delete(knowledgeBaseSources)
          .where(eq(knowledgeBaseSources.id, source.id));

        return status(204);
      },
      {
        requireSession: true,
        params: sourceIdParamsSchema,
      },
    );

export default knowledgeBaseModule;
