# Cleon API — Backend Rehberi (Frontend Geliştirici İçin)

## Backend Genel Mantığı

Proje **Elysia** (Bun üzerinde çalışan bir HTTP framework) kullanıyor. Express'e benzer ama TypeScript-first ve çok daha hızlı.

### Akış şöyle işliyor:

```
HTTP Request
  → server.ts  (tüm modüllerin kayıtlı olduğu ana dosya)
  → modules/agents/index.ts  (ilgili endpoint'e yönlenir)
  → db/  (Drizzle ORM ile veritabanı sorgusu)
  → Response
```

---

## Yeni Bir API Endpoint Eklemek

Diyelim ki `notes` (notlar) diye yeni bir şey ekleyeceksin.

### Adım 1 — DB Tablosu

`apps/api/src/db/schema/notes.ts` oluştur:

```typescript
import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";
import { workspaces } from "./workspaces";

export const notes = pgTable("notes", {
  id: uuid().primaryKey().default(sql`uuidv7()`),
  workspaceId: uuid()
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  title: text().notNull(),
  content: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const noteSelectSchema = createSelectSchema(notes);
export const noteInsertSchema = createInsertSchema(notes, {
  title: z.string().min(1),
  workspaceId: z.uuidv7(),
}).omit({ id: true, createdAt: true, updatedAt: true });
export const noteUpdateSchema = noteInsertSchema.partial();
```

### Adım 2 — Schema index'e ekle

`apps/api/src/db/schema/index.ts` dosyasına şunu ekle:

```typescript
export * from "./notes";
```

### Adım 3 — Migration çalıştır

```bash
pnpm dk generate   # SQL migration dosyası oluşturur
pnpm dk push       # Veritabanına uygular
```

### Adım 4 — Module yaz

`apps/api/src/modules/notes/index.ts` oluştur:

```typescript
import { desc, eq, getColumns, sql } from "drizzle-orm";
import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import { noteInsertSchema, noteSelectSchema, notes } from "~/db/schema";
import models from "~/plugins/models";
import { checkPermissions } from "~/shared/auth-helpers";
import paginatedQuerySchema, { paginatedResponse } from "~/shared/paginated-query";
import authModule from "../auth";

const notesModule = () =>
  new Elysia({ name: "notes", prefix: "/notes", tags: ["Notes"] })
    .use(models())
    .use(authModule())
    // LIST
    .get(
      "",
      async ({ query, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];
        const { page, pageSize } = query;

        const isAllowed = await checkPermissions({
          user: { id: session.userId },
          resource: { kind: "agent", workspaceId },
          action: "view",
        });
        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const data = await db
          .select({ ...getColumns(notes), total: sql`count(*) over()`.mapWith(Number) })
          .from(notes)
          .where(eq(notes.workspaceId, workspaceId))
          .offset((page - 1) * pageSize)
          .limit(pageSize)
          .orderBy(desc(notes.createdAt));

        return { data, pagination: { page, pageSize, total: data?.[0]?.total ?? 0 } };
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        query: paginatedQuerySchema,
        response: { 200: paginatedResponse(noteSelectSchema.array()), 403: z.any() },
      },
    )
    // CREATE
    .post(
      "",
      async ({ body }) => {
        const [note] = await db.insert(notes).values(body).returning({ id: notes.id });
        return note;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: noteInsertSchema,
        response: { 201: "created.response" },
      },
    )
    // GET by ID
    .get(
      ":id",
      async ({ params: { id }, problem }) => {
        const [note] = await db.select().from(notes).where(eq(notes.id, id));
        if (!note) return problem({ title: "Not Found", status: 404 });
        return note;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: { 200: noteSelectSchema, 404: z.any() },
      },
    );

export default notesModule;
```

### Adım 5 — server.ts'e kaydet

`apps/api/src/server.ts` dosyasında diğer modüllerin yanına ekle:

```typescript
import notesModule from "./modules/notes";

const app = new Elysia()
  // ...mevcut kodlar...
  .use(notesModule())   // ← bunu ekle
```

Bitti. `http://localhost:3000/notes` endpoint'i hazır.

---

## Temel Kavramlar

| Kavram | Ne işe yarıyor |
|---|---|
| `requireAuth: true` | Endpoint'i session cookie olmadan kilitler, `session.userId` kullanabilirsin |
| `headers: "headers.workspaceId"` | `cleon-workspace-id` header'ını zorunlu kılar, `headers["cleon-workspace-id"]` ile okursun |
| `body: noteInsertSchema` | Request body'yi otomatik validate eder, hata varsa 422 döner |
| `response: { 200: schema }` | Response'u type-safe yapar, OpenAPI docs'a otomatik yansır |
| `problem(...)` | RFC 7807 standart hata döndürür (`{ title, status, detail }`) |
| `paginatedQuerySchema` | `?page=1&pageSize=20` query param'larını otomatik parse eder |

---

## Önemli Dosyalar

| Dosya | Ne bu |
|---|---|
| `src/server.ts` | Tüm modüllerin bağlandığı ana dosya |
| `src/db/schema/` | DB tabloları burada tanımlanır |
| `src/modules/agents/index.ts` | En iyi örnek endpoint — bunu kopyala |
| `src/shared/auth-helpers.ts` | `checkPermissions()` burada |
| `src/shared/paginated-query.ts` | Pagination şeması |
| `src/plugins/models.ts` | `"headers.workspaceId"` gibi paylaşılan modeller |

---

## Workflow Özeti

```
1. src/db/schema/xxx.ts       → Tabloyu tanımla + Zod şemalarını export et
2. src/db/schema/index.ts     → Export ekle
3. pnpm dk generate && push   → Migration çalıştır
4. src/modules/xxx/index.ts   → Elysia module yaz (agents'ı kopyala)
5. src/server.ts              → .use(xxxModule()) ekle
```
