# CallingAI Monorepo

This repository manages the `apps/api` (Elysia + Bun + Drizzle) and `apps/web` (React Router) applications in a single monorepo.

## Requirements

- Node.js 20+
- Bun as package manager and runtime
- Docker (to quickly run PostgreSQL)

## Setup

1. Clone the repository:

```bash
git clone git@github.com:mertcancet/ulak-monorepo.git
cd cd ulak-monorepo
```

2. Install dependencies:

```bash
bun install --frozen-lockfile
```

3. Start the PostgreSQL service:

```bash
docker compose up -d
```

4. Prepare API environment variables:

```bash
cp apps/api/.env.example apps/api/.env
```

5. Push the database schema to your database:

```bash
bun dk push
```

6. (Optional) Seed sample data:

```bash
bun seed
```

## Development

Run all services at once:

```bash
bun dev
```

Only API:

```bash
bun dev:api
```

Only Web:

```bash
bun dev:web
```

## Build

API build:

```bash
bun build:api
```

Web build:

```bash
bun build:web
```

## Code Quality

API format:

```bash
bun format:api
```

Web format:

```bash
bun format:web
```

API check:

```bash
bun check:api
```

Web check:

```bash
bun check:web
```

## Important Note: `bun dk push`

When you make migration/schema changes under `apps/api/src/db/schema`, you must run `bun dk push` to keep your local database in sync.

In short:

- Schema changed -> `bun dk push`
- If needed -> `bun seed`

## Git Workflow (example)

After your changes, you can follow this typical flow:

```bash
git checkout -b feature/readme-update
bun check:api && bun check:web
git add .
git commit -m "docs: add root README with setup and bun dk push steps"
git push origin feature/readme-update
```

If you are already on an existing branch, the last line can simply be:

```bash
git push origin <branch-name>
```
