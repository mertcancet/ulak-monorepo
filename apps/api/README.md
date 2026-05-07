# Cleon API

A high-performance REST API backend for the **CallingAI** platform — powering AI voice agents, tool management, knowledge bases, and workspace collaboration. Built with [Bun](https://bun.sh), [Elysia](https://elysiajs.com), and [Drizzle ORM](https://orm.drizzle.team) on PostgreSQL.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Reference](#api-reference)
- [Database](#database)
- [Authentication](#authentication)
- [Folder Structure](#folder-structure)

---

## Overview

Cleon API serves as the backbone of the CallingAI platform. It manages AI agent configuration, knowledge base ingestion, custom tool definitions, and multi-user workspaces. Real-time voice capabilities are powered by LiveKit integration, and all endpoints are documented via an interactive OpenAPI (Scalar) UI.

---

## Tech Stack

| Layer          | Technology                                           |
| -------------- | ---------------------------------------------------- |
| Runtime        | [Bun](https://bun.sh) v1+                           |
| Framework      | [Elysia](https://elysiajs.com) v1.4+                |
| Language       | TypeScript (strict, ES2022)                          |
| Database       | PostgreSQL 18 (Alpine)                               |
| ORM            | Drizzle ORM                                         |
| Authentication | [Better Auth](https://www.better-auth.com)           |
| Validation     | [Zod](https://zod.dev) v4                           |
| Real-time      | [LiveKit](https://livekit.io)                       |
| API Docs       | OpenAPI via `@elysiajs/openapi` + Scalar             |
| Linting        | [Biome](https://biomejs.dev) v2                     |

---

## Architecture

The API follows a **modular layered architecture**. Each domain (agents, tools, knowledge base, workspaces) is encapsulated as a self-contained Elysia plugin registered on the main app.

```
server.ts
├── errorHandler plugin
├── authModule        (/auth/*)
├── agentsModule      (/agents/*)
├── toolsModule       (/tools/*)
├── knowledgeBase     (/knowledge-base/*)
└── workspacesModule  (/workspaces/*)
```

Workspace-scoped resources use a `cleon-workspace-id` header for multi-tenancy. Permission checks are enforced at the module level via `checkPermissions()`.

---

## Features

- **AI Agents** — Create, configure, and manage voice AI agents with LLM settings, greeting/goodbye prompts, interruption behavior, and phone number assignment.
- **Tools** — Define and attach custom tools to agents; workspace-scoped with paginated listing.
- **Knowledge Bases** — Ingest knowledge from text, files, or websites; track processing status per source.
- **Workspaces** — Multi-tenant workspace model with role-based membership.
- **Authentication** — Session-based auth with email/password and Google OAuth via Better Auth.
- **OpenAPI Docs** — Interactive Scalar documentation served at `/reference`.
- **LiveKit Integration** — Real-time voice session management through LiveKit server SDK.
- **Paginated Queries** — Consistent cursor-free pagination across all list endpoints.
- **Problem Details** — RFC 7807-compliant error responses across all endpoints.

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1+
- [Docker](https://www.docker.com) (for PostgreSQL)
- [pnpm](https://pnpm.io) v10+ (monorepo package manager)

### 1. Install dependencies

From the monorepo root:

```bash
pnpm install
```

### 2. Start the database

```bash
docker compose up -d postgres
```

### 3. Configure environment

```bash
cp apps/api/.env.example apps/api/.env
```

Fill in the required values (see [Environment Variables](#environment-variables)).

### 4. Push the database schema

```bash
pnpm dk push
```

### 5. (Optional) Seed the database

```bash
pnpm seed
```

### 6. Start the development server

```bash
pnpm dev:api
# or from apps/api/
bun run dev
```

The API will be available at `http://localhost:3000`.  
Interactive docs: `http://localhost:3000/reference`

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema=public

# Better Auth
BETTER_AUTH_SECRET=          # Long random secret (min 32 chars)
BETTER_AUTH_URL=http://localhost:3000

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# OpenAPI
OPENAPI_SERVERS=http://localhost:3000

# Agent security
CLEON_AGENT_SECRET=          # Secret used to authenticate agent-to-API calls

# LiveKit (real-time voice)
LIVEKIT_URL=ws://localhost:7880
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

> All variables are validated at startup with Zod. Missing required variables will cause the server to fail fast with a descriptive error.

---

## Scripts

Run from `apps/api/` or via pnpm from the monorepo root.

| Script        | Command                         | Description                                           |
| ------------- | ------------------------------- | ----------------------------------------------------- |
| `dev`         | `bun run --watch src/server.ts` | Start development server with hot reload              |
| `build`       | `bun build --compile ...`       | Compile to a single native binary at `build/server`   |
| `seed`        | `bun run src/db/seed.ts`        | Seed the database with initial data                   |
| `dk generate` | `pnpm dk generate`              | Generate Drizzle migration files from schema          |
| `dk push`     | `pnpm dk push`                  | Apply schema changes directly to the database         |
| `format:api`  | `pnpm format:api`               | Run Biome formatter (auto-fix)                        |
| `check:api`   | `pnpm check:api`                | Run Biome linter (check only)                         |

---

## API Reference

All endpoints are documented interactively at `/reference` (Scalar UI). Below is a high-level summary.

> **Authentication**: All protected routes require a valid session cookie set by Better Auth. Workspace-scoped routes additionally require the `cleon-workspace-id` request header.

### Auth — `/auth/*`

Managed by Better Auth. Includes session management and Google OAuth flows.

| Method | Path                    | Description                  |
| ------ | ----------------------- | ---------------------------- |
| `POST` | `/auth/sign-up/email`   | Register with email/password |
| `POST` | `/auth/sign-in/email`   | Sign in with email/password  |
| `POST` | `/auth/sign-out`        | Sign out and clear session   |
| `GET`  | `/auth/session`         | Get current session          |
| `GET`  | `/auth/callback/google` | Google OAuth callback        |

### Agents — `/agents`

| Method   | Path          | Description                |
| -------- | ------------- | -------------------------- |
| `GET`    | `/agents`     | List agents (paginated)    |
| `POST`   | `/agents`     | Create a new agent         |
| `GET`    | `/agents/:id` | Get agent by ID            |
| `PATCH`  | `/agents/:id` | Update agent configuration |
| `DELETE` | `/agents/:id` | Delete an agent            |

**Example — Create agent:**

```bash
curl -X POST http://localhost:3000/agents \
  -H "Content-Type: application/json" \
  -H "cleon-workspace-id: <workspace-uuid>" \
  -b "session=<cookie>" \
  -d '{
    "name": "Support Agent",
    "workspaceId": "<workspace-uuid>",
    "instructions": "You are a helpful support assistant.",
    "allowInterruptions": true,
    "greetPrompt": "Hello! How can I help you today?",
    "goodbyePrompt": "Thank you for calling. Goodbye!"
  }'
```

**Example — List agents (paginated):**

```bash
curl "http://localhost:3000/agents?page=1&pageSize=20" \
  -H "cleon-workspace-id: <workspace-uuid>" \
  -b "session=<cookie>"
```

```json
{
  "data": [
    {
      "id": "01957b3a-...",
      "name": "Support Agent",
      "phoneNumber": "+1234567890",
      "allowInterruptions": true,
      "isDefault": false,
      "createdAt": "2026-05-07T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 1
  }
}
```

### Tools — `/tools`

| Method   | Path         | Description            |
| -------- | ------------ | ---------------------- |
| `GET`    | `/tools`     | List tools (paginated) |
| `POST`   | `/tools`     | Create a new tool      |
| `GET`    | `/tools/:id` | Get tool by ID         |
| `PATCH`  | `/tools/:id` | Update tool            |
| `DELETE` | `/tools/:id` | Delete tool            |

### Knowledge Base — `/knowledge-base`

| Method   | Path                                    | Description                  |
| -------- | --------------------------------------- | ---------------------------- |
| `GET`    | `/knowledge-base`                       | List knowledge bases         |
| `POST`   | `/knowledge-base`                       | Create a knowledge base      |
| `GET`    | `/knowledge-base/:id`                   | Get knowledge base by ID     |
| `POST`   | `/knowledge-base/:id/sources`           | Add a source (text/file/URL) |
| `DELETE` | `/knowledge-base/:id/sources/:sourceId` | Remove a source              |

### Workspaces — `/workspaces`

| Method | Path          | Description            |
| ------ | ------------- | ---------------------- |
| `POST` | `/workspaces` | Create a new workspace |

### Error Responses

All errors follow [RFC 7807 Problem Details](https://datatracker.ietf.org/doc/html/rfc7807):

```json
{
  "title": "Bad Request",
  "status": 400,
  "detail": "Validation failed",
  "errors": [
    { "path": "name", "message": "String must contain at least 3 character(s)" }
  ]
}
```

---

## Database

- **Engine**: PostgreSQL 18 (Alpine) via Docker
- **ORM**: Drizzle ORM (`snake_case` column naming convention)
- **IDs**: UUIDv7 — time-ordered, generated at the database level
- **Schema location**: `src/db/schema/`
- **Migrations output**: `drizzle/`

### Core Tables

| Table                    | Description                                 |
| ------------------------ | ------------------------------------------- |
| `users`                  | User accounts (managed by Better Auth)      |
| `sessions`               | Auth sessions (managed by Better Auth)      |
| `workspaces`             | Tenant workspaces                           |
| `workspace_members`      | Many-to-many workspace ↔ user membership    |
| `roles`                  | Workspace-scoped roles                      |
| `agents`                 | AI voice agent configurations               |
| `tools`                  | Custom tools attached to agents             |
| `agent_tools`            | Many-to-many agents ↔ tools                 |
| `knowledge_bases`        | Knowledge base definitions                  |
| `knowledge_base_sources` | Ingested sources (text, file, website)      |
| `businesses`             | Business entities linked to knowledge bases |

### Schema Workflow

```bash
# After editing src/db/schema/*.ts
pnpm dk generate   # Creates SQL migration files in drizzle/
pnpm dk push       # Applies migrations to the database
```

---

## Authentication

Authentication is handled by **Better Auth** with a Drizzle adapter.

- **Strategy**: HTTP-only session cookies
- **Providers**: Email/password, Google OAuth
- **Session validation**: All protected Elysia routes use a `requireAuth` macro that resolves the session from the incoming cookie
- **Agent auth**: Machine-to-machine requests use the `cleon-agent-secret` header validated against `CLEON_AGENT_SECRET`

---

## Folder Structure

```
apps/api/
├── drizzle/                    # Generated SQL migrations
├── src/
│   ├── server.ts               # App entry point & plugin composition
│   ├── api-client.ts           # Typed API client (for internal/web use)
│   ├── db/
│   │   ├── index.ts            # Drizzle DB instance
│   │   ├── relations.ts        # Drizzle relation definitions
│   │   ├── seed.ts             # Database seeder
│   │   └── schema/
│   │       ├── index.ts        # Re-exports all tables
│   │       ├── agents.ts
│   │       ├── auth.ts
│   │       ├── knowledge-base.ts
│   │       ├── tools.ts
│   │       ├── users.ts
│   │       └── workspaces.ts
│   ├── lib/
│   │   └── auth.ts             # Better Auth instance + OpenAPI export
│   ├── modules/
│   │   ├── agents/             # Agent CRUD + tool assignment
│   │   ├── auth/               # Auth module (session macro)
│   │   ├── knowledge-base/     # KB management + source ingestion
│   │   ├── tools/              # Tool CRUD
│   │   └── workspaces/         # Workspace creation
│   ├── plugins/
│   │   ├── error-handler.ts    # Global error boundary plugin
│   │   ├── models.ts           # Shared Elysia model definitions
│   │   └── problem-details.ts  # RFC 7807 response helper
│   ├── shared/
│   │   ├── auth-helpers.ts     # Permission checking utilities
│   │   ├── env.ts              # Zod-validated environment config
│   │   └── paginated-query.ts  # Shared pagination schema & response
│   └── types/
│       ├── index.ts
│       └── bad-request.ts
├── .env.example
├── drizzle.config.ts
├── package.json
└── tsconfig.json
```
