import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("dashboard", "routes/dashboard/layout.tsx", [
    index("routes/dashboard/dashboard.tsx"),
    route("agent", "routes/dashboard/agent.tsx"),
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
    route("members", "routes/dashboard/members.tsx"),
    route("invitations", "routes/dashboard/invitations.tsx"),
    route("settings", "routes/dashboard/settings.tsx"),
    route("tools", "routes/dashboard/tools.tsx"),
    route("tools/new", "routes/dashboard/tools-new.tsx"),
    route("tools/http/new", "routes/dashboard/tools-http-new.tsx"),
    route("tools/end-call/new", "routes/dashboard/tools-end-call-new.tsx"),
    route("tools/http/:id/edit", "routes/dashboard/tools-http-edit.tsx"),
    route(
      "tools/end-call/:id/edit",
      "routes/dashboard/tools-end-call-edit.tsx",
    ),
    route("tools/:id", "routes/dashboard/tools-edit.tsx"),
  ]),

  route("auth", "routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
