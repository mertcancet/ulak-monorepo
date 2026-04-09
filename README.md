# CallingAI Monorepo

This repository manages the `apps/api` (Elysia + Bun + Drizzle) and `apps/web` (React Router) applications in a single monorepo.

## Requirements

- Node.js 20+
- pnpm `10.33.0`
- Bun (for API development/build)
- Docker (to quickly run PostgreSQL)

## Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd callingai-monorepo
```

2. Enable pnpm (if needed) and install dependencies:

```bash
corepack enable
corepack prepare pnpm@10.33.0 --activate
pnpm install
```

3. Start the PostgreSQL service:

```bash
docker compose up -d postgres
```

4. Prepare API environment variables:

```bash
cp apps/api/.env.example apps/api/.env
```

5. Push the database schema to your database:

```bash
pnpm dk push
```

6. (Optional) Seed sample data:

```bash
pnpm seed
```

## Development

Run all services at once:

```bash
pnpm dev
```

Only API:

```bash
pnpm dev:api
```

Only Web:

```bash
pnpm dev:web
```

## Build

API build:

```bash
pnpm build:api
```

Web build:

```bash
pnpm build:web
```

## Code Quality

API format:

```bash
pnpm format:api
```

Web format:

```bash
pnpm format:web
```

API check:

```bash
pnpm check:api
```

Web check:

```bash
pnpm check:web
```

## Important Note: `pnpm dk push`

When you make migration/schema changes under `apps/api/src/db/schema`, you must run `pnpm dk push` to keep your local database in sync.

In short:

- Schema changed -> `pnpm dk push`
- If needed -> `pnpm seed`

## Git Workflow (example)

After your changes, you can follow this typical flow:

```bash
git checkout -b feature/readme-update
pnpm check:api && pnpm check:web
git add .
git commit -m "docs: add root README with setup and pnpm dk push steps"
git push origin feature/readme-update
```

If you are already on an existing branch, the last line can simply be:

```bash
git push origin <branch-name>
```
