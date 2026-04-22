import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("dashboard", "routes/dashboard/layout.tsx", [
    index("routes/dashboard/dashboard.tsx"),
    route("agent", "routes/dashboard/agent.tsx"),
    route("agent-flow", "routes/dashboard/agent-flow.tsx"),
    route("knowledge-base", "routes/dashboard/knowledge-base.tsx"),
    route("numbers", "routes/dashboard/numbers.tsx"),
    route("bulk-calls", "routes/dashboard/bulk-calls.tsx"),
    route("bulk-calls/design", "routes/dashboard/bulk-calls-design.tsx"),
    route("numbers/:id", "routes/dashboard/number-detail.tsx"),
    route("call-history", "routes/dashboard/call-history.tsx"),
    route("call-history/:id", "routes/dashboard/call-history-detail.tsx"),
    route("ai-qa", "routes/dashboard/ai-qa.tsx"),
    route("analytics", "routes/dashboard/analytics.tsx"),
    route("billing", "routes/dashboard/billing.tsx"),
    route("settings", "routes/dashboard/settings.tsx"),
  ]),

  route("auth", "routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
