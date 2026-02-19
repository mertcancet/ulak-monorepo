import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("dashboard", "routes/dashboard/layout.tsx", [
    index("routes/dashboard/dashboard.tsx"),
    route("agent", "routes/dashboard/agent.tsx"),
    route("knowledge-base", "routes/dashboard/knowledge-base.tsx"),
  ]),

  route("auth", "routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
