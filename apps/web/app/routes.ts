import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("./routes/dashboard/layout.tsx", [
    route("/dashboard", "./routes/dashboard/dashboard.tsx"),
  ]),

  layout("./routes/auth/layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
