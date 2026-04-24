# AGENTS.md - CallingAI Monorepo Development Guide

Bu rehber, CallingAI'ın yapısını, kurallarını ve best practices'ini anlamak için yazılmıştır. Tüm ai ajanlarının ve geliştirici ortamının bu standardlara uyması gerekmektedir.

---

## 📐 Repo Mimarisi

### Genel Yapı

```
callingai-monorepo/
├── apps/
│   ├── api/                    # Elysia + Bun + Drizzle backend
│   └── web/                    # React Router v7 + Tailwind frontend
├── packages/
│   └── shared/                 # Paylaşılan TypeScript types ve utilities
├── .github/workflows/          # GitHub Actions CI/CD
├── biome.json                  # Linting ve formatting konfigürasyonu
├── .lefthook.yml              # Git hooks (pre-commit checks)
├── docker-compose.yaml        # PostgreSQL containerı
└── pnpm-workspace.yaml        # Monorepo çalışma alanı konfigürasyonu
```

### pnpm Monorepo Setup

- **Package Manager**: pnpm v10.33.0 (ve üzeri)
- **Node Version**: 20+
- **Bun**: API development/build için gerekli
- **Shared Catalog**: Common versions `pnpm-workspace.yaml` içinde tanımlanır:
  - `elysia`: ^1.4.28
  - `better-auth`: ^1.4.20
  - `zod`: ^4.3.6
  - `@biomejs/biome`: 2.4.4

### Path Aliases

#### Web App (`apps/web/tsconfig.json`)

```typescript
"paths": {
  "~/*": ["./app/*"],
  "@ulak/api": ["../../apps/api/src/server"],
  "@ulak/auth": ["../../apps/api/src/lib/auth"],
  "@ulak/shared": ["../../packages/shared/src"]
}
```

#### API App (`apps/api/tsconfig.json`)

```typescript
"paths": {
  "~/db": ["./src/db"],
  "~/db/schema": ["./src/db/schema/index"],
  "~/lib/*": ["./src/lib/*"],
  "~/types/*": ["./src/types/*"],
  "~/plugins/*": ["./src/plugins/*"],
  "~/modules/*": ["./src/modules/*"],
  "~/shared/*": ["./src/shared/*"],
  "@ulak/shared": ["../../packages/shared/src"]
}
```

### Database Schema

PostgreSQL 18 Alpine kullanılmaktadır. Drizzle ORM ile yönetilir.

**Ana Tablolar:**

- `users` - Kullanıcı hesapları (Better Auth ile yönetilir)
- `agents` - AI ajanları (agent başına bir sahip)
- `agent_flows` - Akoşlay grafiksel workflow'ları (JSON olarak depolanır)
- `knowledge_bases` - Bilgi tabanları
- `sessions` - Better Auth session yönetimi

---

## 🛠️ Coding Rules

### Biome Konfigürasyonu

Proje **Biome 2.4.4** kullanır (formatter + linter olarak).

Web tarafında Tailwind class sıralaması için **Prettier + prettier-plugin-tailwindcss** kullanılır.

**Kurallar:**

- **Quotes**: Double quotes (`"`)
- **Semicolons**: Daima zorunlu (`;`)
- **Arrow Parens**: Yalnızca gerektiğinde (`a => a` ✅, `(a, b) => a + b` ✅)
- **Indentation**: Spaces (2 boşluk)
- **Tailwind CSS**: CSS parser'da `tailwindDirectives: true`
- **Import Organization**: Otomatik organize edilen imports

**Sorumluluk paylaşımı:**

- **Biome**: lint + import organize + genel kalite kuralları
- **Prettier (Web)**: dosya formatı + Tailwind utility class sıralaması

**Format Komutları:**

```bash
# API
pnpm format:api    # Fix ve write
pnpm check:api     # Check only

# Web
pnpm format:web    # Fix ve write
pnpm check:web     # Check only
pnpm format:web:prettier  # Web format + Tailwind class sort (write)
pnpm check:web:prettier   # Web format kontrolü (fail)
pnpm warn:web:prettier    # Web format kontrolü (warn only, fail etmez)
```

### TypeScript Yaklaşımı

- **Target**: ES2022
- **Module**: ES2022 (Web), NodesNext (API)
- **Strict Mode**: ✅ Etkin
- **Strict Null Checks**: ✅ Etkin
- **ESLint Biome**: Tüm recommended kurallar aktif

**Type Annotation Kuralları:**

- Fonksiyon parametrelerine ve dönüş türlerine daima type annotation koyun
- Public API'lerde explicit types
- Internal utilities'lerde type inference kabul edilir
- `any` kullanından kaçının (biome'da `// biome-ignore lint/suspicious/noExplicitAny: <>` ile suppress edilebilir)

### Form Input Kuralı

- `select` alanlarında daima **native/vanilla HTML `<select>`** kullanın.
- Custom select bileşenleri (örn. Radix/shadcn select) yalnızca açıkça istenirse tercih edin.

### Import Sırası

Biome otomatik olarak organize eder:

1. External packages
2. Internal path aliases (`~/*`, `@ulak/*`)
3. Relative imports (`./`, `../`)

---

## 📝 Commit Rules & Pre-commit Hooks

### Lefthook Configuration

Proje **Lefthook** ile git hooks yönetir.

**.lefthook.yml:**

```yaml
pre-commit:
  parallel: true
  jobs:
    - run: pnpm biome check --write --unsafe --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
      glob: "*.{js,ts,jsx,tsx,json,jsonc}"
      stage_fixed: true
```

**Davranış:**

- Her commit'ten önce staged dosyaların üzerinde Biome çalıştırılır
- Formatlanmış dosyalar otomatik olarak stage'e eklenir
- Format hataları commit'i engeller (unsafe checks etkin)
- JSON + TypeScript/JavaScript dosyaları kontrol edilir

### Commit Message Konvansyonu

**Format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: Yeni feature
- `fix`: Bug fix
- `refactor`: Kod refaktoring (davranış değişmez)
- `style`: Formatting/biome fixes (otomatik)
- `docs`: Dokümantasyon
- `chore`: Build, dependencies, setup
- `db`: Database schema/migration
- `test`: Test ekleme/güncelleme

**Örnekler:**

```
feat(agent): add agent flow visualization support
fix(auth): resolve token expiration edge case
db(schema): add agent_metadata jsonb column
refactor(api): extract validation logic to separate module
```

---

## ⚛️ React Patterns

### Component Structure

**Function Components + Hooks:**

```typescript
import type { Route } from "./<componentName>.tsx";

interface ComponentProps {
  // Prop types
}

/**
 * ComponentName
 * Single-line description of purpose
 *
 * Features:
 * - Feature 1
 * - Feature 2
 */
export default function ComponentName({
  prop1,
  prop2,
}: ComponentProps) {
  const [state, setState] = useState<Type>();

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  const handleAction = () => {
    // Handler logic
  };

  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### React Router v7 Integration

**Kurallar:**

- Tüm routes `app/routes/` altında tanımlanır
- Nested routes için folder structure mimic edilir
- `layout.tsx` folderlarda layout components
- `+types/` auto-generated types için (React Router metadata)

**Örnek Route Yapısı:**

```
app/routes/
├── home.tsx
├── auth/
│   ├── layout.tsx        # Auth layout wrapper
│   ├── login.tsx
│   └── register.tsx
└── dashboard/
    ├── layout.tsx
    ├── dashboard.tsx
    ├── agent.tsx
    ├── agent-flow.tsx
    └── _components/      # Unsorted components (prefix _ ile)
        ├── dashboard-header.tsx
        └── agent/
            ├── agent-header.tsx
            ├── config-sidebar.tsx
            └── ...
```

### Component Composition Pattern

UI components shadcn.yaml üzerinden install edilir. Base components:

- `Button`, `Input`, `Label`, `Card`
- `Dialog`, `Sheet`, `Tabs`
- `DropdownMenu`, `Table`
- `Avatar`, `Badge`, `Tooltip`

**Okunabilirlik Kuralı (Component Boyutu):**

- Bir React component dosyası **220 satırı** geçtiğinde, UI ve iş mantığını anlamlı alt component/hook'lara bölün.
- **250+ satır** component'ler istisna değilse refactor edilmelidir.
- Bölme yaparken tekrar eden JSX bloklarını ve karmaşık handler/state logic'ini öncelikli olarak ayırın.

**Alt Component Folder Structure:**

Component bölündüğünde, alt componentler aynı isimde bir klasöre taşınır ve `index.ts` üzerinden export edilir:

```
routes/dashboard/
├── agent.tsx                   # Ana route dosyası (kısa, composition odaklı)
└── _components/
    └── agent/
        ├── index.ts            # Tüm sub-component export'ları buradan yapılır
        ├── agent-header.tsx
        ├── config-panel.tsx
        └── testing-panel.tsx
```

`index.ts` dosyası:

```typescript
// _components/agent/index.ts
export { AgentHeader } from "./agent-header";
export { ConfigPanel } from "./config-panel";
export { TestingPanel } from "./testing-panel";
```

Ana route dosyasında import:

```typescript
// agent.tsx
import { AgentHeader, ConfigPanel, TestingPanel } from "./_components/agent";
```

**Derin Bölme (Sub-component de büyürse):**

Bir alt component (örn. `config-panel.tsx`) de 220 satırı aşarsa, aynı kural tekrar uygulanır: component kendi adında bir klasöre dönüşür, içindeki parçalar o klasörde yaşar ve yine bir `index.ts` barrel dosyası açılır.

```
routes/dashboard/
├── agent.tsx
└── _components/
    └── agent/
        ├── index.ts
        ├── agent-header.tsx
        ├── testing-panel.tsx
        └── config-panel/               # config-panel artık bir klasör
            ├── index.ts                # ConfigPanel'i dışarı açar
            ├── config-panel.tsx        # Ana composition dosyası
            ├── voice-settings.tsx
            ├── llm-settings.tsx
            └── prompt-editor.tsx
```

`config-panel/index.ts` — sadece dışarıya açılacak olanı export eder:

```typescript
// _components/agent/config-panel/index.ts
export { ConfigPanel } from "./config-panel";
```

`config-panel/config-panel.tsx` — iç parçaları birleştirir:

```typescript
// _components/agent/config-panel/config-panel.tsx
import { LlmSettings } from "./llm-settings";
import { PromptEditor } from "./prompt-editor";
import { VoiceSettings } from "./voice-settings";

export function ConfigPanel() {
  return (
    <section>
      <VoiceSettings />
      <LlmSettings />
      <PromptEditor />
    </section>
  );
}
```

Üst katman (`_components/agent/index.ts`) **değişmez** — hâlâ `config-panel/index.ts`'ten gelen `ConfigPanel`'i re-export eder:

```typescript
// _components/agent/index.ts
export { AgentHeader } from "./agent-header";
export { ConfigPanel } from "./config-panel"; // klasör → index.ts otomatik çözülür
export { TestingPanel } from "./testing-panel";
```

> **Kural:** Bir klasördeki `index.ts` yalnızca o katmanın **public API**'sini export eder. İç yardımcı componentler (örn. `voice-settings.tsx`) dışarıya doğrudan açılmaz.

**Composition örneği:**

```typescript
// ❌ Don't: Monolithic component
export function AgentDetails() {
  return (
    <div className="...">
      <header>Title</header>
      <section>Config</section>
      <aside>Testing</aside>
    </div>
  );
}

// ✅ Do: Modular composition with index.ts barrel
import { AgentHeader, ConfigPanel, TestingPanel } from "./_components/agent";

export function AgentDetails() {
  return (
    <div className="...">
      <AgentHeader />
      <ConfigPanel />
      <TestingPanel />
    </div>
  );
}
```

### State Management

**Zustand** kullanılır (store'lar):

```typescript
// store/flow-store.ts
import { create } from "zustand";

export const useFlowStore = create<FlowState>(set => ({
  nodes: initialNodes,
  edges: initialEdges,
  setNodes: nodes => set({ nodes }),
  setEdges: edges => set({ edges }),
  addNode: node => set(state => ({ nodes: [...state.nodes, node] })),
}));
```

**Kullanım:**

```typescript
const nodes = useFlowStore(state => state.nodes);
const setNodes = useFlowStore(state => state.setNodes);
```

### Error Handling

**Route-level error handling:**

```typescript
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }
  return <div>Unexpected error: {error?.message}</div>;
}
```

---

## 🎨 Tailwind CSS Patterns

### Tailwind v4 Setup

- **Config**: CSS-first (code config yok, `app.css` ve vite plugin kullanılır)
- **CSS Import**: `app/app.css` ve `app/animations.css` globalde import edilir
- **Vite Plugin**: `@tailwindcss/vite` ile automatic rebuild

### Utility Usage

**Responsive Design:**

```typescript
// Mobile-first approach
<div className="flex flex-col md:flex-row lg:grid lg:grid-cols-3">
  Content
</div>
```

**Dark Mode:**
Proje **dark mode** olarak set edilir (HTML'de `className="dark"`).

```typescript
<div className="bg-background text-foreground dark:bg-slate-950">
  Content
</div>
```

**Common Utilities:**

```typescript
// Layouting
"flex items-center justify-center";

// Spacing (gap, padding, margin)
"gap-4 p-6 mx-auto";

// Typography
"text-sm font-medium";

// Colors (shadcn tokens)
"bg-background text-foreground border-border";
"hover:bg-secondary";
"disabled:opacity-50";

// Animations
"animate-in fade-in duration-500";
```

### Class Merging

Biome'da import edilir ve used:

```typescript
import { cn } from "~/lib/utils";

export function Component({ className }) {
  return (
    <div className={cn("base-classes", className)}>
      Content
    </div>
  );
}
```

### Component Variants (CVA)

Shadcn components `class-variance-authority` kullanır:

```typescript
const buttonVariants = cva("inline-flex items-center justify-center ...", {
  variants: {
    variant: {
      default: "bg-foreground text-background ...",
      destructive: "bg-destructive text-white ...",
      outline: "border border-border ...",
    },
    size: {
      sm: "h-8 px-3 text-xs",
      default: "h-9 px-4 py-2",
      lg: "h-11 px-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
```

### Dark Mode Colors

Proje bir Mistral-inspired warm color palette kullanır (`DESIGN.md` ile tanımlanır). Temel tokens:

```typescript
// Surfaces
"bg-background";
"bg-card";
"bg-muted";

// Text
"text-foreground";
"text-secondary-foreground";

// Borders & Dividers
"border-border";
"divide-border";

// Interactive
"hover:bg-secondary";
"focus:ring-ring";
"disabled:opacity-50";
```

---

## 🔄 API Design Patterns

### Elysia + Arktype + Better Auth

**Server: `apps/api/src/server.ts`**

```typescript
const app = new Elysia()
  .use(openapi({ ... }))
  .use(cors({ ... }))
  .use(errorHandler())
  .use(authModule())
  .use(agentsModule())
  .use(knowledgeBaseModule())
  .listen(env.PORT);
```

### Module Pattern

Modules `src/modules/<feature>/index.ts` altında:

```typescript
const agentsModule = () =>
  new Elysia({
    name: "agents",
    prefix: "/agents",
    tags: ["Agents"],
  })
    .macro({ requireSession: { ... } })
    .post(
      "/",
      async ({ user, body }) => {
        // Create agent
      },
      { auth: true, body: createAgentSchema }
    )
    .get(
      "/:id",
      async ({ user, params }) => {
        // Get agent
      },
      { auth: true, params: idParamsSchema }
    );
```

### Schema Validation

**Arktype** with Elysia's `t` tarafından yapılır:

```typescript
const idParamsSchema = t.Object({
  id: t.String({ minLength: 1 }),
});

const flowDocumentSchema = t.Object({
  nodes: t.Array(t.Any()),
  edges: t.Array(t.Any()),
  viewport: t.Optional(t.Any()),
  metadata: t.Optional(t.Any()),
});
```

### Error Handling

Problem Details RFC 7807 standardı kullanılır:

```typescript
// Error response format
{
  title: "Bad Request",
  status: 400,
  detail?: "Additional info",
  errors?: [{ path: "field", message: "error" }]
}
```

---

## 📊 Database Patterns

### Drizzle ORM

Tüm table definitions `src/db/schema/` altında:

```typescript
import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const agents = pgTable(
  "agents",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuidv7()`),
    ownerUserId: uuid("owner_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [index().on(table.ownerUserId)],
);
```

### Migration Management

```bash
# Schema changes'ı detect et ve migration oluştur
pnpm dk generate

# Database'e apply et
pnpm dk push

# Seed data ekle
pnpm seed
```

### Querying Pattern

```typescript
import { eq, and, desc } from "drizzle-orm";
import db from "~/db";

// Single query
const [agent] = await db
  .select()
  .from(agents)
  .where(and(eq(agents.id, id), eq(agents.ownerUserId, userId)))
  .limit(1);

// List query
const items = await db
  .select()
  .from(agents)
  .where(eq(agents.ownerUserId, userId))
  .orderBy(desc(agents.createdAt));

// Join query
const result = await db
  .select({ agent: agents, flow: agentFlows })
  .from(agents)
  .leftJoin(agentFlows, eq(agentFlows.agentId, agents.id));
```

---

## 🧪 Test Kuralları

### Mevcut Durumu

API ve Web testleri henüz kurulmamıştır. Kurulum yapılacak framework'ler:

- **API**: Bun test runner (natif)
- **Web**: Vitest + React Testing Library

### Önerilen Test Yapısı

```
apps/api/src/
├── modules/agents/
│   ├── index.ts
│   └── __tests__/
│       └── agents.test.ts

apps/web/app/
├── routes/
│   └── dashboard/
│       └── __tests__/
│           └── dashboard.test.tsx
```

### Test Yazma Convention

```typescript
// ✅ Do
describe("agentsApi", () => {
  test("should list agents for authenticated user", async () => {
    const agents = await agentsApi.listAgents();
    expect(agents).toBeInstanceOf(Array);
  });

  test("should throw error when not authenticated", async () => {
    await expect(agentsApi.listAgents()).rejects.toThrow();
  });
});
```

---

## 🔗 API Client Pattern

### Web ↔ API Communication

**`apps/web/app/lib/agents-api.ts` örneği:**

```typescript
const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: { "content-type": "application/json", ...init?.headers },
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const agentsApi = {
  listAgents: () => request<AgentListItem[]>("/agents"),
  getAgent: (id: string) => request<AgentDetail>(`/agents/${id}`),
  createAgent: (input: CreateAgentInput) =>
    request<AgentDetail>("/agents", {
      method: "POST",
      body: JSON.stringify(input),
    }),
};
```

**Better Auth Integration:**

```typescript
// Authentication
const session = await fetch("/auth/get-session", { credentials: "include" });
const user = session?.user;
```

---

## 🚀 PR Kuralları

### Pre-PR Checklist

1. **Local Formatting**

   ```bash
   pnpm format:web:prettier
   pnpm format:web
   pnpm format:api
   ```

2. **Type Checking**

   ```bash
   pnpm -r typecheck
   ```

3. **Build Validation**

   ```bash
   pnpm build:web
   pnpm build:api
   ```

4. **Database Schema** (eğer `apps/api/src/db/schema/` değiştiyse)
   ```bash
   pnpm dk generate
   git add apps/api/drizzle/
   ```

### PR Description Template

```markdown
## 📋 What

Kısa açıklama: Ne değişti?

## 🤔 Why

Neden bu değişiklik yapıldı?

## 🧪 Testing

Nasıl test edildi? (manuel/otomatik)

## 📝 Checklist

- [ ] Biome checks pass (`pnpm check:web`, `pnpm check:api`)
- [ ] Prettier web check passes (`pnpm check:web:prettier`)
- [ ] Type checking passes (`tsc` or `react-router typegen`)
- [ ] Builds pass (`pnpm build:web`, `pnpm build:api`)
- [ ] New dependencies added to `pnpm-workspace.yaml` catalog if shared
- [ ] Database migrations generated if schema changed (`pnpm dk generate`)
- [ ] No `any` types without suppression comment
```

### Merge Criteria

- ✅ Tüm CI checks pass (GitHub Actions)
- ✅ Code review approved
- ✅ Lefthook pre-commit checks pass
- ✅ Staging ortamında test edilmiş (varsa)
- ✅ Breaking changes dokumentasyonu güncellendi

---

## 🌐 Environment Variables

### API (`apps/api/.env`)

```bash
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/callingai
CORS_ORIGINS=http://localhost:5173
AUTH_SECRET=your-secret-key
```

### Web (`apps/web/.env`)

```bash
VITE_API_URL=http://localhost:3000
```

---

## 📚 Development Workflow

### Initial Setup

```bash
# 1. Clone ve install
git clone <repo>
cd callingai-monorepo
corepack enable
pnpm install

# 2. Database
docker compose up -d postgres

# 3. Env files
cp apps/api/.env.example apps/api/.env

# 4. Database schema
pnpm dk push

# 5. (Optional) Seed
pnpm seed
```

### Development

```bash
# All services
pnpm dev

# Or separately
pnpm dev:api
pnpm dev:web
```

### Building

```bash
pnpm build:web  # → build/
pnpm build:api  # → build/server (bun compile)
```

---

## 🤖 AI Integration Guidelines

### Codebase Navigation

**Yeni bir feature eklerken:**

1. İlgili module'u `apps/api/src/modules/<feature>/` altında ara
2. İlgili route component'i `apps/web/app/routes/<feature>/` altında ara
3. Shared types varsa `packages/shared/src/` kız
4. Database schema'ya bakın (`apps/api/src/db/schema/`)

### Common AI Tasks

| Task                 | Files to Check                                          |
| -------------------- | ------------------------------------------------------- |
| API endpoint ekle    | `apps/api/src/modules/<feature>/index.ts`, schema files |
| React component ekle | `apps/web/app/routes/`, `app/routes/_components/`       |
| Database table ekle  | `apps/api/src/db/schema/`, run `pnpm dk generate`       |
| API client ekle      | `apps/web/app/lib/<feature>-api.ts`, `types/`           |
| Store ekle           | `apps/web/app/store/`                                   |
| Tailwind styling     | `apps/web/app/app.css`, tailwind.config.ts (v4 ise yok) |

---

## 🔗 Kaynaklar

- **Biome Docs**: https://biomejs.dev
- **React Router v7**: https://reactrouter.com/home
- **Tailwind CSS v4**: https://tailwindcss.com
- **Elysia**: https://elysiajs.com
- **Drizzle ORM**: https://orm.drizzle.team
- **Better Auth**: https://www.better-auth.com
- **Zustand**: https://github.com/pmndrs/zustand
- **shadcn/ui**: https://shadcn-vue.com
- **Arktype**: https://arktype.io

---

**Son güncelleme**: 10 Nisan 2026  
**Proje**: CallingAI Monorepo  
**Stack**: pnpm + TypeScript + Elysia + React Router + Tailwind + Drizzle
